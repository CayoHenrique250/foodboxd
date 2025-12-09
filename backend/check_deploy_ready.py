#!/usr/bin/env python
"""
Script de verificação pré-deploy
Verifica se todos os arquivos e configurações necessários estão presentes
"""

import os
import sys
from pathlib import Path

def check_file_exists(filepath, description):
    """Verifica se um arquivo existe"""
    if os.path.exists(filepath):
        print(f"✅ {description}: {filepath}")
        return True
    else:
        print(f"❌ {description} NÃO ENCONTRADO: {filepath}")
        return False

def check_file_content(filepath, search_text, description):
    """Verifica se um arquivo contém determinado texto"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if search_text in content:
                print(f"✅ {description}")
                return True
            else:
                print(f"❌ {description} - NÃO ENCONTRADO")
                return False
    except Exception as e:
        print(f"❌ Erro ao verificar {filepath}: {e}")
        return False

def main():
    print("🔍 VERIFICAÇÃO PRÉ-DEPLOY - RAILWAY\n")
    print("=" * 60)
    
    base_dir = Path(__file__).resolve().parent
    all_checks_passed = True
    
    print("\n📄 Verificando arquivos necessários...")
    print("-" * 60)
    
    # Verificar arquivos essenciais
    checks = [
        (base_dir / "requirements.txt", "Requirements.txt"),
        (base_dir / "Procfile", "Procfile"),
        (base_dir / "railway.json", "Railway.json"),
        (base_dir / "manage.py", "Manage.py"),
        (base_dir / "foodboxd_api" / "settings.py", "Settings.py"),
        (base_dir / "foodboxd_api" / "wsgi.py", "WSGI.py"),
        (base_dir / ".gitignore", ".gitignore"),
    ]
    
    for filepath, description in checks:
        if not check_file_exists(filepath, description):
            all_checks_passed = False
    
    print("\n⚙️  Verificando configurações no settings.py...")
    print("-" * 60)
    
    settings_file = base_dir / "foodboxd_api" / "settings.py"
    
    config_checks = [
        ("from decouple import config", "Import de python-decouple"),
        ("import dj_database_url", "Import de dj-database-url"),
        ("whitenoise", "WhiteNoise configurado"),
        ("SECRET_KEY = config", "SECRET_KEY usa variável de ambiente"),
        ("DEBUG = config", "DEBUG usa variável de ambiente"),
        ("ALLOWED_HOSTS = config", "ALLOWED_HOSTS usa variável de ambiente"),
        ("DATABASE_URL", "DATABASE_URL configurado"),
        ("CORS_", "CORS configurado"),
    ]
    
    for search_text, description in config_checks:
        if not check_file_content(settings_file, search_text, description):
            all_checks_passed = False
    
    print("\n📦 Verificando dependências no requirements.txt...")
    print("-" * 60)
    
    requirements_file = base_dir / "requirements.txt"
    
    dependency_checks = [
        ("Django", "Django"),
        ("gunicorn", "Gunicorn (servidor web)"),
        ("whitenoise", "WhiteNoise (arquivos estáticos)"),
        ("psycopg2", "psycopg2 (PostgreSQL)"),
        ("dj-database-url", "dj-database-url"),
        ("python-decouple", "python-decouple"),
        ("djangorestframework", "Django REST Framework"),
        ("django-cors-headers", "CORS Headers"),
    ]
    
    for search_text, description in dependency_checks:
        if not check_file_content(requirements_file, search_text, description):
            all_checks_passed = False
    
    print("\n" + "=" * 60)
    
    if all_checks_passed:
        print("\n✅ TODAS AS VERIFICAÇÕES PASSARAM!")
        print("\n🚀 Você está pronto para fazer deploy no Railway!")
        print("\nPróximos passos:")
        print("1. Fazer commit e push para o GitHub")
        print("2. Criar projeto no Railway")
        print("3. Adicionar PostgreSQL ao projeto")
        print("4. Configurar variáveis de ambiente")
        print("5. Deploy automático!")
        print("\nConsulte README_DEPLOY.md para instruções detalhadas.\n")
        return 0
    else:
        print("\n❌ ALGUMAS VERIFICAÇÕES FALHARAM!")
        print("\nPor favor, corrija os problemas acima antes de fazer deploy.\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())

