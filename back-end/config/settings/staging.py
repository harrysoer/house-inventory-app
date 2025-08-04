"""
Staging settings for house-inventory-app project.

This file contains settings for staging environment.
Similar to production but with some debugging enabled.
"""

import os
from .base import *

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY", "staging-secret-key-change-me")

DEBUG = True  # Enable debug in staging for easier testing

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "staging.houseinventory.com").split(",")

# Database - PostgreSQL for staging
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "house_inventory_staging"),
        "USER": os.getenv("DB_USER", "postgres"),
        "PASSWORD": os.getenv("DB_PASSWORD", "postgres"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# CORS settings for staging
CORS_ALLOWED_ORIGINS = [
    "https://staging-frontend.houseinventory.com",
    "http://localhost:3000",  # For local frontend testing
    "http://localhost:5173",  # For Vite dev server
]

# Security middleware
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
] + MIDDLEWARE

# Add staging-specific apps
INSTALLED_APPS += [
    "django_extensions",
]

# Email backend for staging (console or SMTP)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Cache settings (Redis or dummy)
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": os.getenv("REDIS_URL", "redis://localhost:6379/2"),
    }
}

# Less strict security for staging
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Staging logging (more verbose than production)
LOGGING["handlers"]["console"]["level"] = "INFO"
LOGGING["loggers"]["django"]["level"] = "INFO"
LOGGING["root"]["level"] = "INFO"