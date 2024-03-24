from datetime import datetime, timedelta
import subprocess
import threading
import time 



def send_requests(amount):
    while 1:
        subprocess.run("ab -n " + str(amount) + " http://localhost:3001/", shell=True, stdout=subprocess.DEVNULL)


def main():
    test_duration_hour = 1;
    # test_duration_seconds = test_duration_hour * 3600
    test_duration_seconds = test_duration_hour * 600

    test_end_time = datetime.now() + timedelta(seconds=test_duration_seconds)

    concurrent_requests = 0
    while datetime.now() < test_end_time:
        concurrent_requests += 2
        threading.Thread(target=send_requests, args=[concurrent_requests], daemon=True).start()        
        # threading.Thread(target=send_requests, args=[concurrent_requests], daemon=True).start()        
        
        amount_of_threads = len(threading.enumerate()) - 1
        time_now = datetime.now().strftime("%H:%M:%S")
        time_left = str(test_end_time - datetime.now()).split('.')[0]
        debug_string = "Time: {}, Time left: {}, Running threads: {}, Concurrent requests: {}"
        print(debug_string.format(time_now, time_left, amount_of_threads, concurrent_requests))

        time.sleep(5)


if __name__ == "__main__":
    main()