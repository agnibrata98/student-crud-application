const StudentModel = require('../models/student.model');
const fs = require('fs');
const path = require('path');

class AppController {
    async showForm(req, res) {
        res.render('form', {
            title: 'Form'
        });
    }


    async create(req, res) {
        try {
            const { fullName, email, password } = req.body;
            let isEmailExists = await StudentModel.find({
                email,
                isDeleted: false
            });
            if (isEmailExists.length > 0) {
                console.log("error", "Email is already exists");
                return res.redirect("/");
            }
            const student = await StudentModel.create({
                fullName,
                email,
                password,
                resume: req.file.filename
            });
            console.log(student);
            res.redirect("/");
        } catch (error) {
            throw error;
        }
    }

    async showList(req, res) {
        try {

            const students = await StudentModel.find({
                isDeleted: false
            });
            // console.log(students);

            res.render('list', {
                title: 'List',
                students
            });
            
        } catch (error) {
            throw error;
        }
    }

    async downloadResume(req, res) {
        try {
            const { filename } = req.params;
            const filePath = `public/uploads/${filename}`;
            res.download(filePath);
        } catch (error) {
            throw error;
        }
    }

    async editData(req, res) {
        try {
            const { id } = req.params;
            const student = await StudentModel.findById(id);
            // console.log(student);
            res.render('edit', {
                title: 'Edit',
                student
            });
        } catch (error) {
            throw error;
        }
    }


    async updateData(req, res) {
        try {
            const { id, fullName, email, password } = req.body;
            const student = await StudentModel.findById(id);
            const updateObj = {
                fullName,
                email,
                password
            };

            // Only update resume if a new file was uploaded
            if (req.file) {
                const oldResumePath = path.join(__dirname, '../public/uploads', student.resume);

                if (fs.existsSync(oldResumePath)) {
                    fs.unlinkSync(oldResumePath);
                    console.log('Old resume deleted:', student.resume);
                }

                updateObj.resume = req.file.filename;
            }

            const updatedStudent = await StudentModel.findByIdAndUpdate(id, updateObj);
            console.log(updatedStudent);
            res.redirect("/");
        } catch (error) {
            throw error;
        }
    }


    async deleteData(req, res) {
        try {
            const { id } = req.params;
            const student = await StudentModel.findByIdAndUpdate(id, {
                isDeleted: true
            });
            res.redirect("/");
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AppController();
