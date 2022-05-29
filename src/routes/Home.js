import { dbService } from 'fbase'
import { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const newArray = snapshot.docs.map(document => ({
        id: document.id,
        ...document.data(),
      }))
      function compare(a, b) {
        if (a.createdAt < b.createdAt) return -1
        if (a.createdAt > b.createdAt) return 1
        return 0
      }
      newArray.sort(compare)
      setNweets(newArray)
    })
  }, [])

  const onSubmit = async event => {
    event.preventDefault()
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setNweet('')
  }

  const onChange = event => {
    event.preventDefault()
    const {
      target: { value },
    } = event
    setNweet(value)
  }
  console.log(nweets)
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home
