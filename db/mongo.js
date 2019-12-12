const { MongoClient } = require('mongodb');

let db;

module.exports = () => {
    return MongoClient
        .connect('mongodb+srv://nodejscourseuser:fTsvvQHyCIBo0r2R@cluster13-jgzek.mongodb.net/nodejscoursedb_8?retryWrites=true&w=majority', { useUnifiedTopology: true  })
        .then((client) => {
            db = client.db('nodejscoursedb_8');
        });
};