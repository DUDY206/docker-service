#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status

if [ -z "$1" ]; then
  echo "Usage: $0 <folder_path>"
  exit 1
fi

DOMAIN="$1"
FOLDER_NAME="./certs/$DOMAIN"

if [ ! -d "$FOLDER_NAME" ]; then
  mkdir -p "$FOLDER_NAME"
fi

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $FOLDER_NAME/dev.key -out $FOLDER_NAME/dev.crt -subj "/C=US/ST=Dev/L=Local/O=LocalDev/CN=$DOMAIN"