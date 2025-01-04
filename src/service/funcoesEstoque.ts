import { Dados } from "../model/interface";
import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";
import fs from 'fs';

const input = require('prompt-sync')({sigint: true});

var csvExists = true;
try {
    fs.accessSync('./estoque.csv', fs.constants.F_OK);
    csvExists = true;
} catch (err) {
    csvExists = false;
}

export const lerCSV = async () => {
    if(csvExists == true){
        try {
            const dadosLidos = await readCSV('./estoque.csv');
            if(dadosLidos.length == 0){
                console.log("Não há produtos no estoque!");
            } else {
                console.log("Nome | Peso | Valor | Quantidade")
                for(var i = 0; i < dadosLidos.length; i++){
                    console.log(dadosLidos[i].nome, dadosLidos[i].peso, dadosLidos[i].valor, dadosLidos[i].quantidade);
                }
                console.log('\nDados:')
    
                var valorTotal = 0;
                for(var i = 0; i < dadosLidos.length; i++){
                valorTotal = valorTotal + dadosLidos[i].quantidade * dadosLidos[i].valor;
                }
                console.log('O valor total do estoque é de $',valorTotal);
    
                var pesoTotal = 0;
                for (let i = 0; i < dadosLidos.length; i++) {
                    pesoTotal = pesoTotal + dadosLidos[i].peso;
                }
                console.log('O peso total do estoque é de', pesoTotal,'Kg');
    
                var somaValores = 0;
                for (let i = 0; i < dadosLidos.length; i++) {
                    somaValores = somaValores + dadosLidos[i].valor;
                }
                var mediaValores = somaValores / dadosLidos.length;
                console.log('A media dos valores é de $', mediaValores);
    
                var mediaPeso = pesoTotal / dadosLidos.length;
                console.log('O peso medio do estoque é de', mediaPeso,'Kg');
    
                var quantTotal = 0;
                for (let i = 0; i < dadosLidos.length; i++) {
                    quantTotal = quantTotal + dadosLidos[i].quantidade;  
                }
                console.log('A quantidade total de itens é', quantTotal);
    
                console.log('A quantidade de produtos é', dadosLidos.length)
            }
        } catch (error) {
            console.log('erro: ',error);
        }
    } else {
        console.log('O estoque ainda não foi criado! Adicione um produto antes');
    }
}

export async function removerCSV() {
    if(csvExists == true){
        var dadosLidos = await readCSV('./estoque.csv');
        var nomeP = input('Digite o nome do produto a ser removido: ')
        for(var i = 0; i < dadosLidos.length; i++){
            if(dadosLidos[i].nome == nomeP){
                var confirm;
                do {
                    confirm = input('Deseja remover esse produto? [Y/N] ')
                } while (confirm != 'Y' && confirm != 'N' && confirm != 'y' && confirm != 'n');
                if(confirm === 'Y' || confirm === 'y'){
                    dadosLidos = dadosLidos.filter(item => item !== dadosLidos[i]);
                    writeCSV(dadosLidos, './estoque.csv', 'Produto removido com sucesso!');
                } else {
                    console.log('Operação cancelada pelo usuario')
                }
                break;
            } else {
                if(i == dadosLidos.length - 1){
                    console.log('Produto não encontrado');
                }
            }
        }
    } else {
        console.log('O estoque ainda não foi criado! Adicione um produto antes');
    }
}

export async function escreverCSV() {

    var nomeP = input('Digite o nome do produto: ')
    var pesoP = input('Digite o peso do produto: ')
    var valorP = input('Digite o valor do produto: ')
    var quantP = input('Digite a quantidade do produto: ')

    var dadosLidos:Dados = {
        nome: nomeP,
        peso: pesoP,
        valor: valorP,
        quantidade: quantP
    }

    if(typeof dadosLidos.nome !== 'string' || isNaN(dadosLidos.peso) || isNaN(dadosLidos.quantidade) || isNaN(dadosLidos.valor)){
        console.log('Dados inválidos para o produto');
    } else {
        if(csvExists == true){
            var data = await readCSV('./estoque.csv');
            data.push(dadosLidos);
            writeCSV(data, './estoque.csv', 'Produto adicioado com sucesso!');
        } else {
            writeCSV([dadosLidos], './estoque.csv', 'Estoque iniciado com sucesso!');
        }
    }
}