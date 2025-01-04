import { Dados } from './interface';

export async function writeCSV(data:Dados[], filePath:string, message:string) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
    path: filePath,
    header: [
        {id: 'nome', title: 'nome'},
        {id: 'peso', title: 'peso'},
        {id: 'valor', title: 'valor'},
        {id: 'quantidade', title: 'quantidade'},
    ]
});
    csvWriter.writeRecords(data)
    .then(() => {
    console.log(message);
    });
}