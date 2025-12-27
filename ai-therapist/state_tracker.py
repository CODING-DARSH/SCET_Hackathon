class StateTracker:
    def __init__(self):
        self.last_user_input = None
        self.raw_text = ""
        self.user_requested_guidance = False
        self.turn_count = 0
        self.persistence = "new"          # new | repeating | stuck
        self.emotional_load = "light"     # light | heavy
        self.self_frustration = "low"     # low | high

        self._heavy_streak = 0
        self._repeat_streak = 0

    def update(self, user_text: str):
        text = user_text.lower()
        self.raw_text = text

        # --- Persistence ---
        if self.last_user_input:
            if any(w in text for w in ["still", "again", "keeps", "always"]):
                self._repeat_streak += 1
            else:
                self._repeat_streak = 0

            if self._repeat_streak >= 2:
                self.persistence = "stuck"
            elif self._repeat_streak == 1:
                self.persistence = "repeating"
            else:
                self.persistence = "new"

        # --- Emotional load (with inertia) ---
        if any(w in text for w in [
            "exhausted", "tired", "drained", "too much", "overwhelming", "heavy"
        ]):
            self._heavy_streak += 1
        else:
            self._heavy_streak = max(0, self._heavy_streak - 1)

        self.emotional_load = "heavy" if self._heavy_streak >= 2 else "light"

        # --- Self-directed frustration ---
        if any(w in text for w in [
            "annoyed at myself", "why am i like this",
            "i hate myself", "stupid", "fed up with myself"
        ]):
            self.self_frustration = "high"
        else:
            self.self_frustration = "low"

        # --- Explicit guidance request ---
        guidance_triggers = [
            "what should i do",
            "how do i deal",
            "help me figure out",
            "i need advice",
            "tell me what to do",
            "what am i supposed to do"
        ]
        self.user_requested_guidance = any(t in text for t in guidance_triggers)

        self.last_user_input = text
        self.turn_count += 1
    def is_stable(self):
        return (
            self.emotional_load != "heavy"
            and self.self_frustration != "high"
        )

    def get_state(self) -> str:
        return (
            f"Current interaction state:\n"
            f"- persistence: {self.persistence}\n"
            f"- emotional load: {self.emotional_load}\n"
            f"- self-frustration: {self.self_frustration}"
        )
