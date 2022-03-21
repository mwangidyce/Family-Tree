#!/bin/bash

# apt-get update
# apt install postgresql postgresql-contrib
# service postgresql start
sudo -u postgres createuser --createdb "${DB_USER}"
sudo -u postgres psql -c "ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}'"
sudo -u postgres createdb "${DB_NAME}"

sudo -u postgres PGPASSWORD="${DB_PASSWORD}" psql -U "${DB_USER}" -d "${DB_NAME}" -h localhost -c "\conninfo"
