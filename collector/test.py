docker_names = ["hemiron-http", "hemiron-apache", "hemiron-nginx"]
process_name = ["http-server", "httpd", "nginx"]

for config in zip(docker_names, process_name):
    print(config)