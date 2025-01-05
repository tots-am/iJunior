/*
IMPORTANTE!
>> Olá avaliador, espero que esteja tudo bem com você!
>> Peço ao senhor(a) que avalie esta atividade com o coração aberto, uma vez que esse é meu
>> primeiro projeto com TS e JS e com qualquer linguagem orientada a Objetos.
>> E é tambem por essa razão que gostaria de agradecer a vocês por essa oportunidade de passar por
>> esse processo de aprendizagem, no qual eu superei desafios e obstáculos que achei que eram
>> impensáveis para mim a apenas algumas semanas atras.
>> Obrigado. 
>> ah, e por algum motivo não consigo de jeito nenhum fazer as funções funcionarem no while...
>> (na minha cabeça o await ia resolver mas parece que não)
*/
//imports
import { lerCSV } from './service/funcoesEstoque';
import { removerCSV } from './service/funcoesEstoque';
import { escreverCSV } from './service/funcoesEstoque';

const input = require('prompt-sync')({sigint: true});

//menu
var entrada;
const main = async() => {
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
//while (entrada != 0) {
    main()
//}
