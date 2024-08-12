import React from "react"
import { SnippetForm } from "./snippet_form"
import { SnippetList } from "./snippet_list"

export const SnippetColumn = () => {
    return (
        <>
            <SnippetForm></SnippetForm>
            <SnippetList></SnippetList>
        </>
    )
}