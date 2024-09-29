let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10')
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou');
        let palavraTentativas = tentativas>1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if (chute>numeroSecreto){
            exibirTexto('p', 'O número secreto é menor');
        }
        else{
            exibirTexto('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quantidadeDeElementoNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementoNaLista == numeroLimite ){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}