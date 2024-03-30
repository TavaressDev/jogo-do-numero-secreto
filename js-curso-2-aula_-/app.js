let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = geradorDeNumero();
let tentativas = 0;

function exibirNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
  exibirNaTela('h1', 'Jogo do número secreto');
  exibirNaTela('p', "Escolha um número entre 1 e 10");
}
exibirMensagemInicial();


function verificarChute() {
  let chute = parseInt(document.querySelector('input').value);
  
  if (chute === numeroSecreto) {
    exibirNaTela('h1', 'Acertou!!');
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
    exibirNaTela('p', mensagemTentativa);
    document.getElementById('reiniciar').removeAttribute('disabled');
  }  
    else {
    if (chute > numeroSecreto) {
      exibirNaTela('p', 'O número secreto é menor');
    } else {
      exibirNaTela('p', 'O número secreto é maior');
    }
    limparCampo();
    tentativas++;
  }
}

function geradorDeNumero() {
  let numeroEscolhido =  Math.floor(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;
  if (quantidadeDeElementosDaLista == numeroLimite){
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return geradorDeNumero();
  }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numeroSecreto = geradorDeNumero();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled',true);
}