@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Ficha Arcana 0.10 Beta - mantenha esta janela aberta enquanto usa o site.
echo Abra http://localhost:8000 no navegador.
where py >nul 2>nul
if %errorlevel% equ 0 (
  start "" "http://localhost:8000"
  py -3 -m http.server 8000 --bind 127.0.0.1 --directory "%~dp0docs"
  pause
  exit /b
)
where python >nul 2>nul
if %errorlevel% equ 0 (
  start "" "http://localhost:8000"
  python -m http.server 8000 --bind 127.0.0.1 --directory "%~dp0docs"
  pause
  exit /b
)
echo Instale Python 3 e execute este arquivo novamente.
echo Voce tambem pode publicar a pasta docs em uma hospedagem estatica.
pause
