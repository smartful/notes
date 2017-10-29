function displayResult(name, value){
    var pResult = document.createElement("p");
    var spanResult = document.createElement("span");
    var strongText = document.createElement("strong");
    var textTitre = document.createTextNode(name);
    strongText.appendChild(textTitre);  
    var textValeur = document.createTextNode(value);
    spanResult.appendChild(strongText);
    spanResult.appendChild(textValeur);
    pResult.appendChild(spanResult);

    return pResult;
}

function separation(){
    var hr = document.createElement("hr");
    return hr;
}