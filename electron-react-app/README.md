# Electron WebView OSC Trigger

This project enables remote interaction with a webpage loaded inside an Electron `<webview>` using OSC (Open Sound Control) messages. It allows triggering clicks on elements (e.g., buttons, links) by `id`, `class`, or visible text — and optionally scopes those actions to a specific parent container.

## 🧩 Architecture

- **Electron** — loads the target website into a `<webview>`.
- **React** — provides UI components (optional).
- **Preload script** — bridges the Electron backend with the DOM in the webview.
- **OSC server** — listens for incoming OSC messages and executes corresponding DOM actions.

## 📦 Installation

```bash
npm install
		
##💡 OSC Command Formats

OSC Address                            Example Action Description
/id/play-button                        Clicks the element with id="play-button"
/class/start-button                    Clicks all elements with class="start-button"
/text/all/Run                          Clicks all buttons with visible text Run
/all/text/Submit                       Same as above; both /text/all/... and /all/text/... are valid
/scoped/id/1234/text/Start             Clicks the Start button inside a container with id="1234"
/scoped/id/container123/class/action   Clicks all elements with .action class inside #container123

Development Notes
	•	All behavior is controlled via the generateScriptFromOSC() function.
	•	If no matching element is found, a warning is logged in the webview console.
	•	The scoped mode allows targeting elements only inside a specific parent container by its ID.
