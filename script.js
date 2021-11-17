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
        printText("👾 Before we start, tell me your name! 👾")
    }, 
    onUserInput: function(text) {
        player.name = text;
        console.log(player)
        goToNextScene(1); //1 greeting
    }
}, 
{ //1 greeting
    onScene: function() {
        printTextWithDelay("<b>Mill 👩🏻:</b> Welcome " + player.name + ", our new robber-to-be. My name is Mill and I am your leader from InvincibleDestroyers. In order to be a part of us, you have to show us your qualification.", 500)
        goToNextScene(2)  //2 intro
    },
    onUserInput: function(text) {}
},
{ //2 intro
    onScene: function() {
        printTextWithDelay("<b>Mill 👩🏻:</b> Your first mission is to rob a bank without being caught. Here is a map of the city, go find the right companion and the tools to complete your mission.", 500)
        printTextWithDelay("<b>Mill 👩🏻:</b> ❗️Remember - you can get arrested if a wrong choice is made. Do you understand everything I said?" + "<br>" + "<b>1 = Yes; 2 = No.</b>", 1000)
    }, 
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(3); // 3 mill farewell    
        } else if (text === "2") {
            printTextWithDelay("<b>Mill 👩🏻:</b> Ok let me repeat.", 500);
            goToNextScene(2); // 2 intro
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},
{ //3 mill farewell
    onScene: function() {
        printTextWithDelay("<b>Mill 👩🏻:</b> Great! Come back to me once you have completed the mission. (Mill left)", 500)
        goToNextScene(4); // main street
    },
    onUserInput: function(text) {}
},

{ //4 mainstreet
    onScene: function() {
        printTextWithDelay("You are now on the main street. Where do you want to go?" + "<br>" + "<b>1 = Gun Store; 2 = Pharmacy; 3 = Department Store; 4 = Gangster Bar; 5 = Bank; 6 = Hidden tunnel (Talk to Mill)</b>", 1200)
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
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},
{ //5 hidden tunnel
    onScene: function() {
        if (!player.robbedBank) {
            printTextWithDelay("<b>Mill 👩🏻:</b> Why are you still here " + player.name + "!? Go rob the bank!", 500)
            goToNextScene(4);
        } else{
            printTextWithDelay("<b>Mill 👩🏻:</b> Good job " + player.name + "! You are now a qualified robber in InvincibleDestroyers! 🎉🎉🎉", 500)
            printTextWithDelay("(🎶plays very weird BGM🎵 )", 1000)
            printTextWithDelay("📢 If you want to restart the game, press 'Reset' above.", 1500)
        }
    }
},
{ //6 bank
    onScene: function() {
        if(!player.hasSpanner || !player.hasMask || !player.hasGun || !player.hasTravelBag || !player.hasCompanion) {
            printTextWithDelay("(At the bank)", 500)
            printTextWithDelay("You can't rob without all the tools and equipments, a weapon and a companion! Go collect them!", 1000)
            goToNextScene(4); // 4 main street
        } else if (player.robbedBank) {
            printTextWithDelay("The police are here! Go somewhere else!", 500)
            goToNextScene(4); // 4 main street
        } else {
            goToNextScene(7); // bank - rob the bank 
        }
    },
    onUserInput:function(text) {}
},

{ //7 bank - rob the bank
    onScene: function () {
        printTextWithDelay("(At the bank)", 500)
        printTextWithDelay("Looks like you are ready to rob! What do you want to do now?" + "<br>" + "<b>1 = Rob!; 2 = Don't know. Leave.</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(8); // 8 bank - choose tools to rob
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //8 bank - choose tools to rob
    onScene: function () {
        printTextWithDelay("Which tools do you use?" + "<br>" + "<b>1 = Spanner; 2 = AK-47</b>", 500)
    },
    onUserInput: function(text) {
        if (text === "1") {
            printTextWithDelay("The glass is now broken and everyone in the bank is scared. The guard has came out and is pointing a gun at you. React now!", 500)
            goToNextScene(9); // bank - second try to rob
        } else if (text === "2") {
            printTextWithDelay("🔥🔥🔥 You have successfully robbed 10M from the bank. Run back to the hidden tunnel now", 500)
            player.robbedBank = true;
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //9 bank - second try to rob
    onScene: function () {
        printTextWithDelay("What do you do now?" + "<br>" + "<b>1 = Surrender; 2 = Fire the AK-47</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            printTextWithDelay("Oops now the police has came. You are under arrested! 👮🏻‍♂️", 1000)
            goToNextScene(33); //33 gameover
        } else if (text === "2") {
            printTextWithDelay("🔥🔥🔥 You have successfully robbed 10M from the bank. Run back to the hidden tunnel now!", 500)
            player.robbedBank = true;
            goToNextScene(4);
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //10 ganster bar 
    onScene: function () {
        printTextWithDelay("(At the bar)", 500)
        if (!player.hasGun && !player.hasCompanion) {
            goToNextScene(11); // 11 ganster bar - first visit 
        } else if (player.hasGun && !player.hasCompanion) {
            goToNextScene(12); // 12 ganster bar - for companion 
        } else if (!player.hasGun && player.hasCompanion) {
            goToNextScene(13); // 13 ganster bar - for gun
        } else if (player.hasGun && player.hasCompanion) {
            printTextWithDelay("The bar is closed.", 500);
            goToNextScene(4); // 4 main street
        }
    },
    onUserInput:function(text) {}
},

{ //11 ganster bar - first visit 
    onScene: function() {
        printTextWithDelay("What do you want here?" + "<br>" + "<b>1 = Find a companion; 2 = Find an AK-47; 3 = Back to main street</b>", 500)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(12); // 12 ganster bar - for companion - choose one to talk to 
        } else if (text === "2") {
            goToNextScene(13); // 13 ganster bar - for gun - choose one to talk to 
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //12 ganster bar  - for companion - choose one to talk to 
    onScene: function() {
        printTextWithDelay("Looking for a companion?", 500)
        printTextWithDelay("Choose a person to talk to." + "<br>" + "<b>1 = Fat Roger; 2 = T-rex; 3 = Madman</b>"+ " or" + "<b> 4 = Back to main street</b>", 1000)
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
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //13 ganster bar  - for gun - choose one to talk to 
    onScene: function() {
        printTextWithDelay("Looking for an AK-47?", 500)
        printTextWithDelay("Choose a person to talk to." + "<br>" + "<b>1 = Barbara (bartender); 2 = Pablo (drug dealer)</b>" + " or" + "<b> 3 = Back to main street</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(14); // 14 ganster bar - for gun - barbara
        } else if (text === "2") {
            goToNextScene(15); // 15 ganster bar - for gun - pablo
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //14 ganster bar - for gun - barbara 
    onScene: function() {
        printTextWithDelay("<b>Barbara 🧑🏻‍🦰:</b> I have worked here for 8 years. I know the Master had one but he has not shown up for more than a month.", 500)
        printTextWithDelay("<b>Barbara 🧑🏻‍🦰:</b> Try go to the gun store and ask Fred.", 1000)
        printTextWithDelay("What do you want to do now?" + "<br>" + "<b>1 = Talk to Pablo (drug dealer); 2 = Back to the bar reception; 3 = Back to main street</b>", 2000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(15); // 15 ganster bar - for gun - pablo
        } else if (text === "2") {
            goToNextScene(10); // 10 ganster bar
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
}, 


{ //15 ganster bar - for gun - pablo
    onScene: function() {
        printTextWithDelay("<b>Pablo 👨🏼‍🦲:</b> I don't think anyone with an AK-47 nowadays would consider selling it. Would you like some candies though? :-/ ", 500)
        printTextWithDelay("What do you want to do now?" + "<br>" + "<b>1 = Talk to Barbara (bartender); 2 = Back to the bar reception; 3 = Back to main street</b>", 1500)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(14); // 14 ganster bar - for gun - barbara
        } else if (text === "2") {
            goToNextScene(10); // 10 ganster bar
        } else if (text === "3") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
}, 

{ //16 ganster bar - for companion - fat roger
    onScene: function() {
        printTextWithDelay("<b>Fat Roger 🧔🏻:</b> Bank robbing? I have done this 10+ times in the past 20 years. There was one time I got caught by the police and sat in the jail for 4 years.", 500)
        printTextWithDelay("<b>Fat Roger 🧔🏻:</b> We can do this business together but given the fact that you are so green, I want 80% of the money, otherwise we have no deal", 1000)
        printTextWithDelay("Choose Fat Roger as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>", 2000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasCompanion = true;
            console.log(player);
            goToNextScene(19); // 19 confirm companion 
        } else if (text === "2") {
            printTextWithDelay("<b>Fat Roger 🧔🏻:</b> Well. Good luck kid", 500)
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
}, 

{ //17 ganster bar - for companion - t-rex
    onScene: function() {
        printTextWithDelay("<b>T-rex 👨🏻‍🦱:</b> What do you mean robbing a bank? Which day and bank do you plan to go? What do you have now to make sure you wont get caught by the police?", 500)
        printTextWithDelay("<b>T-rex 👨🏻‍🦱:</b> Do you already have a companion? What is his name? Why not count me in?", 1000)
        printTextWithDelay("Choose T-rex as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>", 2000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            printTextWithDelay("<b>T-rex 👨🏻‍🦱:</b> Unfortunately I am an undercover police. You are under arrested! 👮🏻‍♂️", 500)
            goToNextScene(33); // 33 gameover
        } else if (text === "2") {
            printTextWithDelay("<b>T-rex 👨🏻‍🦱:</b> Hey! Are you sure?", 500)
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
}, 

{ //18 ganster bar - for companion - madman
    onScene: function() {
        printTextWithDelay("<b>Madman 👱🏻‍♂️:</b> I have just finished my 15 years of imprisonment due to murder.", 500)
        printTextWithDelay("<b>Madman 👱🏻‍♂️:</b> I have never robbed a bank but it has been my dream. Just count me in.", 1000)
        printTextWithDelay("Choose Madman as your companion?" + "<br>" + "<b>1 = Yes; 2 = No</b>", 2000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasCompanion = true;
            console.log(player);
            goToNextScene(19); // 19 confirm companion 
        } else if (text === "2") {
            printTextWithDelay("<b>Madman 👱🏻‍♂️:</b> OK. Your loss", 500)
            goToNextScene(12); //12 ganster bar  - for companion - choose one to talk to 
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //19 confirm companion 
    onScene: function() {
        printTextWithDelay("⭐️ Fantastic! You have got a <b>companion</b>!", 500)
        printTextWithDelay("What do you want to do now?" + "<br>" + "<b>1 = Stay in the bar; 2 = Back to main street</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(10); // ganster bar
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
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
            printTextWithDelay("(At department store)", 500)
            printTextWithDelay("You have spent enough time here. Let's go somewhere else!", 1000);
            goToNextScene(4); // 4 main street
        }
    },
    onUserInput: function(text) {}
},

{ //21 department stroe - first visit
    onScene: function() {
        printTextWithDelay("(At department store)", 500)
        printTextWithDelay("Seem like you may need something for robbing a bank. Let's look for them.", 1000)
        printTextWithDelay("Which section do you want to explore?" + "<br>" + "<b>1 = Tools & Equipments; 2 = Clothing; 3 = Back to main street</b>", 1500)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(23); // 23 department store - t&e 
        } else if (text === "2") {
            goToNextScene(24); // 24 department store - clothing
        } else if (text === "3") {
            goToNextScene(4) // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //22 department store - missed one thing 
    onScene: function() {
        printTextWithDelay("You are missing one tool, let's look for it!", 500)
        if (!player.hasSpanner) {
            goToNextScene(23);
        } else if (!player.hasMask) {
            goToNextScene(24);
        }
    },
},

{ //23 department store - t&e 
    onScene: function() {
        printTextWithDelay("(At Tools & Equipments)", 500);
        printTextWithDelay("What about a spanner." + "<br>" + "<b>1 = Look for a spanner; 2 = It's fine. Back to main street</b>", 1000)
        },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasSpanner = true;
            console.log(player);
            goToNextScene(25); // 25 department store - confirm tool spanner 
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //24 department store - clothing 
    onScene: function() {
        printTextWithDelay("(At Clothing)", 500);
        printTextWithDelay("A mask may actually be necessary!" + "<br>" + "<b>1 = Look for a mask; 2 = It's fine. Back to main street</b>", 1000)
        },
    onUserInput: function(text) {
        if (text === "1") {
            player.hasMask = true;
            console.log(player);
            goToNextScene(26); // 26 department store - confirm tool mask
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //25 department store - confirm tool spanner
    onScene: function() {
        printTextWithDelay("⭐️ Nice! You have got a <b>spanner</b>!", 500)
        printTextWithDelay("What do you want to do now?" + "<br>" + "<b>1 = Back to lobby; 2 = Back to main street</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(20); // 20 department store
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //26 department store - confirm tool mask
    onScene: function() {
        printTextWithDelay("⭐️ Wow! You have got a <b>mask</b>!", 500)
        printTextWithDelay("What do you want to do now?" + "<br>" + "<b>1 = Back to lobby; 2 = Back to main street</b>", 1000)
    },
    onUserInput: function(text) {
        if (text === "1") {
            goToNextScene(20); // 20 department store 
        } else if (text === "2") {
            goToNextScene(4); // 4 main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //27 gun store 
    onScene: function() {
        printTextWithDelay("(At gun store)", 500)
        if (!player.visitedGunStore) {
            goToNextScene(28); // 28 gun store - first visit
        } else if (player.hasGun) {
            printTextWithDelay("The gun store is closed.", 1000)
            goToNextScene(4); // 4 main street
        } else if (player.visitedGunStore && !player.hasTravelBag) {
            printTextWithDelay("<b>Fred 👴🏻:</b> Get me the bag, or I will not sell the gun!", 1000)
            goToNextScene(4); // 4 main street
        } else if (player.visitedGunStore && player.hasTravelBag) {
            printTextWithDelay("<b>Fred 👴🏻:</b> Good job! Here is the gun.", 500)
            printTextWithDelay("<b>Fred 👴🏻:</b> Hold on - Take this empty travel bag with you, otherwise you will be caught if they see you carrying an AK-47.", 800)
            printTextWithDelay("⭐️ You have got an <b>AK-47</b>!", 1100)
            player.hasTravelBag = true;
            player.hasGun = true;
            goToNextScene(4); // 4 main street 
        }
    }
},

{ // 28 gun store - first visit
    onScene: function() {
        printTextWithDelay("<b>Fred 👴🏻:</b> Welcome to Westcoast’s Guns, what can I help you?" + "<br>" + "<b>1 = Ask 'Do you know how to rob a bank?'; 2 = 'Buy an AK-47'; 3 = Back to main street</b>", 1000)
    },
    onUserInput(text) {
        if(text === "1") {
            printTextWithDelay("<b>Fred 👴🏻:</b> No joking, dude.", 500)
            goToNextScene(28);
        } else if (text === "2") {
            goToNextScene(29);
        } else if (text === "3") {
            goToNextScene(4);
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //29 gun store - tell me more 
    onScene: function() {
        printTextWithDelay("<b>Fred 👴🏻:</b> It is forbidden to sell AK-47 in Westcoast after the vault robbery by the gang InvincibleDestroyers last month. But I have one myself. If you do me a favour I may consider selling you that privately." + "<br>" + "<b>1 = OK tell me more</b>", 500)
    },
    onUserInput(text) {
        if (text === "1") {
            player.visitedGunStore = true;
            console.log(player);
            printTextWithDelay("<b>Fred 👴🏻:</b> Find the locker in the pharmacy. Type in the code 4698 and bring back the travel bag, and I will sell you the gun. Good luck!", 500)
            goToNextScene(4);
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //30 pharmacy 
    onScene: function() {
        if (!player.visitedGunStore) {
            printTextWithDelay("The pharmacy is not opened yet. Explore the other places first!", 500)
            goToNextScene(4);
        } else if (player.hasTravelBag) {
            printTextWithDelay("There is nothing else to do here. Let's go somewhere else!", 500)
            goToNextScene(4);
        } else {
            goToNextScene(31);
        }
    },
},

{ //31 pharmacy - find bag 
    onScene: function() {
        printTextWithDelay("(At pharmacy)", 500);
        printTextWithDelay("How do you want to find the locker?" + "<br>" + "<b>1 = Ask a staff; 2 = Look for it yourself; 3 = Back to main street</b>", 1000)
    },
    onUserInput(text) {
        if (text === "1") {
            printTextWithDelay("<b>Staff 🧑🏻‍⚕️:</b> The locker is located beside the cashier", 500)
            printTextWithDelay("Hmm... Let's see...", 1000)
            goToNextScene(32); // pharmacy - crack the code
        } else if (text === "2") {
            printTextWithDelay("Let's see...", 500)
            goToNextScene(32); // pharmacy - crack the code
        } else if (text === "3") {
            goToNextScene(4); // main street
        } else {
            printTextWithDelay("❌ Invalid option, try again!", 500);
        }
    },
},

{ //32 pharmacy - crack the code 
    onScene: function() {
        printTextWithDelay("You have found the locker! But what is the passcode?" + "<br>" + "<b>1 = 4589; 2 = 4689; 3 = 4789</b>", 2000)
    },
    onUserInput(text) {
        if (text === "2") {
            printTextWithDelay("(Locker opens)", 500)
            printTextWithDelay("⭐️ You have got the <b>travel bag</b>!", 1000)
            player.hasTravelBag = true;
            goToNextScene(4)
        } else {
            printTextWithDelay("Wrong passcode. Try again!", 500)
        }
    },
},

{ //33 gameover
    onScene: function() {
        printTextWithDelay("<b>GAMEOVER 🤯</b>", 1500)
        printTextWithDelay("📢 If you want to restart the game, press 'Reset' above.", 2000)
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
    resetButton.onclick = resetAll; 

    const scrollToBottom = document.getElementById("content");
    scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
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
    document.getElementById('content').innerHTML = "";
    window.location.reload() 
}

function printTextWithDelay(text, delay) {
    setTimeout(function() {
        printText(text);
    }, delay)
}

function printUserText(text) {
    console.log(text);
    let divUser = document.createElement("div");
    divUser.className = 'chatbox-user';
    divUser.innerHTML = text;
    document.getElementById('content').appendChild(divUser);
    divUser.scrollIntoView();
}

function printText(text) {
    let divSystem = document.createElement("div");
    divSystem.className = 'chatbox-system';
    divSystem.innerHTML = text;
    document.getElementById('content').appendChild(divSystem);
    divSystem.scrollIntoView();
}