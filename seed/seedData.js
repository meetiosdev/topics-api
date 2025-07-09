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

      // Extract records from the JSON structure
      const records = data.records || [];

      console.log(`Processing ${file} with ${records.length} topics`);

      for (const topicData of records) {
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

        // Prepare posts for this topic
        let posts = Array.isArray(topicData.posts) ? [...topicData.posts] : [];

        // Limit to 20 posts
        if (posts.length > 20) {
          posts = posts.slice(0, 20);
        }

        // If less than 4, generate random posts to reach 4
        const randomNames = [
          'Alex Morgan', 'Jamie Lee', 'Taylor Smith', 'Jordan Kim', 'Morgan Lee',
          'Casey Brown', 'Riley Davis', 'Skyler Wilson', 'Avery Martinez', 'Peyton Clark',
          'Quinn Lewis', 'Drew Walker', 'Harper Young', 'Reese Hall', 'Rowan King',
          'Sawyer Scott', 'Emerson Green', 'Finley Adams', 'Dakota Baker', 'Cameron Bell'
        ];
        const randomContents = [
          'Loving the community vibes! 🌟',
          'Just finished a great workout! 💪',
          'Anyone up for a chat?',
          'Learning new things every day!',
          'What are your weekend plans?',
          'Excited for the next big thing!',
          'Sharing some positivity! 😊',
          'Trying out a new recipe tonight!',
          'Who else loves coding?',
          'Reading a fantastic book right now!',
          'Exploring new hobbies!',
          'Let’s connect and share ideas!',
          'Happy to be here!',
          'What inspires you today?',
          'Enjoying the little things in life.',
          'Just started a new project!',
          'Looking for recommendations!',
          'Celebrating small wins!',
          'Grateful for this space.',
          'Stay awesome, everyone!'
        ];
        function getRandomItem(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
        }
        function getRandomLikes() {
          return Math.floor(Math.random() * 500) + 1;
        }
        function getRandomDate() {
          const now = new Date();
          const daysAgo = Math.floor(Math.random() * 30);
          now.setDate(now.getDate() - daysAgo);
          return now.toISOString();
        }

        while (posts.length < 4) {
          posts.push({
            name: getRandomItem(randomNames),
            likes: getRandomLikes(),
            content: getRandomItem(randomContents),
            date: getRandomDate(),
          });
        }

        // Create Post documents
        const postDocs = posts.map(postData => new Post({
          id: uuidv4(),
          name: postData.name,
          likes: postData.likes || getRandomLikes(),
          content: postData.content,
          date: postData.date || getRandomDate(),
          topicId,
        }));

        if (postDocs.length > 0) {
          await Post.insertMany(postDocs);
        }

        console.log(
          `Created topic ${topicId} (${topicData.name}) with ${postDocs.length} posts`
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
