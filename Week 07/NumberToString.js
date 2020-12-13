const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
function NumberToString(number, radix) {
    if (number === 0 || radix === 10) return String(number);

    let num =  Math.abs(number);
    let str = "";
    while (num > 0) {
        str = HEX[num % radix] + str;
        num = parseInt(String(num / radix));
    }
    return number > 0 ? str : ( "-" + str );
}

NumberToString(10000000000,2); // "1001010100000010111110010000000000"

function StringToNumber() {

}
