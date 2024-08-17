import React, { useState, useEffect } from "react"
import { Modal } from "./modal";
import { SnippetForm } from "./snippet_form";


const SnippetListItem = ({ snippet }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, code } = snippet;

  const handleToggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
  };

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCopy = (title, code) => {
    window.navigator.clipboard.writeText(code).then(
      // TODO: Use a better form of notification to the user that the snippet is successfully copied
      alert(`Copied ${title} snippet`)
    );
  }

  const handleDelete = (id) => {
    chrome.storage.sync.get(['snippets'], (result) => {
      const snippets = result.snippets;
      const keptSnippets = snippets.filter((snippet) => snippet.id != id)
      chrome.storage.sync.set({ snippets: keptSnippets });
    })
  }

  const getInitialSnippetValues = () => {
    return {
      id,
      title,
      code
    }
  }

  const handleModalClose = () => {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing && <Modal onClose={handleModalClose} headerContent={`Editing Snippet: ${title}`}><SnippetForm initialValues={getInitialSnippetValues()} onEditSubmit={handleModalClose}/></Modal>}
      <div className="snippet">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h2>{title}</h2>
              <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5px' }}>
                  <i className="material-icons" onClick={() => handleCopy(title, code)} > content_copy </i>
                  <i className="material-icons" onClick={() => handleEdit()}> edit</i>
                  <i className="material-icons" onClick={() => handleDelete(id)}>delete</i>
                  <i className="material-icons" onClick={handleToggleDropdown}>
                      {isDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </i>
              </div>
          </div>
          <div
              style={{
                  maxHeight: isDropdownOpen ? '500px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
              }}
          >
            <pre>{code}</pre>
          </div>
      </div>
    </>
  );
};

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

  if (snippets.length === 0) {
    return null;
  }

  return (
      <div className="snippets-container">
        <div><h1>Your Snippets</h1></div>
        {snippets.map((snippet) => {
          return <SnippetListItem key={snippet.id} snippet={snippet}/>
        })}
      </div>
  )
}