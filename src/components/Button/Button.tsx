type handler = (...args: unknown[]) => unknown;

function Button({
  handleClick,
  btnText
}: {
  handleClick: handler;
  btnText?: string;
}) {
  return (
    <button onClick={handleClick} type="button">
      {btnText ?? "Button"}
    </button>
  );
}

export default Button;
