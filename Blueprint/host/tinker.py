import sys
import struct
import json
import requests
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options





url = "https://www.businesstimes.com.sg/search/tabata"
source_code = requests.get(url)
soup = BeautifulSoup(source_code.content, "lxml")    
content = soup.findAll("div", {"class": "media-body"})
for article in content:
    articleTitle= article.findAll("a")
    articleDescription = article.findAll("p")
    try:
        title = articleTitle[0].text
        description = articleDescription[0].text
    except:
        title = "the word cannot be found "
        description = "the word cannot be found "

    print(title)
    print(description)
    print("\n")


#old code
# url = 'https://www.dictionary.com/browse/hitman'
# source_code = requests.get(url)
# soup = BeautifulSoup(source_code.content, "lxml")    
# pos = soup.findAll("span", {"class": "one-click-content css-1p89gle e1q3nk1v4"})
# print(pos[0].text)


# # #lets call and add investopedia defination 
# # url = 'https://www.investopedia.com/search?q=private+equity'
# # source_code = requests.get(url)
# # plain_text = source_code.text
# # soup = BeautifulSoup(plain_text)    
# # for link in soup.findAll('div', {'id': 'search-results__description_1-0'}):
# #     titleInvestopedia = link.string
# #     print(titleInvestopedia)

#live dynamic rendering
# chrome_driver = r"C:\Users\yong wei\Documents\BTgarage\chromedriver_v80\chromeDriver.exe"
# driver = webdriver.Chrome(chrome_driver)
# driver.get("https://www.businesstimes.com.sg/search/private%20equity?page=1&filter=headline_en")
# delay = 30

# try:
#     myElem = WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, '//div[@class="notranslate"]/iframe//html')))
#     print ("Page is ready!")
# except TimeoutException:
#     print ("Loading took too much time!")


#   // "allowed_origins": [
#   //   // "chrome-extension://hmdbmlkpepdgnbohmnbbpfbkaaliobkg/"
    
#   // ]
# }