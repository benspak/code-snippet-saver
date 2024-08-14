import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const SnippetForm = ({ initialValues = {}, onEditSubmit}) => {
  const { id: initialId, title: initialTitle = '', code: initialCode = '' } = initialValues;
  const [title, setTitle] = useState(initialTitle || '');
  const [code, setCode] = useState(initialCode || '');

  const saveSnippet = () => {
    const id = initialId || uuidv4();
    const newSnippet = { id, title, code };

    chrome.storage.sync.get(['snippets'], (result) => {
      const updatedSnippets = initialId
        ? result.snippets.map(snippet =>
            snippet.id === initialId ? newSnippet : snippet
          )
        : [...(result.snippets || []), newSnippet];

      chrome.storage.sync.set({ snippets: updatedSnippets });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onEditSubmit) {
      onEditSubmit();
    }
    saveSnippet();
    setTitle('');
    setCode('');
  };

  return (
    <form id="snippet-form" onSubmit={handleSubmit}>
      <div className="form-column">
        <input
          type="text"
          id="title"
          placeholder="Snippet Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          id="code"
          placeholder="Code Snippet"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        ></textarea>
        <button className='md-btn' type="submit">
          {initialValues.id ? 'Update Snippet' : 'Save Snippet'}
        </button>
      </div>
    </form>
  );
};
