/* eslint-disable react-hooks/exhaustive-deps */
import "./SearchBox.scss"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../styles/ThemeProvider";
import { useEffect, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { searchTournaments } from "../../../api/home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md"; //, MdSettings
import Skeleton from 'react-loading-skeleton';

const SearchBox = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [foundTournaments, setFoundTournaments] = useState([])
    const [inputStyle, setInputStyle] = useState({
        backgroundColor: theme.surface,
        paddingLeft: "2rem",
        transition: "border-radius 200ms ease"
    });

    const { user, token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const onSearch = async (event) => {
        setSearchValue(event.target.value);
        if (event.target.value.length === 0) return;
        setLoading(true)
        const result = await searchTournaments({ name: event.target.value }, token)
        setFoundTournaments(result.data.tournaments)
        setLoading(false)
    }
    const onItemClickHandler = (id) => {
        navigate(`/tournaments/${id}?part=team`)
        setSearchValue('')
        setFoundTournaments([])
    }
    const showProfile = () => {
        navigate(`/profile?part=userInfo`)
    }
    const logOut = () => {
        localStorage.removeItem("a1");
        window.location.reload(false);
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
        >
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
                    {
                        foundTournaments.length > 0 ?
                            foundTournaments.map(item =>
                                <div key={item._id} className="found-item" onClick={() => onItemClickHandler(item._id)}>
                                    {item.title}
                                </div>)
                            : <div>موردی پیدا نشد.</div>
                    }
                </div>
            </div>
        </CustomInput>
        <div className="user"
            style={{ color: theme.on_primary }}
        >
            <div className="user-details" onClick={() => showProfile()}>
                <div className="user-item name">
                    {user?.username || <Skeleton width={100} />}
                </div>
            </div>
            <div className="user-item log-out"
                onClick={logOut}
            ><MdLogout /></div>
        </div>
    </div>;
};

export default SearchBox;
