const mongoose = require('mongoose');

exports.setUpConnection = () => {
  mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB successfully connected`))
    .catch((err) => {
      console.log(`Connection error: ${err}`);
      process.exit();
    });
};
