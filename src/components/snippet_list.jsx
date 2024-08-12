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
            <h2>{title}</h2>
            <pre>{code}</pre>
            <button class="edit-button" onClick={() => handleEdit(id, title, code)}><icon></icon></button>
            <button class="copy-button" onClick={() => handleCopy(title, code)}>Copy</button>
            <button class="delete-button" onClick={() => handleDelete(id)}>Delete</button>
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