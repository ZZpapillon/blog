const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb+srv://zdes:zdeslav@blog.hay1xt4.mongodb.net/Cluster0?retryWrites=true&w=majority';

// Database name
const dbName = 'your_database_name';

async function updateComments() {
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the comments collection
    const commentsCollection = db.collection('comments');

    // Update all comments to change the author field to string
    const result = await commentsCollection.updateMany(
      {},
      [{ $set: { author: { $toString: "$author" } } }]
    );

    console.log(`${result.modifiedCount} comments updated successfully.`);
  } catch (error) {
    console.error('Error updating comments:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the function to update comments
updateComments();
