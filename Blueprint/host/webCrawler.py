#!/usr/bin/env python

import sys
import codecs

f = open("C:/Users/yong wei/Documents/BT garage/Blueprint/host/temp.txt", "w")
while 1:
    # # First four bytes from app notify us of the message's length.
    text_length_bytes = sys.stdin.read(4)
    # # # Unpack the text length WITHOUT using struct.unpack.
    text_length = ord(text_length_bytes[0])
    # # # Get the message from the app.
    message = str(sys.stdin.read(text_length))
    # # # Save the message from the app to a file.
    f.write(message)
    f.flush()
