const { Schema, model} = require('mongoose')

const PoliciaSchema = Schema({

    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    tipoID: {
        type: String,
    },
    numeroID: {
        type: String,
        required: true,
        unique: true
    },
    placaID: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    chatsUid:{
        type: Array,
    }

});

PoliciaSchema.method('toJSON',function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Policia',PoliciaSchema);