-- 🗄️ PostgreSQL initialization script for development
-- This script sets up the initial database configuration

-- Ensure the database exists (it should be created by POSTGRES_DB env var)
SELECT 'CREATE DATABASE house_inventory_dev'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'house_inventory_dev');

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add more initialization SQL here as needed
-- For example: creating initial admin users, setting up schemas, etc.