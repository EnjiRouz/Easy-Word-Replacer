let textToReplace = localStorage.getItem('textToReplace');
let newText = localStorage.getItem('newText');

let submitButton = document.getElementById("submit");
if(submitButton) {
    submitButton.addEventListener("click", changeTexts);
}

function changeTexts() {
    textToReplace = document.getElementById("textToReplace").value;
    newText = document.getElementById("newText").value;

    localStorage.setItem('textToReplace', textToReplace);
    localStorage.setItem('newText', newText);

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "changeTexts", ttp: textToReplace, nt: newText});
    })
}