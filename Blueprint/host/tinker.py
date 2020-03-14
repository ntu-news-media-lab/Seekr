import sys
import struct
import json
import requests
from bs4 import BeautifulSoup 


url = 'https://www.dictionary.com/browse/hitman'
source_code = requests.get(url)
soup = BeautifulSoup(source_code.content, "lxml")    
pos = soup.findAll("span", {"class": "one-click-content css-1p89gle e1q3nk1v4"})
print(pos[0].text)


# #lets call and add investopedia defination 
# url = 'https://www.investopedia.com/search?q=private+equity'
# source_code = requests.get(url)
# plain_text = source_code.text
# soup = BeautifulSoup(plain_text)    
# for link in soup.findAll('div', {'id': 'search-results__description_1-0'}):
#     titleInvestopedia = link.string
#     print(titleInvestopedia)