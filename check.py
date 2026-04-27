import re
with open(r"c:\Users\User\Desktop\gereg-intel\src\app\ioai-roadmap\data.ts","r",encoding="utf-8") as f:
    t = f.read()
topic_ids = re.findall(r'name: `[^`]+`', t)
print("Total topics:", len(topic_ids))
for name in topic_ids[:5]:
    print(" -", name[:80])
