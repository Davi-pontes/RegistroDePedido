const index = require('./index')

async function criarConexao(mensagem){
    await index.teste(mensagem)

    console.log('Mensagem enviada com sucesso')
}

criarConexao("Ola");
