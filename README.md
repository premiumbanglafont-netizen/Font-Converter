# Bangla Converter (ANSI V1 / V2 / V3)

Responsive GitHub Pages UI based on the supplied screenshot.

## Files
- `index.html` — page structure
- `style.css` — responsive pink/orange design
- `app.js` — tabs, copy/paste/clear buttons, and conversion hooks
- `logo.png` — optional logo; add your logo file here
- `converters/ansi-v1.js` — placeholder for the V1 engine
- `converters/ansi-v2.js` — placeholder for the V2 engine
- `converters/ansi-v3.js` — placeholder for the V3 engine

## Important: mapping files are not included yet
The actual conversion engines have not been provided. The UI works, but conversion intentionally displays a note until you add each real mapping. This avoids pretending that the text converted correctly.

When you get the converter code, create the corresponding file and define:
```js
window.BanglaConverters = window.BanglaConverters || {};
window.BanglaConverters.v1 = {
  toAnsi(unicodeText) { /* return converted ANSI string */ },
  toUnicode(ansiText) { /* return converted Unicode string */ }
};
```
For V2/V3 use `v2`/`v3`. Then add script tags for the mapping files in `index.html` before `app.js`, for example:
```html
<script src="converters/ansi-v1.js"></script>
<script src="converters/ansi-v2.js"></script>
<script src="converters/ansi-v3.js"></script>
<script src="app.js"></script>
```

Upload the contents of this folder to the root of a GitHub repository and enable GitHub Pages in Settings → Pages.
