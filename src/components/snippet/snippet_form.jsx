import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BubbleBackground } from '../common/bubble_background';
import './snippet.css';

export const SnippetForm = ({ initialValues = {}, onEditSubmit }) => {
	const { id: initialId, title: initialTitle = '', code: initialCode = '' } = initialValues;
	const [title, setTitle] = useState(initialTitle || '');
	const [code, setCode] = useState(initialCode || '');

	const saveSnippet = () => {
		const id = initialId || uuidv4();
		const newSnippet = { id, title, code };

		chrome.storage.sync.get(['snippets'], (result) => {
			const updatedSnippets = initialId
				? result.snippets.map((snippet) => (snippet.id === initialId ? newSnippet : snippet))
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

	const handleLink = (e) => {
		e.preventDefault();
		chrome.tabs.update({
			url: 'https://popvia.com',
		});
	};

	return (
		<div className="snippet-form">
			{!onEditSubmit && <BubbleBackground />}
			<form onSubmit={handleSubmit}>
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
					/>
					<button className="md-btn" type="submit">
						{initialValues.id ? 'Update Snippet' : 'Save Snippet'}
					</button>
				</div>
				<div className="tm">
					<p>
						Made by{' '}
						<a onClick={handleLink} className="purple-txt">
							PopVia.com
						</a>
					</p>
				</div>
			</form>
		</div>
	);
};
