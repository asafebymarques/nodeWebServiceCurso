module.exports = function(app){
    var Schema = require('mongoose').Schema;

    var curso = new Schema({
        codigo: Number,
        descricao: String,
        ch: Number
    });
    return db.model('cursos', curso);
}