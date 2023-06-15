import { useState, useEffect, useRef } from 'react';
import BlogDisp from './components/BlogDisp';
import BlogCreate from './components/BlogCreate';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
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

  useEffect(() => {
    const blogAssignment = async() => {
      const blog = await blogService.getAll()
      setBlogs(blog)
    };
    blogAssignment()
      .catch(console.error);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

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

  const handleAddBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    console.log(
      `Title: ${blogObj.title}, Author: ${blogObj.author}, Url: ${blogObj.url}`
    );
    try {
      await blogService.create(blogObj);
      await blogService.getAll().then((blogs) => setBlogs(blogs));
      setNotify({
        message: `a new blog ${blogObj.title} by ${blogObj.author} added`,
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
    });
    setUser(null);
    resetMsg(3000);
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <Login
        handle={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={handleUNChange}
        handlePasswordChange={handlePWChange}
      />
    </Togglable>
  );

  const blogForm = () => (
    <>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogCreate
          user={user}
          logout={handleLogout}
          handle={handleAddBlog}
        />
      </Togglable>
    </>
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
        <BlogDisp
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
