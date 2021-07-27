import mongoose from "mongoose";
console.log('${process.env.DB_URL}${process.env.DB_NAME} :>> ', `${process.env.DB_URL}${process.env.DB_NAME}`);
mongoose
  .connect(`${process.env.DB_URL}${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((error) => {
    console.log(error.message);
  });
