"""Build a deduplicated compatibility catalog. PHB 2024 is immutable and always wins."""
import json,re,unicodedata,collections,shutil,argparse
from pathlib import Path
P=argparse.ArgumentParser();P.add_argument('--options-dir',default='data/expansion-options');args=P.parse_args()
ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'data';O=ROOT/args.options_dir
base=json.loads((D/'phb2024-data.json').read_text());spells=json.loads((D/'phb2024-spells.json').read_text());canon_options=json.loads((D/'phb2024-options.json').read_text());source_manifest=json.loads((D/'expansion-sources.json').read_text())
def norm(s):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',str(s)).encode('ascii','ignore').decode().lower())
def slug(s):return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',str(s)).encode('ascii','ignore').decode().lower()).strip('-')
ALIASES={
 'Mente Aberrante':'Feitiçaria Aberrante','Alma Cronométrica':'Feitiçaria Mecânica','Alma Mecânica':'Feitiçaria Mecânica','Alma Laminada':'Adaga Espiritual','Lâmina Espiritual':'Adaga Espiritual','Guerreiro Psiônico':'Combatente Psíquico','Caminho da Misericórdia':'Combatente da Misericórdia','Caminho do Eu Astral':'Caminho do Eu Astral','Domínio da Ordem':'Domínio da Ordem',
 'Círculo de Esporos':'Círculo dos Esporos','Círculo de Estrelas':'Círculo das Estrelas','Círculo de Fogo Selvagem':'Círculo do Fogo Selvagem','Colégio da Eloquência':'Colégio da Eloquência','Colégio de Espadas':'Colégio das Espadas',
 'Aasimar Caído':'Aasimar','Aasimar Flagelo':'Aasimar','Aasimar Protetor':'Aasimar','Anão da Colina':'Anão','Anão da Montanha':'Anão','Humano Variante':'Humano','Golias':'Golias','Halfling':'Pequenino','Tiefling':'Tiferino',
 'Beberagem Cáustica de Tasha':'Jorro Cáustico de Tasha','Bolha Ácida':'Borrifada Ácida','Bolha Acida':'Borrifada Ácida','Rajada Venenosa':'Rajada de Veneno','Rajada de Veneno':'Rajada de Veneno','Prestidigitação':'Prestidigitação Arcana','Mãos Mágicas':'Mãos Mágicas','Fragmento da Mente':'Lasca Mental','Lasca Mental':'Fragmento Mental','Invocar Aberração':'Convocar Aberração','Invocar Celestial':'Convocar Celestial','Invocar Construto':'Convocar Constructo','Invocar Constructo':'Convocar Constructo','Invocar Elemental':'Convocar Elemental','Invocar Fada':'Convocar Feérico','Invocar Feérico':'Convocar Feérico','Invocar Fera':'Convocar Fera','Invocar Morto-Vivo':'Convocar Morto-vivo','Invocar Ínfero':'Convocar Ínfero','Invocar Prole Sombria':'Convocar Prole Sombria','Passo de Fada':'Passo Feérico','Picada Congelante':'Picada Congelante','Proteção Contra a Morte':'Proteção contra a Morte',
 'Esmagador':'Esmagador','Perfurador':'Perfurador','Retalhador':'Retalhador','Tocado pelas Fadas':'Tocado pelas Fadas','Tocado por Fadas':'Tocado pelas Fadas','Tocado pelas Sombras':'Tocado pelas Sombras','Telecinético':'Telecinético','Telepático':'Telepata','Guerreiro Marcial':'Iniciado em Luta',
 'Explosão Agonizante':'Explosão Agonizante','Rajada Agonizante':'Explosão Agonizante','Raio Agonizante':'Explosão Agonizante','Visão Mística':'Visão Mística','Visão Eldritch':'Visão Mística','Mente Eldritch':'Mente Mística','Presente dos Protetores':'Presente dos Protetores',
}
# Translation-independent aliases explicitly tied to the source spell identity.
ALIASES.update({'Alma Favorecida':'Alma Divina','Colégio dos Espíritos':'Escola dos Espíritos','Patrono Morto-Vivo':'Patrono do Morto-Vivo','Invocar Sombra':'Convocar Prole Sombria','Chicote Relampejante':'Chicote Elétrico'})
# 'Convocar' and 'Invocar' are distinct spell families in the supplied 2024 book.
for key in list(ALIASES):
 if key.startswith('Invocar'):ALIASES.pop(key)
ALIASES.update({'Invocar Construto':'Invocar Constructo','Invocar Corruptor':'Invocar Ínfero','Invocar Espírito Dracônico':'Invocar Dragão','Farpa Mental':'Talho Mental','Lasca Mental':'Talho Mental','Fragmento da Mente':'Talho Mental','Lacerador':'Talhador','Retalhador':'Talhador','Tocado pelas Fadas':'Tocado Por Fadas','Tocado por Fadas':'Tocado Por Fadas','Dádiva dos Protetores':'Presente dos Protetores','Implemento do Mestre da Corrente':'Investimento do Mestre da Corrente','Especializado em Perícia':'Especialista em Perícia','Engodo':'Isca e Troca','Presença dominante':'Presença Imponente'})
ALIASES.update({'Engodo':'Gato Por Lebre','Isca e Troca':'Gato Por Lebre','Presença dominante':'Presença de Autoridade','Presença Imponente':'Presença de Autoridade','Magia Perseguidora':'Magia Buscadora'})
A={norm(k):v for k,v in ALIASES.items()}
def identity(name):
 seen=set();key=norm(name)
 while key in A and key not in seen:seen.add(key);name=A[key];key=norm(name)
 return key
canon_names={}
for key,sp in base['species'].items():
 canon_names[('species','',identity(sp['name']))]={'id':key,'name':sp['name']}
 for variant in sp['variants']:canon_names[('species','',identity(variant))]={'id':key,'name':sp['name']+' — '+variant}
for class_id,cl in base['classes'].items():
 for name in cl['subclasses']:canon_names[('subclass',class_id,identity(name))]={'id':class_id+':'+name,'name':name}
for sp in spells:canon_names[('spell','',identity(sp['name']))]={'id':sp['id'],'name':sp['name']}
for e in canon_options:canon_names[(e['kind'],'',identity(e['name']))]={'id':e['id'],'name':e['name']}
# Explicit current names in the supplied Portuguese 2024 book.
for old,new in [('Alma Laminada','Adaga Espiritual'),('Caminho da Misericórdia','Combatente da Misericórdia'),('Círculo de Estrelas','Círculo das Estrelas'),('Mente Aberrante','Feitiçaria Aberrante'),('Alma Cronométrica','Feitiçaria Mecânica')]:A[norm(old)]=new
rank={'phb2024':100,'tasha':60,'fizban':60,'wildemount':60,'ravenloft':60,'races-small':40,'races-large':35,'ua-revised':25,'ua-monk':15,'ua-paladin':15,'ua-fighter':15}
raw=[];extras=[];source_issues=[]
for file in sorted(O.glob('*.json')):
 doc=json.loads(file.read_text());raw+=doc.get('entries',[])
 for group in ['otherPlayerOptions','sourceAppendices']:
  value=doc.get(group,[])
  if isinstance(value,list):extras.extend(value)
 if 'coverage' in doc:source_issues.append({'file':file.name,'coverage':doc['coverage']})
raw += [dict(e,selectable=False) for e in extras if isinstance(e,dict) and 'name' in e and 'kind' in e and 'source' in e]
def adapt_common(t):
 t=re.sub(r'\b[Pp]ontos? de [Kk][Ii]\b','pontos de Foco',t)
 t=re.sub(r'\b[Rr]aças?\b',lambda m:'Espécie'+('s' if m.group().lower().endswith('s') else '') if m.group()[0].isupper() else 'espécie'+('s' if m.group().endswith('s') else ''),t)
 t=re.sub(r'\b[Rr]aciais\b','da espécie',t)
 return t

def adapt_species(t):
 # Remove only the explicitly named origin-ability block, never class ASIs or trait mechanics.
 pattern=r'(?:Aumento|Incremento|Aprimoramento)\s+(?:(?:no|do|de)\s+)?[Vv]alor(?:es)?\s+de\s+(?:[Aa]tributo|[Hh]abilidade)(?:s)?[^\n]*\n[\s\S]*?(?=\n\s*(?:Idade|Tendência|Tamanho|Deslocamento|Idiomas|Tipo de Criatura|Visão no Escuro|Visão no escuro|[A-ZÁÉÍÓÚÂÊÔÃÕÇ][^\n]{1,55}\.\s*\n))'
 t=re.sub(pattern,'Atributos na criação. Use apenas os aumentos do antecedente 2024.\n',t,flags=re.I)
 # Inline ASI blocks in some compilations use a period instead of a heading line.
 t=re.sub(r'(?:Aumento|Incremento)\s+(?:no |de |do )?[Vv]alor(?:es)?\s+de\s+(?:[Aa]tributo|[Hh]abilidade)(?:s)?\.[^\n]*(?:\n(?!\s*[A-ZÁÉÍÓÚÂÊÔÃÕÇ][^\n]{0,40}\.).*){0,4}', 'Atributos na criação. Use apenas os aumentos do antecedente 2024.',t)
 return adapt_common(t)

def candidate_key(e):return (e['kind'],e.get('classId','') if e['kind'] in ['subclass','optionalClassFeature','fightingStyle','spellListExtension'] else '',identity(e['name']))
# This Portuguese source uses mixed translations for Summon and Conjure spells.
# Resolve these three reprints by spell effect and level, never by title alone.
SPELL_REPRINTS={('tasha','Invocar Celestial'):'Convocar Celestial',('tasha','Invocar Elemental'):'Convocar Elemental',('tasha','Invocar Feérico'):'Convocar Feérico'}
records=[];conflicts=[];chosen={}
for n,e in enumerate(raw):
 e=dict(e);e['id']='supp-'+slug(e.get('source','source'))+'-'+slug(e['kind'])+'-'+(slug(e['classId'])+'-' if e.get('classId') else '')+slug(e['name']);e['playtest']=bool(e.get('playtest') or e.get('source','').startswith('ua-'));e['sources']=e.get('sources') or [{'source':e['source'],'page':e.get('page',1)}]
 key=candidate_key(e);semantic_name=SPELL_REPRINTS.get((e['source'],e['name'])) if e['kind']=='spell' else None;replacement=next((v for k,v in canon_names.items() if k[0]==e['kind'] and k[1]==(e.get('classId','') if e['kind']=='subclass' else '') and norm(v['name'])==norm(semantic_name or e['name'])),None)
 if e.get('overrides2024') and not replacement:
  target=identity(str(e['overrides2024']).split(' — ')[0]);replacement=next((v for k,v in canon_names.items() if k[0]==e['kind'] and (not e.get('classId') or k[1] in ['',e['classId']]) and (k[2]==target or identity(v['name'])==target)),None)
 if not replacement:replacement=canon_names.get(key)
 # All legacy base Dragonborn types use the revised 2024 Dragonborn; gem heritage stays distinct.
 if e['kind']=='species' and 'draconato' in identity(e['name']) and any(x in identity(e['name']) for x in ['cromatico','metalico']):replacement={'id':'draconato','name':'Draconato 2024'}
 if replacement:
  e['selectable']=False;e['status']='superseded2024';e['supersededBy']=replacement;conflicts.append({'name':e['name'],'kind':e['kind'],'source':e['source'],'page':e.get('page',1),'winner':replacement,'reason':'A opção já possui versão 2024; somente a versão 2024 é aplicada.'})
 else:e['selectable']=e.get('selectable',True);e['status']='playtest-adapted' if e['playtest'] else 'adapted2024'
 notes=list(e.get('adaptations') or []);notes += ([f'Correspondência verificada pelo efeito e círculo da magia: use {semantic_name} de 2024. O título da tradução antiga difere.'] if semantic_name else []);notes += ['Regras, atributos, proficiência, condições e conjuração usam a base de 2024.']
 if e['kind']=='species':notes+=['Aumentos raciais de atributos são ignorados. Aplique somente os aumentos do antecedente 2024.','Idiomas e tendência são definidos pela criação 2024; textos culturais de origem são descritivos.']
 if e['kind']=='subclass':notes+=['A subclasse é recebida no nível 3. Características antigas de nível 1 ou 2 são recebidas no nível 3.','Não acumule uma característica antiga com a substituta da classe 2024. As listas de magias usam os textos de 2024 quando disponíveis.']
 if e['kind']=='feat' and e['source']!='phb2024':notes+=['Talento legado: preserve os pré-requisitos e benefícios da fonte. Nenhum aumento de atributo extra é inventado; confira o nível e a concessão pelo Mestre.']
 if e['playtest']:notes+=['Material experimental de Unearthed Arcana, apresentado como adaptação; não é uma revisão oficial de 2024.']
 if e.get('sourceIssue'):notes+=['Nota da fonte: '+str(e['sourceIssue'])]
 e['adaptations']=list(dict.fromkeys(notes));features=[]
 for f in e.get('features',[]):
  f=dict(f);level=int(f.get('level') or f.get('sourceLevel') or 1);f['sourceLevel']=f.get('sourceLevel',level)
  if e['kind']=='subclass':level=max(3,level)
  f['level']=level;f['text']=adapt_common(f.get('text',''))
  if e['kind']=='subclass':f['text']=re.sub(r'(Característica\s+de\s+)(?:1|2)[º°o]?\s*nível',r'\g<1>3º nível',f['text'],flags=re.I)
  # Revised Cleric Blessed Strikes controls the old duplicated level-8 boost.
  if e.get('classId')=='clerigo' and identity(f.get('name','')) in ['golpedivino','conjuracaopoderosa','potentspellcasting','divinestrike']:
   f['superseded2024']=True;f['text']='Use Golpes Abençoados da classe Clérigo 2024. Este benefício legado não é somado novamente.'
  features.append(f)
 e['features']=features
 original=e.get('originalText','')
 if e['kind']=='species':
  e['traits']=[(t if isinstance(t,str) else t.get('name','Traço')+': '+t.get('summary',t.get('text',''))) for t in e.get('traits',[])]
  e['traits']=[t for t in e['traits'] if not re.match(r'Idiomas\s*:',t,re.I)]
  body='\n\n'.join(e['traits']) if e['traits'] else adapt_species(original)
 elif features:body='\n\n'.join('Nível '+str(f['level'])+': '+f['name']+'\n'+f['text'] for f in features)
 else:body=adapt_common(original)
 e['adaptedText']=e.get('summary','')+'\n\n'+body
 e['manualEffect']=True
 if e.get('overrides2024') and not replacement and e.get('selectable') is False:
  e['status']='superseded2024';e['supersededBy']={'id':'phb2024-reference','name':str(e['overrides2024'])};conflicts.append({'name':e['name'],'kind':e['kind'],'source':e['source'],'page':e.get('page',1),'winner':e['supersededBy'],'reason':'A fonte identifica equivalência a uma característica de 2024; use a classe 2024 e não some a alternativa legada.'})
 if e['selectable']:
  previous=chosen.get(key)
  if previous is None:chosen[key]=e
  elif rank.get(e['source'],0)>rank.get(previous['source'],0):previous['selectable']=False;previous['status']='superseded-source';previous['supersededBy']={'id':e['id'],'name':e['name']};chosen[key]=e
  else:e['selectable']=False;e['status']='superseded-source';e['supersededBy']={'id':previous['id'],'name':previous['name']}
 records.append(e)
# Legacy rules never mutate or overwrite canonical 2024 spell descriptions.
canonical_spell_by_key={identity(s['name']):s for s in spells}
for e in records:
 if e['kind']!='spell' or not e['selectable']:continue
 meta=e.get('spell') or {};spell={'id':e['id'],'name':e['name'],'level':meta.get('level',1),'school':meta.get('school','Especial'),'classes':meta.get('classes',[]),'page':e.get('page',1),'time':meta.get('time') or 'Consulte a descrição','range':meta.get('range') or 'Consulte a descrição','components':meta.get('components') or 'Consulte a descrição','duration':meta.get('duration') or 'Consulte a descrição','concentration':bool(meta.get('concentration')),'ritual':bool(meta.get('ritual')),'text':adapt_common(e.get('originalText','')),'source':e['source'],'catalogId':e['id'],'adaptations':e['adaptations'],'manualEffect':True}
 spells.append(spell)
# Artificer's source list grants access to the current spell text, using known name aliases.
art=next((e for e in records if e['kind']=='class' and e.get('classId')=='artifice' and e['selectable']),None)
spell_access=[];unresolved=[]
if art:
 by_key={identity(s['name']):s for s in spells}
 for names in art.get('spellListByLevel',{}).values():
  for name in names:
   sp=by_key.get(identity(name))
   if sp:
    if 'Artífice' not in sp['classes']:sp['classes'].append('Artífice')
    spell_access.append(sp['id'])
   else:unresolved.append(name)
 art['spellAccess']=list(dict.fromkeys(spell_access));art['unresolvedSpellAliases']=unresolved
metadata=[]
for e in canon_options+records:
 fields=['id','kind','name','source','sourceTitle','page','pageEnd','status','selectable','summary','classId','speed','size','traits','variants','baseSpecies','overrides2024','supersededBy','playtest','manualEffect','features','adaptations','spell','hd','primary','saves','casting','caster','skills','skillCount','subclasses','preparedFormula','spellSlots','spellListByLevel','spellAccess','infusionsKnown','infusedItems','cantripsKnown','sourceIssue','movement','automation','automations','subtype','minimumArtificerLevel']
 metadata.append({k:e[k] for k in fields if k in e})
counts=collections.Counter(e['kind'] for e in records if e['selectable']);summary={**{k:v for k,v in source_manifest.items() if k!='sources'},'counts':dict(counts),'canonicalOptionCount':len(canon_options),'legacyOptionCount':len(records),'selectedOptionCount':sum(counts.values()),'superseded2024':sum(e['status']=='superseded2024' for e in records),'spellCount':len(spells),'priority':'PHB 2024 > opções legadas oficiais não reimpressas > compilações > UA revisada > UA anterior','sourceIssues':source_issues,'unresolvedArtificerSpells':unresolved}
(ROOT/'dist/supplement-catalog.json').write_text(json.dumps(canon_options+records,ensure_ascii=False,separators=(',',':')))
(ROOT/'dist/expansion-data.js').write_text('export const EXPANSION_SUMMARY='+json.dumps(summary,ensure_ascii=False,separators=(',',':'))+';\nexport const SOURCE_META='+json.dumps(source_manifest['sources'],ensure_ascii=False,separators=(',',':'))+';\nexport const SUPPLEMENT_OPTIONS='+json.dumps(metadata,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'dist/spells.json').write_text(json.dumps(spells,ensure_ascii=False,separators=(',',':')))
(ROOT/'dist/supplement-compatibility.json').write_text(json.dumps({'summary':summary,'conflicts':conflicts,'sources':source_manifest['sources'],'duplicates':source_manifest['duplicates']},ensure_ascii=False,indent=2))
report='# Adaptação dos suplementos para a base de 2024\n\n'+f"Foram indexados {summary['physicalPageCount']} páginas de {len(source_manifest['sources'])} documentos únicos. Uma cópia idêntica foi desconsiderada.\n\n"+'## Prioridade\n\n'+summary['priority']+'\n\nAs descrições canônicas de 2024 são preservadas. Aumentos raciais de atributos não são somados aos antecedentes. Subclasses legadas começam no nível 3; recursos antigos equivalentes não são acumulados. As adaptações editoriais e UA são identificadas.\n\n'+'## Catálogo selecionável\n\n'+'\n'.join('- '+k+': '+str(v) for k,v in counts.items())+'\n\n## Opções substituídas pelo livro de 2024\n\n'+'\n'.join('- '+c['name']+' ('+c['source']+', p. '+str(c['page'])+') → '+c['winner']['name'] for c in conflicts)+'\n\n## Limites de automação\n\nOs cálculos básicos e recursos implementados são automáticos. Efeitos de poderes, talentos e itens que dependem de contexto permanecem sob controle do jogador e do Mestre. O texto de origem é preservado separadamente. Bestiário, tabelas, encontros e demais capítulos podem ser pesquisados integralmente; os blocos legados não são apresentados como revisões oficiais de 2024. Os recortes de Wildemount e Ravenloft abrangem apenas as páginas anexadas.\n'
(ROOT/'ADAPTACOES_2024.md').write_text(report)
print(json.dumps(summary,ensure_ascii=False)[:2000])
