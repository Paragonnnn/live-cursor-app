import React, { useState } from "react";

const Login = ({onSubmit}) => {
  const [username, setUsername] = useState("");
  return (
    <div>
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
