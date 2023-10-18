const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('DB Conectada!!!')
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

// Toda la tabla
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

// Un registro
function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

// Agregar nuevo registro
function agregar(tabla, data) {
    const usuario = { nombre, edad, profesion } = [data, data];
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, usuario, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}


function editar(tabla, data) {
    const { id, nombre, edad, profesion } = data; // Desestructura el objeto data
    const usuario = { id, nombre, edad, profesion }; // Crea el objeto de usuario
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [usuario, usuario.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}



// Eliminar registro
function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}


// Consulta
function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query,
    editar
}
