const express = require('express');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(expressFileUpload({
    createParentPath: true
}));

app.post('/upload', (req, res) => {
    if(Object.keys(req.files).length === 0){
        res.json({ msg: 'No file upload' });
    }

    const file = req.files.file;
    const { name, ext } = path.parse(file.name);
    const fileName = name + '-' + Date.now() + ext;
    const uploadPath = path.join(__dirname, 'client', 'public', 'uploads', fileName);
    
    file.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);

        res.json({ fileName, filePath: `/uploads/${fileName}` });
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
