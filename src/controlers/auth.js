const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('../models/auth');
const { USER_NAME_ALREADY_REGISTERED, SOMETHING_WHEN_WRONG,
     INVALID_USER_NAME_OR_PASSWORD, SUCCESSFULLY, } = require('../constant/index');


const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
var funct = {
    adminSignUp: (req, res) => {
        admin.findOne({ userName: req.body.userName }).exec(async (error, _adm) => {
            if (error) return res.status(500).json({ message: SOMETHING_WHEN_WRONG });
            if (_adm)
                return res.status(401).json({
                    error: USER_NAME_ALREADY_REGISTERED,
                });
            const { userName, password, status,role } = req.body;
            if (!password)
            return res.status(500).json({
                error: SOMETHING_WHEN_WRONG,
            });
            const hash_password = await bcrypt.hash(password, 10);
            const _admin = new admin({
                userName,
                hash_password,
                status,
                role,
            });

            _admin.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: SOMETHING_WHEN_WRONG,
                    });
                }
                if (result) {
                    const token = generateJwtToken(result._id, result.role);
                    return res.status(201).json({
                        token,
                        admin: result,
                    });
                }
            });
        });
    },
    adminSignIn: (req, res) => {
        admin.findOne({ userName: req.body.userName }).exec(async (error, _adm) => {
            if (error) return res.status(500).json({ message: SOMETHING_WHEN_WRONG });
            if (_adm) {
                const isPassword = await _adm.authenticate(req.body.password);
                if (isPassword && _adm.role === "admin") {
                    const token = generateJwtToken(_adm._id, _adm.role);
                    res.status(201).json({
                        token,
                        result: _adm,
                    });
                } else if (isPassword && _adm.role === "user") {
                    const token = generateJwtToken(_adm._id, _adm.role);
                    res.status(201).json({
                        token,
                        result: _adm,
                    });
                }else {
                    return res.status(401).json({
                        message: INVALID_USER_NAME_OR_PASSWORD,
                    });
                }
            } else {
                return res.status(401).json({ message: INVALID_USER_NAME_OR_PASSWORD });
            }
        });
    },
    getAdmins: (req, res) => {
        var mysort = { createdAt: -1 };
        admin.find()
            .sort(mysort)
            .select('-__v')
            .exec((error, results) => {
                if (error) return res.status(500).json({ error: SOMETHING_WHEN_WRONG });
                if (results) {
                    res.status(201).json(results);
                }
                else { return res.status(500).json({ error: SOMETHING_WHEN_WRONG }); }
            });
    },
    getAdmin: (req, res) => {
        admin.findOne({ _id: req.params.adminId })
            .select('-__v')
            .exec((error, results) => {
                if (error) return res.status(500).json({ error: SOMETHING_WHEN_WRONG });
                if (results) {
                    res.status(201).json(results);
                } else { return res.status(500).json({ error: SOMETHING_WHEN_WRONG }); }
            });
    },
    updateAdmin: (req, res) => {
        const { role, status } = req.body;
        const _admin = new admin({
            _id: req.params.adminId,
            role,
            status,
        });

        admin.findByIdAndUpdate({
            _id: req.params.adminId
        }, _admin)
            .then(result => {
                res.status(201).json({
                    message: SUCCESSFULLY
                });
                console.log(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: SOMETHING_WHEN_WRONG
                });
                console.log(err)
            });
    },
    deleteAdmin: (req, res) => {
        admin.findByIdAndDelete({ _id: req.params.adminId })
            .then(result => {
                res.status(201).json({
                    message: SUCCESSFULLY
                });
                console.log(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: SOMETHING_WHEN_WRONG
                });
                console.log(err)
            });
    }
}

module.exports = funct
