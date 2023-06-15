import { useState } from 'react';
import blogService from '../services/blogs.js';


const Likes = ({ target, blog }) => {
  const [blogs, setBlogs] = useState({});
  const [likes, setLikes] = useState(blog.likes);

  const handleLikes = async (event) => {
    event.preventDefault();
    console.log(`button clicked on ${target}`);
    try {
      const res = await blogService.get(target);
      console.log(res.likes);

      const newBlogObj = {
        title: res.title,
        author: res.author,
        url: res.url,
        user: res.user,
        likes: res.likes + 1,
      };

      const upd = await blogService.update(newBlogObj, target);
      console.log(upd.likes);
      setBlogs('');
      setLikes(upd.likes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {likes}
      <button onClick={handleLikes}>like</button>
    </>
  );
};

export default Likes;
