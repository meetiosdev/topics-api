const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const Post = require('./models/Post');

// Old database connection (source)
const OLD_MONGODB_URI = 'mongodb+srv://swarajmeet:evN1UPsMV2ibVb9S@cluster0.wr66lik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// New database connection (destination)
const NEW_MONGODB_URI = 'mongodb+srv://meetheiosdeveloper:GODqKHfZcCnSC7pX@cluster0.olgfgyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function migrateData() {
  let oldConnection, newConnection;
  
  try {
    console.log('Starting data migration...');
    
    // Connect to old database
    console.log('Connecting to old database...');
    oldConnection = mongoose.createConnection(OLD_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Create models for old database
    const OldTopic = oldConnection.model('Topic', Topic.schema);
    const OldPost = oldConnection.model('Post', Post.schema);
    
    // Connect to new database
    console.log('Connecting to new database...');
    newConnection = mongoose.createConnection(NEW_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Create models for new database
    const NewTopic = newConnection.model('Topic', Topic.schema);
    const NewPost = newConnection.model('Post', Post.schema);
    
    // Clear new database
    console.log('Clearing new database...');
    await NewTopic.deleteMany({});
    await NewPost.deleteMany({});
    
    // Migrate topics
    console.log('Migrating topics...');
    const topics = await OldTopic.find({});
    if (topics.length > 0) {
      await NewTopic.insertMany(topics);
      console.log(`Migrated ${topics.length} topics`);
    } else {
      console.log('No topics found in old database');
    }
    
    // Migrate posts
    console.log('Migrating posts...');
    const posts = await OldPost.find({});
    if (posts.length > 0) {
      await NewPost.insertMany(posts);
      console.log(`Migrated ${posts.length} posts`);
    } else {
      console.log('No posts found in old database');
    }
    
    // Verify migration
    const newTopicsCount = await NewTopic.countDocuments();
    const newPostsCount = await NewPost.countDocuments();
    
    console.log('\nMigration completed successfully!');
    console.log('New database contains:');
    console.log(`- ${newTopicsCount} topics`);
    console.log(`- ${newPostsCount} posts`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close connections
    if (oldConnection) {
      await oldConnection.close();
      console.log('Old database connection closed');
    }
    if (newConnection) {
      await newConnection.close();
      console.log('New database connection closed');
    }
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  }); 