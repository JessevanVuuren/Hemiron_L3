#!/bin/bash

CON=$(docker container ls | grep $1 | cut -c 1-12)
docker exec -it "${CON}" sh -c "pidstat 1"
