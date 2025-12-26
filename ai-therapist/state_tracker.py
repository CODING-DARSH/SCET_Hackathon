class StateTracker:
    def __init__(self):
        self.last_user_input = None
        self.persistence = "new"          # new | repeating | stuck
        self.emotional_load = "light"     # light | heavy
        self.self_frustration = "low"     # low | high

    def update(self, user_text: str):
        text = user_text.lower()

        # --- Persistence ---
        if self.last_user_input:
            if text == self.last_user_input:
                self.persistence = "stuck"
            elif any(w in text for w in ["still", "again", "keeps", "always"]):
                self.persistence = "repeating"
            else:
                self.persistence = "new"

        # --- Emotional load ---
        if any(w in text for w in [
            "exhausted", "tired", "drained", "too much", "overwhelming", "heavy"
        ]):
            self.emotional_load = "heavy"
        else:
            self.emotional_load = "light"

        # --- Self-directed frustration ---
        if any(w in text for w in [
            "annoyed at myself", "why am i like this", "i hate", "stupid", "fed up with myself"
        ]):
            self.self_frustration = "high"
        else:
            self.self_frustration = "low"

        self.last_user_input = text

    def get_state(self) -> str:
        return (
            f"Current interaction state:\n"
            f"- persistence: {self.persistence}\n"
            f"- emotional load: {self.emotional_load}\n"
            f"- self-frustration: {self.self_frustration}"
        )
