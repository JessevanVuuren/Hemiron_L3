from datetime import datetime, timedelta
import subprocess
import threading
import time 
import csv
import sys

stress_test_info = {
    "connections": 0,
    "requests": 0
}


def exec(command):
    stdout = subprocess.check_output(command, shell=True)
    return stdout.decode().strip() 


def get_container_id(config):
    command = "docker ps -aqf ancestor=" + config["docker_name"]
    return exec(command)


def get_PID_of_process(docker_id, config):
    command = 'docker exec -it {} sh -c "pidof {}"'.format(docker_id, config["process_name"])
    return exec(command)


def write_usage_to_csv(time, cpu, ram, config):

    with open(config["docker_name"] + '_data.csv', "+a", newline='') as csv_file:
        data_write = csv.writer(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        data_write.writerow([time, cpu, ram, str(stress_test_info["connections"]), stress_test_info["requests"]])

def create_csv_file(config):
    with open(config["docker_name"] + '_data.csv', "w+", newline='') as csv_file:
        data_write = csv.writer(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        data_write.writerow(["time", "cpu", "ram", "connections", "requests"])
        
def start_collecting(docker_id, process_id, config):
    command = 'docker exec -it {} sh -c "pidstat -p {} -u -r 1 | cat"'.format(docker_id, process_id)

    while 1:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)

        with process.stdout:
            cpu = "" 
            ram = ""
            for stdout in process.stdout:
                print(stdout)
                # stdout = stdout.strip().split()
                # if (config["process_name"] in stdout and "Average:" not in stdout):
                #     if (len(stdout) == 10): cpu = stdout[7]
                #     if (len(stdout) == 9): ram = stdout[7]

                #     if (cpu and ram): 
                #         time = stdout[0]
                #         print(time)
                #         write_usage_to_csv(time, cpu, ram, config)
                #         cpu = ""
                #         ram = ""


def send_requests(amount, config):
    while 1:
        time.sleep(1)
        # subprocess.run("ab -n " + str(amount) + " " + config["link"], shell=True, stdout=subprocess.DEVNULL)


def main(config):
    docker_id = get_container_id(config)
    process_id = get_PID_of_process(docker_id, config)

    threading.Thread(target=start_collecting, args=[docker_id, process_id, config], daemon=True).start();
    time.sleep(10)

    test_duration_hour = 1;
    # test_duration_seconds = test_duration_hour * 3600
    test_duration_seconds = test_duration_hour * 60

    test_end_time = datetime.now() + timedelta(seconds=test_duration_seconds)

    concurrent_requests = 1

    while datetime.now() < test_end_time:
        threading.Thread(target=send_requests, args=[concurrent_requests, config], daemon=True).start()
        threading.Thread(target=send_requests, args=[concurrent_requests, config], daemon=True).start()
        concurrent_requests += 1
        
        stress_test_info["connections"] = len(threading.enumerate()) - 2
        stress_test_info["requests"] = concurrent_requests
        
        time.sleep(1)


if __name__ == "__main__":
    # assert len(sys.argv) == 4

    # config = {
    #     "docker_name": sys.argv[1],
    #     "process_name": sys.argv[2],
    #     "link": sys.argv[3]
    # }
    # config = {
    #     "docker_name": "hemiron-http",
    #     "process_name": "http-server",
    #     "link": "http://localhost:3001/"
    # }
    config = {
        "docker_name": "hemiron-nginx",
        "process_name": "nginx",
        "link": "http://localhost:3001/"
    }
        
    print("Testing: {}, with process: {}, With link: {}".format(config["docker_name"], config["process_name"], config["link"]))

    create_csv_file(config)
    main(config)
