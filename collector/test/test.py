from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
import pandas as pd

# Read the CSV file
hemiron_http = pd.read_csv("hemiron-http_data.csv")
hemiron_nginx = pd.read_csv("hemiron-nginx_data.csv")
hemiron_apache = pd.read_csv("hemiron-apache_data.csv")


all = pd.DataFrame()
all = pd.concat([all, hemiron_http["cpu"].rename("http-server_cpu")], axis=1)
all = pd.concat([all, hemiron_nginx["cpu"].rename("nginx_cpu")], axis=1)
all = pd.concat([all, hemiron_apache["cpu"].rename("apache_cpu")], axis=1)

# all["http_cpu_smooth"] = all["http_cpu"].rolling(1)

# print(all.head())

all.plot()
plt.show()


