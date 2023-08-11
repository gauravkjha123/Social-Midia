const postSChema = require("../validationSchema/post.schema");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
    try {
        let { error } = postSChema.validate(req.body);
        if (error) {
          return res.redirect("back");
        }
        let { content } = req.body;
        let post = await new Post({
          content: content,
          user: req.session.user._id,
        });
        await post.save();
        res.redirect('/');
    } catch (error) {
      console.log(error);
        return res.redirect("back");
    }
};

module.exports.delete = async function (req, res) {
  try {
      let postId=req.params._id;
      if (!postId) {
        return res.send("Please provide post id");
      }
      let post=Post.fineOne({_id:postId});
      if (!post) {
        return res.send(`No post exist with id ${postId}`);
      }
      res.redirect('/');
  } catch (error) {
    console.log(error);
      return res.redirect("Something went wrong");
  }
};

// module.exports.actionName = function(req, res){}
