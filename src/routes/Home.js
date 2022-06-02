import { dbService, storageService } from 'fbase'
import { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'
import NweetFactory from 'components/NweetFactory'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState('')

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
    // await dbService.collection('nweets').add({
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // })
    // setNweet('')
    let attachmentUrl = ''
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`)
      const response = await attachmentRef.putString(attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    })
    setNweet('')
    setAttachment('')
  }

  const onChange = event => {
    event.preventDefault()
    const {
      target: { value },
    } = event
    setNweet(value)
  }

  const onFileChange = event => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => setAttachment('')

  return (
    <>
      <NweetFactory
        onSubmit={onSubmit}
        nweet={nweet}
        onChange={onChange}
        onFileChange={onFileChange}
        attachment={attachment}
        onClearAttachment={onClearAttachment}
      />
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
