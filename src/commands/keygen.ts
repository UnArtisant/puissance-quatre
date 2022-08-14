import { generateKeyPairSync } from "crypto";
import {writeFileSync} from "fs";

// @ts-ignore
const {privateKey} = generateKeyPairSync("rsa",{
    modulusLength : 2048,
    privateKeyEncoding : {
        type : "pkcs1",
        format: "pem"
    }
})

writeFileSync("privateKey.pem", privateKey)
console.log("key generated")