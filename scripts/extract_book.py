import fitz,json,re,os
from pathlib import Path
D=fitz.open('/workspace/scratch/553e7fcdb637/upload/dampd-5e---livro-do-jogador-2024.pdf')
out=Path('docs/assets');out.mkdir(parents=True,exist_ok=True)
# Extract the artwork separately from the printed title and page frame.
for name,page in [('barbaro',55),('bardo',63),('bruxo',73),('clerigo',85),('druida',95),('feiticeiro',107),('guardiao',121),('guerreiro',131),('ladino',141),('mago',151),('monge',163),('paladino',171)]:
 p=D[page]
 ims=[im for im in p.get_image_info(xrefs=True) if im['xref'] and im['height']>600 and im['width']>500]
 im=max(ims,key=lambda a:a['height']*a['width']) if len(ims)==1 else ims[-1]
 pix=fitz.Pixmap(D,im['xref'])
 if pix.n>3: pix=fitz.Pixmap(fitz.csRGB,pix)
 pix.save(str(out/(name+'.jpg')))
lines=[]
for i in range(244,349):
 for b in D[i].get_text('dict')['blocks']:
  for l in b.get('lines',[]):
   spans=l['spans'];t=''.join(s['text'] for s in spans).strip()
   if not t or l['bbox'][1]>744 or t.startswith('CAPÍTULO'):continue
   heading=any(12.3<s['size']<12.7 and 'MrsEaves' in s['font'] for s in spans)
   lines.append({'text':t,'heading':heading,'page':i-5,'font':spans[0]['font']})
# Join spell names that are split across two lines.
i=0
while i<len(lines)-1:
 if lines[i]['heading'] and lines[i+1]['heading']:
  lines[i]['text']+=' '+lines[i+1]['text'];lines.pop(i+1)
 else:i+=1
starts=[i for i,l in enumerate(lines) if l['heading'] and i+1<len(lines) and re.match(r'(?:Truque|[1-9][º°] Círculo)',lines[i+1]['text'])]
oldIds={s['name']:s['id'] for s in json.loads(Path('docs/spells.json').read_text())} if Path('docs/spells.json').exists() else {}
nextId=max([int(v) for v in oldIds.values()]+[0])+1
spells=[]
def clean(t):return re.sub(r'\s+',' ',re.sub(r'(\w)-\s+(\w)',r'\1\2',t)).strip()
for n,start in enumerate(starts):
 seg=lines[start:starts[n+1] if n+1<len(starts) else len(lines)]
 name=seg[0]['text'];meta=[];j=1
 while j<len(seg) and not seg[j]['text'].startswith('Tempo de Conjuração:'):
  meta.append(seg[j]['text']);j+=1
 meta=clean(' '.join(meta));level=0 if meta.startswith('Truque') else int(meta[0]);school=re.sub(r'^(Truque de |[1-9][º°] Círculo, )','',meta).split(' (')[0]
 cl=re.search(r'\(([^)]+)\)',meta);classes=[x.strip() for x in cl.group(1).split(',')] if cl else []
 content=clean(' '.join(l['text'] for l in seg[j:]));fields={}
 for a,b in [('time','Tempo de Conjuração:'),('range','Alcance:'),('components','Componente'),('duration','Duração:')]:
  m=re.search((r'Componentes?:' if a=='components' else re.escape(b))+r'\s*(.*?)(?=Tempo de Conjuração:|Alcance:|Componentes?:|Duração:|$)',content)
  fields[a]=m.group(1).strip() if m else ''
 # Duration and body share the final segment, so use the actual source lines.
 k=next((k for k,l in enumerate(seg) if l['text'].startswith('Duração:')),None)
 if k is not None:
  end=k+1
  while end<len(seg) and 'ScalaSans' in seg[end].get('font','') and not seg[end]['heading']:end+=1
  fields['duration']=clean(' '.join(l['text'] for l in seg[k:end])).replace('Duração:','').strip()
  body=clean(' '.join(l['text'] for l in seg[end:]))
 else:body=content
 spellId=oldIds.get(name)
 if not spellId:
  spellId=str(nextId);nextId+=1
 spells.append({'id':spellId,'name':name,'level':level,'school':school,'classes':classes,'page':seg[0]['page'],**fields,'concentration':'Concentração' in fields['duration'],'ritual':'Ritual' in fields['time'],'text':body})
Path('docs/spells.json').write_text(json.dumps(spells,ensure_ascii=False))
# Read-only chapter references preserve the user's supplied source inside this private tool.
chapters=[('barbaro',56,64),('bardo',64,74),('bruxo',74,86),('clerigo',86,96),('druida',96,108),('feiticeiro',108,122),('guardiao',122,132),('guerreiro',132,142),('ladino',142,152),('mago',152,164),('monge',164,172),('paladino',172,181)]
refs={}
for key,a,b in chapters:
 refs[key]=[{'page':i-5,'text':D[i].get_text()} for i in range(a,b) if len(D[i].get_text())>100]
refs['origens']=[{'page':i-5,'text':D[i].get_text()} for i in range(183,203)]
refs['talentos']=[{'page':i-5,'text':D[i].get_text()} for i in range(204,217)]
refs['regras']=[{'page':i-5,'text':D[i].get_text()} for i in list(range(15,35))+list(range(366,391))]
Path('docs/references.json').write_text(json.dumps(refs,ensure_ascii=False))
print('Spells:',len(spells),'classes:',sorted(set(c for s in spells for c in s['classes'])))
print('First/last:',spells[0]['name'],spells[-1]['name'])
print('Art:',[(p.name,p.stat().st_size) for p in out.glob('*.jpg')])
