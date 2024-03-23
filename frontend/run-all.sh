docker run --rm -p 3001:80 --cpus=1 --memory=512m hemiron-apache
docker run --rm -p 3001:80 --cpus=1 --memory=512m hemiron-nginxx
docker run --rm -p 3001:3001 --cpus=1 --memory=512m hemiron-httpserver