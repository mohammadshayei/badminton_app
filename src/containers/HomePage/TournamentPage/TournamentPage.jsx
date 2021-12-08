import React, { useState, useEffect } from "react";
import "./TournamentPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import Button from "../../../components/UI/Button/Button";
import { GoSettings } from "react-icons/go";
import { fetchItems } from "../../../api/home";
import { useDispatch, useSelector } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import { FaMedal, FaBalanceScale } from 'react-icons/fa'
import { MdOutlineEmojiTransportation, MdOutlineSportsHandball } from 'react-icons/md'
import GameItem from "./Item/GameItem";
import PlayerItem from "./Item/PlayerItem";
import { DatePicker } from "jalali-react-datepicker";



const TournamentPage = () => {
  // const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false)
  const [iconLoading, setIconLoading] = useState(false)


  const token = useSelector((state) => state.auth.token);
  const refereeId = useSelector((state) => state.auth.refereeId);
  const tournaments = useSelector((state) => state.home.tournaments);
  const contents = useSelector((state) => state.home.contents);
  const selectedTournament = useSelector((state) => state.home.selectedTournament);
  const mode = useSelector((state) => state.home.mode);


  const dispatch = useDispatch();

  const setTournaments = (tournaments) => {
    dispatch(homeActions.setTournaments(tournaments));
  };
  const setContents = (contents) => {
    dispatch(homeActions.setContents(contents));
  };
  const setSelectedTournament = (tournamentId) => {
    dispatch(homeActions.setSelectedTournament(tournamentId));
  };
  const setMode = (modeInput) => {
    dispatch(homeActions.setMode(modeInput));
  };

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(async () => {
    if (refereeId && token) {
      setLoading(true)
      const result = await fetchItems(refereeId, token, 'tournaments')
      if (result.success) {
        setTournaments(result.data)
        if (result.data.length > 0) setSelectedTournament(result.data[0].tournament._id)
      }
      setLoading(false)

    }
  }, [refereeId, token])

  useEffect(async () => {
    if (mode !== 'edit') {
      setIconLoading(true)
      const result = await fetchItems(selectedTournament, token, mode)
      if (result.success) {
        setContents(result.data)
        // if (result.data.length > 0) setSelectedTournament(result.data[0].tournament._id)
      }
      setIconLoading(false)
    }

  }, [selectedTournament, mode]);

  const onTournamentClick = (id) => {
    setSelectedTournament(id)
  };
  const onIconClickHandler = (key) => {
    setMode(key)
  }
  return (
    <div className="tour-page-container">
      <div
        className="box-container"
        style={{ backgroundColor: theme.background_color }}
      ><DatePicker />
        <div className="box-content">
          {contents.length > 0 &&
            contents.map((item, key) => {
              let body;
              switch (mode) {
                case 'games':
                  body = <GameItem key={item.game._id} {...item.game} />
                  break;
                case 'players':
                  body = <PlayerItem key={item._id} {...item.player} />
                  break;
                case 'referees':
                  body = <PlayerItem key={item._id} {...item.referee} />
                  break;
                default:
                  break;
              }
              return body
            }
            )}
        </div>
        <div className="box-btn">
          <Button>{stringFa.new_game}</Button>
        </div>
      </div>
      <div className="tournaments-wrapper">
        {tournaments.length > 0 ? (
          tournaments.map((item, key) => (
            <div
              key={item.tournament._id}
              className={`tournament-box ${item.tournament._id === selectedTournament && "selected"}`}
              style={{
                backgroundColor: item.tournament._id === selectedTournament && theme.background_color,
                color: item.tournament._id === selectedTournament && theme.on_background,
                boxShadow:
                  item.tournament._id === selectedTournament &&
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
              onClick={() => onTournamentClick(item.tournament._id)}
            >
              <div
                className="progress"
                style={{ width: `${item.tournament.progress}` }}
              ></div>
              <p>{item.tournament.title}</p>
              {item.tournament._id === selectedTournament && (
                <div className="icons">
                  <FaMedal
                    style={{ color: mode === 'games' && theme.primary }}
                    className='icon'
                    onClick={() => onIconClickHandler('games')}
                  />
                  <MdOutlineSportsHandball
                    style={{ color: mode === 'players' && theme.primary }}
                    className='icon'
                    onClick={() => onIconClickHandler('players')}

                  />
                  <FaBalanceScale
                    style={{ color: mode === 'referees' && theme.primary }}
                    className='icon'
                    onClick={() => onIconClickHandler('referees')}

                  />
                  <MdOutlineEmojiTransportation
                    style={{ color: mode === 'gyms' && theme.primary }}
                    className='icon'
                    onClick={() => onIconClickHandler('gyms')}

                  />
                  <GoSettings
                    style={{ color: mode === 'edit' && theme.primary }}
                    className='icon'
                    onClick={() => onIconClickHandler('edit')}

                  />
                  {/* <img src={games} alt="" /> 
                   <img src={courts} alt="" />
                  <img src={reeferees} alt="" />
                  <img src={players} alt="" /> */}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="hint">
            {stringFa.create_tournament}
            <img src={arrow} alt="arrow_down" />
          </div>
        )}
      </div>
    </div >
  );
};

export default TournamentPage;
