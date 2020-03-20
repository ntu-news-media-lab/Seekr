$(".section #search").click(function () {
    goHome();
});

$(".section #related-news").click(function () {
    goRelatedNews();
});


$(".section #checklist").click(function () {
    goChecklist();
});

window.onload = function () {
    loadList();

};

// //clear all list
// chrome.storage.local.remove({categories:[] },function(){
//     var error = chrome.runtime.lastError;
//        if (error) {
//            console.error(error);
//        }
//    });



function goHome() {
    console.log('Go search page');
    chrome.browserAction.setPopup({ popup: "home.html" });
    window.location.href = "home.html";
}

function goRelatedNews() {
    console.log('Go related news');
    chrome.browserAction.setPopup({ popup: "relatedNews.html" });
    window.location.href = "relatedNews.html";
}

function goChecklist() {
    console.log('Go checklist page');
    chrome.browserAction.setPopup({ popup: "checklist.html" });
    window.location.href = "checklist.html";
}

$('#close-icon').click(function () {
    console.log('close');
    window.close();
})


//script to open modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//getting the value in the text box

$("#submit").click(function () {
    var localStr = $("#fname").val();
    chrome.storage.local.get({ categories: [] }, function (result) {
        var categories = result.categories;
        categories.push({ title: localStr });
        chrome.storage.local.set({ categories: categories });
        chrome.extension.sendRequest({});
        console.log('Saving page ' + localStr);
        alert(localStr + " created")
    });

});

$(".close").click(function () {
    loadList();

})



//loading all the different categories 

function loadList() {
    cat1 = document.querySelector('.categories');
    cat1.innerHTML = '';
    chrome.storage.local.get({ categories: [] }, function (result) {
        result.categories.forEach(function (el) {

            //create the tag for the title of category
            var categoryItem = document.createElement('h3');
            categoryItem.innerText = el.title;

            //delete icon button
            var deleteIcon = document.createElement('img');
            deleteIcon.className = "category-delete";
            deleteIcon.src = "./img/delete.png";
            deleteIcon.addEventListener('click', function () {
                removeTitle(el.title, function () {
                    loadList();
                });
            });

            //create container
            var container = document.createElement('div');
            container.className = "catContainer"
            container.appendChild(categoryItem);
            container.appendChild(deleteIcon);




            //create the list of tags
            chrome.storage.local.get({ urls: [] }, function (result) {
                result.urls.forEach(function (e2) {
                    if (e2.category == el.title) {
                        //item div tag
                        var item = document.createElement('div');
                        item.className = "item";

                        //delete icon button
                        var deleteIcon = document.createElement('img');
                        deleteIcon.id = "checklist-delete";
                        deleteIcon.src = "./img/delete.png";
                        deleteIcon.addEventListener('click', function () {
                            removeUrl(e2.url, function () {
                                loadList();
                            });
                        });

                        var checkBox = document.createElement('input');
                        checkBox.type = "checkbox";
                        if (e2.done == true) {
                            checkBox.checked = true;
                        }
                        checkBox.addEventListener('click', function () {
                            updateDone(e2.url, function () {
                                loadList();
                            });
                        });

                        //create the checklist title
                        var label = document.createElement('label');
                        label.innerHTML = e2.title;

                        var link = document.createElement('a');
                        link.href = e2.url;
                        link.target = "_blank";
                        link.appendChild(label);

                        item.appendChild(deleteIcon);
                        item.appendChild(checkBox);
                        item.appendChild(link);

                        container.append(item);
                    }



                });
            });
            //append container to cat1
            cat1.appendChild(container);

        })



    });


}

//removing the item from list
function removeTitle(title, callback) {
    chrome.storage.local.get({ categories: [] }, function (result) {
        var categories = result.categories.filter(function (el) {
            return el.title !== title;
        });
        chrome.storage.local.set({ categories: categories });
        chrome.extension.sendRequest({});
        callback();
    });
}

// remove individual item from checklist
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










