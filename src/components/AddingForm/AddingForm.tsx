type handler = () => void;

import Styles from "./AddingForm.module.css";

import Button from "../Button/Button";

function AddingForm({ submitFunc }: { submitFunc: handler }) {
  return (
    <form className={Styles.form}>
      <Button handleClick={submitFunc} btnText={"Add task"}/>
    </form>
  );
}

export default AddingForm;
