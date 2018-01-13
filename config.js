const dotenv = require("dotenv");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

module.exports = {
 
  mongodb: {
    url: process.env.MONGODB_URI,
 
    // uncomment and edit to specify Mongo client connect options (eg. increase the timeouts) 
    // see https://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html 
    // 
    // options: { 
    //   connectTimeoutMS: 3600000, // 1 hour 
    //   socketTimeoutMS: 3600000, // 1 hour 
    // } 
  },
 
  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary. 
  migrationsDir: 'migrations',
 
  // The mongodb collection where the applied changes are stored. Only edit this when really necessary. 
  changelogCollectionName: 'changelog',
 
};