const pool = require('./connection');

const allProducts = async () => {
    const connection = await pool.getConnection()
    try {
        const rows = await connection.query('SELECT * FROM produtos ORDER BY Nome ASC ')

        connection.release()
        const resultData = rows[0]
        return resultData
    } catch (error) {
        console.error(error)
        return error
    }
}

const inserirProdutos = async (nome, preco, disponibilidade) => {
    const connection = await pool.getConnection()
    try {
        await connection.query('INSERT INTO produtos(Nome,preco,disponibilidade) VALUES(?,?,?)',
            [nome, preco, disponibilidade])

        return "Adicionado com sucesso"

    } catch (error) {
        console.error(error)
        return error
    }
}

const deletarProduto = async (idProduto) => {
    const connection = await pool.getConnection()
    try {
        await connection.query('DELETE FROM produtos WHERE id_produto = ?', [idProduto])

        return 'Produto deletado com sucesso'
    } catch (error) {
        console.error(error)
        return error
    }
}
const alterarProduto = async (produtos) => {
    const connection = await pool.getConnection()
    try {
        for(const produto of produtos){
           const nomeToUpperCase = produto.Nome.toUpperCase()
           const precoFormatafo = parseFloat(produto.preco).toFixed(2)

           await connection.query('UPDATE produtos SET Nome = ?, preco = ?, disponibilidade = ? WHERE id_produto = ?',
           [nomeToUpperCase, precoFormatafo, produto.disponibilidade, produto.id_produto])
           connection.release()
        }
        return "Alterado com sucesso"
    } catch (error) {
        console.error(error)
        return error
    }
}
module.exports = { allProducts, inserirProdutos, deletarProduto, alterarProduto }