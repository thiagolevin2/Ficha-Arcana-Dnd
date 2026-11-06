"""Recria dist/ como uma cópia fiel da versão de publicação docs/.
Execute somente se precisar produzir uma distribuição local, pois aumenta o número de arquivos.
"""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parent.parent
source=root/'docs'
output=root/'dist'
if output.exists():
    shutil.rmtree(output)
shutil.copytree(source,output)
print('dist/ reconstruída a partir de docs/')
