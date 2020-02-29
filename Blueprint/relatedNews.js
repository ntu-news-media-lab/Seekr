chrome.storage.local.get(['searchResult'], function (result) {
    console.log('Value currently is ' + result.searchResult);
    searchResult = result.searchResult;
    $(".search-box .search-txt").val(searchResult);
    loadStories(relatedNews_json, searchResult);
});
$('.tile .add').click('click', function () {
    //for reference
    // urls.push({url: url, title: title, image: image, done: false});
    // chrome.storage.local.set({urls: urls});

    var title = $(".tile .headline-small").get();
    var url = $(".tile .headline-small").attr("href");
    var checklists = { title: title, url: url, done: false }
    chrome.storage.local.set({ checklists: checklists }, function () {
        console.log('Value is set to ' + checklists);
    });

});


$(".search-btn").click(function () {
    var str = $(".search-txt").val();
    chrome.storage.local.set({ searchResult: str }, function () {
        console.log('Value is set to ' + str);
    });
    loadStories(relatedNews_json, str);
    // alert(str);
});


$(".section #search").click(function () {
    goHome();
});

$(".section #checklist").click(function () {
    goChecklist();
});

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

function loadStories(json, searchResult) {
    if (haveArticles(json, searchResult) == true) {
        let contentLeft = true;
        $(".content .left").empty();
        $(".content .right").empty();
        for (i = 0; i < json.length; i++) {
            if (searchResult.toLowerCase() == json[i].keyword.toLowerCase()) {
                var jsonObject = json[i];

                // var checklistbutton = $('<button class="add small margin-top" target="_blank">   <i class="fas fa-plus-circle"></i></button>')
                const html = `
            <div class="tile">
                <img src="${jsonObject.img_src}">
                <a href="${jsonObject.url}" class="headline-small" target="_blank">
                    ${jsonObject.headline}
                </a>
                <button class="add small margin-top" target="_blank">
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
          `;
                //check if its even or odd
                if (contentLeft == true) {
                    $(".content .left").append(html);
                    contentLeft = false;
                } else {
                    $(".content .right").append(html);
                    contentLeft = true;
                }
            }

        }
    }


}





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
