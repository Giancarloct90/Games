(async () => {
    const mongoose = require('mongoose');
    try {
        await mongoose.connect('mongodb://localhost:27017/games', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Online');
    } catch (e) {
        console.log('Error trying to connect DB');
    }
})();