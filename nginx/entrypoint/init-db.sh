#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status

# COMPANY DB
echo "Creating company databases..."
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_USER}" <<-EOSQL
  CREATE DATABASE "${POSTGRES_COMPANY_DB}";
  CREATE DATABASE "${POSTGRES_COMPANY_DB_TEST}";
EOSQL

# PAYMENT DB
echo "Creating payment databases..."
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_USER}" <<-EOSQL
  CREATE DATABASE "${POSTGRES_PAYMENT_DB}";
  CREATE DATABASE "${POSTGRES_PAYMENT_DB_TEST}";
EOSQL

# USER DB
echo "Creating user databases..."
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_USER}" <<-EOSQL
  CREATE DATABASE "${POSTGRES_USER_DB}";
EOSQL

# COUNTER DB
echo "Creating user databases..."
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_USER}" <<-EOSQL
  CREATE DATABASE "${POSTGRES_COUNTER_DB}";
  CREATE DATABASE "${POSTGRES_COUNTER_TEST}";
EOSQL
