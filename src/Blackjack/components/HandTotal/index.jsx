import "./styles.css";

function HandTotal ({count, isDealer}) {
  return (
    <div className="handTotal">
      <div className="count" >
        {count}
      </div>
      {isDealer ? "Dealer" : "Player"} 
    </div>
  )
}

export default HandTotal;
