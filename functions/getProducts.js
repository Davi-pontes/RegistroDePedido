const pool = require('../connection');

const allProducts = async () => {
    const connection = await pool.getConnection()
    try {
        const rows = await connection.query('SELECT * FROM produtos')

        connection.release()
        return rows
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = allProducts