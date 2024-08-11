import React, { useState, useEffect } from 'react';

export const SnippetForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const saveSnippet = () => {
    const newSnippet = { title, code };
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
      <button type="submit">Save Snippet</button>
    </form>
  );
};
