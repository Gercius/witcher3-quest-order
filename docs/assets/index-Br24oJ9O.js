(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();async function Q(){const t="data/quests.json";try{const o=await fetch(t);if(!o.ok)throw new Error(`Response status: ${o.status}`);return await o.json()}catch(o){console.error(o.message)}}function k(){const t=[];for(const o of E)t.push(document.querySelectorAll(`[data-id="${o}"]`));return t}function w(){for(const t of E){const o=h.getOne(t.toString()),r=o?JSON.parse(o):[],s=document.querySelector(`.quest[data-id="${t}"]`);if(!s){console.log("questRowEl not found!");return}const e=s.querySelector(".quest-completed input");e.checked=r.isCompleted}}const L=await Q(),p=L.map(t=>({id:t.id,name:t.questInfo.name,isCompleted:t.questInfo.isCompleted})),E=p.map(t=>t.id),h={init:()=>{const t=localStorage.getItem("0");if(!t&&t!=="Kaer Morhen (1)")for(const o of p)localStorage.setItem(o.id.toString(),JSON.stringify(o))},getOne:t=>localStorage.getItem(t.toString()),getAll:function(){let t=[];for(const o of E){const r=localStorage.getItem(o.toString()),s=r?JSON.parse(r):null;t.push(s)}return t},saveOne:function(t,o){const r=this.getOne(t);if(r){const s=JSON.parse(r);s.isCompleted=o,localStorage.setItem(t.toString(),JSON.stringify(s))}},saveAll:function(){const t=this.getAll();for(const o of t){const r=document.querySelector(`[data-id="${o.id}"] .quest-completed input`);o.isCompleted=r.checked,localStorage.setItem(o.id.toString(),JSON.stringify(o))}}};function v(){const t=document.querySelector(".menu-wrapper"),o=document.querySelector(".menu-button"),r=document.querySelectorAll(".menu-button img");if(!o||!t){console.error("menuButton or menuWrapper not found!");return}o.addEventListener("click",s);function s(){r.forEach(e=>{e.classList.toggle("hidden")}),t.classList.toggle("menu-show")}}const b={MQ:"Main Quest",SQ:"Side Quest",C:"Contract",TH:"Treasure Hunt","G&HP":"Gwent & The Heroes' Pursuit",SH:"Scavenger Hunt",CE:"Chance Encounter"};function I(){const t=document.querySelector("main table tbody");if(!t){console.error("Tbody not found!");return}const o=L;for(let s=0;s<o.length;s++){const e=o[s],n=document.createElement("tr");n.setAttribute("data-id",e.id.toString());const c=e.questInfo.type.split(" ")[0].toLowerCase();n.setAttribute("data-type",c),n.classList.add("quest"),(e.extraDetails.length<2||!e.extraDetails)&&n.classList.add("last-quest-row");const l=document.createElement("td");l.textContent=e.location,l.classList.add("location"),l.rowSpan=e.extraDetails.length||1,n.append(l);const a=document.createElement("td");a.classList.add("quest-name");for(const i in b)e.questInfo.type===b[i]&&(a.innerText+=`${i}
`);if(!e.questInfo.orderMatters){const i=document.createElement("img");i.src="imgs/kekw.jpg",a.appendChild(i)}const d=document.createElement("a");d.classList.add("quest-link"),d.textContent=e.questInfo.name,d.setAttribute("href",e.questInfo.hyperlink),d.setAttribute("target","_blank"),a.append(d),a.rowSpan=e.extraDetails.length||1,n.append(a);const u=document.createElement("td");u.classList.add("quest-completed");const f=document.createElement("input");if(f.type="checkbox",u.append(f),u.rowSpan=e.extraDetails.length||1,n.append(u),e.extraDetails.length){const i=r(e.extraDetails,!0);n.append(i)}if(t.append(n),e.extraDetails.length>1)for(let i=1;i<e.extraDetails.length;i++){const q=i===e.extraDetails.length-1,m=document.createElement("tr");m.setAttribute("data-id",s.toString());const y=r(e.extraDetails,!1,i);q&&m.classList.add("last-quest-row"),m.append(y),t.append(m)}}function r(s,e=!1,n=0){const c=document.createElement("td");if(c.classList.add("extra-detail"),s[e?0:n]?.hyperlink&&s[e?0:n].description){const l=document.createElement("a");l.classList.add("extra-detail-link"),l.textContent=s[e?0:n].description,l.setAttribute("href",s[e?0:n].hyperlink),l.setAttribute("target","_blank"),c.append(l)}else if(s[e?0:n]?.hyperlink&&!s[e?0:n].description){const l=document.createElement("a");l.classList.add("extra-detail-link"),l.textContent=s[e?0:n].hyperlink,l.setAttribute("href",s[e?0:n].hyperlink),l.setAttribute("target","_blank"),c.append(l)}else c.textContent=s[e?0:n]?.description;return c}}function O(){const t=document.querySelector("main"),o=document.querySelector(".theme-switch .switch-btn input"),r="preferred-theme";if(!t||!o){console.error("Main or toggleThemeButton not found!");return}const s=localStorage.getItem(r),e=window.matchMedia("(prefers-color-scheme: dark)").matches;s?(s==="dark"?t.classList.add("dark-theme"):t.classList.remove("dark-theme"),o.checked=s==="dark"):(e&&t.classList.add("dark-theme"),o.checked=e),o.addEventListener("click",n);function n(){if(!t||!o){console.error("Body or toggleThemeButton not found!");return}o.checked?(t.classList.add("dark-theme"),localStorage.setItem(r,"dark")):(t.classList.remove("dark-theme"),localStorage.setItem(r,"light"))}}function S(){const t=document.querySelector(".quest-count"),o=document.querySelector(".completed-percentage");if(!o||!t){console.error("completedHeaderEl or questCountEl not found!");return}const r=h.getAll(),s=r.length,e=r.filter(c=>c.isCompleted===!0).length,n=(e/s*100).toFixed(1);o.textContent=n,t.innerHTML=`${e}/${s}`}function x(){const t=document.querySelector(".hide-completed .switch-btn input");if(!t){console.error("hideQuestsBtn not found!");return}const o="hide-quests";let s=localStorage.getItem(o)==="true";t.checked=s,e(s),t.addEventListener("click",()=>{const n=t.checked;localStorage.setItem(o,`${n?"true":"false"}`),e(n)});function e(n){document.querySelectorAll("tbody .quest").forEach(l=>{const a=l.querySelector(".quest-completed input");if(!a){console.error("isCompletedEl not found!");return}const d=a.checked,u=l.dataset.id;document.querySelectorAll(`[data-id="${u}"]`).forEach(i=>{d&&i.classList.toggle("hidden-completed",n)})})}}function A(t,o){const r=document.querySelector(".hide-completed .switch-btn input");if(!r){console.error("hideQuestsBtn not found!");return}if(!r.checked)return;document.querySelectorAll(`[data-id="${t}"]`).forEach(e=>{o&&e.classList.toggle("hidden-completed")})}function B(){w(),S();const t=document.querySelector("table");if(!t){console.error("Table element not found!");return}t.addEventListener("click",o=>{const r=o.target;if(!r){console.error("Click event not working properly");return}if(r.matches(".quest-completed input")){const e=r.closest(".quest").dataset.id;if(typeof e!="string"){console.error("id must be string!");return}let n=r.checked;h.saveOne(e,n),S(),n&&A(e,n)}})}function M(){const t=document.querySelector(".quest-search input");if(!t){console.error("searchInput not found!");return}let o=[];t.addEventListener("focus",()=>{o=k()}),t.addEventListener("input",r=>{const e=r.target.value.toLowerCase();for(const n of o){const l=n[0].querySelector(".quest-name a").innerHTML.toLowerCase().includes(e);n.forEach(a=>{a.classList.toggle("hidden",!l)})}})}function N(){const t=document.querySelector(".filters button"),o=document.querySelector(".filter-options"),r=document.querySelectorAll(".filter-options li input");if(!t||!o||!r){console.error("filterBtn or filterOptionsEl or filterOptionsEls not found!");return}const s={main:!1,side:!1,contract:!1,treasure:!1,scavenger:!1,gwent:!1,chance:!1};let e=!1;t.addEventListener("click",()=>{o.classList.toggle("hidden")}),r.forEach(n=>{n.addEventListener("click",l=>{const a=l.target;c(a)});function c(l){const a=l.checked,d=n.name;d!=="completed"?s[d]=a:d==="completed"&&(e=!e);const u=k();for(const f of u){const i=f[0],q=i.dataset.type,m=i.querySelector(".quest-completed input");if(!m){console.log("isQuestCompleted element not found!");return}const y=m.checked,C=s[q],T=Object.values(s).includes(!0);if(!Object.values(s).includes(!0)&&!e){f.forEach(g=>{g.classList.remove("hidden-filtered","hidden-filtered-completed")});continue}for(const g of f)g.classList.toggle("hidden-filtered-completed",!y&&e),g.classList.toggle("hidden-filtered",!C&&T)}}})}(function(){h.init(),v(),I(),O(),B(),x(),M(),N()})();(()=>{const t=document.querySelector(".export-data-btn");if(!t){console.error("Export button not found!");return}t.addEventListener("click",()=>{if(window.confirm("Export quest data?")){const s=r();o(s,"quest-data.json")}});function o(s,e="file.txt"){const n=URL.createObjectURL(s),c=document.createElement("a");c.href=n,c.download=e,document.body.appendChild(c),c.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(c)}function r(){const s=h.getAll(),e=JSON.stringify(s,null,2);return new Blob([e],{type:"application/json"})}})();(()=>{const t=document.querySelector(".import-quest-data");if(!t){console.error("File input not found!");return}t.addEventListener("change",()=>{if(t.files&&t.files.length>0){const o=new FileReader;o.readAsText(t.files[0]),o.addEventListener("load",()=>{if(window.confirm("Import quest data?"))try{let r=function(n){for(let c=0;c<p.length;c++){if(p[c].name!==n[c].name||p[c].id!==n[c].id)throw console.log(c),console.log(p[c].name),console.log(n[c].name),new Error("Quest names or ids doesn't match");h.saveOne(n[c].id,n[c].isCompleted)}};const s=o.result;if(typeof s!="string")throw new Error("Invalid file content");const e=JSON.parse(s);r(e),w(),S()}catch(r){alert(`${r.message}, please import correct data!`)}else t.value=""})}})})();
