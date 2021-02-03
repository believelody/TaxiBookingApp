const db = {
  URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@taxibooking.jvekj.mongodb.net/taxibooking?retryWrites=true&w=majority`,
};

module.exports = db;
