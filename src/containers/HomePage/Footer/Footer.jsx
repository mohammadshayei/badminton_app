import "./Footer.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";

const Footer = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const major = 2, minor = 0, patch = 12;

    return <div className="home-footer"
        style={{
            borderTopColor: theme.darken_border_color,
        }}
    >
        <div className="footer-text-wrapper two-lines">
            <p>{`${stringFa.sports_setoos_software} `}
                {`${stringFa.version} ${major}.${minor}.${patch}`}
                {` | © 2022`}
            </p>
            <p className="devider"></p>
            <p>{stringFa.copyright}</p>
        </div>
        <div className="footer-text-wrapper">
            <p>{`${stringFa.support} : 09354598847 - 09109674939`}</p>
        </div>
    </div>;
};

export default Footer;
