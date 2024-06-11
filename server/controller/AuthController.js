const { Login,
    Register,
    getUser } = require("../services/authentication/AuthService");

module.exports.Login = async (req, res) => {
    try {
        const result = await Login(req.body, res);

        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports.Register = async (req, res) => {
    try {
        const result = await Register(req.body, res);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};
module.exports.getUser = async (req, res) => {
    try {
        const result = await getUser(req.email, res);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

