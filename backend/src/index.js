const app = require('./app');
const cors = require('cors');

app.listen(app.get('port'), () =>{
    console.log("Servidor escuchando en el puerto", app.get("port"));
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  