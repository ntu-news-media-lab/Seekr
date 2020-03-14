var port = null;

connect();

$(".search-btn").click(function () {
    var str = $(".search-txt").val();
    chrome.storage.local.set({ searchResult: str }, function () {
        console.log('Value is set to ' + str);
    });
    sendNativeMessage();
    // loadInvestopedia(investopedia_json, str);
    // loadDictionary(dictionary_json, str);
    // alert(str);
});

function connect() {
    var hostName = "com.google.chrome.example.webcrawler";
    // appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
}

function sendNativeMessage() {
    message = $(".search-txt").val()
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
    console.log(JSON.stringify(message).substr(1,1));
    console.log(JSON.stringify(message).substr(3,JSON.stringify(message).length-4));

    if(JSON.stringify(message).substr(1,1) =="I"){
        updateInvestopedia(JSON.stringify(message).substr(3,JSON.stringify(message).length-4))
    }else{
        updateDictionary(JSON.stringify(message).substr(3,JSON.stringify(message).length-4))
    }
  }





$(".section #related-news").click(function () {
    goRelatedNews();
});


$(".section #checklist").click(function () {
    goChecklist();
});


function updateInvestopedia(message){
    let defination = $(".search-txt").val();;
    let explaination = message;
    const html = `
    <div class="defination">
    <h2>${defination}</h2>
        <p>
            ${explaination}
        </p>
    
    </div>
  `;
  $(".investopedia .defination").replaceWith(html);
}

function updateDictionary(message){
    let defination = $(".search-txt").val();;
    let explaination = message;
    const html = `
    <div class="defination">
    <h2>${defination}</h2>
        <p>
            ${explaination}
        </p>
    
    </div>
  `;
    $(".dictionary .defination").replaceWith(html);
}



$('#close-icon').click(function () {
    console.log('close');
    window.close();
})


$(".tab-container .button-container #investopedia-button").click(function () {
    showPanel(0, "#f44336");
});


$(".tab-container .button-container #dictionary-button").click(function () {
    showPanel(1, "#2196f3");
});


var tabButtons = document.querySelectorAll(".tab-container .button-container button");
var tabPanels = document.querySelectorAll(".tab-container .tab-panel");

function showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function (node) {
        node.style.backgroundColor = "";
        node.style.color = "";
    });
    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });
    tabButtons[panelIndex].style.backgroundColor = colorCode;
    tabButtons[panelIndex].style.color = "white";
    tabPanels[panelIndex].style.display = "block";
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}

showPanel(0, "#f44336");

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


// old codes
// function loadInvestopedia(json, searchResult) {
//     let defination = "cannot be found";
//     let explaination = "cannot be found";
//     var i;
//     for (i = 0; i < json.length; i++) {
//         if (searchResult.toLowerCase() == json[i].keyword.toLowerCase()) {
//             var jsonObject = json[i]
//             defination = searchResult
//             explaination = jsonObject.defination

//         }
//     }
//     const html = `
//     <div class="defination">
//     <h2>${defination}</h2>
//         <p>
//             ${explaination}
//         </p>
    
//     </div>
//   `;
//     $(".investopedia .defination").replaceWith(html);

// }

// function loadDictionary(json, searchResult) {
//     let defination = "cannot be found";
//     let explaination = "cannot be found";
//     var i;
//     for (i = 0; i < json.length; i++) {
//         if (searchResult.toLowerCase() == json[i].keyword.toLowerCase()) {
//             var jsonObject = json[i]
//             defination = searchResult
//             explaination = jsonObject.defination
//         }

//     }
//     const html = `
//     <div class="defination">
//     <h2>${defination}</h2>
//         <p>
//             ${explaination}
//         </p>
    
//     </div>
//   `;
//     $(".dictionary .defination").replaceWith(html);

// }
