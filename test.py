import re
import json

def parse_single_level(full_name, level_title, level_content, topics_list):
    print("In parse_single_level, full_name:", full_name)
    topics_list.append({"name": full_name})

def parse_topics(content):
    topics = []
    subsubjects = re.split(r'^###\s+(.*?)$', content, flags=re.MULTILINE)[1:]
    if len(subsubjects) == 0:
        pass
    else:
        for i in range(0, len(subsubjects), 2):
            sub_title = subsubjects[i].strip()
            sub_content = subsubjects[i+1]
            levels = re.split(r'^####\s+(.*?)$', sub_content, flags=re.MULTILINE)[1:]
            for j in range(0, len(levels), 2):
                level_title = levels[j].strip()
                level_content = levels[j+1]
                full_name = f"{sub_title} - {level_title}"
                parse_single_level(full_name, level_title, level_content, topics)
    return topics

with open(r"c:\Users\User\Desktop\gereg-intel\ioai-master-curriculum.md", "r", encoding="utf-8") as f:
    text = f.read()

subjects_raw = re.split(r'^## SUBJECT (\d+):\s+(.*)$', text, flags=re.MULTILINE)[1:]
out = []
for i in range(0, len(subjects_raw), 3):
    sub_title = subjects_raw[i+1].strip()
    sub_content = subjects_raw[i+2]
    out.append({
        "title": sub_title,
        "topics": parse_topics(sub_content)
    })

with open("test4.json", "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2)
