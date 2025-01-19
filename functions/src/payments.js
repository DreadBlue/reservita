const { log } = require("firebase-functions/logger");
const { onRequest } = require("firebase-functions/v2/https");
const crypto = require("crypto");

const paymentReceiver = onRequest(async (req, res) => {
    const boldPrivateKey = process.env.BOLD_PRIVATE_KEY;
    const signature = req.headers["bold-signature"];
    const payload = JSON.stringify(req.body);

    const hash = crypto
        .createHmac("sha256", boldPrivateKey)
        .update(payload)
        .digest("hex");
    if (hash === signature) {
        const event = req.body;
        log("Evento recibido:", event);

        // try{
        //   const reservaDB = query(
        //     collection(db, 'reservas'),
        //     where('Nombre', '==', parseInt(booking[0])),
        //     where('Correo', '==', booking[1]),
        //   );
        //   let snapshot = await getDocs(reservaDB);
        // } catch (e) {
        //   log('catch', e);
        //   return error(e);
        // }
        res.status(200).send("Evento recibido correctamente");
    } else {
        res.status(400).send("Firma inválida");
    }
});

module.exports = {
    // reservarCard,
    paymentReceiver,
};
