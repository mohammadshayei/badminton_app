import { useState } from 'react'
import { useSelector } from 'react-redux'
import { dynamicApi } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import Button from '../../../components/UI/Button/Button'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import TournamentItemSearch from '../TournamentPage/TournamentItemSearch/TournamentItemSearch'
import { AiOutlinePlus } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from '../../../styles/ThemeProvider'
import TeamItem from '../TournamentPage/Items/TeamItem'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom'
import './TeamPlayers.scss'
import { useEffect } from 'react'
import TeamPlayerForm from '../InputForms/PlayerForm/TeamPlayerForm'

const TeamPlayers = ({ createAccess, setDialog, loading, data, itemId, teamId, create }) => {

  const [searchListItems, setSearchListItem] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [listItem, setListItem] = useState([])
  const [filteredListItems, setFilteredListItems] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showInputForm, setShowInputForm] = useState(false)
  const [contentLoading, setContentLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)
  const [content, setContent] = useState(false)
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()


  const themeState = useTheme();
  const theme = themeState.computedTheme;


  const onSearch = async (event) => {
    setSearchValue(event.target.value);
    if (event.target.value.length === 0) {
      setSearchListItem([])
      return;
    }
    setSearchLoading(true)
    try {
      const result = await dynamicApi({ input: event.target.value, teamId }, token, `search_team_player`)
      if (result.success)
        setSearchListItem(result.data[`players`])
      else
        setSearchListItem([])
    } catch (error) {
      setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
      setSearchLoading(false)
    }
    setSearchLoading(false)

  }
  const onAddItem = (item) => {
    let updatedList = listItem.map(item => { return { ...item, selected: false } })
    updatedList = [item, ...updatedList]
    setListItem(updatedList)
  }
  const onRemoveItem = (itemId) => {
    setListItem(lst => lst.filter(item => item._id !== itemId))
  }
  const onAddItemToTournament = async (item) => {
    try {
      const result = await dynamicApi(
        { playerId: item._id, teamId }, token, 'add_player_to_team')
      setDialog(<ErrorDialog type={result.success ? 'success' : "error"}> {result.data.message}</ErrorDialog >)
      if (result.success) {
        setSearchValue('')
        setListItem(lst => [item, ...lst,])
        setSearchListItem([])
      }

    } catch (error) {
      setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
    }
  }
  const onPlayerItemFromTeam = async (itemId) => {
    if (!itemId || !teamId) return;
    setRemoveLoading(true)
    setDialog(null);
    try {
      let payload = {
        teamId,
        playerId: itemId,
      }
      let result = await
        dynamicApi(payload, token, `remove_player_from_team`)
      setDialog(
        <ErrorDialog
          type={result.success ? 'success' : "error"}
        >{result.data.message}</ErrorDialog>)
      if (result.success) {
        onRemoveItem(itemId)
        onBack()
      }
    } catch (error) {
      console.log(error)
      setRemoveLoading(false)
      setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
    }
    setRemoveLoading(false)
  }
  const onUpdateItem = (item) => {
    let updatedListItem = [...listItem]
    let findIndex = updatedListItem.findIndex(i => i._id === item._id)
    if (findIndex < 0) return;
    updatedListItem[findIndex] = item;
    setListItem(updatedListItem)
  }
  const onBack = () => {
    if (content)
      navigate(`/teams/${teamId}?part=players`)
    else setShowInputForm(false)
  }
  const onAddItemClickHandler = () => {
    navigate(`/teams/${teamId}?part=players&create=1`)
  }
  const onItemClick = (itemId) => {
    navigate(`/teams/${teamId}?part=players&item=${itemId}`)
    setListItem(lst => lst.map(item => {
      return {
        ...item,
        selected: item._id === itemId ? true : false
      }
    }))
  }

  useEffect(() => {
    if (!data?.players) return;
    setListItem(data.players.map(item => {
      return {
        _id: item.player._id,
        username: item.player.username,
        selected: false
      }
    }))

  }, [data?.players])

  useEffect(() => {
    if (searchValue.length > 0) {
      setFilteredListItems(
        searchListItems.filter(item => listItem
          .findIndex(i => i._id === item._id) > -1))
    }
    else
      setFilteredListItems(listItem)
  }, [listItem, searchListItems])
  useEffect(() => {
    if (!itemId || !data?.players) return;
    setListItem(lst => lst.map(item => {
      return {
        ...item,
        selected: itemId === item._id ? true : false
      }
    }))
  }, [data?.players, itemId])

  useEffect(() => {
    if (!itemId) {
      setShowInputForm(false)
      setContent(null)
      return;
    }
    setDialog(null)
    setContentLoading(true);
    (async () => {
      try {
        let fetchedItem = await dynamicApi({ id: itemId },
          token, `get_player`)
        if (!fetchedItem.success) {
          setDialog(<ErrorDialog type="error">{fetchedItem.data.message}</ErrorDialog>)
          setContentLoading(false)
          return;

        }
        setContent(fetchedItem.data.player)

        setContentLoading(false)
      } catch (error) {
        setContentLoading(false)
        setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
      }
    })()
    setShowInputForm(true)
  }, [itemId])

  useEffect(() => {
    if (create === '1') {
      setShowInputForm(true)
      setListItem(lst => lst.map(item => {
        return {
          ...item,
          selected: false
        }
      }))
    }
  }, [create])
  return (
    <div className='tournament-body'>
      <div className='tournament-search'>
        <TournamentItemSearch
          searchValue={searchValue}
          searchPlaceHolder={`جستجو بازیکن`}
          searchListItems={
            searchListItems.filter(item => listItem
              .findIndex(i => i._id === item._id) < 0)}
          onSearch={onSearch}
          searchLoading={searchLoading}
          onAddItemToTournament={onAddItemToTournament}
          selector={() => {
            return 'username'
          }}
          createAccess={createAccess}
        />
        {
          createAccess &&
          <Button
            onClick={onAddItemClickHandler}
          >
            <div className='button-add'>
              <AiOutlinePlus style={{ fontSize: 15 }} />
              {`بازیکن جدید`}
            </div>
          </Button>
        }
      </div>
      <div className='tournament-content'>
        <div className={`tournament-list-items ${showInputForm ? 'hide' : ''}`}>
          {
            loading ?
              [...Array(5).keys()].map((v) =>
                <Skeleton
                  key={v}
                  className="tournament-item"
                  direction='rtl'
                  baseColor={theme.border_color}
                  highlightColor={theme.darken_border_color}
                  style={{ border: "none" }}
                />) :
              filteredListItems.length > 0 ?
                filteredListItems.map((item, index) =>
                  <TeamItem
                    key={item._id}
                    index={index + 1}
                    indexNeeded={false}
                    item={item}
                    selector={() => {
                      return 'username'
                    }}
                    onClick={() => onItemClick(item._id)}
                  />
                )
                : <div className='not_found'>
                  <Icon
                    icon="uit:exclamation-circle"
                    fontSize="3rem"
                    opacity={0.3}
                    color={theme.on_background}
                  />
                  {stringFa.item_not_found}
                </div>
          }
        </div>
        <div className={`tournament-item-input ${createAccess ? "item-input-form" : ""}`}
          style={{
            backgroundColor: window.innerWidth > 720 ? theme.background_color : theme.surface,
            display: showInputForm ? 'flex' : 'none',
          }}>

          <TeamPlayerForm
            content={content}
            setShowInputForm={setShowInputForm}
            onAddItem={onAddItem}
            removeLoading={removeLoading}
            onPlayerItemFromTeam={onPlayerItemFromTeam}
            onBack={onBack}
            onUpdateItem={onUpdateItem}
            createAccess={createAccess}
            itemLoading={contentLoading}
            teamId={teamId}
          />
        </div>
      </div>
    </div>
  )
}

export default TeamPlayers