/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "./ProfilePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import * as detailActions from "../../store/actions/detail";
import { useDispatch } from "react-redux";
import Menu from '../Menu/Menu';
import Header from "../HomePage/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from "./ProfileParts/UserInfo";
import MemberShipInfo from "../HomePage/MemberShipInfo/MemberShipInfo";

const ProfilePage = () => {
    const [dialog, setDialog] = useState(null);
    const [filterSelectors, setFilterSelectors] = useState({
        userInfo: {
            text: "مشخصات",
            selected: true,
        },
        informations: {
            text: "اطلاعات عضویت",
            selected: false,
        },
    });

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    const dispatch = useDispatch();
    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };

    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
        navigate(`/profile?part=${key}`)
    }

    return (
        <div
            className="profile-page-wrapper"
            style={{
                background: theme.background_color,
                color: theme.on_background,
            }}
        >
            {dialog}
            <Header
                filterSelectors={filterSelectors}
                onSelectorClick={onSelectorClick}
            />
            {
                part === "userInfo" ?
                    <UserInfo setDialog={setDialog} /> :
                    part === "informations" ?
                        <MemberShipInfo />
                        :
                        <UserInfo setDialog={setDialog} />

            }
        </div>
    );
};

export default ProfilePage;
