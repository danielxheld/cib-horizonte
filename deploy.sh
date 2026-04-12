#!/bin/bash
# Forge Deployment Script
cd /home/forge/cib-horizonte.de

git pull origin main

# Dependencies installieren
composer install --no-dev --optimize-autoloader
npm ci

# Seite bauen
npm run build

echo "Deploy erfolgreich!"
