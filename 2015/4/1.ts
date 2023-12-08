import { createHash } from "crypto";

const secret = 'bgvyzdsv';
let num = 0;

while(true){
    const str = createHash("md5").update(secret + num).digest("hex");

    if(str.startsWith('00000')){
        console.log(num);
        break;
    }

    num++;
}