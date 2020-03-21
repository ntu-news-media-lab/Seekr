var slideIndex =1;

window.onload = function () {
    loadReadingList();
    setTimeout(function () { showSlides(slideIndex); }, 100);

};

this.loadCategory()



$('.search-box').on('click', '.dropbtn', function (event) {
    //for reference
    // urls.push({url: url, title: title, image: image, done: false});
    // chrome.storage.local.set({urls: urls});
    var articleId = event.target.id;
    console.log(articleId);
    document.getElementById("myDropdown" + String(articleId)).classList.toggle("show");


});


$(".section #search").click(function () {
    goHome();
});

$(".section #related-news").click(function () {
    goRelatedNews();
});

$(".section #my-folder").click(function () {
    goCategory();
});

$('#close-icon').click(function () {
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
function goCategory() {
    console.log('Go category page');
    chrome.browserAction.setPopup({ popup: "category.html" });
    window.location.href = "category.html";
}


$('.category-box .category-container').on('click', '.category-cell a', function (event) {
    //for reference
    // urls.push({url: url, title: title, image: image, done: false});
    // chrome.storage.local.set({urls: urls});
    var category = event.target.innerHTML;  
    loadCategoryList(category);
    
});

$(".show-all").click(function(){
    loadReadingList();
})




// load all the list
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
            dropDown.className = "dropbtn";
            dropDown.innerHTML = "drop";
            dropDown.id = counter;


            //create div tag to contain all the elements
            var myDropdown = document.createElement('div')
            myDropdown.id = "myDropdown" + String(counter);
            myDropdown.className = "dropdown-content"

            //create individual elements inside the drop down menu
            //<a href="#home">Home</a>
            chrome.storage.local.get({ categories: [] }, function (result) {
                result.categories.forEach(function (e2) {
                    var dropItem = document.createElement('a')
                    dropItem.innerHTML = e2.title
                    dropItem.addEventListener('click', function () {
                        changeCategory(e2.title, el.url, function () {
                            loadReadingList();
                        });
                        console.log(e2.title);
                    });
                    myDropdown.appendChild(dropItem)

                })

            });

            //append all the items             
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





//load header category
function loadCategory() {
    categoryContainer = document.querySelector('.category-container');
    categoryContainer.innerHTML = '';
    chrome.storage.local.get({ categories: [] }, function (result) {
        result.categories.forEach(function (el) {

            //create category cell
            var categoryCell = document.createElement('div');
            categoryCell.className = "category-cell";

            //create the inner p tag
            var categoryText = document.createElement('a');
            categoryText.href="#";
            categoryText.innerHTML = el.title

            //delete icon button
            var deleteIcon = document.createElement('img');
            deleteIcon.className = "category-delete";
            deleteIcon.src = "./img/delete.png";
            deleteIcon.addEventListener('click', function () {
                removeTitle(el.title, function () {
                    loadCategory();
                    setTimeout(function () { showSlides(slideIndex); }, 100);
                });
            });
            categoryCell.appendChild(categoryText);
            categoryCell.appendChild(deleteIcon);
            categoryContainer.appendChild(categoryCell);
        });

    })

    //create the 2 arrows 
    // <a class="prev">&#10094;</a>
    // <a class="next">&#10095;</a>
    var prev = document.createElement('a')
    prev.className = "prev";
    prev.innerHTML = "&#10094;";

    var next = document.createElement('a')
    next.className = "next";
    next.innerHTML = "&#10095;";

    categoryContainer.appendChild(prev);
    categoryContainer.appendChild(next);



};


//load the individual items
function loadCategoryList(category) {
    var readingList = document.querySelector('.search-box');
    readingList.innerHTML = '';
    var counter = 0;

    chrome.storage.local.get({ urls: [] }, function (result) {
        result.urls.forEach(function (el) {
            if (el.category == category) {
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
                dropDown.className = "dropbtn";
                dropDown.innerHTML = "drop";
                dropDown.id = counter;


                //create div tag to contain all the elements
                var myDropdown = document.createElement('div')
                myDropdown.id = "myDropdown" + String(counter);
                myDropdown.className = "dropdown-content"

                //create individual elements inside the drop down menu
                //<a href="#home">Home</a>
                chrome.storage.local.get({ categories: [] }, function (result) {
                    result.categories.forEach(function (e2) {
                        var dropItem = document.createElement('a')
                        dropItem.innerHTML = e2.title
                        dropItem.addEventListener('click', function () {
                            changeCategory(e2.title, el.url, function () {
                                loadReadingList();
                            });
                            console.log(e2.title);
                        });
                        myDropdown.appendChild(dropItem)

                    })

                });

                //append all the items             
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


            }




            //     }
        });
    });
}




window.onclick = function (event) {
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

//updating the category of the checklist
function changeCategory(category, url, callback) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        var urls = result.urls;
        urls.forEach(function (el) {
            if (el.url == url) {
                el.category = category;
                chrome.storage.local.set({ urls: urls });
                chrome.extension.sendRequest({});
                callback();
            }
        });
    });
}



//logic for the modal 
//script to open modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$(".category-box .myBtn").click(function () {
    modal.style.display = "block";
})

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
    loadCategory();
    setTimeout(function () { showSlides(slideIndex); }, 100);
    loadReadingList();

})




//logic for the carousel
$(".next").click(function () {
    plusSlides(4);
});

$(".prev").click(function () {
    plusSlides(-4);
})


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("category-cell");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex].style.display = "block";
    slides[slideIndex + 1].style.display = "block";
    slides[slideIndex + 2].style.display = "block";
    dots[(slideIndex - 1)%3].className += " active";
}


