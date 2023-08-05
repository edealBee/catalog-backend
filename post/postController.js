import Post from '../Modules/Post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить посты',
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({
      _id: postId,
    }).populate('user');
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить пост',
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, text, imageUrl, category } = req.body;
    const condidate = await Post.findOne({ title });
    if (condidate) {
      return res.status(400).json({
        message: 'Пост с таким названием существует!',
      });
    }
    const post = new Post({
      title,
      text,
      imageUrl,
      user: req.userId,
      category,
    });
    await post.save();
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, imageUrl, category } = req.body;
    const postId = req.params.id;
    Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title,
        text,
        imageUrl,
        category,
      },
    ).then((post) => {
      if (!post) {
        return res.status(500).json({
          message: 'Пост не был найден',
        });
      }
      res.json({
        message: 'Пост был успешно изменён',
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось изменить пост',
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findOneAndDelete({
      _id: postId,
    }).then((post) => {
      if (!post) {
        return res.status(500).json({
          message: 'Пост не был найден',
        });
      }
      return res.json({
        message: 'Пост был успешно удалён',
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось удалить пост',
    });
  }
};
