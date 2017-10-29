var depot = document.getElementById("depot");
var nomsFichier = document.getElementById("noms_fichiers");

var str_datas = "";
var notes3 = [];
var notes4 = [];
var loading = false;

depot.ondragover = function(event){
    event.stopPropagation();
    event.preventDefault();
    depot.style.backgroundColor = "#FFAAAA";
}

depot.ondrop = function(event){
    event.stopPropagation();
    event.preventDefault();
    depot.style.backgroundColor = "#AAAAFF";
    var fichiers = event.dataTransfer.files;
    var resultats = [];
    var f = fichiers[0];

    
    resultats.push("<li><strong>" + escape(f.name) + "</strong> - " + f.size + " octets </li>");
    var reader = new FileReader();
    reader.onload = function(e){
        str_datas = e.target.result;
        var data_process = str_datas.split("\n");

        // notes3
        var note3_str = data_process[0];
        notes3 = note3_str.split(";");

        // notes4
        var note4_str = data_process[1];
        notes4 = note4_str.split(";");
        
        displayPage(notes3, notes4);
    }

    reader.readAsText(f,"UTF-8");
    nomsFichier.innerHTML = "<ul>" + resultats.join('') + "</ul>";
}

function displayPage(notes, notes2){
    if(notes.length > notes2.length){
        notes = makeSameSize(notes, notes2);
    } else if(notes.length < notes2.length){
        notes2 = makeSameSize(notes, notes2);
    } else{
        // Cas d'égalité, on ne fait rien
    }

    var sizeTabNotes = notes.length;

    var moyenne = 0, std = 0, moyenne2 = 0, std2 = 0;
    var covar = 0, correl = 0;

    moyenne = arrondi(average(notes),2);
    std = arrondi(standardDeviation(notes),2);

    console.log("La moyenne des notes de 1 est de : ", moyenne);
    console.log("L'écart-type des notes de 1 est de : ", std);

    console.log("--------------");

    moyenne2 = arrondi(average(notes2),2);
    std2 = arrondi(standardDeviation(notes2),2);

    console.log("La moyenne des notes de 2 est de : ", moyenne2);
    console.log("L'écart-type des notes de 2 est de : ", std2);

    console.log("--------------");

    covar = arrondi(coVar(notes, notes2),2);
    correl = arrondi(correlation(notes, notes2),2);

    console.log("La covariance des notes de 1 et 2 est de : ", covar);
    console.log("La corrélation des notes de 1 et 2 est de : ", correl);

    var tableNotes = document.getElementById("tableNotes");

    //Notes 1
    var trNotes = document.createElement("tr");
    var tdTitreNotes = document.createElement("td");
    var textTitreNotes = document.createTextNode("Notes 1");
    tdTitreNotes.appendChild(textTitreNotes);
    trNotes.appendChild(tdTitreNotes);
    for( var i = 0; i < notes.length; i++){
        var tdNotes = document.createElement("td");
        var textNotes = document.createTextNode(notes[i]);
        tdNotes.appendChild(textNotes);
        trNotes.appendChild(tdNotes);
    }
    tableNotes.appendChild(trNotes);

    //Notes 2
    var trNotes2 = document.createElement("tr");
    var tdTitreNotes2 = document.createElement("td");
    var textTitreNotes2 = document.createTextNode("Notes 2");
    tdTitreNotes2.appendChild(textTitreNotes2);
    trNotes2.appendChild(tdTitreNotes2);
    for( var i = 0; i < notes2.length; i++){
        var tdNotes2 = document.createElement("td");
        var textNotes2 = document.createTextNode(notes2[i]);
        tdNotes2.appendChild(textNotes2);
        trNotes2.appendChild(tdNotes2);
    }
    tableNotes.appendChild(trNotes2);

    // Statistiques 
    var divStats = document.getElementById("stats");

    // Moyenne Notes 1
    var pMoyenne1 = displayResult("Moyenne notes 1 : ", moyenne);
    var pEcartType1 = displayResult("Ecart type notes 1 : ", std);
    divStats.appendChild(pMoyenne1);
    divStats.appendChild(pEcartType1);

    divStats.appendChild(separation());

    // Moyenne Notes 2
    var pMoyenne2 = displayResult("Moyenne notes 2 : ", moyenne2);
    var pEcartType2 = displayResult("Ecart type notes 1 : ", std2);
    divStats.appendChild(pMoyenne2);
    divStats.appendChild(pEcartType2);

    divStats.appendChild(separation());

    // Covariance et corrélation
    var pCovar = displayResult("Covariance : ", covar);
    var pCorrelation = displayResult("Corrélation : ", correl);
    divStats.appendChild(pCovar);
    divStats.appendChild(pCorrelation);

    // Création du graphique
    var canvas = document.getElementById("graph");
    var contexte = canvas.getContext('2d');

    // Calcul des dimensions 
    var width = 400;
    var height = 300;
    var step = (width / sizeTabNotes) - 2; // On retranche 2 pour la marge

    // Fond du graphique
    var degrade = contexte.createLinearGradient(0,0,width,height);
    degrade.addColorStop(0,"#ACACAC");
    degrade.addColorStop(1,"#ECECEC");
    contexte.fillStyle = degrade;
    contexte.fillRect(10,10,width,height);

    var maxNote = 20;
    var ordonnees = (height/maxNote) - 2;

    // courbe de notes 1
    contexte.strokeStyle = "red";
    contexte.beginPath();
    for(var i = 0; i < sizeTabNotes; i++){
        contexte.lineTo((i+1)*step, height - notes[i]*ordonnees);
    }
    contexte.stroke();

    // courbe de notes 2
    contexte.strokeStyle = "blue";
    contexte.beginPath();
    for(var i = 0; i < sizeTabNotes; i++){
        contexte.lineTo((i+1)*step, height - notes2[i]*ordonnees);
    }
    contexte.stroke();

    // Construction de l'axe des ordonnées 
    contexte.fillStyle = "black";
    contexte.font ="14pt Arial";
    for(var i = 0; i < 5; i++){
        contexte.fillText(i*5, 10, height - i*(height/5));
    }

    // Construction de l'axe des abscisses
    for(var i = 0; i < sizeTabNotes; i++){
        contexte.fillText((i+1), (i+1)*step, height);
    }
}