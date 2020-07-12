//Fotos

const aws = require('aws-sdk');
var multerS3 = require('multer-s3')
var multer = require('multer')
const crypto = require('crypto');
const path = require('path');
const { MulterError } = require('multer');


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.keyfoto = `${hash.toString("hex")}-${file.originalname}`

                cb(null, file.keyfoto);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'moontech-final',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read', //todos arquivos publicos
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const FileName = `${hash.toString("hex")}-${file.originalname}`
                
                console.log(FileName)
                cb(null, FileName);
            });
        }
    }),
}


module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif"
      ];
  
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type."));
      }
    }
  };


