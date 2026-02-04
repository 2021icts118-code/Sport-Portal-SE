require('dotenv').config();
const mongoose = require('mongoose');

async function listCollections() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/uov-sports';
  try {
    await mongoose.connect(uri, { dbName: new URL(uri).pathname.replace(/^\//, '') || undefined });
  } catch (e) {
    // fallback: connect without dbName option
    await mongoose.connect(uri);
  }

  const db = mongoose.connection.db;
  db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('Error listing collections:', err);
      process.exit(1);
    }
    if (!collections || collections.length === 0) {
      console.log('No collections found (empty database).');
    } else {
      console.log('Collections found:');
      collections.forEach(c => console.log('-', c.name));
    }
    mongoose.disconnect().then(() => process.exit(0));
  });
}

listCollections().catch(err => { console.error(err); process.exit(1); });
