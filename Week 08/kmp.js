

function getTable(string){
    let table = new Array(string.length).fill(0);
    let i = 1,j = 0;
    while (i < string.length){
        if(string[i] === string[j]){
            ++j;
            ++i;
            table[i] = j;
        }else{
            if(j > 0)
                j = table[j];
            else ++i;
        }

    }
    return function (index){
        return table[index];
    };
}
function getState(string){
    let j = 0,
        next = getTable(string);
    return function state(c) {
        if(c === string[j]){
            if( ++j >= string.length)
                return true;
            else
                return state;
        }else if(j > 0){
            j = next(j);
            return state(c)
        }
        return state;
    }
}
String.prototype.kmp = function (string) {
    let target = this,
        state = getState(string);
    for(let c of target){
        state = state(c);
    }
    return state === true;
}
console.log("abababc1".kmp("abababc1"));

// 0 1 2 3 4 5 6 7
// a a b a a a c
// 0 0 1 0 1 2 2