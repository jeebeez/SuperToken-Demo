import React, { useEffect , useState} from "react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);


const Home =()=> {
  const [uid, setUid] = useState('')
  
  const handleClick = async () => {
    try{
      let {data} = await axios.get("http://localhost:8080/api")
      let fetchedData = data.currentUserId
      setUid(fetchedData)
    }
    catch(err){
      console.log(err)
    }
  };

  const handleSignOut=async ()=> {
    await signOut();
    window.location.href = "/";
} 
 return (
    <div>
      <div>{uid}</div>
      <button onClick={handleClick}>Fetch some info</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
