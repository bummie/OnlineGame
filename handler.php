<?php

//
// Bevster 2016
// - OnlineGame
//

$KEY = "JIOEJIJFJ24IAJ323FIEJFIEA6EUOFAH";
$PLAYER_FOLDER = dirname(__FILE__)."/players/";

if(isset($_GET['c']))
{
    $cmd = $_GET['c'];
    if(strcmp($cmd, "update") === 0)
    {
        if(isset($_GET['data']))
        {
            if(isset($_GET['key']))
            {
                $data = $_GET['data'];
                $in_key = $_GET['key'];
                if(keyCorrect($in_key, $data))
                {
                    $player_data= explode("|", $data);
                    updatePlayer($player_data[0], $player_data[1], $player_data[2]);
                    echo "Updated " . $player_data[0] . "at " . $player_data[1] . ", " . $player_data[2];
                }else
                {
                    echo "Hash wrong: " + $data;
                }
            }
        }
    }elseif(strcmp($cmd, "read") === 0)
    {
        if(isset($_GET['data']))
        {
            $data = $_GET['data'];
            readPlayer($data);
        }
    }elseif(strcmp($cmd, "delete") === 0)
    {
        if(isset($_GET['data']))
        {
            $data = $_GET['data'];
            deletePlayer($data);
            echo "Deleted " . $data;
        }
    }elseif(strcmp($cmd, "list") === 0)
    {
        listPlayers();
    }
}

function keyCorrect($inHash, $values)
{
    global $KEY;
    $calcHash = md5($values.$KEY);
    if(strcmp($inHash, $calcHash) === 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function readPlayer($player)
{
    global $PLAYER_FOLDER;
    $myfile = fopen( $PLAYER_FOLDER.$player.".ply", "r") or die("€$£$");
    echo fgets($myfile);
    fclose($myfile);
}

function updatePlayer($player, $posX, $posY)
{
    global $PLAYER_FOLDER;
    $myfile = fopen( $PLAYER_FOLDER.$player.".ply", "w") or die("€$£$");
    $txt = $posX."|".$posY;
    fwrite($myfile, $txt);
    fclose($myfile);
}

function deletePlayer($player)
{
    global $PLAYER_FOLDER;
    unlink($PLAYER_FOLDER.$player.".ply");
}

function listPlayers()
{
    global $PLAYER_FOLDER;
    $isFirst = true;
    foreach (new DirectoryIterator($PLAYER_FOLDER) as $file)
    {
        if ($file->isFile())
        {
            $player_name = explode(".", $file->getFilename());    
            if($isFirst)
                {   
                    echo $player_name[0];
                }
                else
                {
                    echo  "|" . $player_name[0];
                }  
        }
        $isFirst = false;
    }   
}


?>