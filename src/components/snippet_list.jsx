import React, { useState, useEffect } from "react"

const SnippetListItem = ({snippet}) => {
    const { title, code } = snippet
    return (
        <div>
            <h2>{title}</h2>
            <pre>{code}</pre>
            <button class="edit-button">Edit</button>
            <button class="copy-button">Copy</button>
            <button class="delete-button">Delete</button>
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
        <div id="snippets-container">
          {snippets.map((snippet) => {
            return <SnippetListItem snippet={snippet}/>
          })}
        </div>
    )
}