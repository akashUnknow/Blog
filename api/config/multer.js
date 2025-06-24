import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  if (!allowedFiles.includes(file.mimetype)) {
    cb(null, Error("Only .png, .jpg, .jpeg and .gif format allowed!"));
  } else {
    cb(null, true);
  }
}
const upload = multer({ storage: storage , fileFilter: fileFilter });
export default upload;
