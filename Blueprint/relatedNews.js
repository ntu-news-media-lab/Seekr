connect();

let contentLeft = true;
var articleId = 0;

chrome.storage.local.get(['searchResult'], function (result) {
    console.log('Value currently is ' + result.searchResult);
    searchResult = result.searchResult;
    $(".search-box .search-txt").val(searchResult);
    sendNativeMessage(searchResult);
    // loadStories(relatedNews_json, searchResult);
});
$('.search-box .content .column').on('click', '.tile .add', function (event) {
    //for reference
    // urls.push({url: url, title: title, image: image, done: false});
    // chrome.storage.local.set({urls: urls});
    var articleId = event.target.id;

    var title = $(".column ." + String(articleId) + " .headline-small").html();
    var url = $(".column ." + String(articleId) + " .headline-small").attr("href");
    chrome.storage.local.get({ urls: [] }, function (result) {
        var urls = result.urls;
        if (!savedAlready(urls, title)) {
            urls.push({ title: title, url: url, done: false });
            chrome.storage.local.set({ urls: urls });
            chrome.extension.sendRequest({});
            console.log('Saving page ' + title);
        } else {
            console.log('You already saved this');
        }
    });
});

function connect() {
    var hostName = "com.google.chrome.example.newscrawler";
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
}

function sendNativeMessage(message) {
    port.postMessage(message);
    alert("sending message");
}

function onDisconnected() {
    // appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
    alert("failed to connect")
    port = null;
}


function onNativeMessage(message) {
    // updateInvestopedia(JSON.stringify(message));
    console.log(JSON.stringify(message).substr(1, 1));
    console.log(JSON.stringify(message).substr(3, JSON.stringify(message).length - 4));
    InputMessage = JSON.stringify(message).substr(3, JSON.stringify(message).length - 4);
    title = InputMessage.substr(0, InputMessage.indexOf('http')-3);
    url = InputMessage.substr(InputMessage.indexOf('http'), InputMessage.length-1);
    console.log(InputMessage.substr(0, InputMessage.indexOf('http')-3));
    console.log(InputMessage.substr(InputMessage.indexOf('http'), InputMessage.length-1));

    if (JSON.stringify(message).substr(1, 1) == "W") {
        wipePage();
    }
    else {
        loadStories(title, url)
    }
}

function wipePage() {
    $(".content .left").empty();
    $(".content .right").empty();
    contentLeft = true;
    articleId = 0;
}



function savedAlready(urls, title) {
    var filteredUrls = urls.filter(function (el) {
        return el.title === title;
    });
    return filteredUrls.length > 0;
}


$(".search-btn").click(function () {
    var str = $(".search-txt").val();
    chrome.storage.local.set({ searchResult: str }, function () {
        console.log('Value is set to ' + str);
    });
    sendNativeMessage(str);
});


$(".section #search").click(function () {
    goHome();
});

$(".section #checklist").click(function () {
    goChecklist();
});

$('#close-icon').click(function () {
    console.log('close');
    window.close();
})


function goHome() {
    console.log('Go search page');
    chrome.browserAction.setPopup({ popup: "home.html" });
    window.location.href = "home.html";
}

function goChecklist() {
    console.log('Go checklist page');
    chrome.browserAction.setPopup({ popup: "checklist.html" });
    window.location.href = "checklist.html";
}



function haveArticles(json, searchResult) {
    for (i = 0; i < json.length; i++) {
        if (searchResult.toLowerCase() == json[i].keyword.toLowerCase()) {
            return true;
        }
    }
}

function loadStories(title, url) {
    var leftReadingList = document.querySelector('.content .left');
    var rightReadingList = document.querySelector('.content .right');

    //create tile tag
    var tile = document.createElement('div');
    tile.className = "tile " + String(articleId);

    //create the headline element
    var headline = document.createElement('a');
    headline.href = url;
    headline.className = "headline-small";
    headline.target = "_blank";
    headline.innerHTML = title;

    //create the add button
    var checklistButton = document.createElement('button');
    checklistButton.className = "add small margin-top "+ String(articleId);
    checklistButton.target = "_blank";
    checklistButton.innerHTML = "+";
    checklistButton.id = String(articleId);

    //append all to the div class
    tile.appendChild(headline);
    tile.appendChild(checklistButton);
    articleId = articleId+1

    //check if its even or odd
    if (contentLeft == true) {
        leftReadingList.appendChild(tile);
        // $(".content .left").append(html);
        contentLeft = false;
    } else {
        rightReadingList.appendChild(tile);
        // $(".content .right").append(html);
        contentLeft = true;
    }
}

// function loadStories(json, searchResult) {
//     var leftReadingList = document.querySelector('.content .left');
//     var rightReadingList = document.querySelector('.content .right');
//     if (haveArticles(json, searchResult) == true) {
//         let contentLeft = true;
//         $(".content .left").empty();
//         $(".content .right").empty();
//         var articleId = 0;
//         for (i = 0; i < json.length; i++) {
//             if (searchResult.toLowerCase() == json[i].keyword.toLowerCase()) {
//                 var jsonObject = json[i];



//                 //create tile tag
//                 var tile = document.createElement('div');
//                 tile.className = "tile " + String(articleId);

//                 //create image tag
//                 var image = document.createElement('img');
//                 image.src = jsonObject.img_src;

//                 //create the headline element
//                 var headline = document.createElement('a');
//                 headline.href = jsonObject.url;
//                 headline.className = "headline-small";
//                 headline.target = "_blank";
//                 headline.innerHTML = jsonObject.headline;

//                 //create the add button
//                 var checklistButton = document.createElement('button');
//                 checklistButton.className = "add small margin-top " + String(articleId);
//                 checklistButton.target = "_blank";
//                 checklistButton.innerHTML = "+";
//                 checklistButton.id = String(articleId);
//                 // checklistButton.addEventListener('click', function() {
//                 //     var articleId = checklistButton.getAttribute("id");
//                 //     var title = jsonObject.headline;
//                 //     var url = jsonObject.url;
//                 //     var checklists = { title: title, url: url, done: false }
//                 //     chrome.storage.local.set({ checklists: checklists }, function () {
//                 //         console.log('Value is set to ' + checklists);
//                 //     });


//                 //   });

//                 //append all to the div class
//                 tile.appendChild(image);
//                 tile.appendChild(headline);
//                 tile.appendChild(checklistButton);
//                 articleId = articleId + 1;


//                 //check if its even or odd
//                 if (contentLeft == true) {
//                     leftReadingList.appendChild(tile);
//                     // $(".content .left").append(html);
//                     contentLeft = false;
//                 } else {
//                     rightReadingList.appendChild(tile);
//                     // $(".content .right").append(html);
//                     contentLeft = true;
//                 }

//                 //     const html = `
//                 //     <div class="tile">
//                 //         <img src="${jsonObject.img_src}">
//                 //         <a href="${jsonObject.url}" class="headline-small" target="_blank">
//                 //             ${jsonObject.headline}
//                 //         </a>
//                 //         <button class="add small margin-top" target="_blank">
//                 //             <i class="fas fa-plus-circle"></i>
//                 //         </button>
//                 //     </div>
//                 //   `;
//             }

//         }
//     }


// }


// old functions 


// $(".content").find(".tile .add").click(function () {
//     //for reference
//     // urls.push({url: url, title: title, image: image, done: false});
//     // chrome.storage.local.set({urls: urls});

//     var title = $(".tile .headline-small").get();
//     var url = $(".tile .headline-small").attr("href");
//     var checklists = {title: title, url: url, done: false}
//     chrome.storage.local.set({checklists: checklists}, function(){
//         console.log('Value is set to ' + checklists);
//     });

// });






//   console.log("stories.js");

//   $('#mood-title').text(moodDict[mood].title);

//   // GET featured
//   function loadFeatured(stories) {
//     console.log(stories);
//     // var stories = json.stories;
//     // json.stories.forEach(story => {
//     const html = `
//       <div class="topfont">
//         ${moodDict[mood].description}
//       </div>
//       <hr class="thin"/>
//       <div class="row tile">
//         <div class="column left portrait" style="background-image: url(${stories[0].img_src || placeholder})"></div>
//         <div class="column right">
//           <a href="${stories[0].url}" class="headline-large" target="_blank">
//             ${stories[0].headline}
//           </a>
//           <div class="lead-large">
//             ${stories[0].standfirst || stories[0].lead}
//           </div>
//         </div>
//         <div class="tile-btm">
//           <div class="date-large pull-left">
//             ${stories[0].published_date} | ${stories[0].category}
//           </div>
//           <a href="${stories[0].url}" class="read small pull-right" target="_blank">READ</a>
//         </div>
//       </div>
//       <hr class="thin"/>

//       <div class="row">
//         <div class="column left small">
//           <div class="tile">
//             <img src="${stories[1].img_src || placeholder}">
//             <a href="${stories[1].url}" class="headline-small" target="_blank">
//               ${stories[1].headline}
//             </a>
//             <div class="lead-small">
//               ${stories[1].standfirst || stories[1].lead}
//             </div>
//             <div class="date-small">
//               ${stories[1].published_date} | ${stories[1].category}
//             </div>
//             <a href="${stories[1].url}" class="read small margin-top" target="_blank">READ</a>
//           </div>
//           <div class="tile">
//             <img src="${stories[3].img_src || placeholder}">
//             <a href="${stories[3].url}" class="headline-small" target="_blank">
//               ${stories[3].headline}
//             </a>
//             <div class="lead-small">
//               ${stories[3].standfirst || stories[3].lead}
//             </div>
//             <div class="date-small">
//               ${stories[3].published_date} | ${stories[3].category}
//             </div>
//             <a href="${stories[3].url}" class="read small margin-top" target="_blank">READ</a>
//           </div>
//         </div>
//         <div class="verticle-line"></div>
//         <div class="column right small">
//           <div class="tile">
//             <img src="${stories[2].img_src || placeholder}">
//             <a href="${stories[2].url}" class="headline-small" target="_blank">
//               ${stories[2].headline}
//             </a>
//             <div class="lead-small">
//               ${stories[2].standfirst || stories[2].lead}
//             </div>
//             <div class="date-small">
//               ${stories[2].published_date} | ${stories[2].category}
//             </div>
//             <a href="${stories[2].url}" class="read small margin-top" target="_blank">READ</a>
//           </div>
//           <div class="tile">
//             <img src="${stories[4].img_src || placeholder}">
//             <a href="${stories[4].url}" class="headline-small" target="_blank">
//               ${stories[4].headline}
//             </a>
//             <div class="lead-small">
//               ${stories[4].standfirst || stories[4].lead}
//             </div>
//             <div class="date-small">
//               ${stories[4].published_date} | ${stories[4].category}
//             </div>
//             <a href="${stories[4].url}" class="read small margin-top" target="_blank">READ</a>
//           </div>
//         </div>
//       </div>

//       <hr class="thin" />

//       <div class="row tile">
//         <div class="column left side portrait" style="background-image: url(${stories[5].img_src || placeholder})"></div>
//         <div class="column main right">
//           <a href="${stories[5].url}" class="headline-large" target="_blank">
//             ${stories[5].headline}
//           </a>
//           <div class="lead-large margin-btm">
//             ${stories[5].standfirst || stories[5].lead}
//           </div>
//           <div class="date-large pull-left">
//             ${stories[5].published_date} | ${stories[5].category}
//           </div>
//           <a href="${stories[5].url}" class="read small pull-right" target="_blank">READ</a>
//         </div>
//       </div>
//     `;
//     $("#content").append(html);
//     // });
//   }

//   // $.ajax({
//   //   url: "http://127.0.0.1:5000/api/" + mood,
//   //   method: "GET",
//   //   crossDomain: true,
//   //   contentType: "application/json",
//   //   dataType: "json",
//   //   responseType: "application/json",
//   //   success: loadFeatured,
//   //   error: function(xhr, textStatus, errorThrown) {
//   //     console.log(xhr);
//   //     console.log(textStatus);
//   //     console.log(errorThrown);
//   //   }
//   // });

//   loadFeatured(moodDict[mood].json);

//   $('#' + mood).hide();
//   // $('#' + moodDict[mood].edition + '-moods').show();
//   $('#' + moodDict[mood].edition + '-moods').css('display', 'flex');

//   $('.mood-cards-btm > div').click(function() {
//     var id = $(this).attr('id');
//     window.location.href= "stories.html?mood=" + id;
//   })

//   $("#back-icon").click(function() {
//     window.location.href = "home.html";
//     // window.history.back();
//   });

//   $("#close-icon").click(function() {
//     console.log("close");
//     window.close();
//   });
// // });



// function savedAlready(checklists, title) {
//     var filteredChecklists = checklists.filter(function (el) {
//       return el.title === url;
//     });
//     return filteredChecklists.length > 0;
//   }

// $('.content .column').on('click', '.tile .add', function(){
//     alert('Button clicked!');
// });

