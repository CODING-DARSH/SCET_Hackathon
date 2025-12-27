# class PatternMemory:
#     def __init__(self, max_words=120):
#         self.summary = ""
#         self.max_words = max_words

#     def update(self, user_text: str, ai_text: str):
#         # Only store signals, not filler
#         text = f"{user_text} {ai_text}"

#         # Remove very short filler turns
#         if len(text.split()) < 4:
#             return

#         combined = f"{self.summary} {text}".strip()
#         words = combined.split()

#         if len(words) > self.max_words:
#             words = words[-self.max_words:]

#         self.summary = " ".join(words)

#     def get(self) -> str:
#         return self.summary or "No clear pattern yet."

# class PatternMemory:
#     def __init__(self):
#         self.patterns = []

#     def update(self, user_text: str, ai_text: str):
#         text = user_text.lower()

#         if any(w in text for w in ["idk", "dont know", "not sure"]):
#             self._add("uncertainty about internal state")

#         if any(w in text for w in ["off", "weird", "wrong"]):
#             self._add("sense that something is wrong without a clear reason")

#         if any(w in text for w in ["overthink", "loop", "spiral", "noise"]):
#             self._add("repetitive or looping thoughts")

#         if any(w in text for w in ["tired", "exhausted", "drained"]):
#             self._add("mental fatigue")

#         if any(w in text for w in ["advice", "tell me", "just chill"]):
#             self._add("feels unheard or rushed by others")

#     def _add(self, pattern: str):
#         if pattern not in self.patterns:
#             self.patterns.append(pattern)

#     def get(self) -> str:
#         if not self.patterns:
#             return "No clear patterns yet."
#         return "Patterns noticed so far:\n- " + "\n- ".join(self.patterns)

class PatternMemory:
    def __init__(self):
        self.patterns = set()
        self.relational_states = set()

    def update(self, user_text: str, ai_text: str):
        t = user_text.lower()

        # Internal process
        if any(w in t for w in ["idk", "dont know", "not sure"]):
            self.patterns.add("difficulty identifying internal state")

        if any(w in t for w in ["overthink", "loop", "spiral", "noise"]):
            self.patterns.add("repetitive mental activity")

        if any(w in t for w in ["tired", "exhausted", "drained"]):
            self.patterns.add("mental fatigue")

        # RELATIONAL EXPERIENCE (this is new)
        if any(w in t for w in ["no one", "nobody", "alone"]):
            self.relational_states.add("feeling alone with this")

        if any(w in t for w in ["everyone", "they just", "people say"]):
            self.relational_states.add("feeling misunderstood by others")

        if any(w in t for w in ["annoyed at myself", "hate this", "why am i like this"]):
            self.relational_states.add("self-frustration or self-criticism")

    def get(self) -> str:
        parts = []
        if self.patterns:
            parts.append("Ongoing patterns:\n- " + "\n- ".join(self.patterns))
        if self.relational_states:
            parts.append("Relational experience:\n- " + "\n- ".join(self.relational_states))

        return "\n\n".join(parts) if parts else "No clear patterns yet."