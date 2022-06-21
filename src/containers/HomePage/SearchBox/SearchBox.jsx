import "./SearchBox.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../styles/ThemeProvider";
import { useEffect, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";

const SearchBox = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [searchValue, setSearchValue] = useState("");
    const [inputStyle, setInputStyle] = useState({
        backgroundColor: theme.surface,
        paddingLeft: "2rem",
        transition: "border-radius 200ms ease"
    });

    const onSearch = (event) => {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        let radiusT, radiusB;
        if (searchValue.length === 0) { radiusB = "25px"; radiusT = "25px"; }
        else { radiusB = "0"; radiusT = "20px"; }
        let updatedInputStyle = {
            ...inputStyle,
            borderTopLeftRadius: radiusT,
            borderTopRightRadius: radiusT,
            borderBottomLeftRadius: radiusB,
            borderBottomRightRadius: radiusB
        }
        setInputStyle(updatedInputStyle);
    }, [searchValue]);


    return <div className="search-box-container"
        style={{ backgroundColor: theme.secondary }}
    >
        <CustomInput
            value={searchValue}
            elementType='input'
            elementConfig={{
                placeholder: stringFa.search_tournament,
                type: 'text',
            }}
            inputContainer={{ padding: "0" }}
            inputStyle={inputStyle}
            onChange={(e) => onSearch(e)}
        />
        {searchValue.length === 0 ? <BsSearch className="search-icon" /> :
            <BsX className="search-icon" onClick={() => setSearchValue("")} />
        }
        <div className="founds">
            <div className={`found-items ${searchValue.length === 0 ? "" : "open"}`}
                style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border_color
                }}
            >
                <div className="found-item">
                    لیگ برتر بدمینتون ایران جام خلیج فارس
                </div>
                <div className="found-item">
                    لیگ برتر بدمینتون ایران جام خلیج فارس
                </div>
            </div>
        </div>
    </div>;
};

export default SearchBox;
