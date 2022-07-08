const axios = require('axios');
// const Policia = require("../models/policia");
const enviarNotificacion = async(req, res = response) => {

    const { latitude, longitude } = req.body;

    // const policia = new Policia( {
    //     nombres: 'David ',
    //     apellidos: 'Estupiñan',
    //     tipoID: 'Cedula Ciudadania',
    //     numeroID: '51789023',
    //     placaID: 'FM1045',
    //     telefono: '3112398041',
    //     email: 'davidestupi@gmail.com',
    //     password: 'david123'
    // });
    // await policia.save();

    try{
        const notification = {
            "app_id": "d15ae3eb-8e90-4a9c-bf6f-e1f540361baa",
            "included_segments": ["Subscribed Users"],
            "data": {"userId": "PostMan1234"},
            "contents": {"en": `A unidades disponibles, hay una emergencia, toca para ver la ubicación`, "es": "Hay una emergencia, toca para ver la ubicación"},
            "heading": {"en": "New alert!", "es": "Nueva alerta!"},
            "url": `https://maps.google.com/?q=${latitude},${longitude}`
        };
            
        // fetch("https://onesignal.com/api/v1/notifications",{
        //     method: "POST",
        //     body: notification,
        //     headers: {
        //         'Content-type': 'application/json',
        //         'Authorization': 'Basic YzE1NmNlN2ItMzQ4MS00ODJjLTgwMjAtNTE3MmE4YTVhYzU2'
        //     }
        // }).then(res => res.json()).then(res => console.log(res));
console.log('enviando noti');
        axios.post("https://onesignal.com/api/v1/notifications",notification,{
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic MDUyMjkwZTQtNTI2MC00Yjc5LWFmNzYtZTg5MGY1ZTVkZjc0'
            }
        }).then(response => {
            return res.status(200).json({
                success: true,
                msg: "Notificación enviada"
    
            })
        }).catch(error => {
            console.log('Axios error mandando post req',error)
            return res.status(500).json({
                success: false,
                msg: "Por favor hable con el administrador"
            });
        });
    }catch(e){
        console.log('Error notificaciío',e)
        res.status(500).json({
            success: false,
            msg: "Por favor hable con el administrador"

        });
    }

}

module.exports = {
    enviarNotificacion
}