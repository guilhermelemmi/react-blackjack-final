import Button from "../Button";
import "./MainMenu.css";

function MainMenu({onStart}) {
  return (
    <div className="mainMenu">
      <Button type="primary" onClick={onStart}>
        Play
      </Button>
    </div>
  );
}

export default MainMenu;
