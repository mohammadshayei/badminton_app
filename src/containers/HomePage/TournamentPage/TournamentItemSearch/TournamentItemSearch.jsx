import "./TournamentItemSearch.scss"
import { stringFa } from "../../../../assets/strings/stringFaCollection"
import CustomInput from "../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../styles/ThemeProvider";
import { useEffect, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";

const TournamentItemSearch = ({ createAccess, selector, searchPlaceHolder, onAddItemToTournament, searchListItems, onSearch, searchValue, searchLoading }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [inputStyle, setInputStyle] = useState({
        paddingLeft: "2rem",
        transition: "border-radius 200ms ease"
    });

    useEffect(() => {
        let radiusT, radiusB;
        if (searchValue.length === 0 || searchListItems.length === 0 || !createAccess) { radiusB = "25px"; radiusT = "25px"; }
        else { radiusB = "0"; radiusT = "20px"; }
        let updatedInputStyle = {
            ...inputStyle,
            borderTopLeftRadius: radiusT,
            borderTopRightRadius: radiusT,
            borderBottomLeftRadius: radiusB,
            borderBottomRightRadius: radiusB
        }
        setInputStyle(updatedInputStyle);
    }, [searchValue, searchListItems.length]);


    return <div className="tournament-search-container"
    >
        <CustomInput
            value={searchValue}
            elementType='input'
            elementConfig={{
                placeholder: searchPlaceHolder,
                type: 'text',
            }}
            inputContainer={{ padding: "0" }}
            inputStyle={inputStyle}
            onChange={onSearch}
        />
        <div className="founds">
            <div className={`found-items ${(searchListItems.length > 0 && createAccess) ? "open" : ""}`}
                style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.on_surface
                }}
            >
                {
                    searchListItems?.map(item =>
                        <div key={item._id} className="found-item" >
                            <p> {item[selector()]}</p>
                            <TransparentButton
                                onClick={() => { onAddItemToTournament(item) }}
                                ButtonStyle={{
                                    padding: "0"
                                }}
                            >
                                <p style={{
                                    color: theme.primary,
                                    fontSize: "clamp(0.8rem, 1vw, 1rem)"
                                }}
                                >
                                    {stringFa.add}
                                </p>
                            </TransparentButton>
                        </div>
                    )
                }
            </div>
        </div>
    </div >;
};

export default TournamentItemSearch;
