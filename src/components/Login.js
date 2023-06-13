const Login = ({
  handle,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handle}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="text"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

export default Login;
