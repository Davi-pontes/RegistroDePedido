const pool = require('./connection');

const cadastrarCliente = async (nome,telefone,endereco) => {
    try {
        const verificaSeJaExisteUsuario = await pegarDadosDoCliente(telefone)
        if(verificaSeJaExisteUsuario.length == 0){
            const connection = await pool.getConnection()
    
            const insertResult = await connection.query('INSERT INTO clientes (nome,numero,endereco) VALUES(?,?,?)',
            [nome,telefone,endereco])

            connection.release()

            const insertedClientId = insertResult[0].insertId
    
            return insertedClientId
        }else{
            return verificaSeJaExisteUsuario[0].id_cliente
        }
    } catch (error) {
        console.error("Erro ao cadastrar cliente",error)
        return error

    }
}

const pegarDadosDoCliente = async (telefone) => {
    try {
        const connection = await pool.getConnection()

        const resultado = await connection.query('SELECT * FROM clientes WHERE numero = ?', 
        [telefone])

        connection.release()

        const idUsuario = resultado[0]

        return idUsuario
    } catch (error) {
        console.error("Error ao pegar dados do cliente",error)
        return error
    }
}

module.exports = {cadastrarCliente, pegarDadosDoCliente}