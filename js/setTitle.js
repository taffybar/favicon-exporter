function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

function setTitle (onFinished) {
    chrome.runtime.sendMessage({ type: "tabId" }, info => {
        var tabInfoString = "|%" + info.tabId + "%|";
        if (document.title.indexOf(tabInfoString) < 0) {
            var hostname = extractHostname(info.url);
            document.title = hostname + " - " + document.title + " " + tabInfoString;
        }
        onFinished()
    });
};

function setTitleIndefinitely () {
    setTitle(function() {
        setTimeout(setTitleIndefinitely, 60000);
    });
}

setTitle(function () {});
setTimeout(setTitleIndefinitely, 1000);

