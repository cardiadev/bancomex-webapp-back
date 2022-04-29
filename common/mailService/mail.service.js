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

const sendEmailCreditAllow = async function( client, amount, cardNumber, cardBanco ) {

  let info = await transporter.sendMail({
    from: '"Administración BancoMex" <admin@bancomex.com>',
    to: client.email,
    subject: "Hola "+client.firstName+"! Tu credito ha sido aceptado!",
    text: "Un gusto saludarte " + client.firstName + " " + client.lastName + "!",
    html: "<p>Un gusto saludarte " + client.firstName + " " + client.lastName + "!</p>" +
          `<p>Tu credito ha sido aceptado y se han depositado $${amount} MXN a tu cuenta</p>` +
          `<p><b>Número de tarjeta: </b> ${cardNumber} </p>` +
          `<p><b>Para pagar el credito, depositar a la siguiente cuenta: </b> ${cardBanco} </p>`,
  });

  console.log("Message sent: %s by %s", info.messageId, client.email);

}

const sendEmailCreditDenied = async function( client, amount ) {

  let info = await transporter.sendMail({
    from: '"Administración BancoMex" <admin@bancomex.com>',
    to: client.email,
    subject: "Hola "+client.firstName+"! Tu credito ha sido rechazado",
    text: "Un gusto saludarte " + client.firstName + " " + client.lastName + "!",
    html: "<p>Un gusto saludarte " + client.firstName + " " + client.lastName + "!</p>" +
          `<p>Lamentamos informarte que tu credito ha sido por la cantidad de $${amount} MXN ha sido rechazado</p>` +
          `<p>Para aclaraciones puede ponerse en contacto con el banco</p>` +
          `<p>Llamenos: 3336359912</p>`,
  });

  console.log("Message sent: %s by %s", info.messageId, client.email);

}

module.exports = { sendEmail, sendEmailWithCard, sendEmailCreditAllow, sendEmailCreditDenied }