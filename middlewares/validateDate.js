
const moment = require("moment")

const validateDate = (req, res, next) => {
    result = [];
    !moment(req.body.start_date, 'MM/DD/YYYY',true).isValid() ? result.push("Invalid Start Date") : console.log('asdads')
    !moment(req.body.end_date, 'MM/DD/YYYY',true).isValid() ? result.push("Invalid End Date") : false
    
    if (result.length > 0) {

        res.status(400).send({ error: result })
        return
    }
    
    const startDate = Date.parse(req.body.start_date);
    const endDate = Date.parse(req.body.end_date);

    
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