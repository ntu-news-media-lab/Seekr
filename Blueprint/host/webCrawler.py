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
    return {'length': encoded_length, 'content': struct.pack(str(len(encoded_content))+"s",encoded_content)}


# Send an encoded message to stdout.
def send_message(encoded_message):
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()



f = open("C:/Users/yong wei/Documents/BT garage/Blueprint/host/temp.txt", "w")

while 1:
    message = get_message()
    message = message.replace(' ', '+')
    #Save the message from the app to a file.
    f.write(message)
    f.flush()

    #lets call and add investopedia defination
    url = 'https://www.investopedia.com/search?q='+message
    source_code = requests.get(url)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text)
    for link in soup.findAll('h3', {'class': 'comp search-results__title mntl-text-block'}):
        title = link.string
        f.write(title)
        f.flush()
    
    
    #send a message back to javascript
    send_message(encode_message(title))



