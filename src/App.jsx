import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B0F1A", surface: "#131929", card: "#1A2235", border: "#243048",
  green: "#25D366", blue: "#3B82F6", amber: "#F59E0B", red: "#EF4444",
  text: "#E8EDF7", muted: "#7B8FB0",
};

const INIT_STUDENTS = [
  { id:"2041", name:"Amara Osei", cls:"Grade 10B", status:"in", time:"07:52", phone:"233240000001" },
  { id:"2042", name:"Kwame Asante", cls:"Grade 11A", status:"late", time:"08:34", phone:"233240000002" },
  { id:"2043", name:"Fatima Al-Hassan", cls:"Grade 12A", status:"in", time:"07:48", phone:"233240000003" },
  { id:"2044", name:"Esi Mensah", cls:"Grade 10A", status:"absent", time:"—", phone:"233240000004" },
  { id:"2045", name:"Kofi Darkwa", cls:"Grade 11B", status:"in", time:"07:55", phone:"233240000005" },
];

const INIT_GRADES = [
  { name:"Grade 10A", total:34, present:31, late:2, absent:1 },
  { name:"Grade 10B", total:32, present:29, late:1, absent:2 },
  { name:"Grade 11A", total:35, present:30, late:3, absent:2 },
  { name:"Grade 11B", total:33, present:28, late:2, absent:3 },
  { name:"Grade 12A", total:32, present:32, late:0, absent:0 },
];

const INIT_ALERTS = [
  { id:1, icon:"🚨", level:"red", title:"Unauthorised exit — Gate B", meta:"08:23 AM · Student ID #2041", msg:"ALERT: Unauthorised exit at Gate B — Student #2041 at 08:23 AM." },
  { id:2, icon:"⚠️", level:"amber", title:"5 students absent — unnotified", meta:"08:45 AM · Grade 10B", msg:"ATTENDANCE ALERT: 5 students in Grade 10B are absent." },
];

const INIT_TIMELINE = [
  { time:"08:47", text:"Amara Osei checked in via QR scan", color: C.green },
  { time:"08:34", text:"Kwame Asante — late arrival recorded", color: C.amber },
];

function WAIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15..."/><path d="M12 0C5.373 0 0 5.373 0 12..."/></svg>;
}

function Toast({ msg, visible }) {
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, background:C.green, color:"#000",
      padding:"12px 20px", borderRadius:10, fontWeight:700, fontSize:".85rem",
      display: visible ? "flex" : "none", alignItems:"center", gap:8, zIndex:999
    }}>
      <WAIcon size={15}/> {msg}
    </div>
  );
}

function Badge({ status }) {
  const map = {
    in: { label:"Present", bg:"#0d2a18", color: C.green },
    late: { label:"Late", bg:"#2a2208", color: C.amber },
    absent: { label:"Absent", bg:"#1e1e2a", color: C.muted },
  };
  const s = map[status] || map.absent;
  return <span style={{ padding:"4px 10px", borderRadius:20, fontSize:".75rem", background:s.bg, color:s.color }}>{s.label}</span>;
}

export default function SASS() {
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [grades] = useState(INIT_GRADES);
  const [alerts] = useState(INIT_ALERTS);
  const [timeline] = useState(INIT_TIMELINE);
  const [tab, setTab] = useState("register");
  const [form, setForm] = useState({ id: "", name: "", cls: "", phone: "", status: "in" });
  const [search, setSearch] = useState("");
  const [clock, setClock] = useState("");
  const [toast, setToast] = useState({ msg: "", visible: false });

  const timerRef = useRef(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit", second:"2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showToast = (msg) => {
    setToast({ msg, visible: true });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(t => ({...t, visible:false})), 3000);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)
  );

  const present = students.filter(s => s.status === "in").length;
  const late = students.filter(s => s.status === "late").length;
  const absent = students.filter(s => s.status === "absent").length;

  const doCheckIn = () => {
    if (!form.name || !form.id) {
      showToast("Please fill Name and ID");
      return;
    }
    const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const newS = { ...form, time: form.status === "absent" ? "—" : now };
    setStudents(prev => [newS, ...prev]);
    showToast(`${form.name} recorded as ${form.status}`);
    setForm({ id:"", name:"", cls:"", phone:"", status:"in" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding:"16px 24px", background: C.surface, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ background: C.green, color:"#000", fontWeight:700, padding:"4px 9px", borderRadius:5 }}>SASS</div>
          <span style={{ fontWeight:700 }}>Smart Attendance & Safety System</span>
        </div>
        <div>LIVE • {clock}</div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
        {/* Stats */}
        <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
          <div style={{ background: C.card, padding:20, borderRadius:12, flex:1, minWidth:180 }}>
            <div style={{ color: C.muted }}>Present Today</div>
            <div style={{ fontSize:"2.2rem", color: C.green, fontWeight:700 }}>{present}</div>
          </div>
          <div style={{ background: C.card, padding:20, borderRadius:12, flex:1, minWidth:180 }}>
            <div style={{ color: C.muted }}>Late</div>
            <div style={{ fontSize:"2.2rem", color: C.amber, fontWeight:700 }}>{late}</div>
          </div>
          <div style={{ background: C.card, padding:20, borderRadius:12, flex:1, minWidth:180 }}>
            <div style={{ color: C.muted }}>Absent</div>
            <div style={{ fontSize:"2.2rem", color: C.red, fontWeight:700 }}>{absent}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
          {[
            { key:"register", label:"📋 Register" },
            { key:"alerts", label:"🚨 Alerts" },
            { key:"grades", label:"📊 By Grade" },
            { key:"checkin", label:"➕ Check-In" }
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding:"10px 20px", borderRadius:8, border:"none",
              background: tab === t.key ? C.blue : C.card,
              color: tab === t.key ? "#fff" : C.muted,
              cursor:"pointer", fontWeight:600
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Register Tab */}
        {tab === "register" && (
          <div style={{ background: C.card, borderRadius:14, padding:20, border:`1px solid ${C.border}` }}>
            <input
              type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%", padding:12, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, marginBottom:16, color:C.text }}
            />
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:`2px solid ${C.border}` }}>
                  <th style={{ textAlign:"left", padding:12 }}>Name & ID</th>
                  <th style={{ textAlign:"left", padding:12 }}>Class</th>
                  <th style={{ textAlign:"left", padding:12 }}>Time</th>
                  <th style={{ textAlign:"left", padding:12 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s.id} style={{ borderTop:`1px solid ${C.border}` }}>
                    <td style={{ padding:12 }}><strong>{s.name}</strong><br/><span style={{color:C.muted}}>ID #{s.id}</span></td>
                    <td style={{ padding:12 }}>{s.cls}</td>
                    <td style={{ padding:12 }}>{s.time}</td>
                    <td style={{ padding:12 }}><Badge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Alerts Tab */}
        {tab === "alerts" && (
          <div style={{ background: C.card, borderRadius:14, padding:20 }}>
            <h3>Safety & Attendance Alerts</h3>
            {alerts.map(a => (
              <div key={a.id} style={{ padding:"16px 0", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontSize:"1.1rem", marginBottom:4 }}>{a.icon} {a.title}</div>
                <div style={{ color: C.muted }}>{a.meta}</div>
              </div>
            ))}
            <div style={{ marginTop:20 }}>
              <h4>Recent Activity</h4>
              {timeline.map((t, i) => (
                <div key={i} style={{ padding:"8px 0", display:"flex", gap:12 }}>
                  <span style={{ fontFamily:"monospace", color:C.muted }}>{t.time}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {tab === "grades" && (
          <div style={{ background: C.card, borderRadius:14, padding:20 }}>
            <h3>Attendance by Grade</h3>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:`2px solid ${C.border}` }}>
                  <th style={{ textAlign:"left", padding:12 }}>Grade</th>
                  <th style={{ textAlign:"left", padding:12 }}>Present</th>
                  <th style={{ textAlign:"left", padding:12 }}>Late</th>
                  <th style={{ textAlign:"left", padding:12 }}>Absent</th>
                  <th style={{ textAlign:"left", padding:12 }}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, i) => {
                  const rate = Math.round((g.present / g.total) * 100);
                  return (
                    <tr key={i} style={{ borderTop:`1px solid ${C.border}` }}>
                      <td style={{ padding:12 }}>{g.name}</td>
                      <td style={{ padding:12, color:C.green }}>{g.present}</td>
                      <td style={{ padding:12, color:C.amber }}>{g.late}</td>
                      <td style={{ padding:12, color:C.red }}>{g.absent}</td>
                      <td style={{ padding:12, fontWeight:700, color: rate > 90 ? C.green : C.amber }}>{rate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Check-In Tab */}
        {tab === "checkin" && (
          <div style={{ background: C.card, borderRadius:14, padding:24 }}>
            <h3>Manual Check-In</h3>
            {/* Form fields same as previous message */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
              <div>
                <label style={{color:C.muted, display:"block", marginBottom:6}}>Student ID</label>
                <input style={{width:"100%", padding:12, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, color:C.text}} value={form.id} onChange={e => setForm(f=>({...f, id:e.target.value}))} />
              </div>
              <div>
                <label style={{color:C.muted, display:"block", marginBottom:6}}>Full Name</label>
                <input style={{width:"100%", padding:12, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, color:C.text}} value={form.name} onChange={e => setForm(f=>({...f, name:e.target.value}))} />
              </div>
            </div>

            <button onClick={doCheckIn} style={{marginTop:24, padding:"14px 32px", background:C.blue, color:"white", border:"none", borderRadius:8, fontSize:"1.05rem", cursor:"pointer"}}>
              Record Check-In
            </button>
          </div>
        )}
      </div>

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}

