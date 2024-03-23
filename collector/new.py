import threading
import requests
import asyncio
import time

async def fetch(url):
    requests.get(url)

async def main():
    urls = ["http://localhost:3001/" for _ in range(10)]
    tasks = [fetch(url) for url in urls]  
    
    await asyncio.gather(*tasks)

def runn():
    asyncio.run(main())

for _ in range(30):
    threading.Thread(target=runn, name="runner", daemon=True).start()



while 1:
    time.sleep(1)
