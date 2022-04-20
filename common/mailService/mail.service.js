const {transporter} = require("../mailService/mailer");

const sendEmail = async function({email, name, lastName}, qrCode) {

  let info = await transporter.sendMail({
    from: '"Administración BancoMex" <admin@bancomex.com>',
    to: email,
    subject: "Hola "+name+"! Aqui tienes tu Codigo QR!",
    text: "Un gusto saludarte " + name + " " + lastName + "!",
    html: "<p>Un gusto saludarte " + name + " " + lastName + "!</p>" +
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

module.exports = { sendEmail }