import blogService from '../services/blogs.js';

const Delete = ({ target, blog }) => {
  const handleDel = async (event) => {
    event.preventDefault();
    // console.log(target);
    const userJSON = window.localStorage.getItem('loggedUser');
    const user = JSON.parse(userJSON);
    // console.log(user);
    // console.log(user.username)
    // console.log(blog.user.username)
    if (!user || user.username !== blog.user.username) {
      return window.alert('You are not authorized to delete selected post');
    }
    try {
      const res = await blogService.get(target);
      console.log(res);
      const confirm = window.confirm(
        `Remove blog ${res.title} by ${res.author}`
      );
      if (confirm === true) {
        await blogService.remove(target);
      } else {
        console.log('Deletion cancelled');
        return;
      }
    } catch (err) {}
  };
  return (
    <>
      <button onClick={handleDel}>remove</button>
    </>
  );
};

export default Delete;
