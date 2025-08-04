# 🚀 Quick Start Guide

## 🔥 Get Up & Running in 30 Seconds

```bash
# Clone and enter directory
git clone <your-repo-url>
cd house-inventory-app

# Start everything
docker compose up -d

# Check it's working
curl http://localhost:8000/health/
```

**That's it!** Your app is running at:
- 🌐 Frontend: http://localhost:5173  
- 🐍 Backend: http://localhost:8000
- 📊 Admin: http://localhost:8000/admin/

## 🔧 Common Commands

```bash
# Stop everything
docker compose down

# View logs
docker compose logs -f

# Rebuild after code changes
docker compose build --no-cache
docker compose up -d

# Run Django commands
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser

# Access database
docker compose exec db psql -U postgres -d house_inventory_dev
```

## 🚀 Production Deployment

```bash
# For EC2 deployment
cp env.production.example .env
# Edit .env with your settings
docker compose -f docker-compose.prod.yml up -d
```

## 🔍 Troubleshooting

- **Containers won't start**: `docker compose logs <service-name>`
- **Permission issues**: `sudo chown -R $USER:$USER .`
- **Port conflicts**: Change ports in docker-compose.yml

For detailed docs, see [DOCKER.md](./DOCKER.md)