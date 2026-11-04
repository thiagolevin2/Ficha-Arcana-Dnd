import fitz,json,re,hashlib,argparse
from pathlib import Path
P=argparse.ArgumentParser();P.add_argument('--uploads',required=True);P.add_argument('--canonical-only',action='store_true');args=P.parse_args();uploads=Path(args.uploads)
SPECS=[('tasha','Caldeirão de Tasha para Tudo','ilide.info-caldeirao-de-tasha-para-tudo-pr_',False),('fizban','Tesouro dos Dragões de Fizban','ilide.info-d-d-5e-tesouro-dos-dragoes-de-fizban-',False),('wildemount','Guia do Explorador para Wildemount — trecho enviado','ilide.info-guia-do-explorador-para-wildemount-',False),('ravenloft','Van Richten — linhagens e subclasses','ilide.info-vgr-pt-van-richten',False),('races-large','Compêndio de Espécies — 69 páginas','ilide.info-compendio-de-racas-d-d-5e-pdf-',False),('races-small','Compêndio de Espécies — 10 páginas','ilide.info-d-d-5e-compendio-de-racas-biblioteca-',False),('ua-revised','Unearthed Arcana — Subclasses Revisadas','dd-5e-unearthed-arcana-subclasses-revisadas-',True),('ua-monk','Unearthed Arcana — Monge','dd-5e-unearthed-arcana-monge-',True),('ua-paladin','Unearthed Arcana — Paladino','dd-5e-unearthed-arcana-paladino-',True),('ua-fighter','Unearthed Arcana — Guerreiro','unearthed arcana guerreiro',True)]
allpages=[];sources=[];digests={};duplicates=[]
def clean(t):
 t=re.sub(r'Machine Translated by Google\s*','',t)
 t=re.sub(r'(\w)-\n(\w)',r'\1\2',t)
 return t.strip()
for key,title,prefix,ua in ([] if args.canonical_only else SPECS):
 files=sorted(p for p in uploads.glob('*.pdf') if p.name.startswith(prefix))
 if not files:raise RuntimeError('Fonte ausente: '+key)
 for f in files:
  sha=hashlib.sha256(f.read_bytes()).hexdigest()
  if sha in digests:duplicates.append({'file':f.name,'sameAs':digests[sha],'source':key,'reason':'Conteúdo binário idêntico; importado uma única vez.'});continue
  digests[sha]=f.name;doc=fitz.open(f);source={'id':key,'title':title,'file':f.name,'sha256':sha,'pageCount':len(doc),'playtest':ua,'extractedPages':0,'notes':[]}
  if key in ['wildemount','ravenloft']:source['notes'].append('Integra o trecho anexado, não capítulos ausentes do livro completo.')
  if key=='fizban':source['notes'].append('O arquivo usa tradução automática; os nomes podem diferir de traduções oficiais.')
  if key.startswith('races'):source['notes'].append('Compilação de opções de várias fontes; a indicação da compilação é preservada.')
  for n,page in enumerate(doc):
   text=clean(page.get_text());heads=[]
   for block in page.get_text('dict')['blocks']:
    for line in block.get('lines',[]):
     ss=line['spans'];t=''.join(s['text'] for s in ss).strip()
     if t and len(t)<130 and any(s['size']>=12 for s in ss) and not re.match(r'^\d+$',t):heads.append(t)
   if text:source['extractedPages']+=1
   allpages.append({'id':key+'-'+str(n+1),'source':key,'page':n+1,'heading':' · '.join(heads[:4])[:200] or title,'text':text,'playtest':ua})
  sources.append(source)
# Canonical 2024 feats and invocations are structured to enforce version precedence.
book=fitz.open(uploads/'dampd-5e---livro-do-jogador-2024.pdf')
def entries_in_pages(start,end,kind):
 lines=[]
 for i in range(start,end):
  for b in book[i].get_text('dict')['blocks']:
   for l in b.get('lines',[]):
    ss=l['spans'];text=''.join(s['text'] for s in ss).strip()
    if not text or l['bbox'][1]>744 or text.startswith('CAPÍTULO'):continue
    heading=any(12.0<s['size']<12.8 and 'MrsEaves' in s['font'] for s in ss)
    lines.append({'text':text,'heading':heading,'page':i-5})
 starts=[i for i,l in enumerate(lines) if l['heading'] and not l['text'].startswith('Nível')]
 result=[]
 for n,a in enumerate(starts):
  seg=lines[a:starts[n+1] if n+1<len(starts) else len(lines)];name=seg[0]['text'];text='\n'.join(l['text'] for l in seg[1:])
  if len(text)<20:continue
  result.append({'id':'phb2024-'+kind+'-'+str(len(result)+1),'kind':kind,'name':name,'source':'phb2024','page':seg[0]['page'],'originalText':text,'adaptedText':text,'status':'2024','summary':re.sub(r'\s+',' ',text)[:230],'features':[]})
 return result
def maneuver_entries():
 result=[];current=None;active=False
 for i in range(139,141):
  for b in book[i].get_text('dict')['blocks']:
   for l in b.get('lines',[]):
    ss=l['spans'];text=''.join(s['text'] for s in ss).strip()
    if not text or l['bbox'][1]>744:continue
    first=ss[0]
    if first['font']=='TTJenevers-BoldItalic' and first['text'].strip().endswith('.'):
     name=first['text'].strip().rstrip('.')
     if name=='Aparar':active=True
     if not active:continue
     current={'name':name,'page':i-5,'lines':[text[len(first['text']):].strip()]};result.append(current)
    elif current and all(s['font'].startswith('TTJenevers') for s in ss):current['lines'].append(text)
 return [{'id':'phb2024-maneuver-'+str(n+1),'kind':'maneuver','name':e['name'],'source':'phb2024','page':e['page'],'originalText':clean('\n'.join(e['lines'])),'adaptedText':clean('\n'.join(e['lines'])),'status':'2024','summary':re.sub(r'\s+',' ',' '.join(e['lines']))[:230],'features':[]} for n,e in enumerate(result)]
canonical=entries_in_pages(205,218,'feat')+entries_in_pages(76,79,'invocation')+maneuver_entries()+entries_in_pages(110,112,'metamagic')
if args.canonical_only:
 old=json.loads(Path('data/expansion-sources.json').read_text());sources=old['sources'];duplicates=old['duplicates'];allpages=json.loads(Path('dist/supplement-pages.json').read_text())
Path('dist/supplement-pages.json').write_text(json.dumps(allpages,ensure_ascii=False,separators=(',',':')))
Path('data/expansion-sources.json').write_text(json.dumps({'sources':sources,'duplicates':duplicates,'physicalPageCount':sum(x['pageCount'] for x in sources),'indexedPageCount':sum(x['extractedPages'] for x in sources)},ensure_ascii=False,indent=2))
Path('data/phb2024-options.json').write_text(json.dumps(canonical,ensure_ascii=False,indent=2))
print(json.dumps({'sources':len(sources),'pages':len(allpages),'duplicates':len(duplicates),'canonicalFeats':sum(x['kind']=='feat' for x in canonical),'canonicalInvocations':sum(x['kind']=='invocation' for x in canonical)},ensure_ascii=False))
