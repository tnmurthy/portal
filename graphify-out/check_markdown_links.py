import os
import re
from pathlib import Path

def check_all_links():
    # Regex for standard markdown links: [text](path)
    md_regex = re.compile(r'\[([^\]]*?)\]\(([^)]*?)\)')
    # Regex for wiki links: [[path]] or [[path|text]]
    wiki_regex = re.compile(r'\[\[(.*?)\]\]')
    # Regex for HTML links: <a href="path">
    html_regex = re.compile(r'href=["\']([^"\']+)["\']')

    all_broken = []

    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', 'graphify-out')]
        for file in files:
            if not file.endswith('.md'):
                continue
            
            fpath = Path(root) / file
            try:
                content = fpath.read_text(encoding='utf-8', errors='ignore')
                
                # Check standard markdown links
                for match in md_regex.finditer(content):
                    link = match.group(2).strip()
                    # Skip external URLs, local anchors, or mailto
                    if link.startswith(('http://', 'https://', '#', 'mailto:')):
                        continue
                    
                    # Remove any query params or anchors
                    clean_link = link.split('#')[0].split('?')[0]
                    if not clean_link:
                        continue
                    
                    # Resolve path relative to the file containing it
                    resolved_path = Path(root) / clean_link
                    if not resolved_path.exists():
                        all_broken.append({
                            'file': str(fpath),
                            'link_type': 'Markdown Link',
                            'raw_text': match.group(0),
                            'target': clean_link
                        })

                # Check wiki links
                for match in wiki_regex.finditer(content):
                    link_content = match.group(1).strip()
                    # Wiki links can be [[target|label]] or [[target]]
                    target = link_content.split('|')[0].strip()
                    if target.startswith(('http://', 'https://', '#')):
                        continue
                    
                    # Check if target exists as a file or folder
                    resolved_path = Path(root) / target
                    # If not found directly, check relative to root or as a file stem
                    if not resolved_path.exists():
                        # Sometimes wiki links reference files without extension (e.g. [[FedFina_HLD]])
                        found = False
                        for ext in ('.md', '.pdf', '.png', '.html'):
                            if (Path(root) / (target + ext)).exists():
                                found = True
                                break
                        if not found:
                            all_broken.append({
                                'file': str(fpath),
                                'link_type': 'Wiki Link',
                                'raw_text': match.group(0),
                                'target': target
                            })

            except Exception as e:
                print(f"Error checking {fpath}: {e}")

    if all_broken:
        print(f"Found {len(all_broken)} broken links:")
        for idx, item in enumerate(all_broken, 1):
            print(f"{idx}. File: {item['file']}")
            print(f"   Type: {item['link_type']}")
            print(f"   Text: {item['raw_text']}")
            print(f"   Target: {item['target']}\n")
    else:
        print("All local markdown and wiki links are valid and exist in the workspace!")

if __name__ == '__main__':
    check_all_links()
