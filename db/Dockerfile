FROM mysql:5.7

ENV MYSQL_DATABASE tweeter
ENV MYSQL_ROOT_PASSWORD node
ENV MYSQL_USER node
ENV MYSQL_PASSWORD node
ENV DATABASE_HOST db

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts /docker-entrypoint-initdb.d/
