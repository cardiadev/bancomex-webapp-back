const QRCode = require('qrcode')

function generateQR(data){
  return QRCode.toDataURL(data)
  .catch(err => {
    console.error(err)
  })
}

module.exports = { generateQR }
