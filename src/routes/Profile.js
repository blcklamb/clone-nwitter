import { authService, dbService } from 'fbase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nweet from 'components/Nweet'

const Profile = ({ userObj }) => {
  const navigate = useNavigate()
  const [nweets, setNweets] = useState([])

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'asc')
      .get()
    // .onSnapshot(snapshot => {
    //   const newArray = snapshot.docs.map(document => ({
    //     id: document.id,
    //     ...document.data(),
    //   }))
    //   setNweets(newArray)
    // })
    const newArray = await nweets.docs.map(doc => doc.data())
    setNweets(newArray)
  }

  useEffect(() => {
    getMyNweets()
  }, [])
  return (
    <>
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
