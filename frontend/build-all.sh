docker build -t hemiron-apache --file ./Dockerfile.apache .
docker build -t hemiron-http --file ./Dockerfile.httpserver .
docker build -t hemiron-nginx --file ./Dockerfile.nginxx .