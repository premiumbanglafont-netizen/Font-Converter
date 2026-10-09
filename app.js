/*
 * Bangla Converter UI: ANSI V1 / V2 / V3
 *
 * TODO: Add the real converter mapping files later:
 *   converters/ansi-v1.js
 *   converters/ansi-v2.js
 *   converters/ansi-v3.js
 *
 * Each converter file should expose two functions for its version:
 *   window.BanglaConverters.v1.toAnsi(unicodeText)
 *   window.BanglaConverters.v1.toUnicode(ansiText)
 * Replace v1 with v2 or v3 in the relevant file.
 * Until these mappings are added, conversion buttons intentionally show a note
 * rather than returning fake or incorrect converted text.
 */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const unicode = $("unicodeText");
  const ansi = $("ansiText");
  const status = $("status");
  let version = "v1";

  const names = {v1:"ANSI V1",v2:"ANSI V2",v3:"ANSI V3"};
  function setStatus(message){ status.textContent = message; }
  function engine(){
    const root = window.BanglaConverters;
    return root && root[version] ? root[version] : null;
  }
  function convertToAnsi(){
    const e = engine();
    if (!e || typeof e.toAnsi !== "function") {
      setStatus(names[version] + " mapping এখনো যোগ করা হয়নি। converters/ansi-" + version + ".js ফাইলে আসল conversion code পরে যোগ করুন।");
      return;
    }
    try { ansi.value = e.toAnsi(unicode.value); setStatus(names[version] + " conversion complete."); }
    catch(err){ console.error(err); setStatus("Conversion error. Mapping code পরীক্ষা করুন।"); }
  }
  function convertToUnicode(){
    const e = engine();
    if (!e || typeof e.toUnicode !== "function") {
      setStatus(names[version] + " mapping এখনো যোগ করা হয়নি। converters/ansi-" + version + ".js ফাইলে আসল conversion code পরে যোগ করুন।");
      return;
    }
    try { unicode.value = e.toUnicode(ansi.value); setStatus(names[version] + " conversion complete."); }
    catch(err){ console.error(err); setStatus("Conversion error. Mapping code পরীক্ষা করুন।"); }
  }
  async function copyText(el,label){
    try { await navigator.clipboard.writeText(el.value); setStatus(label + " কপি হয়েছে।"); }
    catch { el.focus(); el.select(); setStatus("টেক্সট সিলেক্ট করা হয়েছে, Ctrl+C চাপুন।"); }
  }
  async function pasteText(el,label){
    try { el.value = await navigator.clipboard.readText(); setStatus(label + " পেস্ট হয়েছে।"); }
    catch { el.focus(); setStatus("Clipboard permission পাওয়া যায়নি। Ctrl+V ব্যবহার করুন।"); }
  }
  document.querySelectorAll(".version-tab").forEach(button => button.addEventListener("click", () => {
    version = button.dataset.version;
    document.querySelectorAll(".version-tab").forEach(b => b.classList.toggle("active", b === button));
    $("rightTitle").textContent = names[version];
    $("toAnsi").textContent = "Unicode → " + names[version];
    $("toUnicode").textContent = names[version] + " → Unicode";
    ansi.placeholder = "এখানে " + names[version] + " লিখুন";
    setStatus(names[version] + " নির্বাচিত। Mapping ফাইল পরে যোগ করতে পারবেন।");
  }));
  document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
    const action = button.dataset.action;
    const isLeft = action.endsWith("left");
    const field = isLeft ? unicode : ansi;
    const label = isLeft ? "Unicode" : names[version];
    if(action.startsWith("copy")) copyText(field,label);
    if(action.startsWith("paste")) pasteText(field,label);
    if(action.startsWith("clear")) { field.value=""; setStatus(label + " টেক্সট পরিষ্কার করা হয়েছে।"); field.focus(); }
  }));
  $("toAnsi").addEventListener("click", convertToAnsi);
  $("toUnicode").addEventListener("click", convertToUnicode);
})();