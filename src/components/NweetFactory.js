const NweetFactory = ({
  onSubmit,
  nweet,
  onChange,
  onFileChange,
  attachment,
  onClearAttachment,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet"/>
      {attachment && (
        <div>
          <img alt="" src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  )
}

export default NweetFactory
