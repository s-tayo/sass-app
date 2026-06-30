'use client';

import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B0F1A", surface: "#131929", card: "#1A2235", border: "#243048",
  green: "#25D366", blue: "#3B82F6", amber: "#F59E0B", red: "#EF4444",
  text: "#E8EDF7", muted: "#7B8FB0", purple: "#8B5CF6"
};

export default function SmartRestaurantHub() {
  const [tab, setTab] = useState("dashboard");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100vh", padding: "24px" }}>
      <header style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Smart Restaurant Hub</h1>
        <div style={{ background: C.surface, padding: "8px 16px", borderRadius: "8px", border: `1px solid ${C.border}` }}>
          Time: {clock}
        </div>
      </header>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {["dashboard", "customer_scan"].map((t) => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            style={{ 
              background: tab === t ? C.blue : C.card, 
              color: C.text, 
              border: `1px solid ${C.border}`, 
              padding: "8px 16px", 
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {t.toUpperCase().replace("_", " ")}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div style={{ background: C.surface, padding: "24px", borderRadius: "12px", border: `1px solid ${C.border}` }}>
          <h3>Dashboard Overview</h3>
          <p style={{ color: C.muted }}>Welcome back! The restaurant hub is running smoothly.</p>
        </div>
      )}

      {tab === "customer_scan" && (
        <div style={{ background: C.surface, padding: "24px", borderRadius: "12px", border: `1px solid ${C.border}` }}>
          <h3>Customer Scan Interface</h3>
          <p style={{ color: C.muted }}>Scan elements and customer carts will render here.</p>
        </div>
      )}
    </div>
  );
}
