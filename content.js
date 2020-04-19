// переменные, позволяющие хранить и перезаписывать найстройки пользователя в расширении
let textToReplace = localStorage.getItem('textToReplace');
let newText = localStorage.getItem('newText');
let autoChangeText=localStorage.getItem('autoChangeText');

// применение автоматической замены текста при открытии страницы (если включена соответствующая настройка)
if(autoChangeText==="true")
    replaceText(document.body, textToReplace, newText);

/**
 * Осуществление взаимодействия pop-up формы с background скриптом при помощи отправки-получения сообщений
 * в активной вкладке с передачей в них необходимых для работы параметров.
 * Переданные параметры перезаписывают предыдущие настройки
 */
chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
    if (request.todo === "changeTexts") {

        textToReplace=request.ttp;
        newText=request.nt;
        autoChangeText=request.act;

        localStorage.setItem('textToReplace', textToReplace);
        localStorage.setItem('newText', newText);
        localStorage.setItem('autoChangeText', autoChangeText);

        replaceText(document.body, textToReplace, newText);
        sendResponse({
            response: "Message received"
        });
        return true;
    }
});

/**
 * Рекурсивно меняет содержимое дочерних элементов на заданное регулярным выражением (поиск осуществляется глобально, без учёта регистра)
 * @param elementForSearchingIn - родительский элемент, в котором будет осуществляться поиск
 * @param textToReplace - тект, который будет заменён
 * @param newText - текст, на который старый текст будет заменён
 */
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