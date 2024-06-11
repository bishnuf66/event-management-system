const validate = require("../../validation/AuthValidation")
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, '..', '..', 'database', 'users.json');

module.exports.Register = (registerData, res) => {
    const myPromise = new Promise((resolve, reject) => {
        try {
            console.log(registerData);
            const userId = randomUUID();
            const validator = validate.register(registerData);
            validator.check().then(async (matched) => {

                console.log(matched, "sdads")
                if (!matched) {
                    // console.log("error in validation")
                    return res
                        .status(400)
                        .json({ message: "Validation error", success: false });
                }
                else {
                    console.log("haha")
                    const userData = {
                        uniqueId: userId,
                        email: registerData.email,
                        name: registerData.name,
                        address: registerData.address,
                    };
                    console.log(userData)

                    if (registerData.password !== registerData.confirmPassword) {
                        console.log("nomatch")
                        reject({ message: "Passwords don't match", success: false });
                    } else {

                        const hashedPass = await bcrypt.hash(registerData.password, saltRounds);
                        userData.password = hashedPass;

                        console.log(hashedPass)

                        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
                            if (err) {
                                if (err.code === 'ENOENT') {

                                    data = '[]';
                                } else {
                                    reject({ message: "Error reading JSON file", success: false });
                                }
                            }

                            let users;
                            try {
                                console.log("haha")
                                users = JSON.parse(data);
                            } catch (parseErr) {
                                console.log(parseErr)
                                console.log("haha")
                                reject({ message: "Error parsing JSON file", success: false });
                                return;
                            }
                            console.log("haha")
                            users.push(userData);

                            fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (err) => {
                                if (err) {
                                    reject({ message: "Error writing to JSON file", success: false });
                                } else {
                                    resolve({ message: "User created successfully", success: true });
                                }
                            });
                        });
                    }
                }
            });
        } catch (err) {
            reject({ message: "Internal Server Error", success: false });
        }
    });

    return myPromise;
};


module.exports.Login = (loginData, res) => {
    const myPromise = new Promise((resolve, reject) => {
        try {
            console.log(loginData)
            const validator = validate.login(loginData);
            validator.check().then(async (matched) => {
                if (!matched) {
                    return res
                        .status(400)
                        .json({ message: "Validation error", success: false });
                } else {
                    // console.log("hah")
                    fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
                        if (err) {
                            return reject({ message: "Error reading JSON file", success: false });
                        }
                        const users = JSON.parse(data);
                        const user = users.find(user => user.email === loginData.email);

                        if (!user) {
                            return reject({ message: "Invalid email", success: false });
                        }

                        const passwordMatch = await bcrypt.compare(loginData.password, user.password);
                        if (!passwordMatch) {
                            return reject({ message: "Invalid password", success: false });
                        }

                        const token = jwt.sign(
                            { email: user.email },
                            process.env.SECRET_KEY,
                            { expiresIn: '55h' }
                        );

                        resolve({
                            message: "Login successful",
                            token: token,
                            data: { email: user.email },
                            success: true
                        });
                    });
                }
            });
        } catch (err) {
            reject({ message: "Internal Server Error", success: false });
        }
    });

    return myPromise;
};



module.exports.getUser = (emaildata, res) => {
    const email = emaildata
    const myPromise = new Promise((resolve, reject) => {

        console.log(email)
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {

                reject({ message: "error reading file", success: false });
                return;
            }
            try {
                console.log(email)
                const users = JSON.parse(data);
                const user = users.find(user => user.email === email);
                if (!user) {
                    reject({ message: "user not found", success: false })
                }
                if (user) {
                    resolve({ user, message: "user fetched successfully", success: true });
                }
            } catch (error) {
                reject({ message: "internal server error", success: false });
            }
        });
    });
    return myPromise
};