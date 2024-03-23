import threading
import requests
import time

URL = "http://localhost:3001/"

sleep_in_seconds = .01
req_per_minute = 60 / sleep_in_seconds

print("time between req: {}, Req per minute: {}".format(sleep_in_seconds, req_per_minute))

def requesting():
    while 1:
        # time.sleep(sleep_in_seconds)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)
        requests.get(URL)



threading.Thread(target=requesting, name="1", daemon=True).start()
threading.Thread(target=requesting, name="2", daemon=True).start()
threading.Thread(target=requesting, name="3", daemon=True).start()
threading.Thread(target=requesting, name="4", daemon=True).start()
threading.Thread(target=requesting, name="5", daemon=True).start()
threading.Thread(target=requesting, name="6", daemon=True).start()
threading.Thread(target=requesting, name="7", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()
threading.Thread(target=requesting, name="8", daemon=True).start()

while 1:
    time.sleep(1)

