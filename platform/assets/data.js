/* ============================================================================
   ARMO Platform mockup — shared mock data + helpers (no backend).
   Vocabularies mirror the real product (severity / status / classification).
   ========================================================================== */
const SEV = ["Critical","High","Medium","Low","Negligible"];
const SEV_COLOR = { Critical:"#6b0047", High:"#e11900", Medium:"#fb9000", Low:"#b8930a", Negligible:"#0090ff", Unknown:"#A2A2A7" };

const CLUSTERS = ["prod-eu-1","prod-us-1","staging-eu-1","dev-1"];
const NAMESPACES = ["prod","staging","kube-system","payments","auth","data","dev"];

function sev(s){ return `<span class="sev ${s}">${s}</span>`; }
function sevbar(counts, order=SEV){
  const total = order.reduce((a,s)=>a+(counts[s]||0),0) || 1;
  return `<div class="sevbar">${order.filter(s=>counts[s]).map(s=>`<span style="flex:${counts[s]};background:${SEV_COLOR[s]}"></span>`).join("")}</div>`;
}
function sevCounts(c){ return SEV.filter(s=>c[s]).map(s=>`<span class="muted" style="margin-right:10px"><b style="color:${SEV_COLOR[s]}">${c[s]}</b> ${s}</span>`).join(""); }
function spark(vals, color="#2f6df6", h=44){
  const w=160, max=Math.max(...vals), min=Math.min(...vals), rng=(max-min)||1;
  const pts = vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-2-((v-min)/rng)*(h-6)}`).join(" ");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline fill="none" stroke="${color}" stroke-width="2.2" points="${pts}"/></svg>`;
}
function donut(segments){ // segments: [{label,value,color}]
  const total = segments.reduce((a,s)=>a+s.value,0)||1;
  let acc=0; const stops = segments.map(s=>{ const start=acc/total*360; acc+=s.value; const end=acc/total*360; return `${s.color} ${start}deg ${end}deg`; }).join(",");
  return `<div class="donut" style="background:conic-gradient(${stops})"><div class="hole"><div class="n">${total}</div><div class="l">total</div></div></div>`;
}
function legend(segments){ return `<div class="legend">${segments.map(s=>`<div class="it"><i style="background:${s.color}"></i>${s.label}<span class="v">${s.value}</span></div>`).join("")}</div>`; }
function hbars(items, color="#2f6df6"){ const max=Math.max(...items.map(i=>i.v))||1; return `<div class="hbars">${items.map(i=>`<div class="hbar"><span class="nm">${i.nm}</span><div class="track"><span style="width:${i.v/max*100}%;background:${i.color||color}"></span></div><span class="v">${i.v}</span></div>`).join("")}</div>`; }
function rnd(seed){ let x=Math.sin(seed)*10000; return x-Math.floor(x); }

/* ---------- Security risks (prioritized) ---------- */
// fields mirror the real security-risks list: severity, name, category, lastUpdated,
// new (resourcesDetectedLastChange), resolved, affected cluster/namespace/resource counts, tickets
const SECURITY_RISKS = [
  {id:"R-1", name:"Workload running as root with hostPath mount", category:"Configuration scanning", sev:"Critical", lastUpdated:"Jun 4, 2026", newC:4, resolvedC:1, clusters:2, namespaces:6, resources:42, tickets:0, smart:false, cluster:"prod-eu-1"},
  {id:"R-2", name:"Internet-exposed workload with a critical vulnerability", category:"Attack path", sev:"Critical", lastUpdated:"Jun 5, 2026", newC:1, resolvedC:0, clusters:1, namespaces:2, resources:7, tickets:1, smart:true, cluster:"prod-us-1"},
  {id:"R-3", name:"Privileged container without seccomp profile", category:"Configuration scanning", sev:"High", lastUpdated:"Jun 3, 2026", newC:0, resolvedC:3, clusters:1, namespaces:4, resources:23, tickets:0, smart:false, cluster:"prod-eu-1"},
  {id:"R-4", name:"Cluster-admin bound to a default service account", category:"RBAC", sev:"High", lastUpdated:"Jun 5, 2026", newC:2, resolvedC:0, clusters:1, namespaces:1, resources:5, tickets:0, smart:false, cluster:"prod-us-1"},
  {id:"R-5", name:"Image with a known-exploited vulnerability (KEV)", category:"Vulnerabilities", sev:"High", lastUpdated:"Jun 4, 2026", newC:5, resolvedC:2, clusters:1, namespaces:3, resources:14, tickets:1, smart:true, cluster:"staging-eu-1"},
  {id:"R-6", name:"Secrets mounted as environment variables", category:"Configuration scanning", sev:"Medium", lastUpdated:"Jun 1, 2026", newC:0, resolvedC:0, clusters:2, namespaces:5, resources:31, tickets:0, smart:false, cluster:"prod-eu-1"},
  {id:"R-7", name:"Workload without CPU/memory limits", category:"Configuration scanning", sev:"Medium", lastUpdated:"Jun 2, 2026", newC:8, resolvedC:0, clusters:3, namespaces:9, resources:88, tickets:0, smart:false, cluster:"dev-1"},
  {id:"R-8", name:"Anonymous access enabled on Kubelet", category:"Configuration scanning", sev:"Low", lastUpdated:"May 29, 2026", newC:0, resolvedC:0, clusters:1, namespaces:1, resources:3, tickets:0, smart:false, cluster:"staging-eu-1"},
];

/* ---------- Vulnerabilities ---------- */
const CVES = [
  {id:"CVE-2024-3094", sev:"Critical", cvss:10.0, pkg:"xz-utils", version:"5.6.1", fix:"5.6.2", images:6, workloads:9, kev:true, epss:0.94},
  {id:"CVE-2023-44487", sev:"High", cvss:7.5, pkg:"nginx", version:"1.25.1", fix:"1.25.3", images:12, workloads:21, kev:true, epss:0.71},
  {id:"CVE-2024-21626", sev:"Critical", cvss:8.6, pkg:"runc", version:"1.1.11", fix:"1.1.12", images:4, workloads:5, kev:false, epss:0.55},
  {id:"CVE-2023-4863", sev:"High", cvss:8.8, pkg:"libwebp", version:"1.2.4", fix:"1.3.2", images:18, workloads:33, kev:true, epss:0.62},
  {id:"CVE-2022-48174", sev:"Medium", cvss:6.5, pkg:"busybox", version:"1.35.0", fix:"1.36.1", images:9, workloads:11, kev:false, epss:0.12},
  {id:"CVE-2024-24790", sev:"Medium", cvss:5.9, pkg:"golang", version:"1.21.4", fix:"1.21.11", images:7, workloads:8, kev:false, epss:0.08},
  {id:"CVE-2023-29491", sev:"Low", cvss:3.1, pkg:"ncurses", version:"6.3", fix:"6.4", images:5, workloads:6, kev:false, epss:0.03},
];
const VULN_IMAGES = [
  {image:"payments-api", tag:"1.8.2", registry:"docker.io/armo", c:3,h:8,m:14,l:6, workloads:4, lastScan:"2h ago"},
  {image:"nginx", tag:"1.25.1", registry:"docker.io/library", c:1,h:5,m:9,l:11, workloads:21, lastScan:"5h ago"},
  {image:"auth-service", tag:"4.4", registry:"docker.io/armo", c:2,h:4,m:7,l:3, workloads:2, lastScan:"1h ago"},
  {image:"batch-worker", tag:"3.1", registry:"ghcr.io/armo", c:0,h:3,m:12,l:8, workloads:6, lastScan:"3h ago"},
  {image:"redis", tag:"7.2", registry:"docker.io/library", c:0,h:1,m:4,l:9, workloads:7, lastScan:"6h ago"},
  {image:"postgres", tag:"15", registry:"docker.io/library", c:0,h:2,m:6,l:14, workloads:3, lastScan:"4h ago"},
];
const VULN_WORKLOADS = [
  {name:"payments-api", kind:"Deployment", ns:"payments", cluster:"prod-eu-1", c:3,h:8,m:14,l:6, inUse:true},
  {name:"auth-service", kind:"Deployment", ns:"auth", cluster:"prod-us-1", c:2,h:4,m:7,l:3, inUse:true},
  {name:"edge-proxy", kind:"DaemonSet", ns:"prod", cluster:"prod-us-1", c:1,h:5,m:9,l:11, inUse:true},
  {name:"batch-worker", kind:"Deployment", ns:"data", cluster:"staging-eu-1", c:0,h:3,m:12,l:8, inUse:false},
  {name:"web-frontend", kind:"Deployment", ns:"prod", cluster:"prod-us-1", c:0,h:2,m:6,l:14, inUse:true},
];

/* ---------- Compliance ---------- */
const FRAMEWORKS = [
  {name:"NSA-CISA Kubernetes Hardening", score:78, controls:54, failed:12, sev:"High"},
  {name:"CIS Kubernetes Benchmark v1.10", score:64, controls:121, failed:31, sev:"High"},
  {name:"MITRE ATT&CK for Kubernetes", score:71, controls:46, failed:14, sev:"Medium"},
  {name:"SOC 2", score:88, controls:38, failed:5, sev:"Low"},
  {name:"PCI-DSS v4.0", score:59, controls:64, failed:22, sev:"High"},
];
const CONTROLS = [
  {id:"C-0013", name:"Non-root containers", sev:"High", failed:42, total:310, status:"fail"},
  {id:"C-0017", name:"Immutable container filesystem", sev:"Medium", failed:88, total:310, status:"fail"},
  {id:"C-0034", name:"Automatic mapping of service account", sev:"High", failed:17, total:120, status:"fail"},
  {id:"C-0009", name:"Resource limits", sev:"Medium", failed:130, total:310, status:"fail"},
  {id:"C-0016", name:"Allow privilege escalation", sev:"Critical", failed:9, total:310, status:"fail"},
  {id:"C-0260", name:"Missing network policy", sev:"Medium", failed:54, total:96, status:"fail"},
  {id:"C-0002", name:"Exec into container", sev:"Low", failed:0, total:310, status:"pass"},
];

/* ---------- Runtime incidents (desktop) ---------- */
const INCIDENTS = [
  {guid:"i1", name:"Reverse shell detected", sev:"Critical", classification:"ActiveThreat", status:"Open", cluster:"prod-eu-1", ns:"payments", workload:"payments-api", mitre:"Execution", time:"2m ago", response:"Pause", ticket:"JIRA-1423"},
  {guid:"i6", name:"Malware detected (Mirai variant)", sev:"Critical", classification:"ActiveThreat", status:"Open", cluster:"prod-us-1", ns:"prod", workload:"edge-proxy", mitre:"Execution", time:"7m ago", response:null, ticket:null},
  {guid:"i9", name:"AWS root login from new geo", sev:"Critical", classification:"ActiveThreat", status:"Open", cluster:"—", ns:"aws", workload:"console", mitre:"Initial Access", time:"25m ago", response:null, ticket:null},
  {guid:"i7", name:"Privilege escalation attempt", sev:"High", classification:"ActiveThreat", status:"Open", cluster:"prod-eu-1", ns:"auth", workload:"auth-service", mitre:"Privilege Escalation", time:"18m ago", response:null, ticket:null},
  {guid:"i3", name:"Suspicious binary execution", sev:"High", classification:"ReviewRequired", status:"Investigating", cluster:"staging-eu-1", ns:"staging", workload:"api-gateway", mitre:"Defense Evasion", time:"42m ago", response:null, ticket:"JIRA-1390"},
  {guid:"i4", name:"Unexpected outbound connection", sev:"High", classification:"UnsuccessfulAttack", status:"Open", cluster:"prod-us-1", ns:"prod", workload:"web-frontend", mitre:"Command & Control", time:"1h ago", response:"ApplyNetworkPolicy", ticket:null},
  {guid:"i11", name:"Anomalous Kubernetes API call", sev:"High", classification:"ReviewRequired", status:"Investigating", cluster:"prod-eu-1", ns:"kube-system", workload:"sa-token", mitre:"Discovery", time:"1h ago", response:null, ticket:null},
  {guid:"i5", name:"Sensitive file access /etc/shadow", sev:"Medium", classification:"ReviewRequired", status:"Open", cluster:"prod-eu-1", ns:"data", workload:"postgres", mitre:"Credential Access", time:"2h ago", response:null, ticket:null},
];
const CLASS_LABEL = { ActiveThreat:"Active threat", UnsuccessfulAttack:"Unsuccessful attack", ReviewRequired:"Review required", Informational:"Informational" };
const CLASS_COLOR = { ActiveThreat:"#e11900", UnsuccessfulAttack:"#fb9000", ReviewRequired:"#b8930a", Informational:"#0090ff" };
function clsf(c){ return `<span class="chip" style="color:${CLASS_COLOR[c]};background:${CLASS_COLOR[c]}1a"><span class="dot" style="background:${CLASS_COLOR[c]}"></span>${CLASS_LABEL[c]}</span>`; }

/* ---------- Inventory ---------- */
const WORKLOADS = [
  {name:"payments-api", kind:"Deployment", ns:"payments", cluster:"prod-eu-1", replicas:6, risk:"Critical", cves:31, runtime:true, riskFactors:["Internet facing","Secret access","Privileged"], status:"Completed"},
  {name:"auth-service", kind:"Deployment", ns:"auth", cluster:"prod-us-1", replicas:4, risk:"High", cves:16, runtime:true, riskFactors:["External facing","Secret access"], status:"Completed"},
  {name:"web-frontend", kind:"Deployment", ns:"prod", cluster:"prod-us-1", replicas:8, risk:"Medium", cves:22, runtime:true, riskFactors:["Internet facing"], status:"Learning", learn:64},
  {name:"edge-proxy", kind:"DaemonSet", ns:"prod", cluster:"prod-us-1", replicas:12, risk:"High", cves:26, runtime:true, riskFactors:["Host access","Privileged"], status:"Partial"},
  {name:"batch-worker", kind:"Deployment", ns:"data", cluster:"staging-eu-1", replicas:3, risk:"Medium", cves:23, runtime:false, riskFactors:["Data access"], status:"Missing"},
  {name:"postgres", kind:"StatefulSet", ns:"data", cluster:"prod-eu-1", replicas:3, risk:"Low", cves:22, runtime:true, riskFactors:["Data access","Secret access"], status:"Completed"},
  {name:"redis", kind:"StatefulSet", ns:"data", cluster:"prod-eu-1", replicas:3, risk:"Low", cves:14, runtime:true, riskFactors:[], status:"Learning", learn:88},
];
const KIND_ABBR = { Deployment:"De", DaemonSet:"DS", StatefulSet:"SS", Pod:"Po", Job:"Jo", CronJob:"CJ", ReplicaSet:"RS" };

/* helper to build a table */
function table(headers, rows){
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${headers.map(h=>`<th class="${h.cls||''}">${h.t}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
