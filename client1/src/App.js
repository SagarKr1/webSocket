import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [playerData, setPlayerData] = useState([]);
  const [data, setData] = useState({
    name: "",
    score: ""
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,  // Spread the existing data
      [name]: value  // Update the specific field based on the input name
    });
  };

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log("Connected to the server");
    });

    socket.on('playerScore', (score) => {
      console.log(score);
      setPlayerData(score);
    });

    return () => {
      socket.disconnect();  // Clean up the socket connection when the component unmounts
    };
  }, []);

  const submitHandler = () => {
    console.log(data);
    const socket = io('http://localhost:5000');
    socket.emit("data", data);
  };

  return (
    <div className="App">
      <h1>Hello Socket.io</h1>
      <div
        className='input-div'
      >
        <input
          className='input'
          name="name"
          value={data.name}
          onChange={inputHandler}
          placeholder="Enter your name"
        />
        <input
          className='input'
          name="score"
          value={data.score}
          onChange={inputHandler}
          placeholder="Enter your score"
        />
        <button onClick={submitHandler}>Submit</button>
      </div>
      <div style={{
        display:"flex",
        justifyContent:"center"
      }}>
        <table
          style={{
            fontFamily: "arial, sans-serif",
            borderCollapse: "collapse",
            width: "80%",

          }}>
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
            {playerData.map((player, index) => (
              <tr key={index}>
                <td
                  className='td'
                >{player.name}</td>
                <td
                  className='td'
                >{player.score}</td>
                <td
                  className='td'
                >{player.id || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
