const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const Topic = require('../models/Topic');
const Post = require('../models/Post');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://meetheiosdeveloper:GODqKHfZcCnSC7pX@cluster0.olgfgyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    console.log('Clearing existing data...');
    await Topic.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared');

    // Read all topic files
    const topicsDir = path.join(__dirname, '../Topics');
    const files = await fs.readdir(topicsDir);
    const topicFiles = files.filter(
      file => file.startsWith('topic-page-') && file.endsWith('.json')
    );

    console.log(`Found ${topicFiles.length} topic files`);

    // Process each file
    for (const file of topicFiles) {
      const filePath = path.join(topicsDir, file);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

      console.log(`Processing ${file} with ${data.length} topics`);

      for (const topicData of data) {
        const topicId = uuidv4();

        // Create topic
        const topic = new Topic({
          id: topicId,
          name: topicData.name,
          description:
            topicData.description ||
            'A community for discussing various topics',
          color: topicData.color || '#FF6B6B',
        });

        await topic.save();

        // Create posts for this topic
        const posts = [];
        if (topicData.posts && topicData.posts.length > 0) {
          for (const postData of topicData.posts) {
            const post = new Post({
              id: uuidv4(),
              name: postData.name,
              likes: postData.likes || Math.floor(Math.random() * 1000),
              content: postData.content,
              date: postData.date || new Date().toISOString(),
              topicId,
            });
            posts.push(post);
          }

          if (posts.length > 0) {
            await Post.insertMany(posts);
          }
        }

        console.log(
          `Created topic ${topicId} (${topicData.name}) with ${posts.length} posts`
        );
      }
    }

    console.log('Seeding completed successfully!');
    console.log('Seeding completed!');

    // Get final counts
    const topicCount = await Topic.countDocuments();
    const postCount = await Post.countDocuments();
    console.log(`Total topics created: ${topicCount}`);
    console.log(`Total posts created: ${postCount}`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}

// If this file is run directly, execute the seeding
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
