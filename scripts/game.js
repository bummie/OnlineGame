var canv;
var gfx;
var refreshRate = 1000 / 60;
var gameName = "[OnlineGame]";
var color = "#EBEBEB";

var i = 0;

var logText = "Welcome";

function OnlineGame()
{
    canv = document.getElementById('gameCanvas');
    gfx = canv.getContext("2d");
    console.info(gameName + 'Started');
    init();
}

function init()
{
    console.info(gameName + 'Initialised');
    
    setInterval(update, refreshRate);
    
    updatePlayer("TEst", "3", "32");
    
    listPlayers();
}

function update()
{
    logic();
    render();
}

function logic()
{
    
}

function render()
{
   //clearCanvas();
    gfx.fillStyle = color;
    gfx.fillRect(0, 0, canv.width, canv.height);
    document.bgColor = color;
    
    // Kul fremhevet skrift
    gfx.font = "bold 30px sans-serif";
    gfx.fillStyle = 'white';
    gfx.fillText(logText, 0, canv.height - 5);
    gfx.strokeStyle = 'black';
    gfx.lineWidth = 2;
    gfx.strokeText(logText, 0, canv.height - 5);
    
}

// Det mannligste objektet
function Player(navn)
{
    // Personlige verdier
    this.name = navn;
    this.x = 30;
    this.y = 30;
}

Player.prototype.draw = function(obj)
{
    if(obj != null)
    {
        
    }
}

function clearCanvas()
{
    canv.height = window.innerHeight;
    canv.width = window.innerWidth;
}

function setLogText(text)
{
    logText = text;
}