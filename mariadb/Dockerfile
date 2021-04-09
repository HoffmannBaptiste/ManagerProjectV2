#############
### build ###
#############

# base image
FROM mariadb:10.1

ADD ./database_file /docker-entrypoint-initdb.d

# ENTRYPOINT ["docker-entrypoint.sh"]

# Expose ports.
# EXPOSE 3306

# CMD ["mysqld"]