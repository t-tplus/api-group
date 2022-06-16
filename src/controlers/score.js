
const score = require('../models/score');
const { SOMETHING_WHEN_WRONG, SUCCESSFULLY, } = require('../constant/index');
var funct = {
    createScore: (req, res) => {
        console.log(req.body)
        if (!req.body.tel || !req.body.account) return res.status(500).json({
            message: SOMETHING_WHEN_WRONG,
        });
        let { tel, account } = req.body
        let status = '0', addDate = new Date(), admin = req.user._id
        const _score = new score({
            tel,
            account,
            status,
            admin,
            addDate
        });

        _score.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    message: SOMETHING_WHEN_WRONG,
                });
            }
            if (result) {
                return res.status(201).json(result);
            }
        });
    },
    getScores: (req, res) => {
        var mysort = { createdAt: -1 };
        score.find()
            .sort(mysort)
            .select('-__v')
            .populate([{ path: 'admin', select: "-__v" }, { path: 'user', select: "-__v" }])
            .exec((error, results) => {
                if (error) return res.status(500).json({ error: SOMETHING_WHEN_WRONG });
                if (results) {
                    res.status(201).json(results);
                }
                else { return res.status(500).json({ error: SOMETHING_WHEN_WRONG }); }
            });
    },
    getScoreByAuth: (req, res) => {
        var mysort = { createdAt: -1 };
        score.find({admin:req.user._id})
            .sort(mysort)
            .select('-__v')
            .populate([{ path: 'admin', select: "-__v" }, { path: 'user', select: "-__v" }])
            .exec((error, results) => {
                if (error) return res.status(500).json({ error: SOMETHING_WHEN_WRONG });
                if (results) {
                    res.status(201).json(results);
                }
                else { return res.status(500).json({ error: SOMETHING_WHEN_WRONG }); }
            });
    },
    getScore: (req, res) => {
        score.findOne({ _id: req.params.scoreId })
            .select('-__v')
            .populate([{ path: 'admin', select: "-__v" }, { path: 'user', select: "-__v" }])
            .exec((error, results) => {
                if (error) return res.status(500).json({ error: SOMETHING_WHEN_WRONG });
                if (results) {
                    res.status(201).json(results);
                } else { return res.status(500).json({ error: SOMETHING_WHEN_WRONG }); }
            });
    },
    updateScore: (req, res) => {
        if (req.user.role !== "user") {
            return res.status(500).json({
                error: SOMETHING_WHEN_WRONG
            });
        }
        const _score = new score({
            _id: req.params.scoreId,
            user: req.user._id,
            status: '1',
            endDate: new Date()
        });

        score.findByIdAndUpdate({
            _id: req.params.scoreId
        }, _score)
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
    deleteScore: (req, res) => {
        score.findByIdAndDelete({ _id: req.params.scoreId })
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
