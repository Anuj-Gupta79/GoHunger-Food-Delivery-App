import mongoose from 'mongoose';
const URL = 'mongodb+srv://GoHunger:gohunger123@gohunger.80ezsib.mongodb.net/GoHungerMern?retryWrites=true&w=majority';

mongoose.set("strictQuery", false);

const mongodb = async() => {
    await mongoose.connect(URL, (err, result)=>{
        if(err) console.log(err);
        else{
            console.log("Connected Successfully!");
            const fetchData = mongoose.connection.db.collection("FoodData");
            fetchData.find({}).toArray(function(err, data){
                if(err) console.log(err);
                // else console.log(data);
            })
        }
    });
}

export default mongodb;