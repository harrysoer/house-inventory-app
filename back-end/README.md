# House Inventory App - Backend

Django REST API backend for the House Inventory application.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 13+
- Redis (for production/staging)

### Development Setup

1. **Create and activate virtual environment:**
   ```bash
   cd back-end
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements/development.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up PostgreSQL database:**
   ```bash
   createdb house_inventory_dev
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate --settings=config.settings.development
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser --settings=config.settings.development
   ```

7. **Run development server:**
   ```bash
   python manage.py runserver --settings=config.settings.development
   ```

## 📁 Project Structure

```
back-end/
├── config/                 # Django configuration
│   ├── settings/
│   │   ├── base.py        # Base settings
│   │   ├── development.py # Development settings
│   │   ├── staging.py     # Staging settings
│   │   └── production.py  # Production settings
│   ├── urls.py
│   └── wsgi.py
├── common/                 # Shared utilities
├── accounts/               # User management
├── items/                  # Inventory management
├── api/                    # API endpoints
│   └── v1/                # API version 1
├── tests/                  # Test files
├── requirements/           # Requirements files
├── static/                 # Static files
├── media/                  # Media files
└── manage.py
```

## 🔧 Settings

### Environment-specific settings:
- **Development:** `config.settings.development`
- **Staging:** `config.settings.staging` 
- **Production:** `config.settings.production`

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
DJANGO_SETTINGS_MODULE=config.settings.development

# Database Settings
DB_NAME=house_inventory_dev
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

## 🐳 Docker Support

Coming soon - Docker configuration for development and production environments.

## 🧪 Testing

Run tests with:
```bash
pytest
```

With coverage:
```bash
coverage run -m pytest
coverage report
```

## 📚 API Documentation

Once the server is running, visit:
- **Development:** http://localhost:8000/api/v1/
- **Django Admin:** http://localhost:8000/admin/

## 🚀 Deployment

### Staging
```bash
export DJANGO_SETTINGS_MODULE=config.settings.staging
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn config.wsgi:application
```

### Production
```bash
export DJANGO_SETTINGS_MODULE=config.settings.production
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn config.wsgi:application
```

## 🔍 Available Commands

```bash
# Database operations
python manage.py migrate
python manage.py makemigrations
python manage.py createsuperuser

# Static files
python manage.py collectstatic

# Development
python manage.py runserver
python manage.py shell
python manage.py dbshell

# Testing
pytest
coverage run -m pytest
```

## 📝 Development Guidelines

- Follow Django best practices
- Use PEP 8 coding standards
- Write tests for all new features
- Use type hints where appropriate
- Keep business logic in models/managers
- Use DRF serializers for API validation

## 🔗 Frontend Integration

The backend is configured to work with the React frontend:
- CORS enabled for `localhost:3000` and `localhost:5173`
- JWT authentication ready
- Consistent API response format
- RESTful endpoints for inventory management