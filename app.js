let listadeNumerosSorteados =[];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        msg = numeroSecreto>chute? 'maior':'menor';
        exibirTextoNaTela('p', `Você errou, o número secreto é ${msg} que ${chute}`);
        tentativas++;
        limparCampo();
    }

    console.log(chute == numeroSecreto);
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listadeNumerosSorteados = [];
    }

    if (listadeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listadeNumerosSorteados.push(numeroEscolhido);
        console.log(listadeNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value='';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroLimite}`);
}