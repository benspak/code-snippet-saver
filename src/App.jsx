import React from "react";
import './styles.css'


function App() {
  document.addEventListener("DOMContentLoaded", () => {
    const snippetForm = document.getElementById("snippet-form");
    const snippetsContainer = document.getElementById("snippets-container");

    snippetForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const code = document.getElementById("code").value;

      saveSnippet(title, code);
      snippetForm.reset();
      displaySnippets();
    });

    function saveSnippet(title, code) {
      chrome.storage.sync.get({ snippets: [] }, (result) => {
        const snippets = result.snippets;
        snippets.push({ title, code });
        chrome.storage.sync.set({ snippets });
      });
    }

    function displaySnippets() {
      chrome.storage.sync.get({ snippets: [] }, (result) => {
        const snippets = result.snippets;
        snippetsContainer.innerHTML = "";

        snippets.forEach((snippet, index) => {
          const snippetElement = document.createElement("div");
          snippetElement.classList.add("snippet");
          snippetElement.innerHTML = `
            <h2>${snippet.title}</h2>
            <pre>${snippet.code}</pre>
            <button data-index="${index}" class="edit-button">Edit</button>
            <button data-index="${index}" class="copy-button">Copy</button>
            <button data-index="${index}" class="delete-button">Delete</button>
          `;

          snippetsContainer.appendChild(snippetElement);
        });

        document.querySelectorAll(".edit-button").forEach((button) => {
          button.addEventListener("click", handleEdit);
        });

        document.querySelectorAll(".copy-button").forEach((button) => {
          button.addEventListener("click", handleCopy);
        });

        document.querySelectorAll(".delete-button").forEach((button) => {
          button.addEventListener("click", handleDelete);
        });
      });
    }

    function handleEdit(event) {
      const index = event.target.dataset.index;
      chrome.storage.sync.get({ snippets: [] }, (result) => {
        const snippets = result.snippets;
        const snippet = snippets[index];
        document.getElementById("title").value = snippet.title;
        document.getElementById("code").value = snippet.code;

        snippets.splice(index, 1);
        chrome.storage.sync.set({ snippets });
      });
    }

    function handleCopy(event) {
      const index = event.target.dataset.index;
      chrome.storage.sync.get({ snippets: [] }, (result) => {
        const snippet = result.snippets[index];
        navigator.clipboard.writeText(snippet.code).then(() => {
          alert("Code copied to clipboard");
        });
      });
    }

    function handleDelete(event) {
      const index = event.target.dataset.index;
      chrome.storage.sync.get({ snippets: [] }, (result) => {
        const snippets = result.snippets;
        snippets.splice(index, 1);
        chrome.storage.sync.set({ snippets });
        displaySnippets();
      });
    }

    displaySnippets();
  });

  return (
    <>
      <h1>Code Snippet Saver</h1>
      <form id="snippet-form">
        <input type="text" id="title" placeholder="Snippet Title" required/>
        <textarea id="code" placeholder="Code Snippet" required></textarea>
        <button type="submit">Save Snippet</button>
      </form>
      <div id="snippets-container"></div>
    </>
  );
}

export default App;
