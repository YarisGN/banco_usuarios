const TABLA = 'clientes';
module.exports = function (dbInyectada) {
    
    let db = dbInyectada;
    if(!db){
        db = require('../../DB/mysql');
    }
    
    function todos () {
        return db.todos(TABLA);
    }
    
    function uno (id) {
        return db.uno(TABLA, id);
    }
    
    function agregar (body) {
        return db.agregar(TABLA, body);
    }

    function editar (body) {
        return db.editar(TABLA, body);
    }
    
    function eliminar(id) {
        return db.eliminar(TABLA, id);
    }
    

    return{
        todos,
        uno,
        agregar,
        eliminar,
        editar
    }
}