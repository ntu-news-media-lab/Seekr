window.onload = function () {
    loadReadingList();

};

$('.search-box').on('click','.dropbtn', function (event) {
    //for reference
    // urls.push({url: url, title: title, image: image, done: false});
    // chrome.storage.local.set({urls: urls});
    var articleId = event.target.id;
    console.log(articleId);
    document.getElementById("myDropdown"+String(articleId)).classList.toggle("show");

    
    });


$(".section #search").click(function () {
    goHome();
});

$(".section #related-news").click(function () {
    goRelatedNews();
});

$('#close-icon').click(function() {
    console.log('close');
    window.close();
})


function goRelatedNews() {
    console.log('Go related news');
    chrome.browserAction.setPopup({ popup: "relatedNews.html" });
    window.location.href = "relatedNews.html";
}

function goHome() {
    console.log('Go search page');
    chrome.browserAction.setPopup({ popup: "home.html" });
    window.location.href = "home.html";
}

function loadReadingList() {
    var readingList = document.querySelector('.search-box');
    readingList.innerHTML = '';
    var counter = 0;

    chrome.storage.local.get({ urls: [] }, function (result) {
        result.urls.forEach(function (el) {
            //     if (el.done == done) {
            //item div tag
            var item = document.createElement('div');
            item.className = "item";

            //delete icon button
            var deleteIcon = document.createElement('img');
            deleteIcon.id = "checklist-delete";
            deleteIcon.src = "./img/delete.png";
            deleteIcon.addEventListener('click', function () {
                removeUrl(el.url, function () {
                    loadReadingList();
                });
            });

            var checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            if (el.done == true) {
                checkBox.checked = true;
            }
            checkBox.addEventListener('click', function () {
                updateDone(el.url, function () {
                    loadReadingList();
                });
            });

            //create the drop down menu 
            // <button onclick="myFunction()" class="dropbtn">Dropdown</button>
            var dropDown = document.createElement('button');
            dropDown.className="dropbtn";
            dropDown.innerHTML ="drop";
            dropDown.id = counter;
            

            //create div tag to contain all the elements
            var myDropdown = document.createElement('div')
            myDropdown.id = "myDropdown"+String(counter);
            myDropdown.className="dropdown-content"

            //create individual elements inside the drop down menu
            //<a href="#home">Home</a>
            var dropItem = document.createElement('a')
            dropItem.innerHTML = "item 1"
            
            //append all the items 
            myDropdown.appendChild(dropItem)
            dropDown.appendChild(myDropdown)

            //button on click function
            // dropDown.addEventListener("click", function () {
            //     document.getElementById("myDropdown"+String(counter)).classList.toggle("show");
            // });

            //create the checklist title
            var label = document.createElement('label');
            label.innerHTML = el.title;

            var link = document.createElement('a');
            link.href = el.url;
            link.target = "_blank";
            link.appendChild(label);

            item.appendChild(deleteIcon);
            item.appendChild(checkBox);
            item.appendChild(dropDown)
            item.appendChild(link);


            readingList.appendChild(item);

            counter++;







            //     }
        });
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function updateDone(url, callback) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        var urls = result.urls;
        urls.forEach(function (el) {
            if (el.url == url) {
                el.done = !(el.done);
                chrome.storage.local.set({ urls: urls });
                chrome.extension.sendRequest({});
                callback();
            }
        });
    });
}

function removeUrl(url, callback) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        var urls = result.urls.filter(function (el) {
            return el.url !== url;
        });
        chrome.storage.local.set({ urls: urls });
        chrome.extension.sendRequest({});
        callback();
    });
}