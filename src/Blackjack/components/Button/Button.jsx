import "./styles.css";

function Button({ children, type, onClick, ...otherProps }) {
  return (
    <button className={`button ${type}`} onClick={onClick} {...otherProps} >
      {children}
    </button>
  );
}

export default Button;
