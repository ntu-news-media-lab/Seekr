chrome.contextMenus.create({
	title: "Garage Search",
	contexts: ["selection"],
	onclick: myFunction
});

function myFunction(selectedText){
	alert("I have an idea about "+selectedText.selectionText);
	chrome.tabs.create({url:"https://www.businesstimes.com.sg/garage/search?s="+selectedText.selectionText})
}