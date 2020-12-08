const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.connect(
    'mongodb+srv://Jonathan:computadores@proyectobd2.m0wen.mongodb.net/PruebaP3?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
}
)
    .then(db => console.log("Conectó mongo"))
    .catch(err => console.error(err));