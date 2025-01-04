//imports
import { lerCSV } from './controller/funcoesEstoque';
import { removerCSV } from './controller/funcoesEstoque';
import { escreverCSV } from './controller/funcoesEstoque';

const input = require('prompt-sync')({sigint: true});

//menu
var entrada;
async function main() {
    console.log('\n0: Encerrar Programa\n1: Adicionar Produto\n2: Remover Produto\n3: Ver Estoque e seus dados')
    entrada = input('Digite a operação: ');
    
    switch (entrada) {
        case '0':
            console.log('Programa Encerrado')
            break;
        case '1':
            await escreverCSV();
            break;
        case '2':
            await removerCSV();
            break;
        case '3':
            await lerCSV();
            break;
    }
}
main();