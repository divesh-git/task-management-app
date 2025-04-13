#!/bin/bash

# === CONFIG ===
CONTAINER_NAME="mongo" 
DB_NAME="nest-task-management"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="./mongo_backups/$DB_NAME-backup-$TIMESTAMP"

# === START BACKUP ===
echo "Backing up MongoDB from Docker container: $CONTAINER_NAME"
mkdir -p "$BACKUP_DIR"

docker exec "$CONTAINER_NAME" mongodump --db="$DB_NAME" --out="/data/backup"
docker cp "$CONTAINER_NAME":/data/backup "$BACKUP_DIR"
docker exec "$CONTAINER_NAME" rm -rf /data/backup

echo "✅ Backup complete! Stored at $BACKUP_DIR"

