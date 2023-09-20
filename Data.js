const { parse } = require("csv-parse");
const fs = require('fs/promises')

function getRandomBsn() {
    var Result1 = "";
    var Nr9 = Math.floor(Math.random() * 7);
    var Nr8 = Math.floor(Math.random() * 10);
    var Nr7 = Math.floor(Math.random() * 10);
    var Nr6 = Math.floor(Math.random() * 10);
    var Nr5 = Math.floor(Math.random() * 10);
    var Nr4 = Math.floor(Math.random() * 10);
    var Nr3 = Math.floor(Math.random() * 10);
    var Nr2 = Math.floor(Math.random() * 10);
    var Nr1 = 0;
    var SofiNr = 0;
    if ((Nr9 == 0) && (Nr8 == 0)) { Nr8 == 1; }
    SofiNr = 9 * Nr9 + 8 * Nr8 + 7 * Nr7 + 6 * Nr6 + 5 * Nr5 + 4 * Nr4 + 3 * Nr3 + 2 * Nr2; Nr1 = Math.floor(SofiNr - (Math.floor(SofiNr / 11)) * 11);
    if (Nr1 > 9) {
        if (Nr2 > 0) { Nr2 -= 1; Nr1 = 8; }
        else { Nr2 += 1; Nr1 = 1; }
    }
    Result1 += Nr9; Result1 += Nr8; Result1 += Nr7; Result1 += Nr6; Result1 += Nr5; Result1 += Nr4; Result1 += Nr3; Result1 += Nr2; Result1 += Nr1;

    return (Result1);
}

async function getRandomLineOfFile(FileName) {

    const stats = await fs.stat(FileName)
    const DELIMITER = '\n'
    const READ_BUFFER_SIZE = 1000

    const handle = await fs.open(FileName, 'r')


    const randomPos = Math.floor(Math.random() * stats.size)

    const buffer = Buffer.alloc(READ_BUFFER_SIZE)
    await handle.read(buffer, 0, READ_BUFFER_SIZE, randomPos)

    const xs = buffer.toString().split(DELIMITER)
    if (xs[2] !== undefined) {
        handle.close()
        return (xs[1].replace('\r', ''))
    }

}
async function getRandomName() {
    const FileName = './Dataset/Names.csv'
    let name =await getRandomLineOfFile(FileName) 

    return name.toLowerCase().replace(/./, c => c.toUpperCase());
}

async function getRandomNumber(){
    return Math.floor(Math.random() * 100).toString()
}

async function getRandomStreetName() {
    const FileName = './Dataset/streetNames.csv'
    return getRandomLineOfFile(FileName)
}
async function getRandomCityName() {
    const FileName = './Dataset/cityNames.csv'
    return getRandomLineOfFile(FileName)
}


async function getRandomDateTime() {
    let from = new Date(2000, 3, 20);
    let to = new Date();
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),

    );
}

async function getRandomLetter() {
    const string = "abcdefghijklmnopqrstuvwxyz";
    return string[Math.floor(Math.random() * string.length)]
}
async function getRandomPostalCode(){
    let output = ''

    for(let i = 0; i<6; i++)
    {
        output += (i <4 ? Math.floor(Math.random() * 10).toString():(await getRandomLetter()).toUpperCase());
    }

  return output;
}

async function getRandomDate() {
    return (await getRandomDateTime()).toISOString().split('T')[0]
}

async function getRandomBirthDate() {
    let from = new Date(1945, 1, 1);
    let to = new Date();
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
}


module.exports = {
    getRandomBsn, getRandomName, getRandomDateTime, getRandomDate, getRandomLetter,getRandomStreetName,getRandomCityName,getRandomPostalCode,getRandomNumber
}