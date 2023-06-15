import { useState } from 'react';
import blogService from '../services/blogs.js';

const Likes = ({handle, target}) => {
  const [blog, setBlog] = useState({});

  const handleLikes = async () => {
    console.log(`button clicked on ${target}`)
    const res = await blogService.get(target)
    console.log(res.likes)

    const newBlogObj = {
      title: res.title,
      author: res.author,
      url: res.url,
      user: res.user,
      likes: res.likes + 1,
    }

    setBlog(newBlogObj)
    await blogService.update(newBlogObj, target)
    
  };

  return (
    <button onClick={handleLikes}>like</button>
  );
};

export default Likes