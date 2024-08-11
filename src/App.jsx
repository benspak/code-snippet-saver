import React, { useEffect }from "react";
import './styles.css'
import { Header } from "./components/header";
import { SnippetColumn } from "./components/snippet_column";


function App() {
  return (
    <>
      <Header/>
      <SnippetColumn/>
    </>
  );
}

export default App;
