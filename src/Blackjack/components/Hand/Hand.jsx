import "./Hand.css";

function Hand({ children, ...otherProps }) {
  return (
    <div className="hand" {...otherProps} >
      {children}
    </div>
  );
}

export default Hand;
