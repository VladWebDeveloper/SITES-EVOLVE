FROM postgres:18-alpine
RUN apk add --no-cache aws-cli jq bash coreutils ca-certificates
WORKDIR /backup
COPY backup.sh /usr/local/bin/sites-evolve-backup
RUN chmod 700 /usr/local/bin/sites-evolve-backup
ENTRYPOINT ["/bin/bash", "/usr/local/bin/sites-evolve-backup"]