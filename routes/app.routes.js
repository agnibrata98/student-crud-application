const route = require('express').Router();
const appController = require('../controllers/app.controller');
const FileUploader = require('../helper/fileUpload');

const fileUpload = new FileUploader({
    folderName: "public/uploads", supportedFiles: ["application/pdf"], fieldSize: 1024 * 1024 * 5
});

route.get('/', appController.showList);

route.get('/form', appController.showForm);

route.post('/submit-form', fileUpload.upload().single('resume'), appController.create);

route.get('/download-resume/:filename', appController.downloadResume);

route.get('/edit-student/:id', appController.editData);

route.post('/update-form', fileUpload.upload().single('resume'), appController.updateData);



route.get('/delete-student/:id', appController.deleteData);


module.exports = route;
