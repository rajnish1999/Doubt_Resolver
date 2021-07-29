const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rajnish1999:rajatiwari1@cluster0.jcfk2.mongodb.net/farc-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})