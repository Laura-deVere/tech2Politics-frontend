import { button, button__primary, button__secondary } from "../sass/Buttons.module.scss";

const Button = ({ text, type }) => {
    const btnClass = button__secondary;
    return <button className={`${button} ${button__primary}`}>{text}</button>
}

export default Button;