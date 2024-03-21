#!/bin/bash

CON=$(docker container ls | grep hemiron | cut -c 1-12)
docker exec -it "${CON}" sh -c "top"
