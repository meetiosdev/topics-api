const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🚀 Testing Topics API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', health.data);
    console.log('');

    // Test 2: Get Paginated Topics
    console.log('2. Testing Get Paginated Topics...');
    const topics = await axios.get(`${BASE_URL}/topics?page=1&limit=3`);
    console.log('✅ Topics Response:');
    console.log(
      `   - Total Topics: ${topics.data.data.pagination.totalTopics}`
    );
    console.log(
      `   - Current Page: ${topics.data.data.pagination.currentPage}`
    );
    console.log(`   - Topics per page: ${topics.data.data.topics.length}`);
    console.log(
      `   - First Topic: ${topics.data.data.topics[0].name} (ID: ${topics.data.data.topics[0].id})`
    );
    console.log('');

    // Test 3: Get Topic Posts
    console.log('3. Testing Get Topic Posts...');
    const topicPosts = await axios.get(`${BASE_URL}/topics/1/posts`);
    console.log('✅ Topic Posts Response:');
    console.log(`   - Topic: ${topicPosts.data.data.topic.name}`);
    console.log(`   - Post Count: ${topicPosts.data.data.postCount}`);
    console.log(
      `   - First Post: "${topicPosts.data.data.posts[0].content.substring(0, 50)}..."`
    );
    console.log('');

    // Test 4: Get Topic by ID
    console.log('4. Testing Get Topic by ID...');
    const topic = await axios.get(`${BASE_URL}/topics/2`);
    console.log('✅ Topic Response:');
    console.log(`   - Topic: ${topic.data.data.name}`);
    console.log(`   - Description: ${topic.data.data.description}`);
    console.log(`   - Color: ${topic.data.data.color}`);
    console.log(`   - Posts: ${topic.data.data.posts.length}`);
    console.log('');

    // Test 5: Error Handling - Non-existent Topic
    console.log('5. Testing Error Handling...');
    try {
      await axios.get(`${BASE_URL}/topics/999/posts`);
    } catch (error) {
      console.log('✅ Error Handling:');
      console.log(`   - Status: ${error.response.status}`);
      console.log(`   - Error: ${error.response.data.error}`);
      console.log(`   - Message: ${error.response.data.message}`);
    }
    console.log('');

    // Test 6: Pagination
    console.log('6. Testing Pagination...');
    const page2 = await axios.get(`${BASE_URL}/topics?page=2&limit=5`);
    console.log('✅ Pagination Response:');
    console.log(`   - Page: ${page2.data.data.pagination.currentPage}`);
    console.log(`   - Has Next: ${page2.data.data.pagination.hasNextPage}`);
    console.log(`   - Has Prev: ${page2.data.data.pagination.hasPrevPage}`);
    console.log(`   - Topics on this page: ${page2.data.data.topics.length}`);
    console.log('');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - Health Check: ✅');
    console.log('   - Get Topics: ✅');
    console.log('   - Get Topic Posts: ✅');
    console.log('   - Get Topic by ID: ✅');
    console.log('   - Error Handling: ✅');
    console.log('   - Pagination: ✅');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run the tests
testAPI();
