window.onload = main;

const activeScene = 0;
const scenes = [ {
    text: "Choose 1 or 2",
    nextScene: [1,4,6],
}, {
    text: "oj",
    nextScene: [0]
}];


function main() {
    renderScene();
}

function goToNextScene(scene)
{
    console.log('goToNextScene')
}
function renderScene() 
{
    console.log('renderScene')
    prompt(scenes[activeScene].text)
    let userInput = prompt('select an option')
    
}




