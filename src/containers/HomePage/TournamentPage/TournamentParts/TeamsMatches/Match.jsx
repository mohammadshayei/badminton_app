import "./TeamsMatches.scss";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";

const Match = ({ index, setShowGames }) => {

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <>
        <div className="table-row-content">
            <div
                className={`table-row-header ${index > 0 ? "not-main" : ""}`}
                style={{
                    color: theme.primary,
                }}
            >
                <p>{stringFa.home}</p>
                <p>{stringFa.away}</p>
                <p>{stringFa.referee}</p>
            </div>
            <div className="table-row-body">
                <div className="table-row-item">
                    <CustomInput
                        elementType={elementTypes.dropDown}
                        inputContainer={{ padding: "0" }}
                        items={[]} />
                </div>
                <div className="table-row-item">
                    <CustomInput
                        elementType={elementTypes.dropDown}
                        inputContainer={{ padding: "0" }}
                        items={[]} />
                </div>
                <div className="table-row-item">
                    <CustomInput
                        elementType={elementTypes.dropDown}
                        inputContainer={{ padding: "0" }}
                        items={[]} />
                </div>
            </div>
        </div>
        <div className="table-row-btns">
            <TransparentButton
                ButtonStyle={{
                    padding: "0",
                    fontSize: "clamp(0.8rem,1vw,0.9rem)",
                    marginLeft: "0.8rem",
                    color: theme.error,
                }}>
                {stringFa.delete}
            </TransparentButton>
            <TransparentButton
                ButtonStyle={{
                    padding: "0",
                    fontSize: "clamp(0.8rem,1vw,0.9rem)"
                }}>
                {stringFa.save}
            </TransparentButton>
            <TransparentButton
                ButtonStyle={{
                    padding: "0",
                    fontSize: "clamp(0.8rem,1vw,0.9rem)"
                }}
                onClick={() => setShowGames(true)}>
                {stringFa.show_games}
            </TransparentButton>
        </div>
    </>;
};

export default Match;
