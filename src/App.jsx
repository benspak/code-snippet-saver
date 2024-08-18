import React from "react";
import './App.css'
import { Header } from "./components/common/header";
import { SnippetColumn } from "./components/snippet/snippet_column";


function App() {
  return (
    <>
      <Header/>
      <SnippetColumn/>
    </>
  );
}

export default App;
