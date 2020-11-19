function kmp(source,pattern) {
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1,j = 0;
        while (i < pattern.length){
            if(pattern[i] === pattern[j]){
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
            if(source[i] === pattern[j]){
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
console.log(kmp("abababc1","abababc"));
;
// 0 1 2 3 4 5 6 7
// a a b a a a c
// 0 0 1 0 1 2 2