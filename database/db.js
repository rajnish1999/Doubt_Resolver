const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@doubtresolvercluster.c2fii.mongodb.net/${process.env.USER_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})