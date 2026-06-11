from pathlib import Path
from zipfile import ZipFile
import re
import sys
p = Path('Fedfina Response Document - Copy.docx')
if not p.exists():
    print('MISSING')
    sys.exit(1)
import textwrap
with ZipFile(p) as z:
    xml = z.read('word/document.xml').decode('utf-8')
texts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', xml)
text = ''.join(texts)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'\r?\n', ' ', text)
text = re.sub(r'\s+', ' ', text).strip()
text = re.sub(r'(?<=[.!?])\s+', '\n', text)
for paragraph in text.split('\n'):
    print(textwrap.fill(paragraph, width=120))
