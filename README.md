## Code Snippet Saver Tool

Help me create a chrome browser app that saves code snippets. Users supply a title and the code itself. The title of each will be clickable and allow the code snippets to be viewed, edited, copied, or deleted.

# How to use and load extension into Chrome

After cloning, please change directory into the code-snippet-saver directory with the command `cd code-snippet-saver`.
Then run the following commands: 
- `npm install`
- `npm run build`

This should create a `dist` (distribution) folder that contains the compiled code and bundled assets.

To load this extension into chrome navigate to `chrome://extensions/` and using the `Load Unpacked` option, select the newly generated `dist` folder.

# Making changes

After changes have been made, to reflect these changes, you must run `npm run build` again to update the `dist` folder. 

Currently, we are looking at this [vite plugin](https://crxjs.dev/vite-plugin/getting-started/react/dev-basics) that simplifies the process. 



