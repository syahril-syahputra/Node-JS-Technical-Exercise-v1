const validateDate = (req, res, next) => {
    const startDate = Date.parse(req.body.start_date);
    const endDate = Date.parse(req.body.end_date);

    result = [];
    if (!isNaN(startDate) == false) {
        result.push("Invalid Start Date")
    }
    if (!isNaN(endDate) == false) {
        result.push("Invalid End Date")
    }

    if (result.length > 0) {

        res.status(400).send({ error: result })
        return
    }

    next()
}
module.exports = validateDate