
$(".section #search").click(function () {
    goHome();
});

$(".section #related-news").click(function(){
    goRelatedNews();
});

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