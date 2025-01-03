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

async function removerCSV() {
    var dadosLidos = await readCSV('./estoque.csv');
    var nomeP = input('Digite o nome do produto a ser removido: ')
    for(var i = 0; i < dadosLidos.length; i++){
        if(dadosLidos[i].nome == nomeP){
            var confirm;
            do {
                confirm = input('Deseja remover esse produto? [Y/N] ')
            } while (confirm != 'Y' && confirm != 'N');
            if(confirm === 'Y'){
                dadosLidos = dadosLidos.filter(item => item !== dadosLidos[i]);
                csvWriter.writeRecords(dadosLidos)
                .then(() => {
                    console.log('Produto removido do estoque com sucesso!');
                });
            }
            break;
        } else {
            if(i == dadosLidos.length - 1){
                console.log('Produto não encontrado');
            }
        }
    }
}

//menu
var entrada;
async function main() {
    console.log('\n0: Encerrar Programa\n1: Adicionar Produto\n2: Remover Produto\n3: Ver Estoque')
    entrada = input('Digite a operação: ');
    
    if(entrada == '1'){
        await escreverCSV();  
    }
    if(entrada == '2'){
        await removerCSV();
    }
    if(entrada == '3'){
        await lerCSV();
    }
}
main();