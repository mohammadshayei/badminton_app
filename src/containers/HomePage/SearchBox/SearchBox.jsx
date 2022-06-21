import "./SearchBox.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../styles/ThemeProvider";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState("");

    const themeState = useTheme();
    const theme = themeState.computedTheme;

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
            inputContainer={{ padding: "0 0.5rem 0.5rem 0.5rem" }}
            inputStyle={{
                backgroundColor: theme.surface,
                paddingLeft: "2rem"
            }}
            onChange={(e) => setSearchValue(e.target.value)}
        />
        <BsSearch className="search-icon" />
    </div>;
};

export default SearchBox;
