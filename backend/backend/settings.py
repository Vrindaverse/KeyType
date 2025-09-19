import os
from pathlib import Path
import dj_database_url

# ------------------------------
# BASE DIRECTORY
# ------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------
# SECRET KEY
# ------------------------------
SECRET_KEY = 'your-secret-key'  # ⚠️ change this in production

# ------------------------------
# DEBUG + HOSTS
# ------------------------------
DEBUG = True
ALLOWED_HOSTS = ['*']  # Only for dev. Use proper hosts in production.

# ------------------------------
# INSTALLED APPS
# ------------------------------
INSTALLED_APPS = [
    # Django default
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # local apps
    'api',
]

# ------------------------------
# MIDDLEWARE
# ------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ------------------------------
# ROOT URLS + WSGI
# ------------------------------
ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'

# ------------------------------
# TEMPLATES
# ------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ------------------------------
# DATABASE (Neon DB example)
# ------------------------------
DATABASES = {
    'default': dj_database_url.parse(
        "postgresql://neondb_owner:npg_JxCoegIzm2G3@ep-muddy-lab-adzu1eus-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    )
}

# ------------------------------
# PASSWORD VALIDATORS
# ------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------------------
# INTERNATIONALIZATION
# ------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ------------------------------
# STATIC FILES
# ------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# ------------------------------
# DEFAULT AUTO FIELD
# ------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ------------------------------
# CORS
# ------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

# ------------------------------
# REST FRAMEWORK
# ------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# ------------------------------
# SIMPLE JWT
# ------------------------------
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
