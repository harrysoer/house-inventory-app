# 🐳 Docker Setup Guide for House Inventory App

## 📋 Overview

This project is fully containerized with Docker and can be deployed in both development and production environments.

## 🚀 Quick Start

### Development Environment

```bash
# Clone the repository
git clone <your-repo-url>
cd house-inventory-app

# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Your app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin/

### Production Environment

```bash
# Create production environment file
cp env.production.example .env
# Edit .env with your production values

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Create superuser
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React +      │───▶│   (Django +     │───▶│  (PostgreSQL)   │
│   Nginx)        │    │   Gunicorn)     │    │                 │
│   Port: 80/443  │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │     Redis       │
                    │   (Caching)     │
                    │   Port: 6379    │
                    └─────────────────┘
```

## 🛠️ Services

### Frontend (React + Vite)
- **Dev**: Vite dev server with hot reload
- **Prod**: Nginx serving static files + API proxy
- **Port**: 5173 (dev), 80/443 (prod)

### Backend (Django)
- **Dev**: Django dev server with auto-reload
- **Prod**: Gunicorn WSGI server
- **Port**: 8000
- **Health Check**: `/health/`

### Database (PostgreSQL)
- **Version**: PostgreSQL 15 Alpine
- **Port**: 5432
- **Persistent**: Data stored in Docker volumes

### Cache (Redis)
- **Version**: Redis 7 Alpine
- **Port**: 6379
- **Usage**: Session storage, caching

## 🔧 Commands Cheat Sheet

### Development
```bash
# Start all services
docker-compose up -d

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Restart a service
docker-compose restart backend

# Run Django commands
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py shell

# Run tests
docker-compose exec backend python manage.py test

# Access database
docker-compose exec db psql -U postgres -d house_inventory_dev

# Install new npm packages
docker-compose exec frontend npm install <package-name>

# Install new Python packages
docker-compose exec backend pip install <package-name>
# Don't forget to update requirements files!
```

### Production
```bash
# Deploy with zero-downtime
docker-compose -f docker-compose.prod.yml up -d --no-deps --build backend

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Backup database
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres house_inventory_prod > backup.sql

# Scale services (if needed)
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

## 🌍 Environment Variables

### Development (.env)
Most values have defaults, minimal setup required:
```bash
# Optional overrides
DB_PASSWORD=custom_password
VITE_API_URL=http://localhost:8000
```

### Production (.env)
**Required variables** (see `env.production.example`):
```bash
SECRET_KEY=your-50+-character-secret-key
ALLOWED_HOSTS=yourdomain.com,your-ip
CORS_ALLOWED_ORIGINS=https://yourdomain.com
DB_PASSWORD=secure-database-password
```

## 🚀 EC2 Deployment

### Option 1: Automated Setup
```bash
# On your EC2 instance
curl -O https://raw.githubusercontent.com/yourusername/house-inventory-app/main/deploy/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### Option 2: Manual Setup
```bash
# Install Docker & Docker Compose
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo usermod -a -G docker ec2-user

# Clone and deploy
git clone <your-repo>
cd house-inventory-app
cp env.production.example .env
# Edit .env with your values
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: CloudFormation
```bash
aws cloudformation create-stack \
  --stack-name house-inventory-app \
  --template-body file://deploy/aws-cloudformation.yml \
  --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair
```

## 🔍 Troubleshooting

### Common Issues

**Container won't start:**
```bash
# Check logs
docker-compose logs <service-name>

# Check resource usage
docker stats

# Rebuild image
docker-compose build --no-cache <service-name>
```

**Database connection issues:**
```bash
# Check if database is ready
docker-compose exec db pg_isready -U postgres

# Reset database
docker-compose down -v  # ⚠️ This deletes data!
docker-compose up -d
```

**Frontend can't reach backend:**
- Check CORS settings in Django
- Verify API_URL environment variable
- Check Docker network connectivity

**Permission issues:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Health Checks

```bash
# Check service health
curl http://localhost:8000/health/  # Backend
curl http://localhost:5173/health   # Frontend (prod)

# Check all containers
docker-compose ps
```

## 📊 Monitoring

### Basic Monitoring
```bash
# Resource usage
docker stats

# Container health
docker-compose ps

# Service logs
docker-compose logs -f --tail=100
```

### Advanced Monitoring (Optional)
Enable monitoring profile:
```bash
docker-compose -f docker-compose.prod.yml --profile monitoring up -d
```

This adds:
- Nginx Prometheus exporter (port 9113)
- Ready for Grafana/Prometheus integration

## 🔒 Security Notes

### Development
- Default passwords are used (NOT for production!)
- CORS allows all origins
- Debug mode enabled

### Production
- Secure random passwords required
- Strict CORS policy
- HTTPS enforcement
- Security headers enabled
- Non-root users in containers

## 🎯 Performance Tips

### Development
- Use volume mounts for hot reload
- Allocate sufficient Docker resources

### Production
- Use multi-stage builds (already implemented)
- Enable gzip compression (nginx)
- Use Redis for session storage
- Consider using CDN for static files

## 📚 Additional Resources

- [Django Docker Best Practices](https://docs.docker.com/samples/django/)
- [React Docker Production Guide](https://create-react-app.dev/docs/deployment/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Nginx Docker Configuration](https://nginx.org/en/docs/)