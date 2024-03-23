import subprocess
import time 
# ab -n 100 http://localhost:3001/

while 1:
    time.sleep(1)
    subprocess.run(["ab", "-n", "1000", "http://localhost:3001/"])