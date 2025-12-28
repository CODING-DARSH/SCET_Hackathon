from engine import respond

# Simulated messy, real-world conversation
TEST_CONVERSATION = [
    "idk man honestly i don’t even know where to start with this",

    "everything just feels off lately, like not in a big dramatic way but enough that i keep noticing it",

    "it’s weird because nothing is actually going wrong in my life right now, at least nothing obvious, but something still feels wrong underneath",

    "my brain just won’t shut up fr, like there’s always something running in the background",

    "it’s basically 24/7 noise, even when i’m doing normal stuff or trying to distract myself",

    "even when i’m tired as hell and just want to sleep, it doesn’t really stop, it just keeps going",

    "then i start getting annoyed at myself for thinking so much, like why can’t i just be normal and quiet for once",

    "and once that happens i feel like i spiral even harder, like my thoughts get louder instead of calmer",

    "i don’t even talk about this much with people because i never know how to explain it properly",

    "everyone just jumps straight to advice the second i say anything, like they already know what i should do",

    "they’re always like ‘just chill’ or ‘stop overthinking’ as if that’s actually helpful, wow thanks",

    "after a while i just stop saying anything at all because it feels pointless to keep explaining myself",

    "but even when i go quiet around people, the thoughts keep going anyway, like they don’t care",

    "sometimes i feel okay for a little bit, like maybe it’s easing up, and then suddenly it hits again out of nowhere",

    "it usually gets worse at night when everything slows down and there’s nothing left to distract me",

    "that’s when old conversations start replaying in my head for no real reason, stuff from months ago",

    "i keep overanalyzing dumb things i said or didn’t say, even though i know it probably doesn’t matter",

    "it’s exhausting honestly, like mentally drained in a way that sleep doesn’t really fix",

    "and the worst part is it’s been like this for months now, not just a bad week or something",

    "after a while it makes me feel lost, like i don’t even know what i’m supposed to do anymore",

    "sometimes i start wondering if something is actually wrong with me, like why this won’t stop",

    "i don’t even want anything big at this point, i just want my head to be quiet for once, even briefly"
]


print("\n--- THERAPIST AI STRESS TEST START ---\n")

for i, user_input in enumerate(TEST_CONVERSATION, start=1):
    print(f"USER {i}: {user_input}")
    ai_output = respond(user_input, debug=True)
    print(f"AI   {i}: {ai_output}\n")
    print("-" * 60)

print("\n--- STRESS TEST END ---\n")