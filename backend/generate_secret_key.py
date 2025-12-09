#!/usr/bin/env python
"""
Script para gerar uma SECRET_KEY segura para o Django
"""
from django.core.management.utils import get_random_secret_key

if __name__ == '__main__':
    print("=" * 60)
    print("Nova SECRET_KEY gerada:")
    print("=" * 60)
    print(get_random_secret_key())
    print("=" * 60)
    print("\nUse esta chave na variável de ambiente SECRET_KEY no Railway")

