const {transporter} = require("../mailService/mailer");

const sendEmail = async function({email, firstName, lastName}, qrCode) {

  let info = await transporter.sendMail({
    from: '"Administración BancoMex" <admin@bancomex.com>',
    to: email,
    subject: "Hola "+firstName+"! Aqui tienes tu Codigo QR!",
    text: "Un gusto saludarte " + firstName + " " + lastName + "!",
    html: "<p>Un gusto saludarte " + firstName + " " + lastName + "!</p>" +
          "<p>Tu Codigo QR!</p>",
    attachments: [
      {
        filename: 'cat.jpg',
        content: qrCode.split("base64,")[1],
        encoding: 'base64'
      }
    ]
  });

  console.log("Message sent: %s by %s", info.messageId, email);

}

const sendEmailWithCard = async function({email, firstName, lastName}, { cardNumber, nip, dateExpiration }) {

  let info = await transporter.sendMail({
    from: '"Administración BancoMex" <admin@bancomex.com>',
    to: email,
    subject: "Hola "+firstName+"! Aqui tienes los datos de tu Tarjeta!",
    text: "Un gusto saludarte " + firstName + " " + lastName + "!",
    html: "<p>Un gusto saludarte " + firstName + " " + lastName + "!</p>" +
          "<p>Los datos de tu tarjeta son:</p>" +
          `<p><b>Número de tarjeta: </b> ${cardNumber} </p>` +
          `<p><b>NIP: </b> ${nip} </p>` +
          `<p><b>Fecha de expiración: </b> ${new Date(dateExpiration).toLocaleDateString()} </p>` ,
  });

  console.log("Message sent: %s by %s", info.messageId, email);

}

module.exports = { sendEmail, sendEmailWithCard }