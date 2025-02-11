#!/bin/bash
set -e

mongosh <<EOF
use ${MONGO_DB_NAME}
db.createUser({
  user: "${MONGO_USER}",
  pwd: "${MONGO_PASS}", // Or  "<cleartext password>"
  roles: [
    {
      role: "clusterAdmin", db: "admin"
    },
    {
      role: "readAnyDatabase", db: "admin"
    },
    "readWrite"
  ]
},
  {
    w: "majority", wtimeout: 5000
  })
EOF