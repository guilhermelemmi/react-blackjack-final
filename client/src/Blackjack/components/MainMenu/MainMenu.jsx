import Button from "../Button";
import Markdown from 'react-markdown'
import "./MainMenu.css";

function MainMenu({onStart, gameRules}) {
  return (
    <div className="mainMenu">
      <h1>Welcome to React Blackjack</h1>
      {gameRules && <div className="gameRules">
        <Markdown>{gameRules}</Markdown>
      </div>}
      <Button type="primary" onClick={onStart}>
        Play
      </Button>
    </div>
  );
}

export default MainMenu;
