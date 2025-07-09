const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const Topic = require('../models/Topic');
const Post = require('../models/Post');

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://swarajmeet:evN1UPsMV2ibVb9S@cluster0.wr66lik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Topic descriptions for better context
const topicDescriptions = {
  'All': 'A general community for all types of discussions and content',
  'worldnews': 'Latest news and current events from around the world',
  'funny': 'Humor, memes, and funny content to brighten your day',
  'gaming': 'Video games, gaming news, and gaming community discussions',
  'aww': 'Cute and adorable content featuring animals and heartwarming moments',
  'pics': 'Amazing photographs and visual content from around the world',
  'science': 'Scientific discoveries, research, and educational content',
  'todayilearned': 'Fascinating facts and things people learned today',
  'movies': 'Film discussions, reviews, and movie-related content',
  'food': 'Culinary delights, recipes, and food-related discussions',
  'Art': 'Creative artwork, digital art, and artistic expressions',
  'dataisbeautiful': 'Data visualizations and beautiful charts',
  'gadgets': 'Latest technology, gadgets, and tech reviews',
  'Fitness': 'Health, fitness, and workout discussions',
  'history': 'Historical events, facts, and educational content',
  'photoshopbattles': 'Creative Photoshop edits and digital art battles',
  'Futurology': 'Future technology, predictions, and scientific advancements',
  'explainlikeimfive': 'Complex topics explained in simple terms',
  'Music': 'Music discussions, recommendations, and artist news',
  'books': 'Literature, book reviews, and reading recommendations',
  'travel': 'Travel experiences, destinations, and travel tips',
  'DIY': 'Do-it-yourself projects and creative crafts',
  'sports': 'Sports news, discussions, and athletic content',
  'technology': 'Technology news, discussions, and innovations',
  'photography': 'Photography techniques, equipment, and stunning shots',
  'cooking': 'Cooking recipes, techniques, and culinary discussions',
  'gardening': 'Plant care, gardening tips, and green thumb content',
  'pets': 'Pet care, adorable animals, and pet-related discussions',
  'fashion': 'Style, fashion trends, and clothing discussions',
  'automotive': 'Cars, motorcycles, and automotive discussions',
  'finance': 'Financial advice, investing, and money management',
  'education': 'Learning resources, academic discussions, and educational content',
  'relationships': 'Dating, relationships, and interpersonal advice',
  'parenting': 'Parenting tips, family life, and child-rearing discussions',
  'career': 'Job advice, career development, and workplace discussions',
  'mentalhealth': 'Mental health support, wellness, and self-care',
  'environment': 'Environmental issues, sustainability, and climate change',
  'politics': 'Political discussions, current events, and policy debates',
  'religion': 'Religious discussions, spirituality, and faith-based content',
  'philosophy': 'Philosophical discussions, ethics, and deep thinking',
  'literature': 'Classic and contemporary literature discussions',
  'poetry': 'Poetry, creative writing, and literary expressions',
  'architecture': 'Building design, architectural marvels, and construction',
  'design': 'Graphic design, web design, and creative visual content',
  'marketing': 'Business marketing, advertising, and brand strategies',
  'entrepreneur': 'Startup discussions, business ideas, and entrepreneurship',
  'productivity': 'Time management, efficiency, and personal development',
  'minimalism': 'Simple living, decluttering, and minimalist lifestyle',
  'sustainability': 'Eco-friendly living, green technology, and conservation',
  'volunteering': 'Community service, charity work, and helping others',
  'meditation': 'Mindfulness, meditation techniques, and spiritual practices',
  'yoga': 'Yoga poses, wellness, and mind-body practices',
  'nutrition': 'Healthy eating, dietary advice, and nutritional science',
  'medicine': 'Medical discussions, health advice, and healthcare topics',
  'psychology': 'Human behavior, mental processes, and psychological insights'
};

// Function to read JSON files
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Function to get all topic JSON files
async function getAllTopicFiles() {
  const topicsDir = path.join(__dirname, '..', 'Topics');
  const files = await fs.readdir(topicsDir);
  return files.filter(file => file.endsWith('.json'));
}

// Function to create posts from JSON data
async function createPostsFromData(postsData) {
  const posts = [];
  
  for (const postData of postsData) {
    try {
      // Always generate a new UUID for post id
      const postId = uuidv4();
      // Create new post
      const post = new Post({
        id: postId,
        name: postData.name,
        likes: postData.likes,
        content: postData.content,
        date: new Date(postData.date)
      });
      const savedPost = await post.save();
      posts.push(savedPost._id);
    } catch (error) {
      console.error(`Error creating post:`, error);
    }
  }
  
  return posts;
}

// Function to create topics from JSON data
async function createTopicsFromData() {
  try {
    const topicFiles = await getAllTopicFiles();
    console.log(`Found ${topicFiles.length} topic files`);

    for (const fileName of topicFiles) {
      const filePath = path.join(__dirname, '..', 'Topics', fileName);
      const jsonData = await readJsonFile(filePath);
      
      if (!jsonData || !jsonData.records) {
        console.log(`Skipping ${fileName} - invalid data structure`);
        continue;
      }

      console.log(`Processing ${fileName} with ${jsonData.records.length} topics`);

      for (const topicData of jsonData.records) {
        try {
          // Always generate a new UUID for topic id
          const topicId = uuidv4();
          // Create posts for this topic
          const postIds = await createPostsFromData(topicData.posts || []);
          // Create topic
          const topic = new Topic({
            id: topicId,
            name: topicData.name,
            description: topicDescriptions[topicData.name] || 'A community for discussing various topics',
            color: topicData.color || '#4A7B9D',
            posts: postIds
          });
          await topic.save();
          console.log(`Created topic ${topicId} (${topicData.name}) with ${postIds.length} posts`);
        } catch (error) {
          console.error(`Error creating topic:`, error);
        }
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

// Main seeding function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    await Topic.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared');

    // Create topics and posts
    await createTopicsFromData();

    // Get final counts
    const topicCount = await Topic.countDocuments();
    const postCount = await Post.countDocuments();
    
    console.log(`\nSeeding completed!`);
    console.log(`Total topics created: ${topicCount}`);
    console.log(`Total posts created: ${postCount}`);

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase }; 