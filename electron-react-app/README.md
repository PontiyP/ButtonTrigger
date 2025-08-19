# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration


## 💡 OSC Command Formats

| OSC Address                                      | Action Description |
|--------------------------------------------------|--------------------|
| `/id/play-button`                                | Click element with `id="play-button"` |
| `/class/start-button`                            | Click all elements with `class="start-button"` |
| `/text/all/Run` or `/all/text/Run`              | Click all elements with visible text "Run" |
| `/text/Run`                                      | Click the first element with text "Run" |
| `/scoped/id/1234/text/Start`                     | Click "Start" inside container `id="1234"` |
| `/scoped/id/1234/class/action`                   | Click all `.action` elements inside `#1234` |
| `/scoped/id/1234/inputName/seconds` + args: [60] | Set value `60` to `<input name="seconds">` inside `#1234` |
| `/inputName/seconds` + args: [60]                | Set value `60` to global `<input name="seconds">` |

## 🛠 Development Notes

- All behavior is defined in the `generateScriptFromOSC()` function.
- If no matching element is found, a warning is logged in the browser console.
- The `scoped` mode allows restricting actions to within a specific container (`id`).
- `inputName` commands support number fields and are compatible with React-like frameworks.
