import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  function callApi() {
    axios
      .get("http://localhost:4000")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  }

  async function callProtected() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      console.log(response.data)
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className="App">
      <h1>Auth0 Example App</h1>
      <ul>
        <li>FrontEnd-ReactJS</li>
        <li>BackEnd-Node ExpressJS</li>
      </ul>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login With Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login With Redirect</button>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in"}</h3>
      <ul>
        <li>
          <button onClick={callApi}>Call API Route</button>
        </li>
        <li>
          <button onClick={callProtected}>Call Protected Route</button>
        </li>
      </ul>
      {isAuthenticated && <pre> {JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;
