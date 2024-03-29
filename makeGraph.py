from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
import pandas as pd

hemiron_http = pd.read_csv("hemiron-http_data.csv")
hemiron_nginx = pd.read_csv("hemiron-nginx_data.csv")
hemiron_apache = pd.read_csv("hemiron-apache_data.csv")

cpu = pd.DataFrame()
cpu = pd.concat([cpu, hemiron_http["cpu"].rename("http-server_cpu")], axis=1)
cpu = pd.concat([cpu, hemiron_nginx["cpu"].rename("nginx_cpu")], axis=1)
cpu = pd.concat([cpu, hemiron_apache["cpu"].rename("apache_cpu")], axis=1)

ram = pd.DataFrame()
ram = pd.concat([ram, hemiron_http["ram"].rename("http-server_cpu")], axis=1)
ram = pd.concat([ram, hemiron_nginx["ram"].rename("nginx_cpu")], axis=1)
ram = pd.concat([ram, hemiron_apache["ram"].rename("apache_cpu")], axis=1)

cpu.plot()
ram.plot()
plt.show()

