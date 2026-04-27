"""
Final parser: reads ioai-master-curriculum.md and rewrites SKILL_SECTIONS in data.ts
"""
import re

def sanitize_ts(s):
    """Escape backtick template literal characters."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def parse_resources(raw):
    """Extract video/article links from a markdown block."""
    resources = []
    for line in raw.split('\n'):
        stripped = line.strip()
        if not stripped.startswith('-'):
            continue
        url_m = re.search(r'(https?://[^\s`<>]+)', stripped)
        url = url_m.group(1).rstrip('.,)') if url_m else '#'

        # Extract title from **bold** or plain text
        bold_m = re.search(r'\*\*(.*?)\*\*', stripped)
        if bold_m:
            title = bold_m.group(1).strip()
        else:
            title = re.sub(r'🎬', '', stripped.lstrip('- ')).strip()
            title = re.sub(r'https?://\S+', '', title).strip(' :-–—')

        if not title:
            continue

        res_type = "video" if any(x in url for x in ["youtube.com", "youtu.be", "course.fast.ai", "huggingface.co/learn"]) else "article"
        resources.append({
            "title": sanitize_ts(title),
            "url": url,
            "type": res_type,
            "free": True
        })
    return resources

def parse_level(level_title, content):
    """Parse a #### level block into a topic dict."""
    # Description: everything before Projects/Videos/Resources
    desc_match = re.search(
        r'\*\*(?:What to (?:learn|build|do)[^*]*)?\*\*(.*?)(?=\*\*(?:Projects?|Videos?|Resources?)\b)',
        content, re.DOTALL | re.IGNORECASE
    )
    proj_match = re.search(
        r'\*\*(?:Projects?[^*]*)?\*\*(.*?)(?=\*\*(?:Videos?|Resources?)\b)',
        content, re.DOTALL | re.IGNORECASE
    )
    vid_match = re.search(
        r'\*\*(?:Videos?|Resources?)[^*]*\*\*(.*)',
        content, re.DOTALL | re.IGNORECASE
    )

    # Build description
    parts = []
    if desc_match:
        parts.append(desc_match.group(1).strip())
    elif content.strip():
        # Fall back: take content up to first ** header
        pre = re.split(r'\*\*(?:Projects?|Videos?|Resources?)\b', content, flags=re.IGNORECASE)[0]
        parts.append(pre.strip())

    if proj_match:
        parts.append("**Projects:**\n" + proj_match.group(1).strip())

    description = "\n\n".join(p for p in parts if p)
    resources = parse_resources(vid_match.group(1) if vid_match else "")

    return {
        "description": description,
        "resources": resources
    }

def parse_subject(content):
    """Parse subject content into list of topics."""
    topics = []

    # Split by ### subheadings
    sub_chunks = re.split(r'^### +(.+)$', content, flags=re.MULTILINE)[1:]

    if not sub_chunks:
        # No ###, try #### directly
        lv_chunks = re.split(r'^#### +(.+)$', content, flags=re.MULTILINE)[1:]
        for j in range(0, len(lv_chunks) - 1, 2):
            lv_title = lv_chunks[j].strip()
            lv_content = lv_chunks[j + 1]
            topic_id = re.sub(r'[^a-z0-9]+', '-', lv_title.lower()).strip('-')
            data = parse_level(lv_title, lv_content)
            topics.append({
                "id": topic_id,
                "name": lv_title,
                "description": data["description"],
                "resources": data["resources"]
            })
    else:
        for i in range(0, len(sub_chunks) - 1, 2):
            sub_title_raw = sub_chunks[i].strip()
            sub_content = sub_chunks[i + 1]

            # Clean emoji + numbering from sub title for display
            sub_title_clean = re.sub(r'^[\W\d\.]+', '', sub_title_raw).strip()

            # Split sub by #### level
            lv_chunks = re.split(r'^#### +(.+)$', sub_content, flags=re.MULTILINE)[1:]

            if not lv_chunks:
                # Whole sub is one topic
                topic_id = re.sub(r'[^a-z0-9]+', '-', sub_title_clean.lower()).strip('-')
                data = parse_level(sub_title_clean, sub_content)
                topics.append({
                    "id": topic_id,
                    "name": sub_title_clean,
                    "description": data["description"],
                    "resources": data["resources"]
                })
            else:
                for j in range(0, len(lv_chunks) - 1, 2):
                    lv_title = lv_chunks[j].strip()
                    lv_content = lv_chunks[j + 1]
                    full_name = f"{sub_title_clean} — {lv_title}"
                    topic_id = re.sub(r'[^a-z0-9]+', '-', full_name.lower()).strip('-')
                    data = parse_level(lv_title, lv_content)
                    topics.append({
                        "id": topic_id,
                        "name": full_name,
                        "description": data["description"],
                        "resources": data["resources"]
                    })

    return topics

def topic_to_ts(t):
    """Convert a topic dict to TypeScript object literal string."""
    lines = ['      {']
    lines.append(f'        id: "{t["id"]}",')
    lines.append(f'        name: `{sanitize_ts(t["name"])}`,')
    lines.append(f'        description: `{sanitize_ts(t["description"])}`,')
    lines.append('        resources: [')
    for r in t["resources"]:
        lines.append(
            f'          {{ title: `{r["title"]}`, url: "{r["url"]}", type: "{r["type"]}", free: {str(r["free"]).lower()} }},'
        )
    lines.append('        ]')
    lines.append('      },')
    return '\n'.join(lines)

def main():
    COLORS = ["#5591c7", "#6daa45", "#a86fdf", "#fdab43", "#4f98a3", "#ff4757", "#ff9ff3", "#d19900", "#10ac84"]
    ICONS  = ["∑", "⚙️", "ML", "DL", "👁️", "💬", "🎵", "✨", "🏆"]

    with open(r"c:\Users\User\Desktop\gereg-intel\ioai-master-curriculum.md", "r", encoding="utf-8") as f:
        text = f.read()

    subject_parts = re.split(r'^## SUBJECT (\d+):\s*(.+)$', text, flags=re.MULTILINE)[1:]

    sections_ts = []
    for i in range(0, len(subject_parts) - 2, 3):
        sub_num   = int(subject_parts[i].strip())
        sub_title = subject_parts[i + 1].strip()
        sub_body  = subject_parts[i + 2]

        idx = (sub_num - 1) % len(COLORS)
        color = COLORS[idx]
        icon  = ICONS[idx]
        r, g, b = int(color[1:3], 16), int(color[3:5], 16), int(color[5:7], 16)
        color_bg = f"rgba({r},{g},{b},0.12)"

        topics = parse_subject(sub_body)
        print(f"  Subject {sub_num}: {sub_title} — {len(topics)} topics extracted")

        topics_ts = '\n'.join(topic_to_ts(t) for t in topics)

        sec = f"""  {{
    id: "subject-{sub_num}",
    label: "{sanitize_ts(sub_title)}",
    icon: "{icon}",
    color: "{color}",
    colorBg: "{color_bg}",
    intro: "Master curriculum for {sanitize_ts(sub_title)}",
    topics: [
{topics_ts}
    ]
  }},"""
        sections_ts.append(sec)

    new_block = "export const SKILL_SECTIONS: SkillSection[] = [\n" + "\n".join(sections_ts) + "\n];"

    with open(r"c:\Users\User\Desktop\gereg-intel\src\app\ioai-roadmap\data.ts", "r", encoding="utf-8") as f:
        original = f.read()

    # Replace the SKILL_SECTIONS block
    replaced = re.sub(
        r'export const SKILL_SECTIONS: SkillSection\[\] = \[.*?\];',
        new_block,
        original,
        flags=re.DOTALL
    )

    with open(r"c:\Users\User\Desktop\gereg-intel\src\app\ioai-roadmap\data.ts", "w", encoding="utf-8") as f:
        f.write(replaced)

    print("\n✅ data.ts updated successfully!")

if __name__ == "__main__":
    main()
