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

const TournamentPage = (props) => {
  const [modalContent, setModalContent] = useState(null)

  const showModal = useSelector(state => state.home.showModal)
  const mode = useSelector(state => state.home.mode)
  const dispatch = useDispatch();

  const setShowModal = (showModal) => {
    dispatch(homeActions.setShowModal(showModal));
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
  return (
    <div className="tour-page-container">
      <div className="box-container">
        <TournamentContentSection />
      </div>
      <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        {modalContent}
      </Modal>
      <TournamentsList setEditMode={props.setEditMode} setShowModal={props.setShowModal} />
    </div >
  );
};

export default TournamentPage;
