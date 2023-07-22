const Conexao = require('./Venom')
let client;

async function iniciarConexao () {
    try {
        client = await Conexao.Connect()

    } catch (error) {
        console.log(error);
    }
}
iniciarConexao()

async function teste(mensagem) {
    try {
        if (!client) {
            throw new Error('Conexão não foi iniciada. Chame a função iniciarConexao() primeiro.');
        }

        const groupId = '120363156215157686@g.us';
        await client.sendText(groupId, mensagem);

        console.log('Mensagem enviada com sucesso!');
    } catch (error) {
        console.log('Erro ao enviar mensagem:', error);
    }
}

exports.teste = teste;

