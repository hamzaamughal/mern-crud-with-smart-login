const Post = require('../models/Post')
const slugify = require('slugify')

exports.create = (req, res) => {
    const { title, content, user } = req.body
    const slug = slugify(title)
    //validate
    switch (true) {
        case !title:
            return res.status(400).json({ error: "Title is required." })
            break;
        case !content:
            return res.status(400).json({ error: "Content is required." })
            break;
    }
    Post.create({ title, content, user, slug }, (err, post) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Dublicate post, Try Another title..' })
        }
        res.json(post)
    })
}


exports.list = (req, res) => {
    Post.find({}).limit(10).sort({ createdAt: -1 }).exec((err, posts) => {
        if (err) {
            console.log(err);
        }
        return res.json({ posts })
    })
}

exports.read = (req, res) => {
    const { slug } = req.params
    Post.findOne({ slug })
        .exec((err, post) => {
            if (err) {
                console.log(err);
            }
            return res.json({ post })
        })
}