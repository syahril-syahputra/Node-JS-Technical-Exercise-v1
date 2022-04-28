const express = require("express");
const router = express.Router()
const fs = require('fs');

router.post("/", (req, res) => {
    const startDate = new Date(Date.parse(req.body.start_date));
    const endDate = new Date(Date.parse(req.body.end_date));
    let count = 0;


    const getHolodays = fs.readFileSync('./asset/holidays.json');
    let holydays = JSON.parse(getHolodays);

    const curDate = startDate;
    
    //this is will place all holiday for mext monday.
    let holyMonDay = false;
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();

        const getHolydays = holydays.fixed.find(x => x.date === curDate.getDate() && x.month === curDate.getMonth() + 1)
     

        const weekNumOfDate = getWeekNumOfMonthOfDate(curDate)
       
        const getHolydays2 = holydays.dynamic.find(x => x.day === dayOfWeek && x.month === curDate.getMonth() + 1 && x.week === weekNumOfDate)
       

        const getHolydays3 = holydays.same.find(x => x.date === curDate.getDate() && x.month === curDate.getMonth() + 1)
        const getHolydays4 = dayOfWeek === 1 && holyMonDay ? true : false
        


        if ((dayOfWeek !== 0 && dayOfWeek !== 6) && !getHolydays && !getHolydays2 && !getHolydays4){
            
            
            console.log('\x1b[32m', curDate + " : is WorkDay")
            count++
        }else
        {
            if(getHolydays3 && (dayOfWeek === 0 || dayOfWeek === 6)) holyMonDay = true;
            if(holyMonDay && dayOfWeek === 1) holyMonDay = false;
            
            console.log('\x1b[31m', curDate + " : is Holiday" )
        };
        
        

        // const getHolydays3 = holydays.same.find(x => x.date === curDate.getDate() && x.month === curDate.getMonth() + 1)
        // if(getHolydays3)
        // {
        //     count--;
        // }

        curDate.setDate(curDate.getDate() + 1);
    }

    res.status(200).json({ number_of_working_days: count })
})

const getWeekNumOfMonthOfDate = (d) => {
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
}
module.exports = router;