import { button, button__primary, button__secondary } from "../sass/Buttons.module.scss";

const Button = ({ text, type, onClickHandler }) => {
    const btnClass = button__secondary;
    return (
        <button 
            onClick={(e) => {
                if(onClickHandler) {
                    onClickHandler()
                }
            }}
            type={type ? type : null} 
            className={`${button} ${button__primary}`}>
            {text}
        </button>)
}

export default Button;