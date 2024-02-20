const mongoose = require("mongoose");
const User = require("./models/users");
const Post = require("./models/posts");
const Comment = require("./models/comments");

// Connect to MongoDB
mongoose.connect("mongodb+srv://zdes:zdeslav@cluster0.hay1xt4.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Function to generate random date within a range
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Function to populate users collection with mock data
const createUsers = async () => {
    const usersData = [
        { name: "John", username: "john_doe", email: "john@example.com", password: "password1" },
        { name: "Alice", username: "alice_smith", email: "alice@example.com", password: "password2" },
        // Add more mock users as needed
    ];

    try {
        await User.insertMany(usersData);
        console.log("Users inserted successfully");
    } catch (err) {
        console.error("Error inserting users:", err);
    }
};

// Function to populate posts collection with mock data
const createPosts = async () => {
    try {
        const users = await User.find(); // Get all users
        const postData = [
            { title: "First Post", content: "Content of First Post", author: users[0]._id, isPublished: true },
            { title: "Second Post", content: "Content of Second Post", author: users[1]._id, isPublished: true },
            // Add more mock posts as needed
        ];
        const posts = await Post.insertMany(postData);
        console.log("Posts inserted successfully");

        // Link comments to posts
        await linkCommentsToPosts(posts);
    } catch (err) {
        console.error("Error inserting posts:", err);
    }
};

// Function to link comments to posts
const linkCommentsToPosts = async (posts) => {
    try {
        const users = await User.find(); // Get all users
        const commentData = [
            { message: "Nice post!", author: users[0]._id },
            { message: "Great content!", author: users[1]._id },
            // Add more mock comments as needed
        ];

        // Link comments to posts
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const comments = [];
            for (let j = 0; j < commentData.length; j++) {
                const comment = new Comment({
                    ...commentData[j],
                    postId: post._id
                });
                await comment.save();
                comments.push(comment._id);
            }
            post.comments = comments;
            await post.save();
        }
        console.log("Comments linked to posts successfully");
    } catch (err) {
        console.error("Error linking comments to posts:", err);
    }
};

// Populate the database with mock data
const populateDatabase = async () => {
    await createUsers();
    await createPosts();
    mongoose.connection.close();
};

populateDatabase();
