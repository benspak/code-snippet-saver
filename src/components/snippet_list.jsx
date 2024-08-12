import React, { useState, useEffect } from "react"

const handleEdit = (id, title, code) => {
}

const handleCopy = (title, code) => {}

const handleDelete = (id) => {
  chrome.storage.sync.get(['snippets'], (result) => {
    const snippets = result.snippets;
    const keptSnippets = snippets.filter((snippet) => snippet.id != id)
    chrome.storage.sync.set({ snippets: keptSnippets });
  })
}


const SnippetListItem = ({snippet}) => {
    const { id, title, code } = snippet
    return (
        <div className="snippet">
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h2>{title}</h2>
            <div style={{ display: 'flex', flexDirection:'row', columnGap: '5px'}}>
              <i className="material-icons" onClick={() => handleEdit(id, title, code)}>content_copy</i>
              <i className="material-icons" onClick={() => handleCopy(title, code)}>edit</i>
              <i className="material-icons" onClick={() => handleDelete(id)}>delete</i>
            </div>
           
          </div>
          <pre>{code}</pre>
            
        </div>
    )
}

export const SnippetList = () => {
  const [snippets, setSnippets] = useState([])
  const handleSnippetsChange = (changes) => {
    setSnippets(changes.snippets.newValue)
  }

  useEffect(() => {
    chrome.storage.sync.get(['snippets'], (result) => {
        setSnippets(result.snippets);
    })
    chrome.storage.sync.onChanged.addListener(handleSnippetsChange)

    return () => {
      chrome.storage.sync.onChange.removeListener(handleSnippetsChange);
    }
  }, [])

  return (
      <div className="snippets-container">
        {snippets.map((snippet) => {
          return <SnippetListItem snippet={snippet}/>
        })}
      </div>
  )
}