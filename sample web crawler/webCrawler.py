import requests
from bs4 import BeautifulSoup

def investopedia_spider(max_pages):
    page =1
    while page<=max_pages:
        url = 'https://www.investopedia.com/search?q=private+equity'
        source_code = requests.get(url)
        plain_text = source_code.text
        soup = BeautifulSoup(plain_text)
        for link in soup.findAll('h3', {'class': 'comp search-results__title mntl-text-block'}):
            title = link.string
            print(title)

        page+=1

investopedia_spider(1)
        
