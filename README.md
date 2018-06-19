# DevTrigger
Easily trigger functions from Chrome DevTools.

**Use at own risk. Might not be super secure.**

## How to use
1. Install extention, see step 1, 2, 3 from: https://developer.chrome.com/extensions/getstarted#manifest
2. Add your things to `window.dt`, for example: `window.dt.someFunction = () => 'Hello world!'`
3. Open chrome devtools and go to `DevTrigger` tab where you will see your function(s), click on it to run it!
4. #win #greatsuccess

## Useful things (for chrome extension development)
- Great example of basic message sending (DevTrigger is based on this): https://github.com/psykhi/chrome-devtools-extension
- Extending DevTools Official Docs: https://developer.chrome.com/extensions/devtools
