const Data_e_Hora_Atual = require('./DataEHora')
const pool = require('./connection');
const Cliente = require('./Cliente')

const AdicionarProduto = async (dados) => {
    try {
        const idCliente = await Cliente.cadastrarCliente(dados.nome, dados.telefone, dados.endereco)

        console.log('idCliente' + idCliente)

        const dataAtual = Data_e_Hora_Atual.getDateCurrent()
        const horaAtual = Data_e_Hora_Atual.getHoursCurrent()

        const connection = await pool.getConnection()

        const resultado = await connection.query('INSERT INTO pedidos (Data, Hora,total_pedido,id_cidadeBairro, id_clientes, id_forma_de_pagamento) VALUES (?,?,?,?,?,?)',
            [dataAtual, horaAtual, dados.total, dados.cidadebairro.id_cidadeBairro, idCliente, dados.formaDepagamento.id_pagamento]);


        const idPedido = resultado[0].insertId


        for (const produtos of dados.produtos) {
            await connection.query('INSERT INTO itens_do_pedido (idpedidos,idprodutos) VALUES(?,?)',
                [idPedido, produtos.id_produto])
        }

        return 'Pedido adicionado com sucesso'
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { AdicionarProduto }