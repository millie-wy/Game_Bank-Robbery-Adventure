window.onload = main;

function main() {
    addEventListeners();
}

// Scenes start 

let player = {
    name: "", 
    hasSpanner: false,
    hasMask: false,
    hasGun: false,
    hasCompanion: false,
    hasTravelBag: false,
    robbedBank: false,
    visitedGunStore: false,
}  
console.log(player)

let activeScene = 0;
let scenes = [
{ //0. input name
    onScene: function() {                                   //what is function()
        printText("Before we start, tell me your name!")
    }, 
    onUserInput: function(text) {
        player.name = text;
        console.log(player)
        goToNextScene(1); //1 greeting
    }
}, 
{ //1 greeting
    onScene: function() {
        printText("<b>Mill:</b> Welcome " + player.name + ", our new robber-to-be. My name is Mill and I am your trainer from InvincibleDestroyers. In order to be a part of us, you have to show us your qualification.")
        goToNextScene(2)  //2 intro
    },
    onUserInput: function(text) {}
},
{ //2 intro
    onScene: function() {
        printText("<b>Mill:</b> Your first mission is to rob a bank without being caught. Here is a map of the city, go find the right companions and the tools to complete your mission.")
        printText("<b>Mill:</b> Remember - you can get arrested if a wrong choice is made. Do you understand everything I said?" + "<br>" + "<b>1 = Yes; 2 = No.</b>")
    }, 
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(3); //4. mill farewell    
        } else if (text === "2") {
            printText("<b>Mill:</b> Ok let me repeat.");
            goToNextScene(2); 
        } else {
            printText("Invalid option, try again!");
        }
    },
},
{ //3 mill farewell
    onScene: function() {
        printText("<b>Mill:</b> Great! Come back to me once you have completed the mission. (Mill left)")
        goToNextScene(4);
    },
    onUserInput: function(text) {}
},

{ //4 mainstreet
    onScene: function() {
        printText("You are now on the main street. Where do you want to go?" + "<br>" + "<b>1 = Gun Store; 2 = Pharmacy; 3 = Department Store; 4 = Gangster Bar; 5 = Bank; 6 = Hidden tunnel (Talk to Mill)</b>")
    }, 
    onUserInput: function(text) { // 27 gun store
        if (text === "1") {
            goToNextScene(27);    
        } else if (text === "2") { // 30 pharmacy
            goToNextScene(30);
        } else if (text === "3") { // 20 department store
            goToNextScene(20); 
        } else if (text === "4") { // 10 ganster bar
            goToNextScene(10); 
        } else if (text === "5") {  // 6 bank
            goToNextScene(6); 
        } else if (text === "6") { // 5 hidden tunnel 
            goToNextScene(5); 
        } else {
            printText("Invalid option, try again!");
        }
    },
},
{ //5 hidden tunnel
    onScene: function() {
        if (!player.robbedBank) {
            printText("<b>Mill:</b> Why are you still here " + player.name + "!? Go rob the bank!")
            goToNextScene(4);
        } else {
            printText("Good job " + player.name + "! You are now a qualified robber in InvincibleDestroyers, bro!")
            printText("(plays very strange BGM)")
            printText("If you want to restart the game, press 'Reset' above.")
        }
    }
},
{ //6 bank
    onScene: function() {
        if(!player.hasSpanner || !player.hasMask || !player.hasGun || !player.hasTravelBag || !player.hasCompanion) {
            printText("(At the bank)")
            printText("Why am I here? I can't do anything without all the tools and equipments, a weapon and a companion...")
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
            goToNextScene(33); //33 gameover
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
        printText("Choose a person to talk to." + "<br>" + "<b>1 = Fat Roger; 2 = T-rex; 3 = Madman</b>"+ " or" + "<b> 4 = Back to main street</b>")
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
        printText("<b>Barbara:</b> I have worked here for 8 years. I know the Master had one but he has not shown up for more than a month.")
        printText("<b>Barbara:</b> Try go to the gun store and ask Fred.")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Talk to Pablo (drug dealer); 2 = Back to the bar reception; 3 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(15); // 15 ganster bar - for gun - pablo
        } else if (text === "2") {
            goToNextScene(10); // 10 ganster bar
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 


{ //15 ganster bar - for gun - pablo
    onScene: function() {
        printText("<b>Pablo:</b> I don't think anyone with an AK-47 nowadays would consider selling it. Would you like some candies though? :-/ ")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Talk to Barbara (bartender); 2 = Back to the bar reception; 3 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(14); // 14 ganster bar - for gun - barbara
        } else if (text === "2") {
            goToNextScene(10); // 10 ganster bar
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 

{ //16 ganster bar - for companion - fat roger
    onScene: function() {
        printText("<b>Fat Roger:</b> Bank robbing? I have done this 10+ times in the past 20 years. There was one time I got caught by the police and sat in the jail for 4 years.")
        printText("<b>Fat Roger:</b> We can do this business together but given the fact that you are so green, I want 80% of the money, otherwise we have no deal")
        printText("Choose Fat Roger as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasCompanion = true;
            console.log(player);
            goToNextScene(19); // 19 confirm companion 
        } else if (text === "2") {
            printText("<b>Fat Roger:</b> Well. Good luck kid")
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 

{ //17 ganster bar - for companion - t-rex
    onScene: function() {
        printText("<b>T-rex:</b> What do you mean robbing a bank? Which day and bank do you plan to go? What do you have now to make sure you wont get caught by the police?")
        printText("<b>T-rex:</b> Do you already have a companion? What is his name? Why not count me in?")
        printText("Choose T-rex as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            printText("<b>T-rex</b> Unfortunately I am an undercover police. You are under arrested")
            goToNextScene(33); // 33 gameover
        } else if (text === "2") {
            printText("<b>T-rex:</b> Hey! Are you sure?")
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printText("Invalid option, try again!");
        }
    },
}, 

{ //18 ganster bar - for companion - madman
    onScene: function() {
        printText("<b>Madman:</b> I have just finished my 15 years of imprisonment due to murder.")
        printText("<b>Madman:</b> I have never robbed a bank but it has been my dream. Just count me in.")
        printText("Choose Madman as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasCompanion = true;
            console.log(player);
            goToNextScene(19); // 19 confirm companion 
        } else if (text === "2") {
            printText("<b>Madman:</b> OK. Your loss")
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //19 confirm companion 
    onScene: function() {
        printText("Nice! You have a companion!")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Stay in the bar; 2 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(10);
        } else if (text === "2") {
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //20 department store 
    onScene: function() {
        if (!player.hasSpanner && !player.hasMask) {
            goToNextScene(21); // 21 department store - first visit 
        } else if (!player.hasSpanner || !player.hasMask) {
            goToNextScene(22); // 22 ganster bar - missed one thing
        } else if (player.hasSpanner && player.hasMask) {
            printText("(At department store)")
            printText("You have spent enough time here. Let's go somewhere else!");
            goToNextScene(4); // 4 main street
        }
    },
    onUserInput: function(text) {}
},

{ //21 department stroe - first visit
    onScene: function() {
        printText("(At department store)")
        printText("Seem like you may need something for robbing a bank. Let's look for them.")
        printText("Which section do you want to explore?" + "<br>" + "<b>1 = Tools & Equipments; 2 = Clothing; 3 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(23); // 23 department store - t&e 
        } else if (text === "2") {
            goToNextScene(24); // 24 department store - clothing
        } else if (text === "3") {
            goToNextScene(4) // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //22 department store - missed one thing 
    onScene: function() {
        printText("You are missing one tool, let's look for it!")
        if (!player.hasSpanner) {
            goToNextScene(23);
        } else if (!player.hasMask) {
            goToNextScene(24);
        }
    },
},

{ //23 department store - t&e 
    onScene: function() {
        printText("(At Tools & Equipments)");
        printText("What about a spanner." + "<br>" + "<b>1 = Look for a spanner; 2 = It's fine. Back to main street</b>")
        },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasSpanner = true;
            console.log(player);
            goToNextScene(25); // 25 department store - confirm tool spanner 
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //24 department store - clothing 
    onScene: function() {
        printText("(At Clothing)");
        printText("A mask may actually be necessary!" + "<br>" + "<b>1 = Look for a mask; 2 = It's fine. Back to main street</b>")
        },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasMask = true;
            console.log(player);
            goToNextScene(26); // 26 department store - confirm tool mask
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //25 department store - confirm tool spanner
    onScene: function() {
        printText("Nice! You have a <b>spanner</b>!")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Back to lobby; 2 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(20); // 20 department store
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //26 department store - confirm tool mask
    onScene: function() {
        printText("Nice! You have a <b>mask</b>!")
        printText("What do you want to do now?" + "<br>" + "<b>1 = Back to lobby; 2 = Back to main street</b>")
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(20); // 20 department store 
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //27 gun store 
    onScene: function() {
        printText("At gun store")
        if (!player.visitedGunStoreOnce) {
            goToNextScene(28); // 28 gun store - first visit
        } else if (player.visitedGunStoreOnce && !player.hasTravelBag) {
            printText("Get me the bag, or I will not sell the gun!")
            goToNextScene(4); // 4 main street
        } else if (player.visitedGunStoreOnce && player.hasTravelBag) {
            printText("Good job! Here is the gun.")
            printText("Hold on - Take this empty travel bag with you, otherwise you will be caught if they see you have a AK-47.")
            player.hasTravelBag = true;
            player.hasGun = true;
            goToNextScene(4); // 4 main street 
        }
    }
},

{ // 28 gun store - first visit
    onScene: function() {
        printText("<b>Fred:</b> Welcome to Westcoast’s Guns, what can I help you?" + "<br>" + "<b>1 = Ask 'Do you know how to rob a bank?'; 2 = 'Buy an AK-47'</b>")
    },
    onUserInput(text) {
        if(text === "1") {
            printText("<b>Fred:</b> No joking, dude.")
            goToNextScene(28);
        } else if (text === "2") {
            goToNextScene(29);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //29 gun store - tell me more 
    onScene: function() {
        printText("<b>Fred:</b> It is forbidden to sell AK-47 in Westcoast after the vault robbery by the gang InvincibleDestroyer last month. But I have one myself. If you do me a favour I may consider selling you that privately." + "<br>" + "<b>1 = OK tell me more</b>")
    },
    onUserInput(text) {
        if (text === "1") {
            printText("<b>Fred:</b> Find the locker in the pharmacy. Type in the code 4698 and bring back the travel bag, and I will sell you the gun. Good luck!")
            visitedGunStore = true;
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //30 pharmacy 
    onScene: function() {
        if (!player.visitedGunStore) {
            printText("The pharmacy is not opened yet. Explore the other places first!")
            goToNextScene(4);
        } else if (player.hasTravelBag) {
            printText("There is nothing else to do here. Let's go somewhere else!")
            goToNextScene(4);
        } else {
            goToNextScene(31);
        }
    },
},

{ //31 pharmacy - find bag 
    onScene: function() {
        printText("At pharmacy");
        printText("How do you want to find the locker?" + "<br>" + "<b>1 = Ask a staff; 2 = Look for it yourself; 3 = Back to main street</b>")
    },
    onUserInput(text) {
        if (text === "1") {
            printText("<b>Staff:</b> The locker is located beside the cashier")
            goToNextScene(32);
        } else if (text === "2") {
            printText("Let's see...")
            goToNextScene(32);
        } else if (text === "3") {
            goToNextScene(4);
        } else {
            printText("Invalid option, try again!");
        }
    },
},

{ //32 pharmacy - crack the code 
    onScene: function() {
        printText("You have found the locker! But what is the passcode" + "<br>" + "<b>1 = 4589; 2 = 4689; 3 = 4789</b>")
    },
    onUserInput(text) {
        if (text === "2") {
            printText("(Locker opens)")
            printText("You have got the travel bag!")
            player.hasTravelBag = true;
            goToNextScene(4)
        } else {
            printText("Wrong passcode. Try again!")
        }
    },
},


{ //33 gameover
    onScene: function() {
        printText("<b>GAMEOVER</b>")
        printText("If you want to restart the game, press 'Reset' above.")
    },
    onUserInput: function(text) {}
}

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