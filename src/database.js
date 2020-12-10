const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.connect(
        'mongodb+srv://Amanda:menudo@cluster0.vubew.mongodb.net/P3?retryWrites=true&w=majority', {
            useCreateIndex: true,
            useNewUrlParser: true,
        }
    )
    .then(db => console.log("Conectó mongo"))
    .catch(err => console.error(err));