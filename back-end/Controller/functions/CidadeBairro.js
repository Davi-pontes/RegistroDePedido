const pool = require('./connection');

const getCidadeBairro = async() => {
    const connection = await pool.getConnection()
    try {
        const rows = await connection.query('SELECT * FROM cidadebairro ORDER BY nome ASC')

        connection.release()
        const resultData = rows[0]

        return resultData
    } catch (error) {
        console.log(error)
        return error
    }

}
module.exports = {getCidadeBairro}