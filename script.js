window.onload = main;

const activeScene = 0;
const scenes = [ { 
    text: "To start exploring, please let me know your name!",
    nextScene: [1],
}, {
    text: "Welcome " + [name] +", our new robber-to-be. My name is Mill and I am your trainer from InvincibleDestroyers. In order to be a part of us, you have to show us your qualification.",
    nextScene: [0]
}];


function main() {
    renderScene();
    addEventListener();
}

function goToNextScene(scene)
{
    //printText('goToNextScene')
}
function renderScene() 
{
    //printText("renderScene")
    printText(scenes[activeScene].text)

    // let userInput = prompt('select an option')
    
}

function addEventListener() {
    const sendButton = document.getElementById("sendResponse");
    sendButton.onclick = onUserClicksSend
}

function onUserClicksSend() {
    let input = document.getElementById("userInput").value;
    printText(input)
}

function printText(text) {
    const div = document.createElement("div")
    div.className = 'chatbox-system flex mt-4';
    div.innerHTML = text ;

    document.getElementById("content").appendChild(div);
}



