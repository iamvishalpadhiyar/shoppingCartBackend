import express from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./productsImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    return res.json("Working");
});

router.post("/", upload.single("image"), async (req, res) => {
    const file = req.file;
    const data = `${process.env.pathUrl}${file.originalname}`;
    return res.json({data});
});

export default router;