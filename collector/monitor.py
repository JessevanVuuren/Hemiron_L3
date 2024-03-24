import subprocess
import threading
import datetime
import time
import csv

# DOCKER_NAME = "hemiron-http"
# PROCESS_NAME = "http-server"

DOCKER_NAME = "hemiron-apache"
PROCESS_NAME = "httpd"

# DOCKER_NAME = "hemiron-nginx"
# PROCESS_NAME = "nginx"


with open(DOCKER_NAME + '_data.csv', "w+", newline='') as csv_file:
    data_write = csv.writer(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    data_write.writerow(["time", "cpu", "ram"])


def exec(command):
    stdout = subprocess.check_output(command, shell=True)
    return stdout.decode().strip() 

def get_container_id():
    command = "docker ps -aqf ancestor=" + DOCKER_NAME
    return exec(command)

def get_PID_of_process(docker_id):
    command = 'docker exec -it {} sh -c "pidof {}"'.format(docker_id, PROCESS_NAME)
    return exec(command)

def write_usage_to_csv(time, cpu, ram, debug=True):
    if debug: print("CPU: {}%, RAM: {}%".format(cpu, ram))

    with open(DOCKER_NAME + '_data.csv', "+a", newline='') as csv_file:
        data_write = csv.writer(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        data_write.writerow([time, cpu, ram])

def start_collecting(docker_id, process_id):
    command = 'docker exec -it {} sh -c "pidstat -p {} -u -r 1 | cat"'.format(docker_id, process_id)

    while 1:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)

        with process.stdout:
            cpu = "" 
            ram = ""
            for stdout in process.stdout:
                stdout = stdout.strip().split()
                if (PROCESS_NAME in stdout and "Average:" not in stdout):
                    if (len(stdout) == 10): cpu = stdout[7]
                    if (len(stdout) == 9): ram = stdout[7]

                    if (cpu and ram): 
                        time = stdout[0]
                        write_usage_to_csv(time, cpu, ram, debug=True)
                        cpu = ""
                        ram = ""



docker_id = get_container_id()
process_id = get_PID_of_process(docker_id)


print("Testing: {}, with process: {}".format(DOCKER_NAME, PROCESS_NAME))

threading.Thread(target=start_collecting, args=[docker_id, process_id], daemon=True).start();



while 1:
    time.sleep(1)