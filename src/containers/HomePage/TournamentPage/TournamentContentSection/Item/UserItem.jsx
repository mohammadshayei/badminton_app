import IMAGE from '../../../../../assets/images/user_avatar.svg'
import './item.scss'
import { useTheme } from "../../../../../styles/ThemeProvider";
import { baseUrl } from '../../../../../constants/Config';

const UserItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    return (
        <div
            className="user-item-wrapper"
            style={{
                color: theme.on_background,
                ...props.style
            }}
        >
            <img
                onDragStart={(e) => e.preventDefault()}
                src={props.image !== '' ? `${baseUrl}uploads/players/${props.image}` : IMAGE}
                alt="avatar" />
            <p>{props.username}</p>
        </div>
    )
}

export default UserItem
