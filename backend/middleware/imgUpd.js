const multer=require('multer');
// save image to server to store that into the database 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/routes/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

module.exports=upload;