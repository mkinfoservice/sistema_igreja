@echo off
cd /d C:\Users\Cliente\Desktop\sistema_igreja

echo ============================
echo 🔄 Iniciando BACKEND
echo ============================

if not exist "venv\" (
    echo Criando ambiente virtual...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Instalando dependências do backend...
pip install --upgrade pip
pip install -r requirements.txt

echo Iniciando o servidor Django...
start cmd /k "cd /d C:\Users\Cliente\Desktop\sistema_igreja && call venv\Scripts\activate.bat && python manage.py runserver"

echo ============================
echo 🚀 Iniciando FRONTEND
echo ============================

cd frontend

if not exist "node_modules\" (
    echo Instalando dependências do frontend...
    npm install
)

echo Iniciando React...
start cmd /k "cd /d C:\Users\Cliente\Desktop\sistema_igreja\frontend && npm start"

exit
