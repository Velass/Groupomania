const Post = require("../models/Posts")
const User = require("../models/User")
const fs = require('fs');


// Controllers pour créer des Posts

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${postObject.photoName}`
    });

    post.save()
        .then(() => { res.status(201).json({ message: 'post enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

//Controllers pour modifier des posts
exports.modifyPost = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
        .then(user => {
            const isAdmin = user.isAdmin
            const postObject = req.file ? {
                ...(req.body),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };

            Post.findOne({ _id: req.params.id })
                .then((post) => {
                    if (post.userId != req.auth.userId && isAdmin == false) {
                        res.status(401).json({ message: 'Not authorized' });
                    } else {
                        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'post modifié!' }))
                            .catch(error => res.status(401).json({ error }));
                    }
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
        .catch((error) => {
            res.status(401).json({ error });
        });
};

// Controllers pour supprimer des posts
exports.deletePost = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
        .then(user => {
            const isAdmin = user.isAdmin
            Post.findOne({ _id: req.params.id })
                .then(post => {
                    if (post.userId != req.auth.userId && isAdmin == false) {
                        res.status(401).json({ message: 'Not authorized' });
                    } else {
                        const filename = post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.deleteOne({ _id: req.params.id })
                                .then(() => { res.status(200).json({ message: 'post supprimé !' }) })
                                .catch(error => res.status(401).json({ error }));
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({ error });
                });
        })
        .catch(error => {
            res.status(501).json({ error });
        });
};
// Apparition des posts
exports.onePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.allPost = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}


// Système de likes et de dislikes
exports.notePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const user_is_liker = post.usersLiked.includes(req.body.userId)
            const user_is_disliker = post.usersDisliked.includes(req.body.userId)

            // Si l'utilisateur veut liker la post

            if (req.body.like === 1 && !user_is_liker) {
                // Incrémente likes, et ajoute userId dans la liste userLiked
                Post.updateOne({ _id: req.params.id }, {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId, }
                }).then(() => {
                    // Si l'utilisateur a disliké la post précédemment
                    if (user_is_disliker) {
                        // Décrémente dislikes, enlève user de la liste userDisliked
                        Post.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId, }
                        })
                            .then(() => { res.status(200).json({ message: "user remove dislike and like" }) })
                            .catch(error => res.status(401).json({ error }));
                    }
                    res.status(200).json({ message: "user like" })

                }
                )
                    .catch(error => res.status(401).json({ error }));
            }
            // si l'utilisateur like alors qu'il a deja liker
            if (req.body.like === 1 && user_is_liker) {
                console.log("vous avez deja liker")
            }

            // Incrémente dislikes, et ajoute user dans userDisliked
            else if (req.body.like === -1 && !user_is_disliker) {
                Post.updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId, }
                }).then(() => {
                    // Si l'utilisateur a précédemment liké la post
                    if (user_is_liker) {
                        // Décrémente likes, et enlève user de userLiked
                        Post.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId, }
                        })
                            .then(() => { res.status(200).json({ message: "user remove like and dislike" }) })
                            .catch(error => res.status(401).json({ error }));
                    }
                    res.status(200).json({ message: "user dislike" })
                }
                )
                    .catch(error => res.status(401).json({ error }));
            }

            if (req.body.like === -1 && user_is_disliker) {
                console.log("vous avez deja disliker")
            }

            // Si l'utilisateur veut enlever son like/dislike 
            else if (req.body.like === 0) {
                // Si l'utilisateur a précédemment liké la post
                // Décrémente likes, enlève l'user de la liste userLiked
                if (user_is_liker) {
                    Post.updateOne({ _id: req.params.id }, {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId, }
                    }).then(() => { res.status(200).json({ message: "user remove like" }) })
                        .catch(error => res.status(401).json({ error }));
                }
                // Si l'user a précédemment disliké la post
                // Décrémente dislikes, enlève user de la liste userDisliked
                else if (user_is_disliker) {
                    Post.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId, }
                    }).then(() => { res.status(200).json({ message: "user remove dislike" }) })
                        .catch(error => res.status(401).json({ error }));
                }
            }

        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}