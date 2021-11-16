window.onload = main;

function main() {
    addEventListeners();
}

// Scenes start 

let player = {
    name: "", 
    hasAllTools: false, 
    hasGun: false,
    hasCompanion: false,
    hasTravelBag: false,
    robbedBank: false,
}

let activeScene = 0;
let scenes = [
{ //0. input name
    onScene: function() {                                   //what is function()
        printText("Before we start, tell me your name!")
    }, 
    onUserInput: function(text) {
        player.name = text;
        goToNextScene(1); //1 greeting
    }
}, 
{ //1 greeting
    onScene: function() {
        printText("Welcome " + player.name + ", our new robber-to-be. My name is Mill and I am your trainer from InvincibleDestroyers. In order to be a part of us, you have to show us your qualification.")
        goToNextScene(2)  //2 intro
    },
    onUserInput: function(text) {}
},
{ //2 intro
    onScene: function() {
        printText("Your first mission is to rob a bank without being caught. Here is a map of the city, go find the right companions and the tools to complete your mission.")
        printText("Remember - you can get arrested if a wrong choice is made. Do you understand everything I said?" + "<br>" + "<b>1 = Yes; 2 = No.</b>")
    }, 
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(3); //4. mill farewell    
        } else if (text === "2") {
            printText("Ok let me repeat.");
            goToNextScene(2); 
        } else {
            printText("Invalid option, try again!");
        }
    },
},
{ //3 mill farewell
    onScene: function() {
        printText("Great! Come back to me once you have completed the mission. (Mill left)")
        goToNextScene(4);
    },
    onUserInput: function(text) {}
},

{ //4 mainstreet
    onScene: function() {
        printText("You are now on the main street. Where do you want to go?" + "<br>" + "<b>1 = Gun Store; 2 = Department Store; 3 = Gangster Bar; 4 = Bank; 5 = Hidden tunnel (Talk to Mill)</b>")
    }, 
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(3);    
        } else if (text === "2") {
            printText("Ok let me repeat.");
            goToNextScene(2); 
        } else if (text === "3") { // 10 ganster bar
            goToNextScene(10); 
        } else if (text === "4") {  // 6 bank
            goToNextScene(6); 
        } else if (text === "5") { // 5 hidden tunnel 
            goToNextScene(5); 
        } else {
            printText("Invalid option, try again!");
        }
    },
},
{ //5 hidden tunnel
    onScene: function() {
        if (!player.robbedBank) {
            printText("Why are you still here!? Go rob the bank!")
            goToNextScene(4);
        } else {
            printText("Good job [name]! You are now a qualified robber in InvincibleDestroyers, bro!")
            printText("(plays very strange BGM)")
            printText("If you want to restart the game, press 'Reset' above.")
        }
    }
},
{ //6 bank
    onScene: function() {
        if(!player.hasAllTools || !player.hasGun || !player.hasTravelBag || !player.hasCompanion) {
            printText("(At the bank)")
            printText("Why am I here? I cant do anything without all the tools and equipments, weapon and a companion ...")
            goToNextScene(4);
        } else {
            goToNextScene(7);
        }
    },
    onUserInput:function(text) {}
},

{ //7 bank - rob the bank
    onScene: function () {
        printText("(At the bank)")
        printText("Looks like you are ready to rob! What do you want to do now?" + "<br>" + "<b>1 = Rob!; 2 = Don't know. Leave.</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(8);
        } else if (text === "2") {
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //8 bank - choose tools to rob
    onScene: function () {
        printText("Which tools do you use?" + "<br>" + "<b>1 = Spanner; 2 = AK-47</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            printText("The glass is now broken and everyone in the bank is looking at you. The guard comes out and pointing a gun to you. React now!")
            goToNextScene(9);
        } else if (text === "2") {
            printText("You have successfully robbed 10M from the bank. Run back to the hidden tunnel now!")
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //9 bank - second try to rob
    onScene: function () {
        printText("What do you do now?" + "<br>" + "<b>1 = Surrender; 2 = Fire the AK-47</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            printText("Oops now the police has came. You are under arrested")
            printText("<b>GAMEOVER</b>")
            printText("If you want to restart the game, press 'Reset' above.")
        } else if (text === "2") {
            printText("You have successfully robbed 10M from the bank. Run back to the hidden tunnel now!")
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //10 ganster bar 
    onScene: function () {
        printText("At the bar")
        if (!player.hasGun && !player.hasCompanion) {
            goToNextScene(11); // 11 ganster bar - first visit 
        } else if (!player.hasGun && player.hasCompanion) {
            goToNextScene(12); // 12 ganster bar - for companion 
        } else if (player.hasGun && !player.hasCompanion) {
            goToNextScene(13); // 13 ganster bar - for gun
        } else if (player.hasGun && player.hasCompanion) {
            printText("The bar is closed");
            goToNextScene(4); // 4 main street
        }
    },
    onUserInput:function(text) {}
},

{ //11 ganster bar - first visit 
    onScene: function() {
        printText("What do you want here?" + "<br>" + "<b>1 = Find a companion; 2 = Find an AK-47; 3 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(12); // 12 ganster bar - for companion - choose one to talk to 
        } else if (text === "2") {
            goToNextScene(13); // 13 ganster bar - for gun - choose one to talk to 
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //12 ganster bar  - for companion - choose one to talk to 
    onScene: function() {
        printText("Looking for a companion?")
        printText("Choose a person to talk to." + "<br>" + "<b>1 = Fat Roger; 2 = T-rex; 3= Madman" + " or" + "<b> 4 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(16); // 16 ganster bar - for companion - fat roger
        } else if (text === "2") {
            goToNextScene(17); // 17 ganster bar - for companion - t-tex
        } else if (text === "3") {
            goToNextScene(18); // 18 ganster bar - for companion - Madman
        } else if (text === "4") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //13 ganster bar  - for gun - choose one to talk to 
    onScene: function() {
        printText("Looking for an AK-47?")
        printText("Choose a person to talk to." + "<br>" + "<b>1 = Barbara (bartender); 2 = Pablo (drug dealer)</b>" + " or" + "<b> 3 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(14); // 14 ganster bar - for gun - barbara
        } else if (text === "2") {
            goToNextScene(15); // 15 ganster bar - for gun - pablo
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //14 ganster bar - for gun - barbara 
    onScene: function() {
        printText("Barbara: I have worked here for 8 years. I know the Master had one but he has not shown up for more than a month.")
        printText("Barbara: Try go to the gun store and ask Fred.")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Talk to Pablo (drug dealer); 2 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(15); // 15 ganster bar - for gun - pablo
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 


{ //14 ganster bar - for gun - pablo
    onScene: function() {
        printText("Pablo: I don't think anyone with an AK-47 nowadays would consider selling it. Would you like some candies though? :-/ ")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Talk to Barbara (bartender); 2 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(14); // 14 ganster bar - for gun - barbara
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 


]

// Functions

function addEventListeners() {
    const sendButton = document.getElementById('sendResponse');
    sendButton.onclick = onUserInput; 

    const startButton = document.getElementById('start-button');
    startButton.onclick = renderScene; 

    const resetButton = document.getElementById('reset-button');
    resetButton.onclick = resetAll; // not completed
}

function onUserInput() {
    let answer = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ""; //dont understand this line
    printUserText("Your input: " + answer)

    console.log("activeScene", activeScene)
    scenes[activeScene].onUserInput(answer); //dont understand this line
}

function renderScene() {
    scenes[activeScene].onScene() //What is onScene?
}

function goToNextScene(newScene) {  //dont understand
    console.log("Going from scene: " + activeScene + " to " + newScene)
    activeScene = newScene; 
    renderScene();
}

function resetAll() {  // check later!
    document.getElementById('content').value = "";
    scenes[activeScene].onScene()
}

function printUserText(text) {
    console.log(text);
    let divUser = document.createElement("div");
    divUser.className = 'chatbox-user';
    divUser.innerHTML = text; // how do i know this = text?
    document.getElementById('content').appendChild(divUser);
}

function printText(text) {
    let divSystem = document.createElement("div");
    divSystem.className = 'chatbox-system';
    divSystem.innerHTML = text;
    document.getElementById('content').appendChild(divSystem);
}