import React from "react"
import { SnippetForm } from "./snippet_form"
import { SnippetList } from "./snippet_list"
import { Header } from "./header"

export const SnippetColumn = () => {
    return (
        <div className='snippet-column'>
            <SnippetForm></SnippetForm>
            <SnippetList></SnippetList>
        </div>
    )
}