from engine import respond, current_phase

TEST_CONVERSATION = [
    "idk man honestly i dont even know where to start",
    "everything just feels off lately",
    "like nothing is actually wrong but something still feels wrong",
    "my brain just wont shut up fr",
    "its like 24/7 noise",
    "even when im tired it doesnt stop",
    "then i get annoyed at myself for thinking so much",
    "and then i spiral more",
    "i dont even talk about this much",
    "everyone just jumps to advice immediately",
    "like just chill or stop thinking",
    "so i just stop saying anything",
    "but the thoughts keep going anyway",
    "its been like this for months",
    "i dont even know what im supposed to do anymore"
]

print("\n--- THERAPIST AI STRESS TEST START ---\n")

for i, msg in enumerate(TEST_CONVERSATION, 1):
    print(f"USER {i}: {msg}\n")
    reply = respond(msg, debug=True)
    print(f"AI   {i}: {reply}\n")
    print(f"[PHASE]: {current_phase.value}")
    print("-" * 60)
