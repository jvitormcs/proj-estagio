const express = require('express');
require('dotenv').config();
const app = express()
const conn = require('./database/conn.js');
const rotas = require('./routes/index.routes.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/api/security', (req, res) => {
    res.status(200).json({message: 'ok'}
    )
})

app.use('/api', rotas)

const port = process.env.PORT || 3000

conn.sync().then( () => {
    
    app.listen(port, () => {
        console.log(`Server iniciado em http://localhost:${port}`)
    })

}).catch((err) => console.error(err));