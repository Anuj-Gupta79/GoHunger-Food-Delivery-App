import express from 'express';
import axios from 'axios';

const router =  express.Router();

router.post('/getLocation', async (req, res) => {
    
    try {
        let lat = req.body.latLong.lat
        let long = req.body.latLong.long
        console.log(lat, long)
        // console.log("GetLocation Hit")
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                // console.log(res.data.results)
                // let response = JSON.stringify(res)
                // let response = res.data.results[0].components;
                // response = await JSON.parse(response)
                // console.log("GetLocation Hit")
                // console.log(response)
                // let { village, county, state_district, state, postcode } = response
                // return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)

                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

export default router;