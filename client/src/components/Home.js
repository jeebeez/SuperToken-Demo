import React, { useState } from "react";
import "./Home.css";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

const Home = () => {
  const [uid, setUid] = useState("");

  const handleClick = async () => {
    try {
      let { data } = await axios.get("http://localhost:8080/api");
      let fetchedData = data.currentUserId;
      setUid(`The User ID : ${fetchedData}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  return (
    <div className="container">
      <div className="buttons">
        <div>{uid}</div>
        <button className="btn" onClick={handleClick}>
          Fetch User ID
        </button>

        <button className="btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
