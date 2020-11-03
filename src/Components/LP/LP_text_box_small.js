import { textboxsmall } from '../../sass/LP.module.scss';

const TextBoxSmall = ({ header, copy }) => {
    return (
        <div className={textboxsmall}>
            <h3>{header}</h3>
            <p>{copy}</p>
        </div>
    )
}

export default TextBoxSmall;