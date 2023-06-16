import { useState } from 'react';
import blogService from '../services/blogs.js';

const Likes = ({ target, blog }) => {
  const [likes, setLikes] = useState(blog.likes);

  const handleLikes = async (event) => {
    event.preventDefault();
    console.log(`button clicked on ${target}`);
    // console.log(res.likes);

    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    };

    const upd = await blogService.update(newBlogObj, target);
    // console.log(upd.likes);
    setLikes(upd.likes);
  };

  return (
    <div className='likebutton'>
      {likes}
      <button onClick={handleLikes}>like</button>
    </div>
  );
};

export default Likes;
