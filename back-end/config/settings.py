"""
Django settings entry point for config project.

This file imports the appropriate settings based on the DJANGO_SETTINGS_MODULE
environment variable. By default, it loads development settings.
"""

import os

# Default to development settings if not specified
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")

# Import the appropriate settings module
settings_module = os.environ.get("DJANGO_SETTINGS_MODULE", "config.settings.development")

if settings_module == "config.settings.development":
    from .settings.development import *
elif settings_module == "config.settings.staging":
    from .settings.staging import *
elif settings_module == "config.settings.production":
    from .settings.production import *
else:
    # Fallback to development
    from .settings.development import *
