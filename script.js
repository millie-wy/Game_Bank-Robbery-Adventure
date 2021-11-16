window.onload = main;

//state 
let username;

 const activeScene = 0;
 const scenes = [ { 
     text: "To start exploring, please let me know your name!",
     nextScene: [1]
 }, {
     text: "Welcome " + username + ", our new robber-to-be. My name is Mill and I am your trainer from InvincibleDestroyers. In order to be a part of us, you have to show us your qualification.",
     nextScene: [2]
 }];

//  function firstScene() {
//      const answer = printText('To start exploring, please let me know your name!')
//      username = answer; 
//      secondScene();
//  }


function main() {
    // firstScene();
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
    sendButton.onclick = onUserClicksSend;
}

function printText(text) {
    const divSystem = document.createElement("div-system")
    divSystem.className = 'chatbox-system flex mt-4';
    divSystem.innerHTML = text;

    document.getElementById("content").appendChild(divSystem);
}

function onUserClicksSend() {
    let input = document.getElementById("userInput").value;
    printResponse(input)
}

function printResponse(value) {
    const divUser = document.createElement("div-user")
    divUser.className = 'chatbox-user flex mt-4';
    divUser.innerHTML = value;

    document.getElementById("content").appendChild(divUser);
}