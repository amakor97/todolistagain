type handler = () => void;

function Button({ handleClick }: { handleClick: handler }) {
  return <button onClick={handleClick}>Button</button>;
}

export default Button;
