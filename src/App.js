import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { messaging } from "./init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";


const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

// const registerPushListener = pushNotification =>
//   navigator.serviceWorker.addEventListener("message", ({ data }) =>
//     pushNotification(
//       data.data
//         ? data.data.message
//         : data["firebase-messaging-msg-data"].data.message
//     )
//   );


const App = ({ token, notifications }) => (
  <>
    <h1>React + Firebase Cloud Messaging (Push Notifications)</h1>
    <div>
      Current token is: <p>{token}</p>
    </div>
    <ul>
      Notifications List:
      {notifications.map(renderNotification)}
    </ul>
  </>
);

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({
      setNotifications,
      notifications
    }) => newNotification =>
        setNotifications(notifications.concat(newNotification))
  }),
  lifecycle({
    async componentDidMount() {
      const { pushNotification, setToken } = this.props;

      messaging
        .requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          setToken(token);
        })
        .catch(function (err) {
          console.log("Unable to get permission to notify.", err);
        });

      // registerPushListener(pushNotification);
    }
  })
)(App);




// const App = () => {
//   const [msg, setMsg] = useState('')
//   const [token, setToken] = useState('')

//   useEffect(() => {
//     messaging.requestPermission()
//       .then(async function () {
//         const token = await messaging.getToken();
//         console.log(token)
//       })
//       .catch(function (err) {
//         console.log("Unable to get permission to notify.", err);
//       });
//     navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
//   })

//   const handleClick = () => {
//     axios.get("/api/enduser/order/heroku")
//       .then(resp => {
//         console.log(resp)
//         setMsg(resp.data.data)
//       })
//   }

//   return (
//     <div className="App">
//       <header className="App-header">

//         <button onClick={handleClick}>
//           Click here for test
//         </button>

//         <p style={{ color: "#fff" }}>{msg}</p>
//       </header>

//     </div>
//   );
// }

// export default App;
