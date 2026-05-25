const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let boxOne = document.getElementById("box-1")
let boxTwo = document.getElementById("box-2")
let boxThree = document.getElementById("box-3")
let boxFour = document.getElementById("box-4")
const boxCycle = [boxOne,boxTwo,boxThree,boxFour]

let password = "";

const passLengthInput = document.getElementById("input-password-length");

function getPasswordLength(){
    const length = parseInt(passLengthInput.value, 10);
    if(Number.isNaN(length) || length < 1){
        return 16;
    }
    return length;
}

function getSelectedCharacterSet(){
    const selection = document.getElementById("charset-select").value;
    const selectedChars = [...letters];

    if(selection === "letters-numbers" || selection === "all"){
        selectedChars.push(...numbers);
    }
    if(selection === "letters-symbols" || selection === "all"){
        selectedChars.push(...symbols);
    }

    return selectedChars;
}

function generateRandomPassword(){
    const characters = getSelectedCharacterSet();
    password = "";

    if(characters.length === 0){
        return password;
    }

    const length = getPasswordLength();
    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function renderRandomPassword(){
    for(i = 0; i < boxCycle.length; i++){
        generateRandomPassword()
        boxCycle[i].textContent = password
    }
}

function showCopyToast(){
    const toast = document.getElementById("copy-toast");
    toast.classList.add("show");
    window.clearTimeout(showCopyToast.timeoutId);
    showCopyToast.timeoutId = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 1400);
}

function copyOnClick(element){
    navigator.clipboard.writeText(element.textContent).then(() => {
        showCopyToast();
    }).catch((error) => {
        console.error("Copy failed:", error);
    });
}

function scalePage() {
    const baseWidth = 1920; // Your design's width
    const scale = Math.min(window.innerWidth / baseWidth, 1.5); // Limit max scale
    document.body.style.transform = `scale(${scale})`;
    document.body.style.width = `${baseWidth}px`; // Prevent horizontal scroll
}

window.addEventListener('resize', scalePage);
scalePage(); // Initial call   