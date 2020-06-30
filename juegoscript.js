/******************** JS main sheet: juegoscript.js ********************/

/******************** Global variables ********************/

var velocity = 0.01;                // Acceleration of the playerFish x axis
var corrArray = [2, 0, 2, 1,        // Solution to the answers
                 0, 0, 1];
                 
var delay = 1;                      // Random interval of time in which fishes appear
var difficulty = 1;                 // Sets the level of difficulty of the game
var dx = 2;                         // Displacement
var join;                           // Name joined
var fishNumber = {};                // Counts the number of fishes that are drawn in the canvas
var fishSelect = 0;                 // Number of the type of fish chosen by the player
var fishSize = [20, 28, 40,         // Stores the possible sizes that playerFish can be resized
                72, 112, 
                192, 384];
var fishType = {};                  // Object with fish class property
var identifier = 1;                 // Number of fishes alive, property of fishNumber
var imageData = [];                 // Stores the type, size and file name of the different fishes
var imageDir;                       // String with the relative path to the directory of images
var index = 0;                      // Times for ranking
var keyStroke = {};                 // Object that eventually stores key strokes
var letter;                         // Stores the letter chosen by the player
var level = 0;                      // Level of growth reached
var list = new List();              // Creates a list object where fishes belong
var loc;                            // For local storage
var menuSelect = 0;                 // Id of the menu currently selected. 
var myName = new Array(2);          // Stores the initials of the player
    myName[1] = "   ";       
    myName[2] = "  _ ";
    myName[3] = "   _ ";
var nameArray;                      // Array in which the name of the user is stored
var webBackground = 0;              // Random variable which selects from four different background images for the page.
var paused = false;                 // Boolean status of the game
var position = 1;                   // Position in the ranking table
var preView  = new Array(2);        // Previsualization of the letter that the player may choose
    preView[1] = " A ";       
    preView[2] = "   ";
    preView[3] = "   ";
var qGameTimeOut;                   // Time interval in which the player can answer the question
var questionObject = new Array();   // Object that stores the questions of the video
var randomQuestion =                // Retunrs an identifier randomly to choose a question
    Math.floor((Math.random()*7));
var randomSharkTime;                // Time in which the shark video appears and the game is set on pause
var score = 0;                      // Saves the score the user gets throughout the game
var sharkInterval = 60000;          // Maximum time for the video to appear (in ms)
var showVideoTimeout;               // Time elapsed between the shark video and the game set on pause
var sound1 = new Audio();           // New Audio element bubbles
    sound1.src = 
    "sonidos_juego/bub.mp3";
var sound2 = new Audio();           // New Audio element scream
    sound2.src = 
    "sonidos_juego/scream.mp3"; 
var start;                          // Number of milliseconds elapsed since midnight January 1, 1970 Time (UTC)
var time = 0;                       // Time between start and end
var traverse = 0;                   // Used to traverse the alphabet array
var type;                           // Stores the type of fish that is going to appear next


var questionArray =                 // Questions asked while the video is being played
    ["¿Cuántas especies de tiburones existen?",
    "¿Hace cuantos años aparecieron los primeros tiburones primitivos?", "¿Cómo se denomina la fobia a los tiburones?",
    "¿Cuánto mide el pez más pequeño conocido?", "¿De qué órgano carecen las medusas?", "¿Viven los delfines en grupos?",
    "¿Cuál es el invertebrado con mejor vista?" ];

var answerArray =                   // Possible answers that the player may choose
    ["579", "501", "368", "400000000", "1200000", "600000", "Tiburofobia", "Piscifobia", "Selacofobia",
    "1.1cm", "7.9mm", "3.5mm", "Corazón", "Estómago", "Boca", "Sí, de hasta 1000 individuos",
    "Sí, en grupos familiares pequeños", "No, sólo durante la época de reproduccion", "Medusa", "Pulpo", "Sepia"];

var node1 = { user: null,           // Object node1 that stores the score that is going to be send to localStorage
    scorex: null, next: node2
};

var node2 = {  user: null,          // Object node1 that stores the score that is going to be send to localStorage
    scorex: null, next: node3
};

var node3 = { user: null,           // Object node1 that stores the score that is going to be send to localStorage
    scorex: null, next: null
};

/******************** Main execution ********************/

/**
 * Executes when the DOM is loaded
 */
window.onload = function() { 

    init();
    useLocalStorage();
    changeBackground();
}

/******************** Common functions ********************/

/**
 * This functions initializes all variables that receive DOM
 * elements and calls two more functions.
 * @see {window.onload = function()}
 */
function init() {   

    body = document.getElementsByTagName("body")[0];
    canvas = document.createElement("canvas"); 
    ctx = canvas.getContext('2d'); 
    navList = document.getElementsByClassName("nav_list");   
    section = document.getElementsByTagName("section");
    sharkDiv = document.getElementById("shark-div");

    /* Player fish variables */
    fishlist = document.getElementsByClassName('fishchoice');
    fish1 = document.getElementById("fish1");
    fish2 = document.getElementById("fish2");
    fish3 = document.getElementById("fish3");

    /* Video variables */
    sharkVideo = document.getElementById("shark-vid");
    videoDiv = document.getElementById("welcomevid");
    video = document.getElementById("welcome");
    
    /* Questions and answers variables */
    answerDisplay = document.getElementById("answers");
    questionDisplay = document.getElementById("question");  

    /* Menu items */
    backgroundButton = document.getElementById("chooseback");
    chooseBackground = document.getElementById("chooseback");
    chooseFish = document.getElementById("choosefish");
    difficultyButton = document.getElementById("choosedifficulty");
    mainButton = document.getElementById("menubutton");
    playButton = document.getElementById("playbutton");
    returnButton = document.getElementById("return_icon");

    /*Difficulty items */
    easybutton = document.getElementById("easy");
    hardbutton = document.getElementById("hard");
    moderatebutton = document.getElementById("moderate");

    /*Background items */
    background1 = document.getElementById("backselect1");
    background2 = document.getElementById("backselect2");
    background3 = document.getElementById("backselect3");
    background4 = document.getElementById("backselect4");

    /* Sound Variables */
    backSound= document.getElementById("backsound");
    effOff = document.getElementById("musicOff_icon");
    effOn = document.getElementById("musicOn_icon");
    gamesound = document.getElementById("backsound");
    qGameSounds = document.getElementById("q_sounds");
    noteButton = document.getElementById("mute_icon");
    speakerButton = document.getElementById("speaker_icon");
    speakerButton.style.display = "none";  

    canvas.width = 800;
    canvas.height = 500;
    canvas.style.backgroundImage= "url(imagenes_juego/canvasback1.png)";

    createPlayerFish();
    listeners();   
}

/**
 * This function initializes all the listeners
 * @see {window.onload = function()}
 */
function listeners() {

    for (var i=0; i<navList.length; i++) 
        navList[i].addEventListener('click', showHide);   

    document.addEventListener("keydown", function (e) { 
        keyStroke[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) { 
        if (e.keyCode != 80)
            delete keyStroke[e.keyCode];
        else
            togglePause(e.keyCode);
    }, false);

    fish1.addEventListener("click", function() { 
        pFish.img.src = "imagenes_juego/dblue_fish_16px.png"; 
        fishSelect = 1; 
        returnToMenu();         
    });

    fish2.addEventListener("click", function() { 
        pFish.img.src = "imagenes_juego/dgreen_fish_16px.png"; 
        fishSelect = 2; 
        returnToMenu();        
    });

    fish3.addEventListener("click", function() { 
        pFish.img.src = "imagenes_juego/dyellow_fish_16px.png"; 
        fishSelect = 3; 
        returnToMenu();         
    });

    background1.addEventListener("click", function() { 
        canvas.style.backgroundImage = "url(imagenes_juego/canvasback1.png)";
        returnToMenu();         
    });

    background2.addEventListener("click", function() { 
        canvas.style.backgroundImage = "url(imagenes_juego/canvasback2.jpg)";
        returnToMenu();        
    });

    background3.addEventListener("click", function() { 
        canvas.style.backgroundImage = "url(imagenes_juego/canvasback3.jpg)";
        returnToMenu();         
    });

    background4.addEventListener("click", function() { 
        canvas.style.backgroundImage = "url(imagenes_juego/canvasback4.jpg)";
        returnToMenu();        
    });

    easybutton.addEventListener("click", function() {
        difficulty = 1;
        returnToMenu();        
    });

    moderatebutton.addEventListener("click", function() {
        difficulty = 2;
        returnToMenu();        
    });

    hardbutton.addEventListener("click", function() {
        difficulty = 3;
        returnToMenu();        
    });
    

    backgroundButton.addEventListener("click", selectback);
    chooseFish.addEventListener("click", selectfish);
    difficultyButton.addEventListener("click", selectdiff);
    speakerButton.addEventListener('click', muters);
    mainButton.addEventListener("click", returnToMenu);
    musicOff_icon.addEventListener('click', playStopSounds);
    musicOn_icon.addEventListener('click', playStopSounds);
    playButton.addEventListener("click", startgame);
    returnButton.addEventListener("click", reloadpage);
    sharkVideo.addEventListener('timeupdate', playQGame);
    sharkVideo.preload = "auto";
    noteButton.addEventListener('click', muters);
}

/******************** Web functions ********************/

/**
 * This functions shows/hides the different tabs of the web page
 * @param  {event} Current tag event triggered
 * @see {listeners()}
 */
function showHide(e) {   
    
    for (var i = 0; i < section.length; i++) {

        if (e.target.id == navList[i].id) {

            section[i].classList.remove("hide");
            section[i].classList.add("show"); 

        } else {

            section[i].classList.remove("show");
            section[i].classList.add("hide"); 
        }
    }

    if (e.target.id == navList[0].id) {

        body.classList.toggle("mode_normal");
        body.classList.toggle("mode_cinema");
    }
}

/**
 * Executes a background body image change every 3 minutes
 * @see {window.onload = function()}
 */
function changeBackground() {

    backselect = setInterval(setBackground, 180000);
}

/**
 * Changes the background image randomly
 * @see {changeBackground()}
 */
function setBackground() {

    webBackground = Math.floor((Math.random()*10)+1);

    if (0 <= webBackground && webBackground <= 2.5) {

        document.body.style.backgroundImage = "url('imagenes_juego/pageback1.jpg')";

    } else if (2.5 <= webBackground && webBackground <= 5) {

        document.body.style.backgroundImage = "url('imagenes_juego/pageback2.jpg')";

    } else if (5 <= webBackground && webBackground <= 7.5) {

        document.body.style.backgroundImage = "url('imagenes_juego/pageback3.jpg')";

    } else if (7.5 <= webBackground && webBackground <= 10) {

        document.body.style.backgroundImage = "url('imagenes_juego/pageback4.jpg')";
    }
}

/******************** Game elements creation functions ********************/

/**
 * Creates an instance of playerFish
 * @constructor
 * @this {playerFish}
 * @param  {integer} coordinate_x Position x of playerFish 
 * @param  {integer} coordinate_y Position y of playerFish 
 * @param  {integer} size Size of playerFish
 * @param  {boolean} flipped Direction: right or left
 * @param  {integer} speed Velocity of the fish
 * @param  {boolean} up Fish goes down or up
 * @see {createPlayerFish()}
 */
function playerFish(coordinate_x, coordinate_y, size, flipped, speed, up) {  
   
    this.x = coordinate_x;
    this.y = coordinate_y;
    this.size = size;
    this.flipped = flipped;
    this.speed = speed;
    this.up = up;
    this.img = new Image();

    this.position = function() {   
        ctx.fillStyle = "#FF0000";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
    }
}

/**
 * Creates a new playerFish object
 * @see {startgame(), init()}
 */
function createPlayerFish() {   
    
    pFish = new playerFish();
    pFish.x = canvas.width/2;
    pFish.y = canvas.height/2;
    pFish.size = 20;
    pFish.flipped = false;
    pFish.speed = 1.5;
    pFish.up = true;

    switch (fishSelect) {

        case 0:
            pFish.img.src = "imagenes_juego/dblue_fish_256px.png";
        break;

        case 1:
            pFish.img.src = "imagenes_juego/dblue_fish_256px.png";
        break;

        case 2:
            pFish.img.src = "imagenes_juego/dgreen_fish_256px.png";
        break;

        case 3:
            pFish.img.src = "imagenes_juego/dyellow_fish_256px.png";
        break;
    }  
}

/**
 * Draw the playerFish on canvas
 * @return {[type]}
 * @see {gameLoop()}
 */
function drawPlayerFish() {

    ctx.drawImage(pFish.img, pFish.x, gravity(), pFish.size, pFish.size);

    if (score >= (level*20 + 10)) {  
        level++;   

        if (level == 6)          
            winMesage();
     
        pFish.size = fishSize[level];     
    }
}

/**
 * Creates an instance of randomFish
 * @constructor
 * @this {randomFish}
 * @param  {integer} coordinate_x Position x of randomFish
 * @param  {integer} coordinate_y Position y of randomFish
 * @param  {integer} size Size of randomFish
 * @param  {integer} kind Type of fish
 * @param  {integer} id Number of fish
 * @param  {boolean} alive Status: dead/alive
 * @see {createRandomFish(type)}
 */
function randomFish(coordinate_x, coordinate_y, size, kind, id, alive) {  

    this.x = coordinate_x;
    this.y = coordinate_y;
    this.size = size;
    this.kind = kind;
    this.id = id;
    this.alive = alive;
    this.img = new Image();

    this.position = function() { 
    
        ctx.fillStyle = "#00FF00";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.fillText("RandomFish: " + "Eje x: " + this.x + " Eje y: " + this.y, 20, 50);               
    }
}

/**
 * Creates a new randomFish object
 * @param  {integer} type Type of fish
 * @return {object} rFish Returns the randomFish object created
 * @see {gameLoop()}
 */
function createRandomFish(type) {   

    rFish = new randomFish();
    rFish.size = imageData[type-1][1];
    rFish.speed = (Math.random()*(difficulty - 0.5) + (difficulty - 0.5));

    if (Math.round(Math.random()) == 0) {

        rFish.x = -rFish.size;
        rFish.direction = "right";
        rFish.img.src = imageDir.concat("d", imageData[type-1][2]);

    } else {

        rFish.x = canvas.width;
        rFish.direction = "left"; 
        rFish.img.src = imageDir.concat("i", imageData[type-1][2]); 
    }

    rFish.y = (Math.random()*(canvas.height - rFish.size)); 
    rFish.kind = type;
    rFish.id = identifier;
    rFish.alive = true;
    
    return rFish;
}

/**
 * Draw all random fish on canvas
 * @param  {integer} fishNumber Number of fishes stored in the list
 * @see {gameLoop()}
 */
function drawRandomFish(fishNumber) {

    if (!isEmpty(fishNumber)) {

        for (i in fishNumber) {

            if (list.item(i).data.direction == "right") {

                ctx.drawImage(list.item(i).data.img, list.item(i).data.x, list.item(i).data.y);
                list.item(i).data.x += list.item(i).data.speed;

            }

            if (list.item(i).data.direction == "left") {

                ctx.drawImage(list.item(i).data.img, list.item(i).data.x, list.item(i).data.y);
                list.item(i).data.x -= list.item(i).data.speed;
            }

            if (list.item(i).data.x > canvas.width) {
                  
                list.delete(list.item(i).data);
                delete fishNumber[identifier-1];
                identifier--;
            }

            if (list.item(i).data.x < -list.item(i).data.size) {

                list.delete(list.item(i).data);
                delete fishNumber[identifier-1];
                identifier--;
            } 
        }
    }
}

/**
 * Creates an instance of List
 * @constructor
 * @this {List}
 * @see {drawRandomFish(fishNumber), collision(fishNumber), gameLoop()}
 */
function List() {    //List constructor

    this.first = null; 
    this.last = null;

    List.createNode = function() {    //Node

        return {

            data: null, 
            next: null
        }
    }  
     
    this.add = function(data) { 

        if (this.first == null) {    //Add method 

            this.first = List.createNode(); 
            this.last = this.first; 

        } else { 

            this.last.next = List.createNode(); 
            this.last = this.last.next; 
        }  

        this.last.data = data; 
    } 

    this.delete = function(data) {    //Delete method

        var current = this.first; 
        var previous = this.first;

        while (current != null) {

            if (data == current.data) { 

                if (current == this.first) { 

                    this.first = current.next; 
                    return; 
                } 

                if (current == this.last) 
                    this.last = previous;

                previous.next = current.next; 
                return; 
            }

            previous = current; 
            current = current.next;
        }
    } 

    this.item = function(i) {    //Find Node at certain position 

        var current = this.first;

        while (current != null) { 

            i--;

            if (i == 0) 
                return current; 

            current = current.next;
        } 

        return null; 
    }
} 

/**
 * Initializes variables containing essential fish data
 * @see {startgame()}
 */
function loadAllFish() {   

    imageDir = "imagenes_juego/";
    imageData = [[1, 16, "blue_fish_16px.png"], [2, 16, "green_fish_16px.png"], 
                [3, 16, "red_fish_16px.png"], [4, 16, "yellow_fish_16px.png"],
                [5, 24, "blue_fish_24px.png"], [6, 24, "green_fish_24px.png"], 
                [7, 24, "red_fish_24px.png"], [8, 24, "yellow_fish_24px.png"],
                [9, 32, "blue_fish_32px.png"], [10, 32, "green_fish_32px.png"], [11, 32, "red_fish_32px.png"], 
                [12, 32, "yellow_fish_32px.png"], [13, 32, "blowfish_32px.png"],
                [14, 48, "blue_fish_48px.png"], [15, 48, "green_fish_48px.png"], [16, 48, "red_fish_48px.png"], 
                [17, 48, "yellow_fish_48px.png"], [18, 48, "jellyfish_48px.png"],
                [19, 96, "blowfish_96px.png"], 
                [20, 128, "blue_fish_128px.png"], [21, 128, "green_fish_128px.png"], [22, 128, "red_fish_128px.png"], 
                [23, 128, "yellow_fish_128px.png"], [24, 128, "jellyfish_128px.png"], [25, 128, "monster_128px.png"],
                [26, 256, "giantsquid_512px.png"]];
}

/******************** Game execution functions ********************/

/**
 * Appends canvas and removes the game menu
 * @see {startgame()}
 */
function drawGame() {

    section[0].removeChild(videoDiv);
    section[0].removeChild(playButton);
    section[0].removeChild(chooseFish);
    section[0].removeChild(chooseBackground);
    section[0].removeChild(difficultyButton);
    section[0].appendChild(canvas);

    returnButton.style.display = "initial";
}

/**
 * Function that executes every 10ms executing the game and other important functions
 * @see {togglePause(), startgame()}
 */
function gameLoop(pause) {   

    clearCanvas();
    drawPlayerFish();
    activekey();

    var end = new Date().getTime();  

    if (end > (start + delay)) {
        
        var type = probability();
        fishNumber[identifier] = identifier;
        list.add(createRandomFish(type));               
        delay = Math.round((Math.random()*(1000-(score + difficulty*50)))+(100-(difficulty*30)));
        start = end;
        identifier++;
    }

    drawRandomFish(fishNumber);
    collision(fishNumber);   
}

/**
 * Starts the game when the play button is pressed
 * @see {listeners()}
 */
function startgame() {

    drawGame();
    gamesound.play();
    loadAllFish();
    createPlayerFish();
    start = new Date().getTime();
    runGame = setInterval(gameLoop, 10);
    randomSharkTime = Math.floor((Math.random()*sharkInterval) + sharkInterval/2);
    showVideoTimeout = setTimeout(showSharkVideo, randomSharkTime);
} 

/******************** Game menu functions ********************/

/**
 * Changes CSS properties to display a fish selection menu
 * @see {listeners()}
 */
function selectfish() {

    playButton.style.display = "none";
    chooseFish.style.display = "none";
    chooseBackground.style.display = "none";
    difficultyButton.style.display = "none";

    mainButton.className = "menubutton";

    fish1.className = "fishchoice"
    fish1.style.cssfloat = "left";
    fish1.style.marginLeft = "160px";
    fish1.style.marginTop = "130px";

    fish2.className = "fishchoice"
    fish2.style.cssfloat = "left";
    fish2.style.marginLeft = "370px";
    fish2.style.marginTop = "130px";

    fish3.className = "fishchoice"
    fish3.style.cssfloat = "left";
    fish3.style.marginLeft = "580px";
    fish3.style.marginTop = "130px";

    menuSelect = 1;
}

/**
 * Changes CSS properties to display a background selection menu
 * @see {listeners()}
 */
function selectback() {

    playButton.style.display = "none";
    chooseFish.style.display = "none";
    chooseBackground.style.display = "none";
    difficultyButton.style.display = "none";

    mainButton.className = "menubutton";

    background1.className = "backchoice";
    background1.style.cssfloat = "left";
    background1.style.marginLeft = "160px";
    background1.style.marginTop = "50px";

    background2.className = "backchoice";
    background2.style.cssfloat = "left";
    background2.style.marginLeft = "500px";
    background2.style.marginTop = "50px";

    background3.className = "backchoice";
    background3.style.cssfloat = "left";
    background3.style.marginLeft = "160px";
    background3.style.marginTop = "200px";

    background4.className = "backchoice";
    background4.style.cssfloat = "left";
    background4.style.marginLeft = "500px";
    background4.style.marginTop = "200px";

    menuSelect = 2;
}

/**
 * Changes CSS properties to display a difficulty selection menu
 * @see {listeners()}
 */
function selectdiff() {

    playButton.style.display = "none";
    chooseFish.style.display = "none";
    chooseBackground.style.display = "none";
    difficultyButton.style.display = "none";

    mainButton.className = "menubutton";

    easy.className = "diffchoice";
    easy.style.marginLeft = "390px";
    easy.style.marginTop = "90px";

    moderate.className = "diffchoice";
    moderate.style.marginLeft = "370px";
    moderate.style.marginTop = "150px";

    hard.className = "diffchoice";
    hard.style.marginLeft = "385px";
    hard.style.marginTop = "210px";

    menuSelect = 3;
}

/**
 * Changes CSS properties to display the main menu of the game
 * @see {listeners()}
 */
function returnToMenu() {

    playButton.style.display = "block";
    chooseFish.style.display = "block";
    chooseBackground.style.display = "block";
    difficultyButton.style.display = "block";
    mainButton.className = "hide";

    switch (menuSelect) {

        case 0:
        break;

        case 1:          

            fish1.className = "hide";
            fish2.className = "hide";
            fish3.className = "hide";  

        break;

        case 2:

            background1.className ="hide";
            background2.className ="hide";
            background3.className ="hide";
            background4.className ="hide";

        break;

        case 3:

            easy.className = "hide";
            moderate.className = "hide";
            hard.className = "hide";

        break;
    }

    menuSelect = 0;
}

/**
 * This function displays the game over menu
 * @see {onQGameLoss(), collision(fishNumber)}
 */
function gameOver() { 

    clearCanvas();
    clearTimeout(showVideoTimeout);
    document.addEventListener("keydown", name, true);
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "426e33"; 
    ctx.fillText("el alfabeto con las letras 'K' y 'L' y pulsa 'ENTER' ",360, 70);
    ctx.fillText("para que tu partida quede guardada!",360, 90);
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "000000"; 
    ctx.fillText("USUARIO: "+ myName[1] + myName[2] + myName[3], 50, 400);
    ctx.fillText(preView[1] + ' ' + ' ' + preView[2] + ' ' + ' ' + preView[3], 247, 400);
}

/**
 * Displays a win message is the player is able to beat the game
 * @see {drawPlayerFish()}
 */
function winMesage() {

    ctx.font = "70pt Calibri";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeText("You Win!", 250, 250);
    ctx.strokeText("PERFECT GAME", 175, 350);
    ctx.strokeText("110", 275, 450);
    togglePause();
}

/**
 * Displays part of the game over menu
 * @see {name(event)}
 */
function displayScore() {

    clearCanvas();
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "000000"; 
    ctx.fillText(' ' + myName[1] + myName[2] + myName[3], 20, 350);
    ctx.fillText(' tu puntuacion ha sido de: ',20, 390);
    ctx.fillText(' ' + score + ' punto(s)!',20, 430);
    nameArray = new Array(myName[1], myName[2], myName[3]);
    join = nameArray.join("");
    local();
}

/**
 * Stores in the browser cache the scores achieved by a certain number of players
 * @see {displayScore()}
 */
function local() {

    if (!localStorage.getItem("n1")) {

       node1.user = join;
       node1.scorex = score;
       localStorage.setItem("n1", node1.user);
       localStorage.setItem("s1", node1.scorex);
       useLocalStorage();
       index = 1;       
    }

    if (!localStorage.getItem("n2") && index == 0) {

        node2.user = join;
        node2.scorex = score;
        localStorage.setItem("n2", node2.user);
        localStorage.setItem("s2", node2.scorex);
        useLocalStorage();
        index = 1;
    }

    if (!localStorage.getItem("n3")  && index == 0) {

        node3.user = join;
        node3.scorex = score;
        localStorage.setItem("n3",node3.user);
        localStorage.setItem("s3",node3.scorex);
        useLocalStorage();
        index = 1;
    }

    if (localStorage.getItem("n3") && index == 0) {

        localStorage.removeItem("n1");
        localStorage.removeItem("n2");
        localStorage.removeItem("n3");
        localStorage.removeItem("s1");
        localStorage.removeItem("s2");
        localStorage.removeItem("s3");
   }
}

/**
 * Writes on Ranking Section the scores achieved by a certain number of players
 * @see {window.onload = function(), local()}
 */
function useLocalStorage() {

    document.getElementById("primeraN").innerHTML = localStorage.getItem("n1");
    document.getElementById("primeraS").innerHTML = localStorage.getItem("s1");
    document.getElementById("segundaN").innerHTML = localStorage.getItem("n2");
    document.getElementById("segundaS").innerHTML = localStorage.getItem("s2");
    document.getElementById("terceraN").innerHTML = localStorage.getItem("n3");
    document.getElementById("terceraS").innerHTML = localStorage.getItem("s3");
}

/******************** Game logic functions ********************/

/**
 * Adds simple gravity on y axis to playerFish
 * @return {float} pFish.y Position y of playerFish
 * @see {drawPlayerFish()}
 */
function gravity() { 

    if (isEmpty(keyStroke) && ((pFish.y + pFish.size) < canvas.height))
        pFish.y += 0.2;

    return pFish.y;
}

/**
 * Returns the type of fish depending on a frequency table
 * @return {integer} i Type of fish
 */
function probability() {    

    var nFish = (Math.random()*1000.0);
    var probArray = [0, 24, 49, 74, 99, 149, 199, 249, 299, 349, 399, 439, 499, 549, 
                     609, 669, 729, 789, 849, 899, 914, 929, 944, 959, 974, 989, 1000];

    for (var i = 0; i < probArray.length-1; i++) {

        if ((nFish > probArray[i]) && (nFish <= probArray[i+1]))
            return i+1;
    } 
}

/**
 * Handles collisions between the fish playerFish and the randomFish ones
 * @param  {integer} fishNumber Number of fishes stored in the list
 * @see {gameLoop()}
 */
function collision(fishNumber) {   

    var auxDist = [];
    var collidedFish;
    var dist = canvas.width;
    var distX; 
    var distY;
    
    for (i in fishNumber) {
        
        distX = Math.pow((list.item(i).data.x + list.item(i).data.size/2) - (pFish.x + pFish.size/2), 2);
        distY = Math.pow((list.item(i).data.y + list.item(i).data.size/2) - (pFish.y + pFish.size/2), 2);
        auxDist = Math.sqrt(distX + distY) - (list.item(i).data.size/3 + pFish.size/2);

        if (auxDist < dist) {
            dist = auxDist;
            collidedFish = i;
        }
    }

    if (dist <= 0) {

        if (pFish.size > list.item(collidedFish).data.size) {
            sound1.play();
            score++;
            list.delete(list.item(collidedFish).data);
            delete fishNumber[identifier-1];
            identifier--;

        } else {

            sound2.play();
            clearCanvas();
            canvas.style.backgroundImage = "url(imagenes_juego/GOver800x500.jpg)";
            setInterval(gameOver,10);
            togglePause();
        }
    }

    ctx.fillStyle = "#000000";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText("Score: " + score, 650, 30);
}

/******************** Game user interaction functions ********************/

/**
 * Pauses/Resumes the game
 * @see {showSharkVideo(), onQGameWin(), listeners(), collision(fishNumber)}
 */
function togglePause(pause) {   

    if (!paused) {

        clearInterval(runGame);     
        paused = true;

    } else {

        runGame = setInterval(gameLoop, 10);
        paused = false;
    }
}

/**
 * Player keyboard movement function. KeyStroke: W=87 S=83 A=65 D=68
 * @see {gameLoop()}
 */
function activekey() {   

    if (!paused) {

        if (87 in keyStroke) {    //W: Move up

            if (velocity < difficulty/2)
                velocity += 0.01;

            pFish.up = true;

            if (pFish.y > 0)
                pFish.y -= (pFish.speed + velocity);
        }
            
        if (83 in keyStroke) {    //S: Move down 

            if (velocity < difficulty/2)
                velocity += 0.01;

            pFish.up = false;

            if ((pFish.y + pFish.size) < canvas.height)
                pFish.y += (pFish.speed + velocity);
        }

        if (65 in keyStroke) {    //A: Move left 

            if (velocity < difficulty/2)
                velocity += 0.01;

            if (!pFish.flipped) {

                if (fishSelect == 1 | fishSelect == 0) {

                    pFish.img.src = "imagenes_juego/iblue_fish_256px.png";

                } else if (fishSelect == 2) {

                    pFish.img.src = "imagenes_juego/igreen_fish_256px.png";

                } else if (fishSelect == 3) {

                    pFish.img.src = "imagenes_juego/iyellow_fish_256px.png";
                }

                pFish.flipped = true;
            }

            if (pFish.x > 0)
                pFish.x -= (pFish.speed + velocity);
        }
            
        if (68 in keyStroke) {    //D: Move right 

            if (velocity < difficulty/2)
                velocity += 0.01;

            if (pFish.flipped) {

                if (fishSelect == 1 | fishSelect == 0) {

                    pFish.img.src = "imagenes_juego/dblue_fish_256px.png";

                } else if (fishSelect == 2) {

                    pFish.img.src = "imagenes_juego/dgreen_fish_256px.png";

                } else if (fishSelect == 3) {

                    pFish.img.src = "imagenes_juego/dyellow_fish_256px.png";
                }

                pFish.flipped = false;
            }

            if ((pFish.x + pFish.size) < canvas.width)
                pFish.x += (pFish.speed + velocity);
        }

        if (isEmpty(keyStroke) && velocity > 0.01)
            velocity -= 0.01;

    } else {

        velocity = 0.01;
    }
}

/**
 * This function handles the storage of the name when the game ends. KeyStroke: K=75 L=76 (Carriage return)=13
 * @param  {char} event ASCII code returned when a keystroke is listened
 * @return {char} letter Returns the key pressed
 * see {gameOver()}
 */
function name(event) {

    var alphabet =[" A "," B "," C "," D "," E "," F "," G "," H "," I "," J "," K "," L "," M ",
                   " N ", " O "," P "," Q "," R "," S "," T "," U "," V "," W "," X "," Y "," Z "];

    switch (event.keyCode) {

        case 76:

            if (traverse < (alphabet.length - 1)) {

                traverse++;
                event = alphabet[traverse];
                letter = event;

                if (position == 1)
                    preView[1] = letter;

                if (position == 2) {

                    myName[2] = '   ';
                    preView[2] = letter;
                }

                if (position == 3) { 

                    myName[3] = '   ';
                    preView[3] = letter;
                }

            } else {

                event = alphabet[25];
                letter = event;

                if (position == 1)
                    preView[1] = letter;

                if (position == 2) {

                    myName[2] = '   ';
                    preView[2] = letter;
                }

                if (position == 3) {

                    myName[3] = '   ';
                    preView[3] = letter;
                }
            }

            return letter;
            break;

        case 75:

            if (traverse > 0) {

                traverse--;
                event = alphabet[traverse];
                letter = event;

                if (position == 1)
                    preView[1] = letter;

                if (position == 2) {

                    myName[2] = '   ';
                    preView[2] = letter;
                }

                if (position == 3) {

                    myName[3] = '   ';
                    preView[3] = letter;
                }

            } else {

                event = alphabet[0];
                letter = event;

                if (position == 1) {
                    preView[1] = letter;
                }

                if (position == 2) {
                    myName[2] = '   ';
                    preView[2] = letter;
                }

                if (position == 3) { 

                    myName[3] = '   ';
                    preView[3] = letter;
                }
            }

            return letter;
            break;   

        case 13:

            traverse = 0;

            if (letter == null)
                letter = ' A ';
            
            myName[position] = letter;
            preView[1] = '   ';
            preView[2] = '   ';
            preView[3] = '   ';
            letter = ' A ';//empieza desde A
            position++;

            if (position == 2) {

                preView[2] = ' A ';
                myName[2] = '   ';
            }

            if (position == 3) {

                preView[3] = ' A ';
                myName[3] = '   ';
            }

            if (position > 3) {

                canvas.style.backgroundImage = "url(imagenes_juego/GOver800x500.jpg)";
                clearCanvas();
                setInterval(displayScore, 10);
            }

        break;
    }
}

/******************** Game music functions ********************/

/**
 * Mute/Unmute sound music
 * @see {showSharkVideo(), listeners()}
 */
function muters() {   

    if (video.volume == 1 || backSound.volume == 1) {

        backSound.volume = 0;
        video.volume = 0;
        noteButton.style.display = "none";
        speakerButton.style.display = "initial";
        
    } else {

        backSound.volume = 1;
        video.volume = 1;
        speakerButton.style.display = "none";
        noteButton.style.display = "initial";
    }
}

/**
 * Mute/Unmute sound effects
 * @see {listeners()}
 */
function playStopSounds() {

    if (sound1.volume == 1 || sound2.volume == 1) {

        sound1.volume = 0;
        sound2.volume = 0;
        musicOn_icon.style.display = "initial";
        musicOff_icon.style.display = "none";
        
    } else {

        sound1.volume = 1;
        sound2.volume = 1;
        musicOn_icon.style.display = "none";
        musicOff_icon.style.display = "initial";
    }
}

/******************** Game video functions ********************/

/**
 * Creates an instance of question
 * @constructor
 * @this {question}
 * @param  {string} q The question itsel
 * @param  {integer} ans The answer itself
 * @param  {integer} correct Wrong or Right
 * @see {listeners(), loadQuestionSet()}
 */
function question(q, ans, correct) {

    this.q = q;
    this.ans = ans ;
    this.correct = correct; 
}

/**
 * Video: Load the questions
 * @see {playQGame()}
 */
function loadQuestionSet() { 

    var j = 0;

    for (var i = 0; i < questionArray.length; i++) {

        j = i*3;
        var aux = new question(questionArray[i], [answerArray[j], answerArray[j+1], answerArray[j+2]], corrArray[i]);
        questionObject.push(aux);
    }
}

/**
 * [showSharkVideo description]
 * @see {onQGameWin(), startgame()}
 */
function showSharkVideo() {

    clearTimeout(showVideoTimeout);
    sharkVideo.currentTime = 0;
    sharkVideo.muted = false;
    togglePause();
    muters();
    sharkVideo.setAttribute("loop", "false");
    canvas.style.display = "none";
    sharkVideo.play();
    sharkDiv.style.display = "block";
}

/**
 * This function executes at a certain instant of the video and asks the player to answer a question
 * @see {onQGameWin(), listeners()}
 */
function playQGame() {

    if (sharkVideo.currentTime >= 14 && sharkVideo.currentTime <= 15) {

        loadQuestionSet();
        sharkVideo.removeEventListener('timeupdate', playQGame);
        sharkVideo.muted = true;
        sharkVideo.pause();

        qGameSounds.src = "sonidos_juego/clock.mp3";
        qGameSounds.play();

        questionDisplay.innerHTML = questionObject[randomQuestion].q;
        answerDisplay.innerHTML = "1)" + questionObject[randomQuestion].ans[0] + "<br>" +"2)"+ questionObject[randomQuestion].ans[1] + "<br>" + 
                               "3)" + questionObject[randomQuestion].ans[2];
        questionDisplay.style.display = "block";
        answerDisplay.style.display = "block";

        qGameTimeOut = setTimeout("playGameOverSharkClip()", 10000);
        document.addEventListener('keydown', checkAnswer);
    }
}

/**
 * Checks if the answer to the question is correcto or not
 * @param  {integer} input ASCII of the keyboard stroke
 * @see {playQGame(), playGameOverSharkClip()}
 */
function checkAnswer(input) {

    if ((input.keyCode-49) == questionObject[randomQuestion].correct ) {

        playGameContinueClip();
        score = score + 5;

    } else {

        playGameOverSharkClip();
    }

    document.removeEventListener('keydown', checkAnswer);
}

/**
 * Continues the video in case you answer the question correctly 
 * @see {checkAnswer(input)}
 */
function playGameContinueClip() {

    clearTimeout(qGameTimeOut);

    questionDisplay.style.display = "none";
    answerDisplay.style.display = "none";

    qGameSounds.src = "sonidos_juego/winQ.mp3";
    qGameSounds.loop = false;   
    qGameSounds.play();

    sharkVideo.play(); 
    sharkVideo.addEventListener('timeupdate', onQGameWin); 
}

/**
 * Changes from the video to the game
 * @see {playGameContinueClip()}
 */
function onQGameWin() {

    if (sharkVideo.currentTime >= 25) {

        qGameSounds.pause();
        sharkVideo.removeEventListener('timeupdate', onQGameWin);
        sharkVideo.pause();
        canvas.style.display = "block";
        sharkDiv.style.display = "none";
        togglePause();
        backSound.volume = 1;

        randomSharkTime = Math.floor((Math.random()*(sharkInterval*10)) + 300000);
        showVideoTimeout = setTimeout(showSharkVideo, randomSharkTime);
        sharkVideo.addEventListener('timeupdate', playQGame);
    }   
}

/**
 * Continues the video in case you answer the question wrong 
 * @see {playQGame(), checkAnswer(input)}
 */
function playGameOverSharkClip() {

    document.removeEventListener('keydown', checkAnswer);
    clearTimeout(qGameTimeOut); 

    questionDisplay.style.display="none";
    answerDisplay.style.display="none";   

    qGameSounds.src = "sonidos_juego/failQ.mp3";
    qGameSounds.loop = false;
    qGameSounds.play();
    qGameSounds.addEventListener('ended', playKillerShark);

    sharkVideo.addEventListener('timeupdate', onQGameLoss);
    sharkVideo.currentTime = 44;
    sharkVideo.playbackRate = 1.5;     
    sharkVideo.play(); 
}

/**
 * Plays the sound of the killing shark
 * @see {playGameOverSharkClip(), onQGameLoss()}
 */
function playKillerShark() {

    qGameSounds.src = "sonidos_juego/killerShark.mp3";
    qGameSounds.play();
}

/**
 * Changes from the video to the game over screen
 * @see {playGameOverSharkClip()}
 */
function onQGameLoss() {
    
    if (sharkVideo.currentTime >= 52) { 

        qGameSounds.removeEventListener('ended', playKillerShark);
        sharkVideo.removeEventListener('timeupdate', onQGameLoss);
        backSound.volume = 1;
        sharkVideo.pause(); 

        clearCanvas();
        canvas.style.backgroundImage = "url(imagenes_juego/GOver800x500.jpg)";
        setInterval(gameOver,10);
        canvas.style.display = "block";
        sharkDiv.style.display = "none";
        gamesound.play();
    }
}

/******************** Other functions ********************/

/**
 * Reload page
 * @see {listeners()}
 */
function reloadpage() {

    window.location.reload();
}

/**
 * Resets canvas
 * @see {gameLoop(), name(event), gameOver(), displayScore(), onQGameLoss(), collision(fishNumber)}
 */
function clearCanvas() { 

    canvas.width = canvas.width;
}

/**
 * Checks if an object has properties or not
 * @param  {object}  object Object properties to be checked
 * @return {Boolean} 
 * @see {gravity(), drawRandomFish(fishNumber)}
 */
function isEmpty(object) { 

    for (var property in object) {

        if (object.hasOwnProperty(property))
            return false;
    }

    return true;
}