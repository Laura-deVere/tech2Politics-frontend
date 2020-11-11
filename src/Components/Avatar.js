import imgUrl from "../images/avatar.jpeg";

import { avatar, avatar__small, avatar__large } from '../sass/Avatar.module.scss';

const Avatar = ({size}) => {
    const avatarSize = size === 'small' ? avatar__small : avatar__large;
    return (
        <img className={`${avatar} ${avatarSize}`} src={imgUrl} alt="some alternative text goes here" />
    )
}

export default Avatar;