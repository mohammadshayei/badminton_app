import "./CreditBar.scss"
import { useTheme } from "../../../styles/ThemeProvider";

const CreditBar = ({ days, paid, past, showDetail, style }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <div className="tournament-days-credit"
        style={{
            ...style
        }}
    >
        {[...Array(days).keys()].map((v) =>
            <div className="day"
                key={v}
                style={{
                    justifyContent: v === 0 ? "flex-end" : "flex-start",
                }}
            >
                {showDetail &&
                    <div className="day-date">
                        20 مرداد
                    </div>}
                <div className="day-link"
                    style={{
                        backgroundColor: v === 0 ? theme.backgroundColor :
                            v < past + 1 ?
                                theme.primary : v > paid ?
                                    theme.error :
                                    theme.darken_border_color
                    }}
                ></div>
                <div className="day-credit"
                    style={{
                        backgroundColor: v < past ?
                            theme.primary : v >= paid ?
                                theme.error :
                                theme.darken_border_color,
                        color: v < past ?
                            theme.on_primary :
                            v >= paid ?
                                theme.on_error :
                                theme.on_background,
                    }}
                >{v + 1}</div>
                <div className="day-link"
                    style={{
                        backgroundColor: v === days - 1 ? theme.backgroundColor :
                            v < past ?
                                theme.primary : v >= paid ?
                                    theme.error :
                                    theme.darken_border_color
                    }}
                ></div>
                {showDetail &&
                    <div className="day-state"
                        style={{
                            color: v < past ?
                                theme.primary : v >= paid ?
                                    theme.error :
                                    theme.darken_border_color
                        }}
                    >
                        پرداخت شده
                    </div>}
            </div>
        )}
    </div>;
};

export default CreditBar;
