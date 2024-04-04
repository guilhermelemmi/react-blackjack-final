import { useEffect, useState } from "react";
import Blackjack from "./Blackjack";

function App() {
  const [gameRules, setGameRules] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/rules")
      .then((res) => res.json())
      .then((data) => {
        setGameRules(data.rules);
      })
      .catch((err) => console.log("error fetching rules", err));
  }, []);

  return <Blackjack gameRules={gameRules} />;
}

export default App;
