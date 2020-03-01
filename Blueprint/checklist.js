window.onload = function () {
    loadReadingList();

};


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


            var label = document.createElement('label');
            label.innerHTML = el.title;

            var link = document.createElement('a');
            link.href = el.url;
            link.target = "_blank";
            link.appendChild(label);

            item.appendChild(deleteIcon);
            item.appendChild(checkBox);
            item.appendChild(link);


            readingList.appendChild(item)







            //     }
        });
    });
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