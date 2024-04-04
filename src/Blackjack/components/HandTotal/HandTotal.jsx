import "./HandTotal.css";

function HandTotal ({count, label}) {
  return (
    <div className="handTotal">
      <div className="count" >{count}</div>
      {label} 
    </div>
  )
}

export default HandTotal;
