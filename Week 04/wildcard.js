function kmp(source,pattern) {
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1,j = 0;
        while (i < pattern.length){
            if(pattern[i] === pattern[j] || pattern[j] === "?" || pattern[i] === "?"){
                ++j, ++i;
                table[i] = j;
            }else{
                if(j > 0)
                    j = table[j];
                else ++i;
            }

        }
    }
    {
        let i = 0,j = 0;
        while (i < source.length){
            if(source[i] === pattern[j] || pattern[j] === "?" || pattern[i] === "?"){
                ++j; ++i;
            }else{
                if(j > 0)
                    j = table[j];
                else ++i;
            }
            if(j === pattern.length){
                return true;
            }
        }
        return false;
    }

}

//kmp("","abcdabce");
//console.log(kmp("abababc1","abababc"));
// 计算 * 数量
function getCount(pattern){
    let count = 0
    for(let i = 0; i<pattern.length; i++)
        if(pattern[i] === "*") count++;
    return count;
}
function wildcard(source,pattern) {
    // 计算 * 数量
    let starCount = getCount(pattern);

    if(starCount === 0){
        // 判断长度是否一致
        if(source.length !== pattern.length) return false;
        // 判断长度是否一致
        for(let i = 0; i<pattern.length; i++){
            if(pattern[i] !== source[i] && pattern[i] !== "?") return false;
        }
        return true
    }

    let startIndex = 0;
    let lastIndex = 0;
    // 比对 * 前内容
    for(startIndex = 0; pattern[startIndex] !== "*"; startIndex++){
        if(pattern[startIndex] !== source[startIndex] && pattern[startIndex] !== "?") return false;
    }
    // 比对 * 后内容
    for(lastIndex = 0; lastIndex <= source.length - lastIndex && pattern[pattern.length - lastIndex] !== "*"; lastIndex++){
        if( pattern[pattern.length - lastIndex] !== source[ source.length - lastIndex]
            && pattern[pattern.length - lastIndex] !== "?") return false;
    }
    // 如果*只有一个 * 前后已经比对无错则返回 true;
    if(starCount === 1) return true;
    source = source.slice(startIndex+1,-lastIndex);
    pattern = pattern.slice(startIndex+1,-lastIndex);
     console.log(source, pattern);

    if(getCount(pattern) === 0)
        return kmp(source,pattern);
    else
        return wildcard(source,pattern);
}


console.log(wildcard("asdasas1drtrtfas2d","as*as?d*as?d"))