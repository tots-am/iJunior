//imports
import fs from 'fs';
import csv from 'csv-parser';

const input = require('prompt-sync')({sigint: true});

interface Dados{
    nome: string;
    peso: number;
    valor: number;
    quantidade: number;
}
//funçoes
const readCSV = async (filePath: string): Promise<Dados[]> => {
    return new Promise((resolve, reject) => {
      const results: Dados[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Dados) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};
const lerCSV = async () => {
    try {
        const dadosLidos = await readCSV('./estoque.csv');
        if(dadosLidos.length == 0){
            console.log("Não há produtos no estoque!");
        } else {
            console.log("Nome | Peso | Valor | Quantidade")
            for(var i = 0; i < dadosLidos.length; i++){
                console.log(dadosLidos[i].nome, dadosLidos[i].peso, dadosLidos[i].valor, dadosLidos[i].quantidade);
            }
        }
    } catch (error) {
        console.log('erro: ',error);
    }
}

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './estoque.csv',
    header: [
        {id: 'nome', title: 'nome'},
        {id: 'peso', title: 'peso'},
        {id: 'valor', title: 'valor'},
        {id: 'quantidade', title: 'quantidade'},
    ]
});

async function escreverCSV() {
    var nomeP = input('Digite o nome do produto: ')
    var pesoP = input('Digite o peso do produto: ')
    var valorP = input('Digite o valor do produto: ')
    var quantP = input('Digite a quantidade do produto: ')

    const dadosLidos = {
        nome: nomeP,
        peso: pesoP,
        valor: valorP,
        quantidade: quantP
    } as Dados

    var data = await readCSV('./estoque.csv');
    data.push(dadosLidos);
     
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Produto adicionado no estoque com sucesso!');
        });
}

//menu
do {
    var entrada;
    async function main() {
        console.log('0: Encerrar Programa\n1: Ver Estoque\n2: Adicionar Produto')
        entrada = input('Digite a operação: ');

        if(entrada == '1'){
            await lerCSV();
        }
        if(entrada == '2'){
            await escreverCSV();  
        }
    }
    main();
} while (entrada !== '0');