import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

export const SnippetForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const saveSnippet = () => {
    const id = uuidv4();
    const newSnippet = { id, title, code };
    console.log(newSnippet);
    chrome.storage.sync.get(['snippets'], (result) => {
      const updatedSnippets = result.snippets ? [...result.snippets, newSnippet] : [newSnippet];
      chrome.storage.sync.set({ snippets: updatedSnippets });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <button className='md-btn' type="submit">Save Snippet</button>
      </div>
      
    </form>
  );
};
