const app = require('./app');

const PORT = process.env.PORT || 5000; //puerto por defecto

app.listen(PORT, () => { //escuchar al puerto
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



