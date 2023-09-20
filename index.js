var fs = require("fs");
var data  = require("./Data.js")
const prompt = require('prompt-sync')({sigint: true});
const path = 'JsonFiles/'
const fileNames = ["client.json","client.json"]






let keyMap = {Name:data.getRandomName, Date:data.getRandomDate,BSN:data.getRandomBsn,City:data.getRandomCityName, Street:data.getRandomStreetName,
        PostalCode:data.getRandomPostalCode,Number:data.getRandomNumber,Letter:data.getRandomLetter}



async function  generateJsonArray(numberOf,contents){
    let outputfile = "output.json"
    let output = []

    for(let i = 0; i < numberOf; i++){
        let object = {}
        for (const [key, value] of Object.entries(contents)) {
            

            
            let randomValue = '';
            if(value in keyMap){
                randomValue = await keyMap[value]();
            }
            else
                randomValue = value

            object[key] = randomValue;

        }
        output.push(object);
    }
    console.log(output)
   
    fs.writeFile(outputfile, JSON.stringify(output), function(err) {
        if (err) {
            console.log(err);
        }
    });

}


async function  generateJson(contents){



    let object = {}
    for (const [key, value] of Object.entries(contents)) {
        console.log(key)

        
        let randomValue = '';
        if(value in keyMap){
            randomValue = await keyMap[value]();
        }
        else
            randomValue = value

        object[key] = randomValue;

    }
    console.log(object)
}

function sendRequest(body){

}


function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


let question = 'choose one of the following with a number of requests: '
for(let i = 0; i < fileNames.length; i++)
    question = question + "\n" + i.toString() + " " + fileNames[i];
    question+= "\nor break to stop:"

    console.log(question)
while(true){
    const input = prompt('type: ');
    
    if(input == "break")
        break

    let inputTokens = input.split(' ')
    let index = parseInt(inputTokens[0])
    let numberOfRequets = parseInt(inputTokens[1])
    if(isNaN(numberOfRequets))
        numberOfRequets = 1

    var contents = JSON.parse(fs.readFileSync(path+fileNames[index]));


    for(let i = 0; i < numberOfRequets; i++){
        generateJson(contents)
        console.log(contents)
    }


    if(index<0 || input>=fileNames.length)
        console.log("number is wrong pleas try again")




}




