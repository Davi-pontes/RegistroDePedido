const pool = require('./connection');

const formasDePagamentos = async () => {
    const connection = await pool.getConnection()
    try {
        const rows = await connection.query('SELECT * FROM forma_de_pagamento ORDER BY descricao ASC')

        connection.release()
        const resultData = rows[0]
        
        return resultData
    } catch (error) {
        console.log(error)
        return error
        
    }
}
module.exports = {formasDePagamentos}