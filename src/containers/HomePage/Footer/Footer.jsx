import "./Footer.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";

const Footer = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const major = 2, minor = 0, patch = 1;

    return <div className="home-footer"
        style={{
            borderTopColor: theme.darken_border_color,
            opacity: 0.6
        }}
    >
        <div className="footer-text-wrapper">
            <p>{stringFa.sports_setoos_software}</p>
            <p>{`${stringFa.version} ${major}.${minor}.${patch}`}</p>
            |
            <p>{stringFa.copyright}</p>
        </div>
        <div className="footer-text-wrapper">
            <p>{stringFa.support}</p>
            :
            <p>09123511070</p>
        </div>
    </div>;
};

export default Footer;
