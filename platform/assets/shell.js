/* ============================================================================
   ARMO Platform mockup — app shell (sidebar + topbar) injected into each page.
   Each page sets document.body.dataset.page + data-title; this wraps the body
   content with the chrome and marks the active nav item.
   Nav structure mirrors libs/.../main-side-nav-menu.config.ts
   ========================================================================== */
const ARMO_LOGO = `<svg viewBox="0 0 250 80" height="22" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M101.19,63.7h11.87a.81.81,0,0,0,.67-1.27L103.36,47.62a.48.48,0,0,1,.19-.71,14.29,14.29,0,0,0,5.79-4.8,15.26,15.26,0,0,0,2.43-8.85v-1a15.71,15.71,0,0,0-2.4-8.91,14.83,14.83,0,0,0-6.86-5.44A27.77,27.77,0,0,0,91.88,16H73.07a.81.81,0,0,0-.81.81V62.9a.8.8,0,0,0,.81.8H83.5a.81.81,0,0,0,.81-.8V50a.81.81,0,0,1,.81-.81h5.61a.79.79,0,0,1,.67.36l9.12,13.78A.79.79,0,0,0,101.19,63.7ZM84.31,27a.81.81,0,0,1,.81-.81H92.6a7.67,7.67,0,0,1,3.69.84,6,6,0,0,1,2.43,2.4,7.46,7.46,0,0,1,.87,3.69,7.33,7.33,0,0,1-.87,3.63,6.07,6.07,0,0,1-2.43,2.39,7.68,7.68,0,0,1-3.69.85H85.12a.81.81,0,0,1-.81-.81Z"/><path d="M158.11,16.42a.81.81,0,0,0-.75.52l-9.8,23.7a.32.32,0,0,1-.6,0l-9.86-23.7a.81.81,0,0,0-.76-.52H121a.81.81,0,0,0-.81.81V62.9a.8.8,0,0,0,.81.8h9.39a.81.81,0,0,0,.81-.8V31.05a.48.48,0,0,1,.93-.18l9.1,22.8a.8.8,0,0,0,.75.51h9.85a.8.8,0,0,0,.75-.51l9.16-23.09a.48.48,0,0,1,.93.18V62.9a.81.81,0,0,0,.81.8h10.3a.8.8,0,0,0,.81-.8V17.23a.81.81,0,0,0-.81-.81Z"/><path d="M207.36,65a26.48,26.48,0,0,1-11.27-2.23,23.52,23.52,0,0,1-8-5.9,25.19,25.19,0,0,1-4.73-7.93,24.09,24.09,0,0,1-1.55-8.29V39.22a24.69,24.69,0,0,1,1.61-8.77,23.5,23.5,0,0,1,12.86-13.38,30.32,30.32,0,0,1,22,0,23.49,23.49,0,0,1,8,5.57,24.43,24.43,0,0,1,6.54,16.58v1.43a23.7,23.7,0,0,1-1.59,8.29,25.47,25.47,0,0,1-4.76,7.93,23.52,23.52,0,0,1-8,5.9A26.29,26.29,0,0,1,207.36,65Zm0-11.27a14,14,0,0,0,5.57-1,12,12,0,0,0,4.21-2.91,12.74,12.74,0,0,0,2.66-4.37,15.83,15.83,0,0,0,.91-5.41,16.18,16.18,0,0,0-.94-5.63A12.34,12.34,0,0,0,217.08,30a11.84,11.84,0,0,0-4.21-2.79,14.86,14.86,0,0,0-5.51-1,15,15,0,0,0-5.57,1A11.84,11.84,0,0,0,197.58,30a12,12,0,0,0-2.65,4.34A16.42,16.42,0,0,0,194,40a15.59,15.59,0,0,0,.91,5.41,12.72,12.72,0,0,0,2.65,4.37,12.13,12.13,0,0,0,4.21,2.91A14.08,14.08,0,0,0,207.36,53.73Z"/><path d="M50.69,16.42H32.57a.8.8,0,0,0-.77.57L17.16,62.65a.8.8,0,0,0,.77,1.05h47.9a.81.81,0,0,0,.77-1.06L51.46,17A.82.82,0,0,0,50.69,16.42ZM32.19,52.81l8-26.1a.8.8,0,0,1,.77-.57h1.23a.8.8,0,0,1,.77.57l8.18,26.1a.81.81,0,0,1-.77,1H33A.81.81,0,0,1,32.19,52.81Z"/></svg>`;

function ic(p){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`; }
const ICONS = {
  dashboard: ic('<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'),
  inventory: ic('<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>'),
  risks: ic('<path d="M12 2l9 4v6c0 5-3.5 8.5-9 10C6.5 20.5 3 17 3 12V6l9-4z"/>'),
  attack: ic('<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>'),
  vuln: ic('<path d="M12 2v4M12 18v4M4 12H2M22 12h-2M6 6l-1.5-1.5M18 6l1.5-1.5"/><rect x="8" y="8" width="8" height="8" rx="2"/>'),
  compliance: ic('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
  network: ic('<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-5 6M12 11l5 6"/>'),
  seccomp: ic('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
  rbac: ic('<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M17 11l2 2 4-4"/>'),
  threat: ic('<path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z"/><circle cx="12" cy="12" r="2"/>'),
  repo: ic('<path d="M4 4v16a1 1 0 0 0 1 1h15"/><path d="M7 16l4-4 3 3 5-6"/>'),
  registry: ic('<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>'),
  accept: ic('<path d="M12 2l9 4v6c0 5-3.5 8.5-9 10C6.5 20.5 3 17 3 12V6l9-4z"/><path d="M9 12l2 2 4-4"/>'),
  rules: ic('<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="14" r="3"/>'),
  workflows: ic('<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>'),
  settings: ic('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.5L5 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z"/>'),
};

const NAV = [
  { items: [ {k:"dashboard", t:"Dashboard", href:"index.html", icon:"dashboard"} ] },
  { cat:"Visibility", items: [ {k:"inventory", t:"Inventory", href:"inventory.html", icon:"inventory"} ] },
  { cat:"Posture", items: [
      {k:"security-risks", t:"Security Risks", href:"security-risks.html", icon:"risks"},
      {k:"attack-path", t:"Attack Path", href:"attack-path.html", icon:"attack"},
      {k:"vulnerabilities", t:"Vulnerabilities", href:"vulnerabilities.html", icon:"vuln"},
      {k:"compliance", t:"Compliance", href:"compliance.html", icon:"compliance"},
      {k:"network-policies", t:"Network Policies", href:"network-policies.html", icon:"network"},
      {k:"seccomp", t:"Seccomp Profiles", href:"seccomp.html", icon:"seccomp"},
      {k:"rbac", t:"RBAC Insights", href:"rbac.html", icon:"rbac"},
  ]},
  { cat:"Threat Detection", items: [ {k:"runtime-incidents", t:"Runtime Incidents", href:"runtime-incidents.html", icon:"threat"} ] },
  { cat:"Code", items: [
      {k:"repository-scanning", t:"Repository Scanning", href:"repository-scanning.html", icon:"repo"},
      {k:"registry-scanning", t:"Registry Scanning", href:"registry-scanning.html", icon:"registry"},
  ]},
  { cat:"Policies", items: [
      {k:"risk-acceptance", t:"Risk Acceptance", href:"risk-acceptance.html", icon:"accept"},
      {k:"threat-detection-policies", t:"Threat Detection", href:"threat-detection-policies.html", icon:"rules"},
      {k:"workflows", t:"Workflows", href:"workflows.html", icon:"workflows"},
  ]},
];

(function buildShell(){
  const page = document.body.dataset.page || "dashboard";
  const title = document.body.dataset.title || "Dashboard";

  // move existing body content into a holder
  const content = document.createElement("div");
  while (document.body.firstChild) content.appendChild(document.body.firstChild);

  const navHtml = NAV.map(g => `
    ${g.cat ? `<div class="sb-cat">${g.cat}</div>` : ``}
    ${g.items.map(it => `<a class="sb-item ${it.k===page?'active':''}" href="${it.href}">${ICONS[it.icon]||''}<span>${it.t}</span></a>`).join("")}
  `).join("");

  document.body.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="sb-logo">${ARMO_LOGO}</div>
        <nav>${navHtml}</nav>
        <div class="sb-foot"><a class="sb-item ${page==='settings'?'active':''}" href="settings.html">${ICONS.settings}<span>Settings</span></a></div>
      </aside>
      <div class="main-wrap">
        <header class="topbar">
          <div class="crumbs">ARMO <span>›</span> <b>${title}</b></div>
          <div class="spacer"></div>
          <div class="tb-dd">
            <div class="tb-pill" id="clusterPill" onclick="toggleDD('clusterMenu',event)"><span id="clusterLabel">All clusters</span> ▾</div>
            <div class="dd-menu" id="clusterMenu"></div>
          </div>
          <div class="tb-dd">
            <div class="tb-pill" id="nsPill" onclick="toggleDD('nsMenu',event)"><span id="nsLabel">All namespaces</span> ▾</div>
            <div class="dd-menu" id="nsMenu"></div>
          </div>
          <div class="tb-dd search-wrap">
            <div class="tb-search">🔍<input id="globalSearch" placeholder="Search resources, CVEs, controls…" autocomplete="off" oninput="onSearch(this.value)" onfocus="onSearch(this.value)" onkeydown="searchKey(event)"></div>
            <div class="dd-menu" id="searchMenu"></div>
          </div>
          <div class="tb-pill">Last 7 days ▾</div>
          <div class="tb-ava">S</div>
        </header>
        <main class="main" id="main"></main>
      </div>
    </div>
    <div id="scrim" onclick="closeDrawer()"></div>
    <aside class="drawer" id="drawer"><div id="drawerContent"></div></aside>
    <div id="toast"></div>`;
  document.getElementById("main").appendChild(content);
})();

/* toast */
let _toastT=null;
function toast(msg){ const t=document.getElementById("toast"); t.innerHTML=`<span class="ok">✓</span>${msg}`; t.classList.add("show"); clearTimeout(_toastT); _toastT=setTimeout(()=>t.classList.remove("show"),2400); }
function go(href){ location.href = href; }

/* Shared 360° workload drawer — reachable from Inventory, Vulnerabilities,
   Security Risks, etc. The connective tissue that makes it feel like one product. */
function openWorkload(name){
  const w = (typeof WORKLOADS!=="undefined" && WORKLOADS.find(x=>x.name===name))
    || {name, kind:"Deployment", ns:"prod", cluster:"prod-eu-1", replicas:3, risk:"High", cves:16, runtime:true};
  const cvb = {Critical:Math.round(w.cves*0.12),High:Math.round(w.cves*0.28),Medium:Math.round(w.cves*0.4),Low:Math.round(w.cves*0.2)};
  const inc = (typeof INCIDENTS!=="undefined") ? INCIDENTS.find(i=>i.workload===name) : null;
  openDrawer(`
    <div class="drawer-head">
      <div><span class="sev ${w.risk}">${w.risk} risk</span><h2>${w.name}</h2>
        <div class="muted" style="margin-top:6px">${w.kind} · ${w.ns} · ${w.cluster} · ${w.replicas} replicas</div></div>
      <div class="x" onclick="closeDrawer()">✕</div>
    </div>
    <div class="drawer-body">
      <div class="grid cols-3">
        <div class="card kpi"><div class="kpi-label">Risk</div><div class="kpi-num" style="font-size:18px;margin-top:10px">${w.risk}</div></div>
        <div class="card kpi"><div class="kpi-label">CVEs</div><div class="kpi-num" style="font-size:24px">${w.cves}</div></div>
        <div class="card kpi"><div class="kpi-label">Runtime</div><div class="kpi-num" style="font-size:14px;margin-top:12px">${w.runtime?'<span class="pass">Monitored</span>':'<span class="muted">No sensor</span>'}</div></div>
      </div>

      <div class="section-label">Vulnerabilities</div>
      ${sevbar(cvb)}<div class="cellsub" style="margin-top:6px">${sevCounts(cvb)}</div>
      <div class="xref" onclick="go('vulnerabilities.html')"><div><div class="xref-t">View all CVEs</div><div class="xref-s">Image &amp; package breakdown</div></div><span class="arrow">›</span></div>

      <div class="section-label">Posture &amp; compliance</div>
      <div class="xref" onclick="go('compliance.html')"><div><div class="xref-t">4 failed controls</div><div class="xref-s">Non-root, resource limits, privilege escalation…</div></div><span class="arrow">›</span></div>
      <div class="xref" onclick="go('security-risks.html')"><div><div class="xref-t">Part of 3 security risks</div><div class="xref-s">incl. 1 Critical</div></div><span class="arrow">›</span></div>

      <div class="section-label">Attack path</div>
      <div class="xref" onclick="go('attack-path.html')"><div><div class="xref-t">Reachable from the internet</div><div class="xref-s">Internet → ${w.name} → secrets</div></div><span class="arrow">›</span></div>

      <div class="section-label">Runtime activity</div>
      ${inc ? `<div class="xref" onclick="go('runtime-incidents.html')"><div><div class="xref-t">${inc.name}</div><div class="xref-s">${CLASS_LABEL[inc.classification]} · ${inc.time}</div></div><span class="arrow">›</span></div>`
            : `<div class="muted" style="font-size:13px">No open runtime incidents.</div>`}

      <div style="display:flex;gap:8px;margin-top:20px">
        <button class="btn primary" onclick="toast('Ticket created for ${w.name}')">Create ticket</button>
        <button class="btn" onclick="toast('Risk accepted for ${w.name}')">Accept risk</button>
      </div>
    </div>`);
}

/* shared drawer (detail side panel) */
function openDrawer(html){
  document.getElementById("drawerContent").innerHTML = html;
  document.getElementById("drawer").classList.add("open");
  document.getElementById("scrim").classList.add("show");
}
function closeDrawer(){
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("scrim").classList.remove("show");
}
document.addEventListener("keydown", e => { if(e.key==="Escape"){ closeDrawer(); closeAllDD(); } });

/* ---------------- top-bar interactivity: cluster filter + global search ---------- */
function toggleDD(id, ev){ if(ev) ev.stopPropagation(); const m=document.getElementById(id); const open=m.classList.contains("open"); closeAllDD(); if(!open) m.classList.add("open"); }
function closeAllDD(){ document.querySelectorAll(".dd-menu").forEach(m=>m.classList.remove("open")); }
document.addEventListener("click", ()=>closeAllDD());

/* CLUSTER + NAMESPACE FILTERS — scope every cluster/ns-tagged page; persist across nav.
   Pages that recompute (dashboard) register window.onScopeChange(cluster, ns). */
const _CLUSTERS = (typeof CLUSTERS!=="undefined") ? CLUSTERS : ["prod-eu-1","prod-us-1","staging-eu-1","dev-1"];
const _NAMESPACES = (typeof NAMESPACES!=="undefined") ? NAMESPACES : ["prod","staging","kube-system","payments","auth","data","dev"];
let ACTIVE_CLUSTER = sessionStorage.getItem("armo_cluster") || "all";
let ACTIVE_NS = sessionStorage.getItem("armo_ns") || "all";

function _buildMenu(menuId, opts, active, allLabel, pick){
  document.getElementById(menuId).innerHTML =
    ["all", ...opts].map(o=>`<div class="dd-item ${o===active?'sel':''}" onclick="${pick}('${o}')">${o==="all"?allLabel:o}<span class="chk">✓</span></div>`).join("");
}
_buildMenu("clusterMenu", _CLUSTERS, ACTIVE_CLUSTER, "All clusters", "selectCluster");
_buildMenu("nsMenu", _NAMESPACES, ACTIVE_NS, "All namespaces", "selectNs");
function _setLabels(){
  document.getElementById("clusterLabel").textContent = ACTIVE_CLUSTER==="all" ? "All clusters" : ACTIVE_CLUSTER;
  document.getElementById("nsLabel").textContent = ACTIVE_NS==="all" ? "All namespaces" : ACTIVE_NS;
  document.getElementById("clusterPill").classList.toggle("on", ACTIVE_CLUSTER!=="all");
  document.getElementById("nsPill").classList.toggle("on", ACTIVE_NS!=="all");
}
_setLabels();
function selectCluster(c){ ACTIVE_CLUSTER=c; sessionStorage.setItem("armo_cluster",c); _refreshScope(c==="all"?"Showing all clusters":"Scoped to "+c); }
function selectNs(n){ ACTIVE_NS=n; sessionStorage.setItem("armo_ns",n); _refreshScope(n==="all"?"All namespaces":"Namespace: "+n); }
function _refreshScope(msg){
  _buildMenu("clusterMenu",_CLUSTERS,ACTIVE_CLUSTER,"All clusters","selectCluster");
  _buildMenu("nsMenu",_NAMESPACES,ACTIVE_NS,"All namespaces","selectNs");
  _setLabels(); closeAllDD(); applyScope(); toast(msg);
}
/* Hide rows that don't match the active cluster AND namespace. Rows missing a
   data-cluster/data-namespace attribute aren't constrained by that dimension. */
function applyScope(){
  document.querySelectorAll("#main tbody tr").forEach(tr=>{
    if(!tr.dataset.cluster && !tr.dataset.namespace) return;
    const cOk = ACTIVE_CLUSTER==="all" || !tr.dataset.cluster || tr.dataset.cluster===ACTIVE_CLUSTER;
    const nOk = ACTIVE_NS==="all" || !tr.dataset.namespace || tr.dataset.namespace===ACTIVE_NS;
    tr.style.display = (cOk && nOk) ? "" : "none";
  });
  if(typeof window.onScopeChange==="function") window.onScopeChange(ACTIVE_CLUSTER, ACTIVE_NS);
}
window.applyClusterFilter = applyScope;  // back-compat alias used by pages

/* GLOBAL SEARCH — unified index across datasets + pages; jumps to the entity */
function _idx(){
  const out=[];
  const push=(t,s,kind,href)=>out.push({t,s,kind,href,q:(t+" "+s).toLowerCase()});
  NAV.forEach(g=>g.items.forEach(it=>push(it.t,"Page","Page",it.href)));
  push("Settings","Page","Page","settings.html");
  if(typeof WORKLOADS!=="undefined") WORKLOADS.forEach(w=>push(w.name,`${w.kind} · ${w.ns} · ${w.cluster}`,"Workload",`inventory.html#workload=${encodeURIComponent(w.name)}`));
  if(typeof CVES!=="undefined") CVES.forEach(c=>push(c.id,`${c.pkg} ${c.version} · ${c.sev}`,"CVE","vulnerabilities.html"));
  if(typeof CONTROLS!=="undefined") CONTROLS.forEach(c=>push(c.name,`${c.id} · ${c.sev}`,"Control","compliance.html"));
  if(typeof SECURITY_RISKS!=="undefined") SECURITY_RISKS.forEach(r=>push(r.name,`${r.category} · ${r.sev}`,"Risk","security-risks.html"));
  if(typeof INCIDENTS!=="undefined") INCIDENTS.forEach(i=>push(i.name,`${CLASS_LABEL[i.classification]} · ${i.cluster}`,"Incident","runtime-incidents.html"));
  return out;
}
let _results=[], _active=-1;
function onSearch(v){
  const menu=document.getElementById("searchMenu"); v=(v||"").trim().toLowerCase();
  if(!v){ menu.classList.remove("open"); return; }
  closeAllDD();
  _results = _idx().filter(r=>r.q.includes(v)).slice(0,12); _active=-1;
  if(!_results.length){ menu.innerHTML=`<div class="sr-empty">No matches for “${v}”.</div>`; menu.classList.add("open"); return; }
  const groups={}; _results.forEach((r,i)=>{ (groups[r.kind]=groups[r.kind]||[]).push({...r,i}); });
  menu.innerHTML = Object.entries(groups).map(([k,list])=>`<div class="sr-group">${k}${k==="Page"?"":"s"}</div>`+
    list.map(r=>`<div class="sr-item" data-i="${r.i}" onclick="goResult(${r.i})"><div><div class="sr-t">${r.t}</div><div class="sr-s">${r.s}</div></div><span class="sr-kind">${r.kind}</span></div>`).join("")).join("");
  menu.classList.add("open");
}
function goResult(i){ const r=_results[i]; if(r) location.href=r.href; }
function searchKey(e){
  const items=[...document.querySelectorAll("#searchMenu .sr-item")];
  if(e.key==="ArrowDown"){ e.preventDefault(); _active=Math.min(_active+1,items.length-1); }
  else if(e.key==="ArrowUp"){ e.preventDefault(); _active=Math.max(_active-1,0); }
  else if(e.key==="Enter"){ if(_active>=0&&items[_active]) goResult(+items[_active].dataset.i); else if(items[0]) goResult(+items[0].dataset.i); return; }
  else return;
  items.forEach((el,idx)=>el.classList.toggle("active", idx===_active));
}

/* deep-link: open a workload drawer from search (e.g. inventory.html#workload=payments-api) */
window.addEventListener("load", ()=>{
  applyScope();
  const m=/#workload=([^&]+)/.exec(location.hash);
  if(m && typeof openWorkload==="function") setTimeout(()=>openWorkload(decodeURIComponent(m[1])), 150);
});
