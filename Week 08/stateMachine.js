

function seekA(string) {
    let i = 0;
    while (i<string.length){
        if(string[i] === "a") return i;
        i++;
    }
    return -1;
}

//console.log(seekA("ASDAADASaadqda"));



function seekAB(string) {
    let i = 0,
        current = -1;
    while (i<string.length){
        if(string[i] === "a") current = i;
        else if(string[i] === "b" && current > -1) return current;
        else current = -1;
        i++;
    }
    return -1;
}


// console.log(seekAB("ASDAADASaabqda"));


String.prototype.seek = function (string) {
    console.log(this);
    let target = this,
        targetIndex = 0,
        i = 0,
        current = -1;
    while (targetIndex <target.length){
        if(target[targetIndex] === string[i] && current > -1 ) i++;
        else if(target[targetIndex] === string[i] ) {
            i++;
            current = targetIndex;
        }else {
            i = 0;
            current = -1;
        }
        if(i >= string.length)  return current;
        targetIndex++;
    }
    return -1;
}
// console.log("ASDAADA1abcdefqda".seek("abcdef"));

// function match(string){
//     let state = start;
//     for(let c of string){
//         state = state(c);
//     }
//     return state === end;
// }
// function end(c){
//     return end;
// }
// function start(c){
//     if(c === "a")
//         return foundA;
//     else
//         return start;
// }
// function foundA(c){
//     if(c === "b")
//         return foundB;
//     else
//         return start(c);
// }
// function foundB2(c){
//     if(c === "c")
//         return start;
//     else
//         return start(c);
// }
// function foundB(c){
//     if(c === "x")
//         return end;
//     else
//         return foundB2(c);
// }
//
// console.log(match("abcabx"))


function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end;
}
function end(c){
    return end;
}
function start(c){
    if(c === "a")
        return foundA;
    else
        return start;
}
function foundA(c){
    if(c === "b")
        return foundB;
    else
        return start(c);
}

function foundB(c){
    if(c === "x")
        return end;
    else
        return start(c);
}

console.log(match("abababx"))