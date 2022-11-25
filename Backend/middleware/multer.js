const multer = require("multer");

// Configuration de Multer
const MINE_TYPES ={
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png"
}

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_").replace(/[^a-zA-Z ]/g, "");
        const extention = MINE_TYPES[file.mimetype];
        callback(null, name + "." + extention);
    }

});

module.exports = multer({ storage: storage }).single("photo");