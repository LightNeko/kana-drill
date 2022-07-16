//HTML elements
var drill = document.getElementById("drill")
var stats = document.getElementById("stats")
var kanaTable = document.getElementById("kana-table")
var mainMenu = document.getElementById("main-menu")
var showKana = document.getElementById("show-kana")
//buttons
var startBtn = document.getElementById("start-btn")
var backBtn = document.getElementById("back-btn")
var backBtn2 = document.getElementById("back-btn2")
var hiraganaBtn = document.getElementById("hiragana-btn")
var katakanaBtn = document.getElementById("katakana-btn")
var clearBtn = document.getElementById("clear-btn")
//other variables
var firstUse = true;
var c //kana choice
var preRandom = -1
//arrays
var halted = []
var level00 = []
var level01 = []
var level02 = []
var level03 = []
var level04 = []
var level05 = []
var level06 = []
var level07 = []
var level08 = []
var level09 = []
var level10 = []

// save system

localStorage.setItem('clear', JSON.stringify(kanadict)) //save a version of clean data for the purpose of clearing data

// check if any data is stored on the browser
if (JSON.parse(localStorage.getItem('level'))){
   console.log("data found")
   kanadict = JSON.parse(localStorage.getItem('level'))
} else {
    console.log("no data found")
}

// setting up intreface

drill.style.display = "none";
kanaTable.style.display = "none";



//set of probability functions (higher levels means that characters are proposed less frequently)
var probabilitilized = new Probability({
    p: '35%',                               //this indicates the probability for the function to happen                               
    f: function () {                        //this is the function
        console.log("Level00: Check")                    
        getKana(level00)
    }
}, {
    p: '26%',
    f: function () {
        console.log("Level01: Check")
        getKana(level01)
    }
}, {
    p: '16%',
    f: function () {
        console.log("Level02: Check")
        getKana(level02)
    }
}, {
    p: '12%',
    f: function () {
        console.log("Level03: Check")
        getKana(level03)
    }
}, {
    p: '6%',
    f: function () {
        console.log("Level04: Check")
        getKana(level04)
    }
}, {
    p: '3%',
    f: function () {
        console.log("Level5: Check")
        getKana(level05)
    }
}, {
    p: '1%',
    f: function () {
        console.log("Level6: Check")
        getKana(level06)
    }
}, {
    p: '0.60%',
    f: function () {
        console.log("Level7: Check")
        getKana(level07)
    }
}, {
    p: '0.25%',
    f: function () {
        console.log("Level8: Check")
        getKana(level08)
    }
}, {
    p: '0.10%',
    f: function () {
        console.log("Level9: Check")
        getKana(level09)
    }
}, {
    p: '0.05%',
    f: function () {
        console.log("Level10: Check")
        getKana(level10)
    }
});

function sortKana(){    
    //reset all arrays
    halted = []
    level00 = []
    level01 = []
    level02 = []
    level03 = []
    level04 = []
    level05 = []
    level06 = []
    level07 = []
    level08 = []
    level09 = []
    level10 = []
    console.log("sortKana: Check")

    //check the kanadict entries
    for (let [k, v] of Object.entries(kanadict)){
        v.countdown[c]= v.countdown[c]- 1
        if(v.level[c] < 0){
            v.level[c] = 0
        } else if(v.level[c] > 10){
            v.level[c] = 10;
        }

        //this is for filling progress bars
        document.querySelectorAll(".progress-bar").forEach(function(item){
            if (item.id == k){
            item.style.width = `${v.level[c]*10}%`
        }
        })
        //set the levels for each kana in the dictionary
        if(v.countdown[c]> 0){
            halted.push(v.kana[c])
        } else if(v.level[c] == 0){
            level00.push(v.kana[c])
        } else if(v.level[c] == 1){
            level01.push(v.kana[c])
        } else if(v.level[c] == 2){
            level02.push(v.kana[c])
        } else if(v.level[c] == 3) {
            level03.push(v.kana[c])
        } else if(v.level[c] == 4) {
            level04.push(v.kana[c])
        } else if(v.level[c] == 5) {
            level05.push(v.kana[c])
        } else if(v.level[c] == 6) {
            level06.push(v.kana[c])
        } else if(v.level[c] == 7) {
            level07.push(v.kana[c])
        } else if(v.level[c] == 8) {
            level08.push(v.kana[c])
        } else if(v.level[c] == 9) {
            level09.push(v.kana[c])
        } else {
            level10.push(v.kana[c])
        }
    }
    //for debugging purpose
    console.log(halted)
    console.log(level00)
    console.log(level01)
    console.log(level02)
    console.log(level03)
    console.log(level04)
    console.log(level05)
    console.log(level06)
    console.log(level07)
    console.log(level08)
    console.log(level09)
    console.log(level10)
    probabilitilized()
}

//this function get a random character from an array
function getKana(level){
    console.log("getKana: Check")
    i = Math.floor(Math.random() * level.length);
    if (level == false){
        probabilitilized()
    } else {
        i = Math.floor(Math.random() * level.length);
        return [showKana.innerHTML = level[i]]
    }
}

//check if answer is right or wrong.
//if right level goes up +1, if wrong -1
function kanaCheck(){
    console.log("kanaCheck: Check")
    if(kanadict[this.innerHTML].kana[c] == showKana.innerHTML){
        new Audio("assets/audio/correct.wav").play();
        
        kanadict[this.innerHTML].level[c] = kanadict[this.innerHTML].level[c] + 1
        kanadict[this.innerHTML].countdown[c]= 10 //countdown is for avoiding that the same character is proposed again too early
        localStorage.setItem('level', JSON.stringify(kanadict))
        showKana.style.backgroundColor = 'limegreen';
        setTimeout(function(){
            showKana.style.backgroundColor = "";
       }, 500);
       sortKana()
        
    } else{
        new Audio("assets/audio/error.wav").play();
        for (let [k, v] of Object.entries(kanadict)){
            if(v.kana[c] == showKana.innerHTML){
                kanadict[k].level[c] = kanadict[k].level[c] - 1
                kanadict[k].countdown[c]= 10
                localStorage.setItem('level', JSON.stringify(kanadict))
            }
        }
        showKana.style.backgroundColor = 'red';
        setTimeout(function(){
            showKana.style.backgroundColor = "";
       }, 500);
        sortKana()
    }
}

//menu buttons

hiraganaBtn.addEventListener("click", function(){
    new Audio("assets/audio/click.wav").play();
    c = 0
    for (let [k, v] of Object.entries(kanadict)){
        document.querySelectorAll(".kana").forEach(function(item){
            if (item.innerHTML == v.kana[1]){
                item.innerHTML = v.kana[0]
            } 
        })
        document.querySelectorAll(".progress-bar").forEach(function(item){
            if (item.innerHTML == v.kana[1]){
                item.innerHTML = v.kana[0]
            } 
        })
    }
    mainMenu.style.display ="none";
    kanaTable.style.display = "block";
    sortKana()
})

katakanaBtn.addEventListener("click", function(){
    new Audio("assets/audio/click.wav").play();
    c = 1
    for (let [k, v] of Object.entries(kanadict)){
        document.querySelectorAll(".kana").forEach(function(item){
            if (item.innerHTML == v.kana[0]){
                item.innerHTML = v.kana[1]
            } 
        })
        document.querySelectorAll(".progress-bar").forEach(function(item){
            if (item.innerHTML == v.kana[0]){
                item.innerHTML = v.kana[1]
            } 
        })
    }
    mainMenu.style.display ="none";
    kanaTable.style.display = "block";
    sortKana()
})

clearBtn.addEventListener("click", function(){
    new Audio("assets/audio/error.wav").play();
    document.querySelectorAll(".progress-bar").forEach(function(item){
        item.style.width = `0%`
    })
    if (JSON.parse(localStorage.getItem('level'))){
    kanadict = JSON.parse(localStorage.getItem('clear'))
    window.localStorage.clear();
    }
})

//kana table buttons

backBtn.addEventListener("click", function(){
    new Audio("assets/audio/click.wav").play();
    mainMenu.style.display ="block";
    kanaTable.style.display = "none";
})

startBtn.addEventListener("click", function(){
    new Audio("assets/audio/click.wav").play();
    kanaTable.style.display = "none";
    drill.style.display = "block";
})

//drill buttons

backBtn2.addEventListener("click", function(){
    new Audio("assets/audio/click.wav").play();
    drill.style.display ="none";
    kanaTable.style.display = "block";
})

//this function is for all the answer buttons
document.querySelectorAll(".letter").forEach(function(item){
    item.addEventListener("click", kanaCheck);
})