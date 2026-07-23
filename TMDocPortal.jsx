import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL  = "https://rukjeevvglztxaydhcyr.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a2plZXZ2Z2x6dHhheWRoY3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTA1MDEsImV4cCI6MjA5NTYyNjUwMX0.crHJSqyToPRcGaH2yOYs1BshIS8Ns-7KPVOXdxvhDmM";
const ADMIN_PASS    = "LTM@HR2026";

// ─── Brand ────────────────────────────────────────────────────────────────────
const L = {
  purple: "#6B2B82", purpleDk: "#4a1a5e", purpleLt: "#f3e8ff",
  pink:   "#D4198C", pinkDk:   "#a8126e", pinkLt:   "#fce7f3",
  orange: "#EB754F",
  bg:     "#faf8ff", white: "#ffffff",
  dark:   "#1a1a1a", gray: "#6b7280",
  border: "#e8e0f0", borderDk: "#d8c8ec",
  textPri:"#1a1a1a", textSec:"#6b7280", textMute:"#9ca3af",
  green:  "#16a34a", greenLt: "#dcfce7",
  surface:"#ffffff",
};
const GRAD = `linear-gradient(135deg,${L.purple},${L.pink})`;

// ─── SDK ──────────────────────────────────────────────────────────────────────
const _sbClientLTM = createClient(SUPABASE_URL, SUPABASE_ANON);
const getSB = () => Promise.resolve(_sbClientLTM);

const fmtDate = d => d ? new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}) : "—";
const daysLeft = d => d ? Math.max(0,Math.ceil((new Date(d)-new Date())/86400000)) : null;

const useIsDesktop = () => {
  const[d,setD]=useState(()=>typeof window!=="undefined"?window.innerWidth>=900:true);
  useEffect(()=>{let t;const fn=()=>{clearTimeout(t);t=setTimeout(()=>setD(window.innerWidth>=900),150);};window.addEventListener("resize",fn);return()=>{window.removeEventListener("resize",fn);clearTimeout(t);};},[]);
  return d;
};

const CSS = () => {
  const done = useRef(false);
  if (!done.current && typeof document !== "undefined") {
    done.current = true;
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:#faf8ff;font-family:'Inter',sans-serif;}
      input,button,select,textarea{font-family:'Inter',sans-serif;}
      ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:#e0d8f0;border-radius:3px;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} .fu{animation:fadeUp 0.4s ease both;}
      @keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin 0.85s linear infinite;display:inline-block;}
      @keyframes pop{from{transform:scale(0.6);opacity:0}to{transform:scale(1);opacity:1}}
      .ltm-input{width:100%;background:#fff;border:1.5px solid #e8e0f0;border-radius:8px;padding:12px 14px;font-size:14px;color:#1a1a1a;outline:none;transition:all 0.2s;}
      .ltm-input:focus{border-color:#D4198C;box-shadow:0 0 0 3px rgba(212,25,140,0.1);}
      .ltm-input::placeholder{color:#9ca3af;}
    `;
    document.head.appendChild(el);
  }
  return null;
};

const LTMLogo = ({ h = 30 }) => (
  <svg height={h} viewBox="0 0 200 50" fill="none">
    <defs><linearGradient id="ltmg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6B2B82"/><stop offset="55%" stopColor="#D4198C"/><stop offset="100%" stopColor="#EB754F"/></linearGradient></defs>
    <text x="0" y="36" fontFamily="Arial Black,Arial,sans-serif" fontSize="38" fontWeight="900" fill="url(#ltmg2)" letterSpacing="-1">LTM</text>
    <rect x="1" y="41" width="110" height="2.5" rx="1.25" fill="url(#ltmg2)" opacity="0.55"/>
    <text x="2" y="50" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="400" fill="#9ca3af" letterSpacing="3.5">OUTCREATE</text>
  </svg>
);

const Btn = ({ children, onClick, loading, full, ghost, sm, danger, disabled }) => (
  <button onClick={onClick} disabled={loading||disabled} style={{
    width:full?"100%":"auto", padding:sm?"8px 16px":"12px 24px", borderRadius:8,
    fontSize:sm?13:14, fontWeight:600,
    background:ghost?"transparent":danger?"#fff5f5":disabled||loading?"#f0f0f0":L.pink,
    border:ghost?`1.5px solid ${L.border}`:danger?`1.5px solid #fecaca`:"none",
    color:ghost?L.textSec:danger?"#dc2626":disabled||loading?L.textMute:"#fff",
    cursor:disabled||loading?"not-allowed":"pointer",
    boxShadow:ghost||disabled||loading||danger?"none":"0 2px 10px rgba(212,25,140,0.25)",
    display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s",
    touchAction:"manipulation",
  }}
    onMouseEnter={e=>{if(!ghost&&!disabled&&!loading&&!danger){e.currentTarget.style.background=L.pinkDk;e.currentTarget.style.transform="translateY(-1px)";}}}
    onMouseLeave={e=>{if(!ghost&&!disabled&&!loading&&!danger){e.currentTarget.style.background=L.pink;e.currentTarget.style.transform="translateY(0)";}}}
  >
    {loading?<><svg className="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/></svg>Please wait…</>:children}
  </button>
);

const Field = ({ label, type="text", placeholder, value, onChange, error }) => (
  <div>
    <label style={{display:"block",fontSize:11,fontWeight:600,color:L.textSec,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="ltm-input"/>
    {error&&<p style={{color:L.pink,fontSize:12,marginTop:5}}>⚠ {error}</p>}
  </div>
);

// ─── Timeline ─────────────────────────────────────────────────────────────────
const OfferTimeline = ({ offer }) => {
  const steps = [
    { label:"Offer Issued",     date:offer.uploaded_at,  done:true  },
    { label:"Candidate Viewed", date:offer.uploaded_at,  done:true  },
    { label:"Offer Accepted",   date:offer.status==="accepted"?new Date().toISOString():null, done:offer.status==="accepted" },
    { label:"Joining Date",     date:offer.joining_date, done:false  },
  ];
  return (
    <div style={{padding:"20px 24px"}}>
      <p style={{fontSize:11,fontWeight:600,color:L.textSec,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:16}}>Offer Timeline</p>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:s.done?L.pink:L.border,border:`2px solid ${s.done?L.pink:L.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:700,transition:"all 0.3s"}}>
              {s.done?"✓":i+1}
            </div>
            {i<steps.length-1&&<div style={{width:2,height:24,background:s.done?`${L.pink}44`:L.border,margin:"3px 0"}}/>}
          </div>
          <div style={{paddingTop:4,paddingBottom:i<steps.length-1?16:0}}>
            <p style={{fontSize:13,fontWeight:600,color:s.done?L.dark:L.textMute}}>{s.label}</p>
            {s.date&&<p style={{fontSize:11,color:L.textMute,marginTop:2}}>{fmtDate(s.date)}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Joining Checklist ────────────────────────────────────────────────────────
const JoiningChecklist = () => {
  const [checked, setChecked] = useState({});
  const items = [
    "Submit all onboarding documents",
    "Complete background verification",
    "Set up company email account",
    "Complete mandatory training modules",
    "Collect laptop and access card",
    "Join the LTM onboarding group",
  ];
  const toggle = i => setChecked(p => ({ ...p, [i]: !p[i] }));
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{padding:"20px 24px",borderTop:`1px solid ${L.border}`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <p style={{fontSize:11,fontWeight:600,color:L.textSec,textTransform:"uppercase",letterSpacing:"0.08em"}}>Joining Checklist</p>
        <span style={{fontSize:11,color:L.pink,fontWeight:600}}>{done}/{items.length}</span>
      </div>
      <div style={{height:4,background:L.border,borderRadius:2,marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,width:`${(done/items.length)*100}%`,background:GRAD,transition:"width 0.4s"}}/>
      </div>
      {items.map((item,i)=>(
        <div key={i} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",cursor:"pointer",borderBottom:i<items.length-1?`1px solid ${L.border}`:"none"}}>
          <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${checked[i]?L.pink:L.border}`,background:checked[i]?L.pink:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}>
            {checked[i]&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}
          </div>
          <span style={{fontSize:13,color:checked[i]?L.textMute:L.dark,textDecoration:checked[i]?"line-through":"none",transition:"all 0.2s"}}>{item}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Accept/Decline Modal ─────────────────────────────────────────────────────
const AcceptDeclineModal = ({ offer, onClose, onUpdate }) => {
  const [action, setAction] = useState(null); // "accept" | "decline"
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  const confirm = async () => {
    setSaving(true);
    try {
      const db = await getSB();
      await db.from("offer_letters").update({ status: action === "accept" ? "accepted" : "declined" }).eq("id", offer.id);
      onUpdate(action === "accept" ? "accepted" : "declined");
      onClose();
    } catch(e) { console.error(e); }
    setSaving(false);
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="fu" style={{background:L.white,borderRadius:16,border:`1px solid ${L.border}`,padding:28,width:"100%",maxWidth:400,boxShadow:"0 20px 60px rgba(107,43,130,0.2)"}}>
        <h3 style={{fontSize:17,fontWeight:700,marginBottom:6}}>Respond to Offer</h3>
        <p style={{fontSize:13,color:L.textSec,marginBottom:20}}>Please confirm your response for the offer from LTM.</p>

        {!action ? (
          <div style={{display:"flex",gap:10}}>
            <Btn full onClick={()=>setAction("accept")}>✅ Accept Offer</Btn>
            <Btn full ghost danger onClick={()=>setAction("decline")}>❌ Decline</Btn>
          </div>
        ) : (
          <div>
            <div style={{padding:"12px 16px",background:action==="accept"?L.greenLt:L.pinkLt,border:`1px solid ${action==="accept"?"#bbf7d0":"#fecdd3"}`,borderRadius:8,marginBottom:16,fontSize:13,color:action==="accept"?L.green:"#dc2626"}}>
              You are about to <strong>{action}</strong> this offer from LTM.
            </div>
            {action==="decline"&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:600,color:L.textSec,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:6}}>Reason (optional)</label>
                <textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Please share your reason for declining..."
                  style={{width:"100%",background:"#fff",border:`1.5px solid ${L.border}`,borderRadius:8,padding:"10px 12px",fontSize:13,color:L.dark,outline:"none",resize:"vertical",minHeight:80,fontFamily:"'Inter',sans-serif"}}/>
              </div>
            )}
            <div style={{display:"flex",gap:10}}>
              <Btn onClick={()=>setAction(null)} ghost sm>← Back</Btn>
              <div style={{flex:1}}><Btn full onClick={confirm} loading={saving}>Confirm {action==="accept"?"Acceptance":"Decline"}</Btn></div>
            </div>
          </div>
        )}
        <button onClick={onClose} style={{display:"block",margin:"14px auto 0",background:"none",border:"none",color:L.textMute,cursor:"pointer",fontSize:12}}>Cancel</button>
      </div>
    </div>
  );
};

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const AdminPanel = ({ onBack }) => {
  const [pass, setPass]     = useState("");
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr]= useState("");
  const [form, setForm]     = useState({name:"",email:"",phone:"",dob:"",jobTitle:"",joiningDate:""});
  const [file, setFile]     = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState("");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading]= useState(false);
  const fileRef = useRef();

  const login = () => {
    if (pass === ADMIN_PASS) { setAuthed(true); loadOffers(); }
    else setAuthErr("Incorrect password");
  };

  const loadOffers = async () => {
    setLoading(true);
    try {
      const db = await getSB();
      const { data } = await db.from("offer_letters").select("*").eq("company","LTM").order("uploaded_at",{ascending:false});
      setOffers(data || []);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!form.name||!form.email||!form.phone||!form.dob||!form.jobTitle) { setMsg("⚠ Fill all required fields"); return; }
    if (!file) { setMsg("⚠ Please select a PDF file"); return; }
    setSaving(true); setMsg("");
    try {
      const db = await getSB();
      const path = `ltm/${form.email.replace(/[^a-z0-9]/gi,"_")}_${Date.now()}.pdf`;
      const { error:ue } = await db.storage.from("offer-letters").upload(path, file, { upsert:true });
      if (ue) throw ue;
      const { error:ie } = await db.from("offer_letters").upsert({
        candidate_name:  form.name,
        candidate_email: form.email.toLowerCase().trim(),
        candidate_phone: form.phone,
        candidate_dob:   form.dob,
        job_title:       form.jobTitle,
        joining_date:    form.joiningDate||null,
        company:         "LTM",
        file_path:       path,
        file_name:       file.name,
        status:          "pending",
        download_count:  0,
        uploaded_at:     new Date().toISOString(),
      },{onConflict:"candidate_email,company"});
      if (ie) throw ie;
      setMsg("✅ Offer letter uploaded!");
      setForm({name:"",email:"",phone:"",dob:"",jobTitle:"",joiningDate:""});
      setFile(null); loadOffers();
    } catch(e) { setMsg("❌ Failed: "+(e.message||"Unknown error")); }
    setSaving(false);
  };

  if (!authed) return (
    <div style={{minHeight:"100vh",background:L.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <CSS/>
      <div style={{background:L.white,borderRadius:16,border:`1px solid ${L.border}`,padding:36,width:"100%",maxWidth:380,boxShadow:"0 8px 32px rgba(107,43,130,0.12)"}}>
        <div style={{height:4,background:GRAD,borderRadius:"4px 4px 0 0",margin:"-36px -36px 28px"}}/>
        <LTMLogo h={28}/>
        <h2 style={{fontSize:18,fontWeight:700,margin:"20px 0 6px"}}>HR Admin Access</h2>
        <p style={{color:L.textSec,fontSize:13,marginBottom:24}}>Manage LTM offer letters.</p>
        <input type="password" placeholder="Admin password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} className="ltm-input" style={{marginBottom:8}}/>
        {authErr&&<p style={{color:L.pink,fontSize:12,marginBottom:8}}>⚠ {authErr}</p>}
        <Btn full onClick={login}>Login to Admin</Btn>
        <button onClick={onBack} style={{display:"block",margin:"14px auto 0",background:"none",border:"none",color:L.textSec,cursor:"pointer",fontSize:13}}>← Back to Portal</button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:L.bg,fontFamily:"'Inter',sans-serif"}}>
      <CSS/>
      <header style={{background:L.white,borderBottom:`1px solid ${L.border}`,padding:"0 clamp(16px,4vw,48px)",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <LTMLogo h={26}/>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:11,fontWeight:700,color:L.pink,background:L.pinkLt,border:`1px solid ${L.pink}44`,borderRadius:6,padding:"3px 10px"}}>HR Admin</span>
          <button onClick={onBack} style={{background:"none",border:`1px solid ${L.border}`,borderRadius:6,padding:"6px 12px",fontSize:12,color:L.textSec,cursor:"pointer"}}>← Exit</button>
        </div>
      </header>
      <main style={{maxWidth:900,margin:"0 auto",padding:"32px clamp(16px,4vw,48px) 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,alignItems:"start"}}>
          <div style={{background:L.white,borderRadius:14,border:`1px solid ${L.border}`,overflow:"hidden"}}>
            <div style={{padding:"16px 22px",borderBottom:`1px solid ${L.border}`,background:L.purpleLt}}>
              <h3 style={{fontSize:15,fontWeight:700,color:L.purple}}>Upload Offer Letter</h3>
              <p style={{fontSize:12,color:L.textSec,marginTop:2}}>Add new candidate offer letter</p>
            </div>
            <div style={{padding:22,display:"flex",flexDirection:"column",gap:14}}>
              {[{label:"Full Name *",key:"name",type:"text",ph:"Candidate full name"},{label:"Email *",key:"email",type:"email",ph:"candidate@gmail.com"},{label:"Phone *",key:"phone",type:"tel",ph:"10-digit mobile"},{label:"Date of Birth *",key:"dob",type:"date",ph:""},{label:"Job Title *",key:"jobTitle",type:"text",ph:"e.g. Senior Consultant"},{label:"Joining Date",key:"joiningDate",type:"date",ph:""}].map(f=>(
                <div key={f.key}>
                  <label style={{fontSize:11,fontWeight:600,color:L.textSec,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:5}}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} className="ltm-input"/>
                </div>
              ))}
              <div>
                <label style={{fontSize:11,fontWeight:600,color:L.textSec,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:5}}>PDF File *</label>
                <div style={{border:`2px dashed ${file?L.green:L.border}`,borderRadius:8,padding:16,textAlign:"center",background:file?"#f0fdf4":"#fafafa",cursor:"pointer"}} onClick={()=>fileRef.current?.click()}>
                  <input ref={fileRef} type="file" accept=".pdf" style={{display:"none"}} onChange={e=>setFile(e.target.files?.[0]||null)}/>
                  {file?<p style={{fontSize:13,color:L.green,fontWeight:600}}>✓ {file.name}</p>:<p style={{fontSize:13,color:L.textSec}}>Click to select PDF</p>}
                </div>
              </div>
              {msg&&<p style={{fontSize:13,color:msg.startsWith("✅")?L.green:L.pink,padding:"10px 14px",background:msg.startsWith("✅")?"#f0fdf4":"#fff5f5",borderRadius:6,border:`1px solid ${msg.startsWith("✅")?"#bbf7d0":"#fecdd3"}`}}>{msg}</p>}
              <Btn full onClick={handleUpload} loading={saving}>Upload Offer Letter</Btn>
            </div>
          </div>
          <div style={{background:L.white,borderRadius:14,border:`1px solid ${L.border}`,overflow:"hidden"}}>
            <div style={{padding:"16px 22px",borderBottom:`1px solid ${L.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><h3 style={{fontSize:15,fontWeight:700}}>All Offers</h3><p style={{fontSize:12,color:L.textSec,marginTop:2}}>{offers.length} records</p></div>
              <button onClick={loadOffers} style={{background:"none",border:`1px solid ${L.border}`,borderRadius:6,padding:"6px 12px",fontSize:12,cursor:"pointer",color:L.textSec}}>↻</button>
            </div>
            <div style={{maxHeight:500,overflowY:"auto"}}>
              {loading?<div style={{padding:40,textAlign:"center",color:L.textMute}}>Loading…</div>:
              offers.length===0?<div style={{padding:40,textAlign:"center",color:L.textMute}}>No offers yet</div>:
              offers.map(o=>(
                <div key={o.id} style={{padding:"12px 22px",borderBottom:`1px solid ${L.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <div style={{minWidth:0}}>
                    <p style={{fontSize:13,fontWeight:600,color:L.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.candidate_name}</p>
                    <p style={{fontSize:11,color:L.textSec,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.candidate_email}</p>
                    <p style={{fontSize:11,color:L.textMute,marginTop:1}}>{o.job_title}</p>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:4,background:o.status==="accepted"?"#dcfce7":o.status==="declined"?"#fee2e2":"#f3e8ff",color:o.status==="accepted"?L.green:o.status==="declined"?"#dc2626":L.purple}}>{o.status}</span>
                    <p style={{fontSize:11,color:L.textMute,marginTop:3}}>↓ {o.download_count}×</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function LTMOfferPortal() {
  const isDesktop = useIsDesktop();
  const [screen, setScreen]     = useState(() => { if(typeof window !== "undefined" && window.location.search.includes("hr_access=true")) return "admin"; return "login"; });
  const [form, setForm]         = useState({ email:"", dob:"", phone:"" });
  const [errs, setErrs]         = useState({});
  const [loading, setLoading]   = useState(false);
  const [offer, setOffer]       = useState(null);
  const [loginErr, setLoginErr] = useState("");
  const [downloading, setDl]    = useState(false);
  const [showModal, setModal]   = useState(false);

  const setF = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleLogin = async () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.dob)   e.dob   = "Date of birth required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit mobile required";
    setErrs(e); if (Object.keys(e).length) return;
    setLoading(true); setLoginErr("");
    try {
      const db = await getSB();
      const { data, error } = await db.from("offer_letters").select("*")
        .eq("candidate_email", form.email.toLowerCase().trim())
        .eq("candidate_dob",   form.dob)
        .eq("candidate_phone", form.phone)
        .eq("company",         "LTM")
        .single();
      if (error || !data) setLoginErr("No offer found. Please check your details or contact HR.");
      else { setOffer(data); setScreen("offer"); }
    } catch(err) { setLoginErr("Connection error. Please try again."); }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!offer?.file_path) return;
    setDl(true);
    try {
      const db = await getSB();
      const { data } = await db.storage.from("offer-letters").createSignedUrl(offer.file_path, 60);
      if (data?.signedUrl) {
        const a = document.createElement("a"); a.href = data.signedUrl; a.download = offer.file_name || "offer-letter.pdf"; a.click();
        await db.from("offer_letters").update({ download_count: (offer.download_count||0)+1 }).eq("id", offer.id);
        setOffer(p => ({ ...p, download_count: (p.download_count||0)+1 }));
      }
    } catch(e) { alert("Download failed. Please try again."); }
    setDl(false);
  };

  if (screen === "admin") return <AdminPanel onBack={() => setScreen("login")}/>;

  return (
    <div style={{ minHeight:"100vh", background:L.bg, fontFamily:"'Inter',sans-serif", color:L.textPri }}>
      <CSS/>
      {showModal && <AcceptDeclineModal offer={offer} onClose={()=>setModal(false)} onUpdate={status=>setOffer(p=>({...p,status}))}/>}

      <header style={{ background:L.white, borderBottom:`1px solid ${L.border}`, padding:"0 clamp(16px,4vw,40px)", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 4px rgba(107,43,130,0.08)" }}>
        <LTMLogo h={isDesktop?28:22}/>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {screen==="offer"&&<button onClick={()=>{setScreen("login");setOffer(null);setForm({email:"",dob:"",phone:""});}} style={{background:"none",border:`1px solid ${L.border}`,borderRadius:6,padding:"6px 12px",fontSize:12,color:L.textSec,cursor:"pointer"}}>Sign Out</button>}

        </div>
      </header>

      <main style={{ maxWidth: screen==="offer"?1000:440, margin:"0 auto", padding:"clamp(28px,5vw,56px) clamp(16px,4vw,40px) 80px" }}>

        {screen === "login" && (
          <div className="fu">
            <div style={{textAlign:"center",marginBottom:32}}>
              <div style={{width:64,height:64,borderRadius:16,background:L.purpleLt,border:`1px solid ${L.purple}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>📩</div>
              <h1 style={{fontSize:24,fontWeight:700,marginBottom:6}}>Offer Letter Portal</h1>
              <p style={{color:L.textSec,fontSize:14,lineHeight:1.6}}>Access your LTM offer letter securely.</p>
            </div>
            <div style={{background:L.white,borderRadius:14,border:`1px solid ${L.border}`,padding:28,boxShadow:"0 4px 20px rgba(107,43,130,0.08)"}}>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <Field label="Registered Email *" type="email" placeholder="your@gmail.com" value={form.email} onChange={setF("email")} error={errs.email}/>
                <Field label="Date of Birth *" type="date" placeholder="" value={form.dob} onChange={setF("dob")} error={errs.dob}/>
                <Field label="Mobile Number *" type="tel" placeholder="10-digit number" value={form.phone} onChange={setF("phone")} error={errs.phone}/>
              </div>
              {loginErr&&<div style={{marginTop:16,padding:"12px 14px",background:L.pinkLt,border:`1px solid ${L.pink}44`,borderRadius:8,fontSize:13,color:L.pink}}>⚠ {loginErr}</div>}
              <div style={{marginTop:20}}><Btn full onClick={handleLogin} loading={loading}>Access My Offer Letter →</Btn></div>
            </div>
            <p style={{textAlign:"center",fontSize:12,color:L.textMute,marginTop:16}}>🔒 Secured by LTM People & Culture</p>
          </div>
        )}

        {screen === "offer" && offer && (
          <div className="fu">
            {/* Split layout on desktop */}
            {isDesktop ? (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24, alignItems:"start" }}>
                {/* Left — main offer info */}
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {/* Greeting */}
                  <div style={{ background:L.white, borderRadius:14, border:`1px solid ${L.border}`, overflow:"hidden" }}>
                    <div style={{ height:5, background:GRAD }}/>
                    <div style={{ padding:"22px 26px" }}>
                      <p style={{ fontSize:12, color:L.textSec, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Offer Letter</p>
                      <h2 style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>{offer.candidate_name}</h2>
                      <p style={{ fontSize:14, color:L.textSec, marginBottom:16 }}>{offer.job_title}</p>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px", marginBottom:20 }}>
                        {[{l:"Email",v:offer.candidate_email},{l:"Phone",v:offer.candidate_phone},{l:"Joining Date",v:fmtDate(offer.joining_date)},{l:"Downloads",v:`${offer.download_count} time${offer.download_count!==1?"s":""}`}].map((f,i)=>(
                          <div key={i}><p style={{fontSize:11,fontWeight:600,color:L.textMute,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:2}}>{f.l}</p><p style={{fontSize:13,color:L.dark,fontWeight:500}}>{f.v}</p></div>
                        ))}
                      </div>
                      {/* Status badge */}
                      <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20, background:offer.status==="accepted"?L.greenLt:offer.status==="declined"?"#fee2e2":L.purpleLt, border:`1px solid ${offer.status==="accepted"?"#bbf7d0":offer.status==="declined"?"#fecaca":L.purple+"44"}` }}>
                        <span style={{ fontSize:13, fontWeight:600, color:offer.status==="accepted"?L.green:offer.status==="declined"?"#dc2626":L.purple }}>
                          {offer.status==="accepted"?"✅ Accepted":offer.status==="declined"?"❌ Declined":"⏳ Awaiting your response"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ background:L.white, borderRadius:14, border:`1px solid ${L.border}`, padding:"20px 24px", display:"flex", gap:10, flexWrap:"wrap" }}>
                    <Btn onClick={handleDownload} loading={downloading}>⬇ Download PDF</Btn>
                    {offer.status==="pending"&&<Btn ghost onClick={()=>setModal(true)}>Respond to Offer</Btn>}
                  </div>
                </div>

                {/* Right sidebar */}
                <div style={{ background:L.white, borderRadius:14, border:`1px solid ${L.border}`, overflow:"hidden" }}>
                  <OfferTimeline offer={offer}/>
                  <JoiningChecklist/>
                </div>
              </div>
            ) : (
              /* Mobile layout */
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:L.white, borderRadius:14, border:`1px solid ${L.border}`, overflow:"hidden" }}>
                  <div style={{ height:4, background:GRAD }}/>
                  <div style={{ padding:"18px 20px" }}>
                    <h2 style={{ fontSize:20, fontWeight:700, marginBottom:3 }}>{offer.candidate_name}</h2>
                    <p style={{ fontSize:13, color:L.textSec, marginBottom:14 }}>{offer.job_title}</p>
                    <p style={{ fontSize:12, color:L.textSec }}>Joining: <strong style={{ color:L.dark }}>{fmtDate(offer.joining_date)}</strong></p>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <Btn full onClick={handleDownload} loading={downloading}>⬇ Download PDF</Btn>
                  {offer.status==="pending"&&<Btn ghost onClick={()=>setModal(true)}>Respond</Btn>}
                </div>
                <div style={{ background:L.white, borderRadius:14, border:`1px solid ${L.border}`, overflow:"hidden" }}>
                  <OfferTimeline offer={offer}/>
                  <JoiningChecklist/>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ borderTop:`1px solid ${L.border}`, padding:"16px 24px", textAlign:"center", fontSize:11, color:L.textMute, background:L.white }}>
        © {new Date().getFullYear()} LTM Limited · Confidential
      </footer>
    </div>
  );
}
