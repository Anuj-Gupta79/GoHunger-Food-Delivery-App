import mongoose from 'mongoose';
const URL = 'mongodb+srv://GoHunger:<gohunger123>@gohunger.80ezsib.mongodb.net/?retryWrites=true&w=majority';


const mongodb = () => {
    mongoose.connect(URL, (err, result)=>{
        if(err) console.log(err);
        console.log("Connected Successfully!");
    });
}

export default mongodb;