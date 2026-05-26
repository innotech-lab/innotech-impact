"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║                   CHAPITRE 1 : LE CERVEAU (settings.py)         ║
╚══════════════════════════════════════════════════════════════════╝

ARCHITECTURE GLOBALE DU PROJET
================================
Ce projet utilise une architecture appelée "Découplée" (ou "Headless") :

  ┌─────────────────────┐         HTTP/JSON         ┌─────────────────────┐
  │   FRONTEND (React)  │  ◄──────────────────────► │  BACKEND (Django)   │
  │   Port : 5173       │       Requêtes API         │   Port : 8000       │
  │   (Le visage)       │                            │   (Le cerveau)      │
  └─────────────────────┘                            └─────────────────────┘

  - React affiche les données et gère l'interface utilisateur (UI)
  - Django stocke les données en base et les expose via une API REST
  - Les deux communiquent via des échanges de données au format JSON

CHAPITRE 1 : SETTINGS.PY — La configuration centrale de Django
  Ce fichier est le "tableau de bord" de tout le projet Django.
  C'est ici qu'on indique à Django :
    - Quelles applications sont installées
    - Comment se connecter à la base de données
    - Comment gérer la sécurité (CORS)
    - Comment gérer les fichiers uploadés (images)
"""

from pathlib import Path

# -----------------------------------------------------------------
# BASE_DIR : Le chemin racine du projet
# -----------------------------------------------------------------
# Path(__file__) = le chemin vers CE fichier (settings.py)
# .resolve() = transforme en chemin absolu complet
# .parent.parent = remonte 2 dossiers (core_project → innotech_backend)
# Résultat : BASE_DIR = d:/Inno/innotech_backend/
BASE_DIR = Path(__file__).resolve().parent.parent


# =================================================================
#   SECTION 1 : SÉCURITÉ DE BASE
# =================================================================

# Clé secrète utilisée par Django pour signer les cookies et tokens.
# ⚠️ NE JAMAIS la partager en production ! Utiliser des variables d'environnement.
SECRET_KEY = 'django-insecure-v))_-o2mq4#s_408z9-zhd^hj=9=*v_hf646^5==3uiz*ra=v0'

# DEBUG = True : affiche les erreurs en détail dans le navigateur.
# ⚠️ En production (mise en ligne), toujours mettre DEBUG = False !
DEBUG = True

# Liste des domaines autorisés à accéder à ce serveur.
# En développement, [] = tout est autorisé sur localhost.
# En production, mettre : ['monsite.com', 'www.monsite.com']
ALLOWED_HOSTS = []


# =================================================================
#   SECTION 2 : LES APPLICATIONS INSTALLÉES
# =================================================================
# Django est modulaire : chaque fonctionnalité est une "app".
# On active une app en l'ajoutant dans cette liste.

INSTALLED_APPS = [
    # --- Apps natives de Django ---
    'django.contrib.admin',        # Le panneau d'administration (/admin)
    'django.contrib.auth',         # Gestion des utilisateurs et mots de passe
    'django.contrib.contenttypes', # Gestion des types de contenus
    'django.contrib.sessions',     # Gestion des sessions (cookie de connexion)
    'django.contrib.messages',     # Système de notifications (flash messages)
    'django.contrib.staticfiles',  # Gestion des fichiers CSS/JS/Images du site

    # --- Apps tierces installées via pip ---
    'rest_framework',  # Django REST Framework : transforme Django en fabrique d'API JSON
    'corsheaders',     # Gère les autorisations de domaines croisés (CORS)

    # --- Notre application personnalisée ---
    'api',             # Le dossier /api/ qui contient models.py, views.py, etc.
]


# =================================================================
#   SECTION 3 : MIDDLEWARE — Les "filtres" de sécurité
# =================================================================
# Chaque requête HTTP passe par ces middlewares dans l'ordre (de haut en bas).
# C'est comme des couches de contrôle de sécurité à l'aéroport.

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    # ⭐ CRUCIAL : CorsMiddleware DOIT être placé EN PREMIER (ou au moins avant CommonMiddleware)
    # Il intercepte les requêtes qui viennent d'autres domaines (ex: React sur :5173)
    # et vérifie si elles sont autorisées.
    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core_project.wsgi.application'


# =================================================================
#   SECTION 4 : LA BASE DE DONNÉES
# =================================================================
# Django supporte plusieurs bases de données : SQLite, PostgreSQL, MySQL...
# En développement, SQLite est parfait : c'est un simple fichier .db

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Le moteur SQLite
        'NAME': BASE_DIR / 'db.sqlite3',          # Chemin vers le fichier : innotech_backend/db.sqlite3
        # ℹ️ En production, on utiliserait PostgreSQL :
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'NAME': 'ma_base', 'USER': 'admin', 'PASSWORD': '...', 'HOST': 'localhost'
    }
}


# =================================================================
#   SECTION 5 : VALIDATION DES MOTS DE PASSE
# =================================================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# =================================================================
#   SECTION 6 : INTERNATIONALISATION
# =================================================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'


# =================================================================
#   SECTION 7 : CORS — La clé de la connexion React ↔ Django
# =================================================================
#
# PROBLÈME QUE CORS RÉSOUT :
# Par défaut, les navigateurs web refusent qu'un site (React sur :5173)
# fasse des requêtes vers un autre site (Django sur :8000).
# C'est une règle de sécurité appelée "Same-Origin Policy".
#
# SOLUTION : On configure Django pour qu'il dise au navigateur :
# "C'est ok, tu peux partager des données avec React."
# Cette réponse s'appelle un "CORS Header".
#
# Flux de communication :
#   Browser (React :5173)  → OPTIONS /api/services/  → Django (:8000)
#   Django (:8000)         → Access-Control-Allow-Origin: * → Browser
#   Browser                → GET /api/services/ → Django (:8000) ✅
#
# CORS_ALLOW_ALL_ORIGINS = True → Accepte les requêtes de N'IMPORTE QUEL domaine.
# ⚠️ En production, remplacer par :
# CORS_ALLOWED_ORIGINS = ['https://www.monsite.com']
CORS_ALLOW_ALL_ORIGINS = True


# =================================================================
#   SECTION 8 : FICHIERS MÉDIAS (Images uploadées)
# =================================================================
import os

# MEDIA_URL : L'adresse web pour accéder aux images
# Ex: http://127.0.0.1:8000/media/team/photo.jpg
MEDIA_URL = '/media/'

# MEDIA_ROOT : L'emplacement physique sur le disque dur où les images sont sauvegardées
# Ex: d:/Inno/innotech_backend/media/
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# =================================================================
#   SECTION 9 : DJANGO REST FRAMEWORK (DRF)
# =================================================================
# DRF est la bibliothèque qui transforme Django en serveur d'API REST.
# Ici on configure les permissions par défaut.
REST_FRAMEWORK = {
    # AllowAny = Tout le monde peut lire l'API (pas besoin d'être connecté).
    # Pour sécuriser certaines routes, on pourrait utiliser IsAuthenticated.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}


# =================================================================
#   SECTION 10 : CONFIGURATION EMAIL
# =================================================================
# En développement, les emails ne sont PAS vraiment envoyés.
# Ils s'affichent simplement dans la console (le terminal noir de Django).
# Pour la production, utiliser un vrai serveur SMTP (ex: Gmail, SendGrid).
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'noreply@innotech.bi'
