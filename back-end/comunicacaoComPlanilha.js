const express = require('express')
const app = express()
var XLSX = require('xlsx')
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/produtos', (req, res) => {
    var workbook = XLSX.readFile('./BDjheniferdoce.xlsx');
    var sheet_name_list = workbook.SheetNames;
    res.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
})

app.get('/entrega', (req, res) => {
    var workbook = XLSX.readFile('./BDjheniferdoce.xlsx');
    var sheet_name_list = workbook.SheetNames;
    res.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]))
})




app.listen('3002', () => {
    console.log('Servidor rodando na porta 3002')
})