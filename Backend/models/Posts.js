const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title: {type: String, required: true},
    userId: { type: String,  },
    name: { type: String,  },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: {type: String,},
    id:{type: Number},
    likes: { type: Number, default: 0, },
    dislikes: { type: Number, default: 0, },
    usersLiked: { type: [String], },
    usersDisliked: { type: [String], },
});

module.exports = mongoose.model('Post', postsSchema);