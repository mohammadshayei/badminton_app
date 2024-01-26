/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useSelector } from "react-redux";
import { dynamicApi, dynamicGetApi } from "../../../api/home";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import Ads from "../../../assets/images/IranBadmintonFederation.jpg";
import Ads2 from "../../../assets/images/IranBadmintonFederation2.jpg";
import { GiTennisCourt } from "react-icons/gi";
import Skeleton from 'react-loading-skeleton'
import Footer from "../Footer/Footer";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import CustomInput, { elementTypes } from "../../../components/UI/CustomInput/CustomInput";
import TransparentButton from "../../../components/UI/Button/TransparentButton/TransparentButton";
import { IoTrashBin } from "react-icons/io5";

const GamesPage = () => {
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState([]);
  const [dialog, setDialog] = useState(null)
  const [lives, setLives] = useState([])
  const [needUnlock, setNeedUnlock] = useState("");
  const [dataFetched, setDataFetched] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [detailPassword, setDetailPassword] = useState({
    invalid: false,
    touched: true,
    shouldValidate: true,
    validationMessage: "",
  })
  const [gyms, setGyms] = useState([{ id: "", text: "" }])
  const [landNumbers, setLandNumbers] = useState([{ id: "", text: "" }])
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedGym, setSelectedGym] = useState()
  const [gymsInfo, setGymsInfo] = useState([])
  const [password, setPassword] = useState('')
  const [filteredGames, setFilteredGames] = useState([])

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const { token, user, socket } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const court = searchParams.get("court");
  const gym = searchParams.get("gym");

  const gameClickHandler = (i) => {
    let game = games.find(item => item._id === i)
    // if (game.lock) {
    //   setPassword('')
    //   setNeedUnlock(i)
    // }
    // if (user && game._id && !game.lock) {
    if (user && game._id)
      navigate(`/scoreboard?gameId=${game._id}&refereeId=${user._id}${gym ? `&gym=${gym}` : ''}${court ? `$court=${court}` : ""}`)
  }
  const verifyPassword = async (gameId) => {
    setDialog(null)
    setVerifyLoading(true)
    try {
      const result = await dynamicApi({ gameId, password }, token, 'verify_password_game')
      if (result.success) {
        if (!result.data.correct) {
          setDetailPassword({
            ...detailPassword,
            invalid: true,
            validationMessage: 'رمز عبور اشتباه می باشد'
          })
        }
        else {
          if (gym && court)
            navigate(`/scoreboard?gameId=${gameId}&refereeId=${user._id}&gym=${gym}&court=${court}`)
          else if (gym)
            navigate(`/scoreboard?gameId=${gameId}&refereeId=${user._id}&gym=${gym}`)
          else
            navigate(`/scoreboard?gameId=${gameId}&refereeId=${user._id}`)
        }
      }
      else
        setDialog(<ErrorDialog type={"error"}> {result.data.message}</ErrorDialog >)
    } catch (error) {
      setVerifyLoading(false)
      setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
    }
    setVerifyLoading(false)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const onChangeGymCourt = (type, id) => {
    if (gym) {
      if (type === 'court')
        navigate(`/my_games?gym=${gym}&court=${id}`)
      else
        if (court)
          navigate(`/my_games?gym=${id}&court=${court}`)
        else
          navigate(`/my_games?gym=${id}`)
    } else {
      if (type === 'court')
        navigate(`/my_games?court=${id}`)
      else
        if (court)
          navigate(`/my_games?court=${court}`)
        else
          navigate(`/my_games?gym=${id}`)

    }
  }
  const deselect = (type) => {
    if (type === 'court')
      if (gym)
        navigate(`/my_games?gym=${gym}`)
      else
        navigate(`/my_games`)
    else
      navigate(`/my_games`)

  }
  useEffect(() => {
    if (!gym) setSelectedGym('')
    if (!gym || gymsInfo.length === 0) return;
    let selected = gymsInfo.find(item => item._id === gym)
    if (!selected) return;
    setSelectedGym(selected.title)
    setLandNumbers(selected.land_numbers.map(item => {
      return {
        id: item._id,
        text: item.number
      }
    }))
  }, [gym, gymsInfo])
  useEffect(() => {
    if (!games) return;
    let filteredGames = [...games]
    if (gym) {
      setSelectedCourt(gyms.find(item => item._id === gym)?.text)
      filteredGames = filteredGames.filter(item => item.gymId === gym)
    }
    else
      setSelectedGym('')
    if (court) {
      setSelectedCourt(court)
      filteredGames = filteredGames.filter(item => item.land_number === court)
    } else
      setSelectedCourt('')
    setFilteredGames(filteredGames)
  }, [court, games, gym,])
  useEffect(() => {
    if (!token || !user) return;
    setLoading(true)
    setDialog(null);
    (async () => {
      try {
        const result = await dynamicGetApi(token, 'get_umpire_games')
        if (result.success) {
          setGames(result.data.games)
          if (result.data.games.length === 0) setDataFetched(true)
          setGymsInfo(result.data.gyms)
          setGyms(result.data.gyms.map(item => {
            return {
              id: item._id,
              text: item.title
            }
          }))
          if (!gym) {
            let selectedGymIndex = result.data.gyms.findIndex(item => item.creator === user._id)
            if (selectedGymIndex > -1) {
              if (court)
                navigate(`/my_games?gym=${result.data.gyms[selectedGymIndex]._id}&court=${court}`)
              else
                navigate(`/my_games?gym=${result.data.gyms[selectedGymIndex]._id}`)

            }
          }
        }
        else
          setDialog(<ErrorDialog type={"error"}> {result.data.message}</ErrorDialog >)
      } catch (error) {
        setLoading(false)
        console.log(error)
        setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
      }
      setLoading(false)
    })()
  }, [user])

  useEffect(() => {
    if (dataFetched || games.length === 0) return;
    setDataFetched(true)
  }, [games])

  useEffect(() => {
    if (!socket || !user || !dataFetched) return;
    socket.on('get_created_game', (payload => {
      let { game, title, referees } = payload;
      if (referees?.findIndex(item => item === user._id) < 0) return;
      let updatedGames = [...games]
      let finded = updatedGames.findIndex(item => item._id === game._id)
      if (finded > -1)
        updatedGames[finded] = {
          ...updatedGames[finded],
          game_type: game.game_type,
          gymId: game.gymId,
          game_number: game.game_number,
          land_number: game.land_number,
          teamAPlayers: game.teamAPlayers,
          teamBPlayers: game.teamBPlayers,
          lock: game.umpireId !== user._id
        }
      else
        updatedGames.push({
          _id: game._id,
          title,
          game_type: game.game_type,
          gymId: game.gymId,
          game_number: game.game_number,
          land_number: game.land_number,
          teamAPlayers: game.teamAPlayers,
          teamBPlayers: game.teamBPlayers,
          lock: game.umpireId !== user._id

        })
      setGames(updatedGames)
    }))
    socket.on('get_deleted_game', (payload => {
      let { gameId, referees } = payload;
      if (referees?.findIndex(item => item === user._id) < 0) return;
      let updatedGames = games.filter(item => item._id !== gameId)
      setGames(updatedGames)
    }))
  }, [socket, dataFetched, user, games]);


  return (
    <div className="games-page">
      {dialog}
      {
        lives.length > 0 &&
        <div className="live-scores-bar"
          style={{
            display: "flex",
            backgroundColor: theme.secondary_variant,
            color: theme.on_secondary
          }}
        >
          {
            lives.map(item =>
              <div className="live-score-item">
                <Icon className="live-icon" icon="fluent:live-24-regular" color={theme.on_primary} />
                <p>{item.title}</p>
              </div>
            )
          }

        </div>
      }
      <p className="title">{stringFa.my_games}</p>
      <div className="games-and-ads">
        <div className="games-wrapper">
          {/* <div className="ads-container">
            <img src={Ads2} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
          </div> */}
          <div className="court-and-gym-selector">
            <CustomInput
              elementType={elementTypes.dropDown}
              inputContainer={{
                maxWidth: "200px"
              }}
              items={gyms}
              value={selectedGym}
              title="سالن"
              onChange={(e) => onChangeGymCourt('gym', e.id)}
            />
            <TransparentButton
              ButtonStyle={{
                fontSize: "1.5rem",
                padding: "0 0.2rem",
                margin: "0 1rem"
              }}
              onClick={() => deselect('gym')}
              config={{
                disabled: !gym
              }}
            >
              <IoTrashBin color={theme.error} />
            </TransparentButton>
            <CustomInput
              elementType={elementTypes.dropDown}
              inputContainer={{
                maxWidth: "200px"
              }}
              items={landNumbers}
              title="زمین"
              value={selectedCourt}
              onChange={(e) => onChangeGymCourt('court', e.text)}
            />
            <TransparentButton
              ButtonStyle={{
                fontSize: "1.5rem",
                padding: "0 0.2rem",
                margin: "0 1rem"
              }}
              onClick={() => deselect('court')}
              config={{
                disabled: !court
              }}
            >
              <IoTrashBin color={theme.error} />
            </TransparentButton>
          </div>
          {
            loading ?
              <div
                className="game-box"
                style={{
                  backgroundColor: theme.surface
                }}
              >
                <div className="game-box-title"
                  style={{
                    backgroundColor: theme.border_color
                  }}
                >
                  <Skeleton
                    className="game-box-title-text"
                    width={250}
                  />
                </div>
                <div className="game-box-details">
                  <div className="game-box-players">
                    <Skeleton
                      className="game-box-players-name"
                      width={150}
                    />
                    <Skeleton
                      className="game-box-players-name"
                      width={150}
                    />
                  </div>
                </div>
              </div>
              :
              filteredGames.length > 0 ? (
                filteredGames.map((item, key) => (
                  <div
                    className="game-box"
                    key={item._id}
                    style={{
                      backgroundColor: theme.surface,
                      cursor: item._id !== needUnlock ? "pointer" : "default"
                    }}
                    onClick={() => {
                      if (item._id !== needUnlock)
                        gameClickHandler(item._id)
                    }}
                  >
                    <div className="game-box-title"
                      style={{
                        backgroundColor: theme.border_color
                      }}
                    >
                      <p className="game-box-title-text" title={item.title}>{item.title}</p>
                      {item.lock ? <FaLock color={theme.error} /> : <FaLockOpen color={theme.success} />}
                      <div className="game-number-and-court">
                        <p
                          style={{ color: theme.secondary }}
                        >
                          {item.land_number}
                        </p>
                        <GiTennisCourt color={theme.secondary} />
                        <p className="game-box-game-number">
                          {item.game_number}
                        </p>
                      </div>
                    </div>
                    <div className="game-box-details">
                      {item._id === needUnlock ?
                        <div className="get-password">
                          <CustomInput
                            value={password}
                            onChange={onPasswordChange}
                            elementType={elementTypes.titleInput}
                            title="رمز خود را وارد کنید :"
                            invalid={detailPassword.invalid}
                            touched={detailPassword.touched}
                            shouldValidate={detailPassword.shouldValidate}
                            validationMessage={detailPassword.validationMessage}
                          />
                          <TransparentButton
                            ButtonStyle={{
                              margin: 0, padding: 0
                            }}
                            loading={verifyLoading}
                            config={{
                              disabled: password.length < 5
                            }}
                            onClick={() => verifyPassword(item._id)}
                          >
                            <IoMdCheckmark className="icon" color={theme.success} />
                          </TransparentButton>
                          <TransparentButton
                            ButtonStyle={{
                              margin: 0, padding: 0
                            }}
                          >
                            <IoMdClose className="icon" color={theme.error} onClick={() => setNeedUnlock("")} />
                          </TransparentButton>
                        </div>
                        :
                        <div className="game-box-players">
                          <div className="game-box-players-name">
                            <span>{item.teamAPlayers[0].username}</span>
                            <span>{item.game_type === "double" && item.teamAPlayers[1].username}</span>
                          </div>
                          <span> - </span>
                          <div className="game-box-players-name">
                            <span>{item.teamBPlayers[0].username}</span>
                            <span>{item.game_type === "double" && item.teamBPlayers[1].username}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                ))
              ) : (
                <div className="hint">
                  {stringFa.there_is_no_game}
                </div>
              )
          }
        </div>
        {/* <div className="ads-container">
          <img src={Ads} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default GamesPage;
