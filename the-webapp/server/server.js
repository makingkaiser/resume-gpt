const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'allUploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file')

app.post('/upload', (req, res) => {
    upload(req, res, (e) => {
        if (e) {
            return res.status(500).json(e)
        }
        return res.status(200).send(req.file)
    })
});

app.get('/', (req, res) => {
    res.json({message: "Backend API"})
})

app.listen(port, () => {
    console.log("App is running on port 5000")
});