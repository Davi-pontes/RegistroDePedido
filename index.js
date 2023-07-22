const Conexao = require('./Venom')

exports.enviarMensagem = async (mensagem) => {
    try {
        const client = await Conexao.Connect()
        const string = JSON.stringify(mensagem)

        const groupId = '120363156215157686@g.us'

        await client.sendText(groupId,string);

    } catch (error) {
        console.log(error);
    }
}