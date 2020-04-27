# Seekr

![PyPI](https://img.shields.io/pypi/pyversions/Django.svg)

Seekr is a Google Chrome extension that allows users to better connect with startup news by improving their understanding of business terms, expanding their knowledge of business topics by accessing the latest related articles, and organising the information however they need it.

<img src="collage.png"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />

# Table of contents:

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Future Iterations](#future-optimisations)
6. [Acknowledgements](#acknowledgements)
7. [Team](#team)

# 1. Introduction

Seekr aims to:
1. Pique curiousity – it serves as a go-to tool to help tertiary students easily search and understand business jargon.
2. Broaden perspectives – it is the key ingredient for tertiary students to better access and connect with topics in the start-up ecosystem.
3. Manage information – it helps tertiary students get organised with new knowledge.

# 2. Requirements

* python 3
* chrome

# 3. Setup

## Adding the extension to chrome toolbar 
1. Download and unzip this code repository
2. In Google Chrome, open the chrome menu by clicking on the 3 dots at the top right hand corner. Go to More tools > Extensions. (Or go to this link(chrome://extensions/))
3. Enable 'Developer mode' in the top right hand corner
4. Click on 'Load unpacked'
5. Select the code repository folder, in this case it will be the folder Seekr
6. You should see a magnifying glass extension' as a chrome extension

## Installing Python and the required libraries for Windows user
The extension runs on a backend python script.  Below is the instruction for installing python and the required libraries to run the script.
1. Visit https://www.python.org/ and download the latest python version.
2. During installation, select the Add Python To Path checkbox.  Continue with the rest of the installation.
3. Open up command prompt by typing cmd into windows search bar.  Type “python--version” into the command prompt to make sure you have installed python correctly.
4. Install the following packages by typing it into the command prompt.  Type and enter it one by one.
    * pip install beautifulsoup4
    * pip install requests
    * pip install jsonlib
    * pip install structures
    * pip install lxml

## Some last tweaking to make the extension work
1.  open the chrome menu by clicking on the 3 dots at the top right hand corner. Go to More tools > Extensions. (Or go to this link(chrome://extensions/))
2. Look for the seekr extension.  In the seekr extension box there is a field call  ID.  Copy the ID.
3. Navigate to the Seekr folder then open up  the host folder.
4. Inside this folder there is a file call newsCrawler.  Open newsCrawler file using notepad by right clicking it and selecting open with NotePad.
5. In the file, there is a field called “chrome-extension”.  Replace the ID inside with the ID you just copied.
6. Save and exit the file.  Look for another file call webCrawler in the host folder and repeat the steps above.
7. Finally in the  host folder, double click on the install_host to install the batch file.

## Advice for Mac user
There is no installation script for mac user as of now.  However, for future developers working on this extension, you can refer to the sh script “install_host_MacReference”.  I  added in the host folder for reference on creating a script to run on Mac devices.


# 4. Usage

### Demo

Watch a demo of Seekr [here](https://www.youtube.com/watch?v=u7JZ4ZrKnlw&feature=youtu.be).

### Key Features

#### • User walkthrough
The welcome screen provides information about the functions of the extension.

#### • Definition search
Users can type and search a term that they do not understand (eg. business jargon) and its definition will appear. Users can toggle between definitions provided by Investopedia or Dictionary.

#### • Related articles
The related articles tab brings users to a page that introduces them to news articles to the term they searched. The 'add' button allows them to bookmark articles for future reference.

#### • Reading List
Clicking on the checklist button will allow users to access their bookmarked articles. Here, they can check off and delete an article after reading it.

#### • Folder function
Users can create folders and organize articles for future reading.

#### • Sharing
Users can share articles on social media and messaging platforms.

# 5. Future Iterations

We hope to improve the product through further iterations: 

* Allow users to search for terms by simply highlighting words found in news articles.
* Enable push notifications to flag unread stories for users.
* Introduce user accounts/guest modes to make news-reading more social.

# 6. Acknowledgements

Ms Jessica Tan and Miss Joan Kelly for their guidance throughout the News Media Lab course. 

Our news partner Olivia Poh from Garage @ The Business Times for her continuous support and valuable feedback.

Our industry mentor Janie Octia from CrowdTangle @ Facebook for her expert guidance. 

Users from our research process, for providing us with insightful comments and feedback.

# 7. Team

Journalists: Yeo Sze-G and Sherlyn Seah
Designers: Esther Rim and Namita Kumar
Developer: Goh Yong Wei
