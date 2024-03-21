import threading
import requests
import time

URL = "http://192.168.100.63:3001/projects"

sleep_in_seconds = .01
req_per_minute = 60 / sleep_in_seconds

print("time between req: {}, Req per minute: {}".format(sleep_in_seconds, req_per_minute))

def requesting():
    while 1:
        # time.sleep(sleep_in_seconds)
        requests.get(URL)



threading.Thread(target=requesting, name="1", daemon=True).start()

while 1:
    time.sleep(1)

