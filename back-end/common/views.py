"""
Common views for the house inventory application.
"""

from django.http import JsonResponse
from django.views import View
from django.db import connection
from django.core.cache import cache
import datetime


class HealthCheckView(View):
    """
    Health check endpoint for monitoring and load balancers.
    
    Checks:
    - Database connectivity
    - Cache connectivity (if configured)
    - Basic application status
    """
    
    def get(self, request):
        """Return health status of the application."""
        health_data = {
            "status": "healthy",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "version": "1.0.0",
            "checks": {}
        }
        
        # Check database connection
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            health_data["checks"]["database"] = "healthy"
        except Exception as e:
            health_data["checks"]["database"] = f"unhealthy: {str(e)}"
            health_data["status"] = "unhealthy"
        
        # Check cache connection
        try:
            cache.set("health_check", "test", 1)
            cache.get("health_check")
            health_data["checks"]["cache"] = "healthy"
        except Exception as e:
            health_data["checks"]["cache"] = f"unhealthy: {str(e)}"
            # Don't mark as unhealthy for cache issues in development
        
        status_code = 200 if health_data["status"] == "healthy" else 503
        return JsonResponse(health_data, status=status_code)