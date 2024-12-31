//imports
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

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
        console.log("Nome | Peso | Valor | Quantidade");
        console.log(dadosLidos[0].nome, dadosLidos[0].peso, dadosLidos[0].valor, dadosLidos[0].quantidade);
    } catch (error) {
        console.log('erro: ',error);
    }
   }

const writeCSV = async (filePath: string, data: Dados[]): Promise<void> => {
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
          { id: 'nome', title: 'NOME' },
          { id: 'peso', title: 'PESO' },
          { id: 'valor', title: 'VALOR' },
          { id: 'quantidade', title: 'QUANTIDADE' },
        ],
    });
  
    return csvWriter.writeRecords(data);
};

//menu
console.log("Bem vindo\n1: Adicionar Produto\n2: Remover Produto\n3: Ver Estoque");
var entrada = input('Digite a operacao: ');
if(entrada == '3'){
   lerCSV();
}