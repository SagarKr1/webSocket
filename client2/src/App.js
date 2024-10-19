import { useState, useEffect } from "react";
import './App.css';
const { io } = require("socket.io-client");

function App() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setData({
      ...data,
      [name]: value
    })
  }
  const formHandler = () => {
    console.log(data);
    const socket = io('http://localhost:8000');
    socket.emit("data", data);
    socket.on("userData", (data) => {
      setData(data);
      console.log(data);
    })
  }

  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('connect', () => {
      console.log("Connect to client");
      socket.on("userData", (data) => {
        setData(data);
        console.log(data);
      })
    });

    return () => {
      socket.disconnect();  // Clean up the socket connection when the component unmounts
    };
  }, [data])
  return (
    <div className="App">
      <h1>Socket IO CRUD Operation</h1>
      <div className="form">
        <input name="name" value={data.name} onChange={inputHandler} className="form-input" placeholder="Enter your name" />
        <input name="email" value={data.email} onChange={inputHandler} className="form-input" placeholder="Enter your email" />
        <input name="phone" value={data.phone} onChange={inputHandler} className="form-input" placeholder="Enter your phone" />
        <button onClick={formHandler}>Submit</button>
      </div>
      <div className="User">
        <table>
          <thead>
            <tr>
              <th style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px"
              }}>Name</th>
              <th style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px"
              }}>Score</th>
              <th style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px"
              }}>Id</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={index}>
                <td style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px"
                }}>{user.name}</td>
                <td style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px"
                }}>{user.email}</td>
                <td style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px"
                }}>{user.phone}</td>
                <td style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px"
                }}>Edit</td>
                <td style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px"
                }}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
