var canv;
var gfx;
var refreshRate = 1000 / 60;
var gameName = "[OnlineGame]";
var color = "#EBEBEB";

var i = 0;

var logText = "Welcome";

var plyName;
var player;
var otherPlayers;

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
    jQuery.ajaxSetup({async:false});
    
    setInterval(update, refreshRate);
    
   // updatePlayer("Tesla", "13", "12");
    
    plyName = prompt("Type in your name!","Numa");
    updatePlayer(plyName, "30", "30");
    player = new Player(plyName);
    loadPlayers();
    
}

function update()
{
    logic();
    render();
}

function logic()
{
    updatePlayers();
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
    
    player.draw(player);
    
    if(otherPlayers != null)
    {
        for(var i = 0; i < otherPlayers.length; i++)
        {
            otherPlayers[i].draw(otherPlayers[i]);
        }
    }
}

window.onbeforeunload = onExit;
  function onExit()
  {
      deletePlayer(player.name);
  }

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) 
    {
        console.log('Left was pressed');
        player.move(player, -5, 0);
    }
    else if(event.keyCode == 39) 
    {
        console.log('Right was pressed');
        player.move(player, 5, 0);

    }else if(event.keyCode == 38) 
    {
        console.log('Up was pressed');
        player.move(player, 0, -5);

    }else if(event.keyCode == 40) 
    {
        console.log('Down was pressed');
        player.move(player, 0, 5);
    }
});


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
        gfx.fillStyle = 'black';
        gfx.fillRect(obj.x, obj.y, 30, 30);
        gfx.font = "bold 15px sans-serif";
        gfx.fillStyle = 'black';
        gfx.fillText(obj.name, obj.x, obj.y + 50);
    }
}

Player.prototype.move = function(obj, x, y)
{
    if(obj != null)
    {
        obj.x = obj.x + x;
        obj.y = obj.y + y;
        
        updatePlayer(obj.name, ""+obj.x, ""+obj.y);
    }
}

Player.prototype.setPos = function(obj, x, y)
{
    if(obj != null)
    {
        obj.x = x;
        obj.y = y;
        
    }
}

function loadPlayers()
{
    var plyArr =  listPlayers();
    otherPlayers = new Array(plyArr.length-1);
    for(var i = 0; i < otherPlayers.length; i++)
    {
        otherPlayers[i] = new Player(plyArr[i], 30, 30);
    }
}

function updatePlayers()
{
    if(otherPlayers != null)
    {
        for(var i = 0; i < otherPlayers.length; i++)
        {
            console.log("Name: " + otherPlayers[i].name);
            var playerData = readPlayer(otherPlayers[i].name);
            var x = parseInt(playerData[0]);
            var y = parseInt(playerData[1]);
            otherPlayers[i].setPos(otherPlayers[i], x, y);
        }
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