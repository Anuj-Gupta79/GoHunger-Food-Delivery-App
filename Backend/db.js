import mongoose from "mongoose";
const URL =
  "mongodb+srv://GoHunger:gohunger123@gohunger.80ezsib.mongodb.net/GoHungerMern?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const mongodb = async () => {
  await mongoose.connect(URL, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Connected Successfully!");
      const foodData = mongoose.connection.db.collection("FoodData");
      foodData.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategaory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.foodData = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

export default mongodb;
