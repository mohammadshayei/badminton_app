import "./TournamentPage.scss";
import TournamentContentSection from "./TournamentContentSection/TournamentContentSection";
import TournamentsList from "./TournamentsList/TournamentsList";
import { useDispatch } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import { useSelector } from "react-redux";
import Modal from "../../../components/UI/Modal/Modal";
import { useEffect, useState } from "react";
import PlayerModal from "./InputForms/PlayerModal/PlayerModal";
import GymModal from "./InputForms/GymModal/GymModal";
import GameModal from "./InputForms/GameModal/GameModal";
import { useTheme } from "../../../styles/ThemeProvider.js";
import { FaMedal, FaBalanceScale } from 'react-icons/fa'
import { MdOutlineEmojiTransportation, MdOutlineSportsHandball } from 'react-icons/md'

const TournamentPage = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [modalContent, setModalContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const showModal = useSelector(state => state.home.showModal)
  const mode = useSelector(state => state.home.mode)
  const contents = useSelector((state) => state.home.contents);
  const dispatch = useDispatch();

  const onIconClickHandler = (key) => {
    if (key !== mode) setLoading(true)
    setMode(key)
  }

  const setShowModal = (showModal) => {
    dispatch(homeActions.setShowModal(showModal));
  };
  const setMode = (modeInput) => {
    dispatch(homeActions.setMode(modeInput));
  };
  useEffect(() => {
    switch (mode) {
      case 'players':
        setModalContent(<PlayerModal />)
        break;
      case 'gyms':
        setModalContent(<GymModal />)
        break;
      case 'games':
        setModalContent(<GameModal />)
        break;

      default:
        break;
    }
  }, [mode])
  useEffect(() => {
    setLoading(false)
  }, [contents])
  return (
    <div className="tour-page-container">
      <div disabled={loading} className="small-page-icons">
        <FaMedal
          style={{ color: mode === 'games' && theme.primary }}
          className={`icon ${mode === 'games' && 'icon-selected'}`}
          onClick={() => onIconClickHandler('games')}
        />
        <MdOutlineSportsHandball
          style={{ color: mode === 'players' && theme.primary }}
          className={`icon ${mode === 'players' && 'icon-selected'}`}
          onClick={() => onIconClickHandler('players')}
        />
        <FaBalanceScale
          style={{ color: mode === 'referees' && theme.primary }}
          className={`icon ${mode === 'referees' && 'icon-selected'}`}
          onClick={() => onIconClickHandler('referees')}

        />
        <MdOutlineEmojiTransportation
          style={{ color: mode === 'gyms' && theme.primary }}
          className={`icon ${mode === 'gyms' && 'icon-selected'}`}
          onClick={() => onIconClickHandler('gyms')}

        />
      </div>
      <div className="box-container">
        <TournamentContentSection />
      </div>
      {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        {modalContent}
      </Modal>}
      <TournamentsList setEditMode={props.setEditMode} setShowModal={props.setShowModal} />
    </div >
  );
};

export default TournamentPage;
