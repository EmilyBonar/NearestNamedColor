import requests
from bs4 import BeautifulSoup
import json
import sys

URL = 'https://www.w3schools.com/colors/colors_hex.asp'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')
results = soup.find_all("div", class_="innerbox")
colors = {}
for item in results:
    name = item.find_all("a")[1].text
    hexCode = item.find_all("a")[0].text[1:]
    colors[name] = [hexCode, tuple(int(hexCode[i:i+2], 16) for i in (0, 2, 4))]
    #print(colors[name])
#print(colors)
with open(sys.path[0] + '/colors.txt', 'w') as outfile:
    json.dump(colors, outfile)