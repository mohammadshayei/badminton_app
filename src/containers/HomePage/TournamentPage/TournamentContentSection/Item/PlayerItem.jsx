import { baseUrl } from "../../../../constants/Config";
import { useTheme } from "../../../../styles/ThemeProvider";
import IMAGE from '../../../../assets/images/userIcon.png'
const PlayerItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    return (
        <div
            className="content-container"
            style={{
                color: theme.on_background,
            }}
        >
            <img src={props.image !== '' ? `${baseUrl}uploads/players/${props.image}` : IMAGE} alt="avatar" />
            <p>{props.username}</p>
        </div>
    )
}

export default PlayerItem
