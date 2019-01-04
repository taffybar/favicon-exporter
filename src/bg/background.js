chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.type == "tabId") {
        sendResponse({tabId: sender.tab.id, url: sender.tab.url});
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.favIconUrl) {
        var imageXHR = new XMLHttpRequest();
        var favicon = info.favIconUrl;
        imageXHR.open("GET", favicon, true);
        imageXHR.responseType = "blob";
        imageXHR.onreadystatechange = function (){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:5000/setTabImageData/" + tabId, true);
            xhr.send(imageXHR.response);
        }
        imageXHR.send();
    }
});
