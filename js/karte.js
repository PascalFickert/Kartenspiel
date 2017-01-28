var koenige  = ["herzKoenig", "karoKoenig", "pikKoenig", "kreuzKoenig"];
var damen    = ["herzDame",   "karoDame",   "pikDame",   "kreuzDame"  ];
var buben    = ["herzBube",   "karoBube",   "pikBube",   "kreuzBube"  ];
var guthaben = 200;

/**
* Fuktion die aus dem Html aufgerufen wird
* Es wird ueberprueft ob man noch soviel besitzt wie man setzen moechte und ob man auch einen 
* positiven Betrag setzt
* Die Karten werden neu gemischt, angezeigt,und der Spieler erfaehrt ob er gewonnen hat
*/
function startGame() 
{
        
        var einsatz = parseInt(document.getElementById("ein").value);
        //kartenErstellen();
        leeren();
        if(einsatz <= guthaben && einsatz > 0)
        {
            koenige = mischen(koenige);
            damen   = mischen(damen);
            buben   = mischen(buben);
            displayCards();

            var gewinn = WinOrLoose();
            if(gewinn == 0)
            {
                guthaben += einsatz * 2;
                document.getElementById("guthaben").value = guthaben;
                document.getElementById("gewinne").value = einsatz * 2;
                document.getElementById("SoN").src = "../bilder/youwin.jpg";
            }

            else if(gewinn == 1)
            {
                document.getElementById("guthaben").value = guthaben;
                document.getElementById("gewinne").value = einsatz;
                document.getElementById("SoN").src = "../bilder/youwin.jpg";
            }

            else
            {
                guthaben-=einsatz;
                document.getElementById("guthaben").value = guthaben;
                document.getElementById("gewinne").value = 0;
                document.getElementById("SoN").src = "../bilder/verloren.jpg";
                if (guthaben == 0)
                {
                    document.getElementById("SoN").src = "../bilder/gameover.png";
                }
            }
        }
        else
        {
            document.getElementById("SoN").src = "../bilder/nomoney.jpg";
        }
}

/**
* Funktion die ermittelt ob man gewonnen oder verloren hat
* @return 0 bei drei gleichen Sorten, 1 bei gleicher Farbe, sonst -1
*/
function WinOrLoose()
{
    var karte = [];
    var tmp1 = "";
    var tmp2 = "";
    var tmp3 = "";

    for(var i = 0; i < 2; i++)
    {
        tmp1 =  tmp1 + koenige[3][i];
        tmp2 =  tmp2 + damen[3][i];
        tmp3 =  tmp3 + buben[3][i];
    } 
    karte.push(tmp1);
    karte.push(tmp2);
    karte.push(tmp3);

    if(karte[0] == karte[1] && karte[1] == karte[2])
    {
        return 0;
    }
    else if((karte[0] == "he" || karte[0] == "ka")
         && (karte[1] == "he" || karte[1] == "ka")
         && (karte[2] == "he" || karte[2] == "ka"))
    {
        return 1;
    }
    else if((karte[0] == "kr" || karte[0] == "pi") 
         && (karte[1] == "kr" || karte[1] == "pi")
         && (karte[2] == "kr" || karte[2] == "pi"))
    {
        return 1;
    }
    return -1;
}

/**
* Alle Felder leeren 
*/
function leeren()
{
    document.getElementById("ein").value      = "";
    document.getElementById("guthaben").value = guthaben;
    document.getElementById("gewinne").value  = "0";
    document.getElementById("SoN").src = "";
    document.getElementById("K1").src = "";
    document.getElementById("K2").src = "";
    document.getElementById("K3").src = "";
}

/**
* Das mischen eines Kartensets
*/
function mischen(array) 
{
    var neuGemischt = [];
    var laenge = array.length;
    var i;

    while (laenge)
    {
         i = Math.floor(Math.random() * laenge--);
         neuGemischt.push(array.splice(i, 1)[0]); 
    }
    return neuGemischt;
}

/**
* Die zufaelligen Karten anzeigen
*/
function displayCards()
{
    document.getElementById("K1").src = "../bilder/" + koenige[3] + ".png";
    document.getElementById("K2").src = "../bilder/" + damen[3] + ".png";
    document.getElementById("K3").src = "../bilder/" + buben[3] + ".png";
}

/**
* Alle felder ausser dem Guthaben leeren
*
*/
function naechsteRunde()
{
    guthaben = 200;
    leeren();
}
