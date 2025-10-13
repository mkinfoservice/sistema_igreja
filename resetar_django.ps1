# Navega até a raiz do projeto
cd "C:\Users\User\Desktop\igreja"

# Remove o banco de dados SQLite
if (Test-Path ".\db.sqlite3") {
    Remove-Item ".\db.sqlite3"
    Write-Host "Banco de dados removido."
} else {
    Write-Host "Banco de dados não encontrado. Prosseguindo..."
}

# Remove arquivos de migração em cada app, exceto __init__.py
$apps = @("usuarios")
foreach ($app in $apps) {
    $migrationsPath = ".\$app\migrations"
    if (Test-Path $migrationsPath) {
        Get-ChildItem $migrationsPath -Exclude "__init__.py" | Remove-Item -Force
        Write-Host "Migrações antigas removidas em $app."
    }
}

# Ativa o ambiente virtual (ajuste o caminho se necessário)
.\venv\Scripts\Activate.ps1

# Recria as migrações e aplica
python manage.py makemigrations
python manage.py migrate

# Mensagem final
Write-Host "Migrações recriadas e banco de dados reiniciado com sucesso."
