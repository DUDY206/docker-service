# Generate SSL

export DOMAIN=nexus.overherd.xyz
mkdir -p "./certs/${DOMAIN}"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "./certs/${DOMAIN}/dev.key" \
 -out "./certs/${DOMAIN}/dev.crt" \
  -subj "/C=US/ST=Dev/L=Local/O=LocalDev/CN=${DOMAIN}"
