function arrondi(num, decimal){
    var numArrondi = 0;
    numArrondi = num * Math.pow(10,decimal);
    numArrondi = Math.floor(numArrondi);
    numArrondi = numArrondi / Math.pow(10,decimal);

    return numArrondi;
}

function average(dataArray){
    var average = 0, sum = 0;
    for(var i=0; i < dataArray.length; i++){
        sum = sum + parseInt(dataArray[i]);
    }

    average = sum / dataArray.length;
    return average;
}

function vari(dataArray){
    var varian = 0, sum = 0;
    var mid = average(dataArray);
    for(var i=0; i < dataArray.length; i++){
        diff = dataArray[i] - mid;
        sum = sum + Math.pow(diff,2);
    }
    varian = sum / dataArray.length;
    return varian;
}

function standardDeviation(dataArray){
    var std = 0;
    var varian = vari(dataArray);
    std = Math.sqrt(varian);
    return std;
}

function isSameSize(dataArrayX, dataArrayY){
    sizeX = dataArrayX.length;
    sizeY = dataArrayY.length;
    if(sizeX == sizeY){
        return true;
    } else{
        return false;
    }
}

function minimum(x, y){
    if(x <= y){
        return x;
    } else{
        return y;
    }
}

function maximum(x, y){
    if(x >= y){
        return x;
    } else{
        return y;
    }
}

function minimumFromArray(dataArray){
    var min = dataArray[0];
    for(var i = 0; i < dataArray.length; i++){
        if(min >= dataArray[i]){
            min = dataArray[i];
        }
    }
    return min;
}

function maximumFromArray(dataArray){
    var max = 0;
    for(var i = 0; i < dataArray.length; i++){
        if(max <= dataArray[i]){
            max = dataArray[i];
        }
    }
    return max;
}

function longestArray(dataArrayX, dataArrayY){
    if(dataArrayX.length >= dataArrayY.length){
        return dataArrayX;
    } else{
        return dataArrayY;
    }
}

function makeSameSize(dataArrayX, dataArrayY){
    var newDataArray = [];
    var sizeX = dataArrayX.length;
    var sizeY = dataArrayY.length;
    var minSize = minimum(sizeX, sizeY);
    var maxSize = maximum(sizeX, sizeY);
    var diff = maxSize - minSize;
    var dataArrayMax = longestArray(dataArrayX, dataArrayY);

    for(var i = diff; i < dataArrayMax.length; i++){
        newDataArray[i - diff] = dataArrayMax[i]; 
    }

    return newDataArray;
}

function coVar(dataArrayX, dataArrayY){
    var covariance = 0, sum = 0;
    var midX = average(dataArrayX);
    var midY = average(dataArrayY);
    for(var i=0; i < dataArrayX.length; i++){
        var diffX = 0, diffY = 0;
        diffX = dataArrayX[i] - midX;
        diffY = dataArrayY[i] - midY;
        sum = sum + (diffX*diffY);
    }
    covariance = sum / dataArrayX.length;
    return covariance;
}

function correlation(dataArrayX, dataArrayY){
    var correl = 0;
    var covariance = coVar(dataArrayX, dataArrayY);
    var stdX = standardDeviation(dataArrayX);
    var stdY = standardDeviation(dataArrayY);

    correl = covariance / (stdX * stdY);

    return correl;
}