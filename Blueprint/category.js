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
        categories.push({title:localStr});
        chrome.storage.local.set({ categories: categories });
        chrome.extension.sendRequest({});
        console.log('Saving page ' + localStr);
        alert(localStr+" created")
    });

});

$(".close").click(function () {
    loadList();

})



//loading all the different categories 

function loadList() {
    cat1 = document.querySelector('.categories');
    cat1.innerHTML = '';
    chrome.storage.local.get({ categories:[] }, function (result) {
        result.categories.forEach(function (el) {

            //create the tag for the title of category
            var categoryItem = document.createElement('h3');
            categoryItem.innerText = el.title;            

            //delete icon button
            var deleteIcon = document.createElement('img');
            deleteIcon.className = "category-delete";
            deleteIcon.src = "./img/delete.png";
            deleteIcon.addEventListener('click', function () {
                removeUrl(el.title, function () {
                    loadList();
                });
            });

            //create container
            var container = document.createElement('div');
            container.className = "catContainer"
            container.appendChild(categoryItem);
            container.appendChild(deleteIcon);

            //append container to cat1

            cat1.appendChild(container);
           

        })

    });
}

//removing the item from list
function removeUrl(title, callback) {
    chrome.storage.local.get({ categories: [] }, function (result) {
        var categories = result.categories.filter(function (el) {
            return el.title !== title;
        });
        chrome.storage.local.set({ categories: categories });
        chrome.extension.sendRequest({});
        callback();
    });
}









