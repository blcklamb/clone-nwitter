import { authService, dbService } from 'fbase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nweet from 'components/Nweet'

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate()
  const [nweets, setNweets] = useState([])
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }

  const onChange = event => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  const onSubmit = async event => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName })
      refreshUser()
    }
  }

  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection('nweets')
  //     .where('creatorId', '==', userObj.uid)
  //     .orderBy('createdAt', 'asc')
  //     .get()
  //   const newArray = await nweets.docs.map(doc => doc.data())
  //   setNweets(newArray)
  // }

  // useEffect(() => {
  //   getMyNweets()
  // }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        {nweets.map(nweet => {
          return <Nweet key={nweet.id} nweetObj={nweet} />
        })}
      </div>
    </>
  )
}

export default Profile
