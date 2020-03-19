import sys
import codecs
import requests
from bs4 import BeautifulSoup
import json
import struct


# Read a message from stdin and decode it.
def get_message():
    raw_length = sys.stdin.buffer.read(4)

    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode("utf-8")
    return json.loads(message)


# Encode a message for transmission, given its content.
def encode_message(message_content):
    encoded_content = json.dumps(message_content).encode("utf-8")
    encoded_length = struct.pack('=I', len(encoded_content))
    #  use struct.pack("10s", bytes), to pack a string of the length of 10 characters
    return {'length': encoded_length, 'content': struct.pack(str(len(encoded_content))+"s", encoded_content)}


# Send an encoded message to stdout.
def send_message(encoded_message):
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()


# f = open("C:/Users/yongw/Documents/BtGarage/Blueprint/host/temp.txt", "w")

while 1:
    message = get_message()
    # Save the message from the app to a file.
    # f.write(message)
    # f.flush()

    newsMessage = message.replace(' ', '%20')
    url = "https://www.businesstimes.com.sg/search/"+newsMessage
    source_code = requests.get(url)
    soup = BeautifulSoup(source_code.content, "lxml")
    content = soup.findAll("div", {"class": "media-body"})

    # wipe the content in javascript
    send_message(encode_message("W"))

    for article in content:
        articleTitle = article.findAll("a")
        try:
            title = articleTitle[0].text
            url = articleTitle[0]['href']
        except:
            title = "the word cannot be found "
            url = "the link cannot be found "

        send_message(encode_message("T:"+title+url))



    # def get_investopedia():
    #     # let us call and use Dictionary definition
    #     investopediaMessage = message.replace(' ', '+')
    #     url = 'https://www.investopedia.com/search?q='+investopediaMessage+' definition'
    #     source_code = requests.get(url)
    #     soup = BeautifulSoup(source_code.content, "lxml")
    #     pos = soup.findAll("div", {"id": "search-results__description_1-0"})
    #     try:
    #         definition = pos[0].text[1::]
    #     except:
    #         definition = "the word cannot be found "
    #     f.write(definition)
    #     f.flush
    #     return ("I:"+definition)

    # def get_dictionary():
    #     # let us call and use Dictionary definition
    #     dictionaryMessage = message.replace(' ', '-')
    #     url = 'https://www.dictionary.com/browse/'+dictionaryMessage
    #     source_code = requests.get(url)
    #     soup = BeautifulSoup(source_code.content, "lxml")
    #     pos = soup.findAll(
    #         "span", {"class": "one-click-content css-1p89gle e1q3nk1v4"})
    #     try:
    #         definition = pos[1].text
    #     except:
    #         definition = "the word cannot be found "
    #     f.write(definition)
    #     f.flush
    #     return ("D:"+definition)
