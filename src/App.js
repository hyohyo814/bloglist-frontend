import { useState, useEffect } from 'react';
import Blog from './components/BlogDisp';
import BlogCreate from './components/BlogCreate';
import Login from './components/Login';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notify, setNotify] = useState({
    message: null,
    code: null,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const resetMsg = (time) => {
    setTimeout(() => {
      setNotify({
        message: '',
        code: '',
      });
    }, time);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`logging in with ${username} ${password}`);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotify({ message: `${user.name} logged in`, code: 'success' });
      resetMsg(3000);
    } catch (exception) {
      setNotify({
        message: 'Wrong username or password',
        code: 'error',
      });
      resetMsg(3000);
    }
  };

  const handleUNChange = (event) => {
    console.log(`username: ${event.target.value}`);
    setUsername(event.target.value);
  };

  const handlePWChange = (event) => {
    console.log(`password: ${event.target.value}`);
    setPassword(event.target.value);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    console.log(`Title: ${title}, Author: ${author}, Url: ${url}`);
    try {
      await blogService.create({
        title,
        author,
        url,
      });
      await blogService.getAll().then((blogs) => setBlogs(blogs));
      setNotify({
        message: `a new blog ${title} by ${author} added`,
        code: 'success',
      });
      resetMsg(3000);
    } catch (exception) {
      setNotify({
        message: `${exception.message}`,
        code: 'error',
      });
      resetMsg(3000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser');
    setNotify({
      message: `successfully logged out`,
      code: 'success',
    })
    setUser(null)
    resetMsg(3000);
  }

  const handleTitleChange = (event) => {
    console.log(`title: ${event.target.value}`);
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    console.log(`author: ${event.target.value}`);
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(`url: ${event.target.value}`);
    setUrl(event.target.value);
  };

  const loginForm = () => (
    <Login
      handle={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={handleUNChange}
      handlePasswordChange={handlePWChange}
    />
  );

  const blogForm = () => (
    <BlogCreate
      user={user}
      logout={handleLogout}
      handle={handleAddBlog}
      title={title}
      handleTitle={handleTitleChange}
      handleAuthor={handleAuthorChange}
      handleUrl={handleUrlChange}
    />
  );

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        message={notify.message}
        handle={notify.code}
      />

      {user === null ? loginForm() : blogForm()}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
