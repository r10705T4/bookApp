#!/bin/bash

docker-compose up -d mariadb 
docker exec -it mariadb /bin/sh -c "/etc/init.d/mariadb start"
docker-compose up -d nodejs 

