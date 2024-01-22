/* eslint-disable react-hooks/exhaustive-deps */
import "./TournamentItemSearch.scss"
import { stringFa } from "../../../../assets/strings/stringFaCollection"
import CustomInput from "../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../styles/ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import Loading from "../../../../components/UI/Loading/Loading";
import useOnClickOutside from './../../../../hooks/useOnClickOutside';

const TournamentItemSearch = ({ createAccess, selector, searchPlaceHolder, onAddItemToTournament, searchListItems, onSearch, searchValue, searchLoading }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [inputStyle, setInputStyle] = useState({
        paddingLeft: "2rem",
        transition: "border-radius 200ms ease"
    });
    const [drop, setDrop] = useState(false);

    const divRef = useRef(null);
    const divContainerRef = useRef(null);

    useOnClickOutside(divContainerRef, divRef, () => {
        setDrop(false);
    });

    const openDropDown = () => {
        if (!createAccess || drop || searchListItems.length === 0) return;
        setDrop(true)
    }

    useEffect(() => {
        let radiusT, radiusB;
        if (!createAccess || !drop || searchValue.length === 0 || searchListItems.length === 0) { radiusB = "25px"; radiusT = "25px"; }
        else { radiusB = "0"; radiusT = "20px"; }
        let updatedInputStyle = {
            ...inputStyle,
            borderTopLeftRadius: radiusT,
            borderTopRightRadius: radiusT,
            borderBottomLeftRadius: radiusB,
            borderBottomRightRadius: radiusB
        }
        setInputStyle(updatedInputStyle);
    }, [searchValue, searchListItems.length, drop]);

    useEffect(() => {
        setDrop(createAccess && searchListItems.length > 0);
    }, [searchListItems, createAccess]);

    return (
        <div ref={divContainerRef} className="tournament-search-container" onClick={openDropDown}>
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
            >
                {searchLoading ? <Loading small={true} />
                    : searchValue.length === 0 ? <BsSearch className="search-icon" /> :
                        <BsX className="search-icon" style={{ cursor: "pointer" }} onClick={() => onSearch({ target: { value: "" } })} />
                }
            </CustomInput>
            <div ref={divRef} className="founds">
                <div className={`found-items ${drop ? "open" : ""}`}
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
        </div>
    );
};

export default TournamentItemSearch;
