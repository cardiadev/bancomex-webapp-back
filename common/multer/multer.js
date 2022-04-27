const multer = require('multer');

const storage = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, 'uploads')
     },
     filename: function(req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname)
     }
});

const upload = multer({ storage });
const uploadFile = upload.single('file');
const uploadFiles = upload.array('files', 10);

module.exports = {
     uploadFile,
     uploadFiles
}