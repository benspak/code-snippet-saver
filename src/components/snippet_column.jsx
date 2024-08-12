import React from "react"
import { SnippetForm } from "./snippet_form"
import { SnippetList } from "./snippet_list"

export const SnippetColumn = () => {
    return (
        <>
            <SnippetForm></SnippetForm>
            <div><h1>Your Snippets</h1></div>
            <SnippetList></SnippetList>
        </>
    )
}