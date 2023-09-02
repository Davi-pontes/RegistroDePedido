const pool = require('./connection')
const axios = require('axios')

async function getData(){
    axios.get('http://localhost:3000/entrega').then((response) => {
        console.log(response.data)
    })

}

async function setProductsDB() {
    const dateCurrent = data.map((it) => {
        return {
            nome: it.produto.toUpperCase(),
            preco: parseFloat(it.preço.replace(/^R\$/, ''))
        }
    })
    const connection = await pool.getConnection()
    try {
        for (let i = 0; i < dateCurrent.length; i++) {
            let nome = dateCurrent[i].nome

            let preco = dateCurrent[i].preco

            let disponibilidade = 'DISPONIVEL'

            await connection.query('INSERT INTO produtos (Nome,preco,disponibilidade) VALUES (?,?,?)',
                [nome, preco, disponibilidade])

            console.log(nome, preco)
        }
        await connection.query('COMMIT')

    } catch (error) {
        console.log(error)

    } finally {
        connection.release()
    }

}
getData()