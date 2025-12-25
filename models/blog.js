const { Schema, model } = require("mongoose");

// Blog Schema
const blogSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    content: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        default: "/images/blog-default.jpg",
        required: false,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: [String],
    published: {
        type: Boolean,  
        default: false,
    },
    },
    { timestamps: true }
);

const Blog = model("Blog", blogSchema);
module.exports = Blog;