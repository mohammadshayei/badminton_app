import "./Footer.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";
import { Link } from "react-router-dom";

const Footer = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const major = 2, minor = 2, patch = 1;

    return <div className="home-footer"
        style={{
            borderTopColor: theme.darken_border_color,
        }}
    >
        <div className="footer-text-wrapper two-lines">
            <p>{`${stringFa.sports_setoos_software} `}
                {`${stringFa.version} ${major}.${minor}.${patch}`}
                {` | © 2025`}
            </p>
            <p className="devider"></p>
            <p>{stringFa.copyright}</p>
            <Link
                to={`https://setoos.ir`}
                target="_blank"
                style={{
                    textDecoration: "none",
                    color: theme.on_surface
                }}
            >
                {`setoos.ir`}
            </Link>
        </div>
        <div className="footer-text-wrapper">
            <p>{`${stringFa.support} : 09354598847 - 09109674939`}</p>
        </div>
    </div>;
};

export default Footer;
