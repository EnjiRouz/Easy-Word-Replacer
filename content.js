chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
    if (request.todo === "changeTexts") {
        replaceText(document.body, request.ttp, request.nt);
        sendResponse({
            response: "Message received"
        });
        return true;
    }
});

function replaceText(elementForSearchingIn, textToReplace, newText) {
    let regex = new RegExp(textToReplace, "gi");

    if(elementForSearchingIn.hasChildNodes()){
        elementForSearchingIn.childNodes.forEach(function(node) {
            replaceText(node, textToReplace, newText)
        });
    } else if(elementForSearchingIn.nodeType===Text.TEXT_NODE){
        elementForSearchingIn.textContent=elementForSearchingIn.textContent.replace(regex, newText);
    }
}