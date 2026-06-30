'use client';

import { useState, useEffect, useRef } from "react";

// Modern Dark Theme Palette
const C = {
  bg: "#0B0F1A", surface: "#131929", card: "#1A2235", border: "#243048",
  green: "#25D366", blue: "#3B82F6", amber: "#F59E0B", red: "#EF4444",
  text: "#E8EDF7", muted: "#7B8FB0", purple: "#8B5CF6"
};

const MENU_ITEMS = [
  { id: 1, name: "Jollof Rice + Chicken", price: 14.50, category: "Main" },
  { id: 2, name: "Banku + Tilapia", price: 16.00, category: "Main" },
  { id: 3, name: "Fried Rice + Beef", price: 15.00, category: "Main" },
  { id: 4, name: "Waakye + Shito", price: 12.50, category: "Main" },
  { id: 5, name: "Fufu + Light Soup", price: 13.50, category: "Main" },
  { id: 6, name: "Red Red + Plantain", price: 11.00, category: "Main" },
  { id: 7, name: "Coke / Fanta", price: 3.50, category: "Drink" },
  { id: 8, name: "Water (500ml)", price: 2.00, category: "Drink" },
  { id: 9, name: "Fresh Juice", price: 4.50, category: "Drink" },
  { id: 10, name: "Kelewele", price: 6.00, category: "Side" },
];

const INIT_STAFF = [
  { id: "S001", name: "Kwame Asante", role: "Waiter", status: "in", checkInTime: "07:52", checkOutTime: null, phone: "447700900001" },
  { id: "S002", name: "Abena Frimpong", role: "Chef", status: "in", checkInTime: "06:45", checkOutTime: null, phone: "447700900002" },
  { id: "S003", name: "Yaw Boateng", role: "Cashier", status: "in", checkInTime: "08:40", checkOutTime: null, phone: "447700900003" },
];

const STAFF_ROLES = ["Waiter", "Chef", "Cashier", "Manager", "Security", "Delivery Rider"];

const INIT_TABLES = [
  { id: 1, number: 1, status: "free", guests: 0, orderTotal: 0 },
  { id: 2, number: 2, status: "occupied", guests: 4, orderTotal: 84.50 },
  { id: 3, number: 3, status: "occupied", guests: 2, orderTotal: 35.00 },
  { id: 4, number: 4, status: "needs-cleaning", guests: 0, orderTotal: 0 },
];

const INIT_ORDERS = [
  { id: "ORD-1001", orderType: "dine-in", table: 2, address: "", items: "Jollof Rice + Chicken x2, Coke / Fanta x2", total: 84.50, status: "preparing", time: "12:15", customerPhone: "447700998888" },
  { id: "ORD-1002", orderType: "dine-in", table: 3, address: "", items: "Banku + Tilapia x1, Fresh Juice x1", total: 35.00, status: "ready", time: "12:28", customerPhone: "" },
  { id: "ORD-1003", orderType: "dine-in", table: 1, address: "", items: "Waakye + Shito x1", total: 12.50, status: "delivered", time: "11:40", customerPhone: "447700998888" },
  { id: "ORD-1004", orderType: "delivery", table: null, address: "14 Camberwell Road, London SE5", items: "Fried Rice + Beef x1, Kelewele x1", total: 21.00, status: "preparing", time: "12:40", customerPhone: "447700991234" },
];

const POPULAR_ITEMS = [
  { name: "Jollof Rice + Chicken", sales: 42, revenue: 609.00 },
  { name: "Banku + Tilapia", sales: 28, revenue: 448.00 },
  { name: "Fried Rice + Beef", sales: 19, revenue: 285.00 },
  { name: "Waakye + Shito", sales: 15, revenue: 187.50 },
];

const INIT_INVENTORY = [
  { id: "INV-01", name: "Rice (Bags)", qty: 14, minQty: 5, unit: "bag" },
  { id: "INV-02", name: "Chicken (KG)", qty: 45, minQty: 15, unit: "kg" },
  { id: "INV-03", name: "Tilapia Fish", qty: 8, minQty: 10, unit: "pcs" },
];

const INIT_LOYALTY = [
  { id: "C-1", name: "Ama Serwaa", phone: "447700998888", points: 120, tier: "Gold" },
];

const BRANCHES = [
  { id: "B1", name: "London West End" },
  { id: "B2", name: "Birmingham Branch" }
];

const INIT_PURCHASE_ORDERS = [
  { id: "PO-001", supplier: "Ocean Fresh Ltd", itemId: "INV-03", itemName: "Tilapia Fish", qty: 20, unit: "pcs", status: "pending", dateRaised: "2026-06-18" },
  { id: "PO-002", supplier: "Accra Grains Co.", itemId: "INV-01", itemName: "Rice (Bags)", qty: 10, unit: "bag", status: "shipped", dateRaised: "2026-06-15" },
];

const SUPPLIERS = ["Ocean Fresh Ltd", "Accra Grains Co.", "West Africa Poultry", "Kelewele Supplies"];

const TAB_LIST = [
  { key: "dashboard", label: "📊 Performance Matrix" },
  { key: "live_orders", label: "🔴 System Transaction Pipeline" },
  { key: "menu", label: "🍽️ Catalog Menu" },
  { key: "orders", label: "📝 Active Terminal Checkout" },
  { key: "kds", label: "🍳 Kitchen Interface (KDS)" },
  { key: "qr", label: "📱 QR Terminal Generation" },
  { key: "customer_scan", label: "📲 Scanned Customer App View" },
  { key: "remote_landing", label: "🛵 Remote Order Landing" },
  { key: "purchase_orders", label: "🚚 Restaurant Supplier Orders" },
  { key: "inventory", label: "📦 Logistics Stock" },
  { key: "loyalty", label: "🎁 CRM Rewards" },
  { key: "staff", label: "👥 Human Capital" },
];

export default function SASS() {
  // Core state
  const [staff, setStaff] = useState(INIT_STAFF);
  const [tables, setTables] = useState(INIT_TABLES);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [inventory, setInventory] = useState(INIT_INVENTORY);
  const [loyalty, setLoyalty] = useState(INIT_LOYALTY);
  const [purchaseOrders, setPurchaseOrders] = useState(INIT_PURCHASE_ORDERS);
  const [currentBranch, setCurrentBranch] = useState("B1");
  const [tab, setTab] = useState("dashboard");
  const [clock, setClock] = useState("");
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [form, setForm] = useState({ id: "", name: "", role: STAFF_ROLES[0], phone: "" });

  const [newOrder, setNewOrder] = useState<{ table: string; selectedItems: any[]; total: number; phone: string }>({ table: "", selectedItems: [], total: 0, phone: "" });
  const [menuFilter, setMenuFilter] = useState("All");
  const [cloudStatus, setCloudStatus] = useState("Synchronized");

  // Search & filter
  const [liveSearch, setLiveSearch] = useState("");
  const [liveStatusFilter, setLiveStatusFilter] = useState("all-active");

  // Customer table-scan ordering
  const [customerTable, setCustomerTable] = useState("1");
  const [customerCart, setCustomerCart] = useState<any[]>([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCategory, setCustomerCategory] = useState("All");

  // Remote order landing
  const [remoteCart, setRemoteCart] = useState<any[]>([]);
  const [remoteCategory, setRemoteCategory] = useState("All");
  const [remoteOrderType, setRemoteOrderType] = useState<"delivery" | "pickup">("delivery");
  const [remoteName, setRemoteName] = useState("");
  const [remotePhone, setRemotePhone] = useState("");
  const [remoteAddress, setRemoteAddress] = useState("");

  // Purchase order draft form
  const [newPO, setNewPO] = useState({ itemId: "", supplier: SUPPLIERS[0], qty: "" });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live "server" simulation
  const mockDatabaseSave = async (payloadType: string, actionData: any) => {
    setCloudStatus("Syncing...");
    return new Promise((resolve) => {
      setTimeout(() => {
        setCloudStatus("Synchronized");
        console.log(`[Database Write Success] Type: ${payloadType}`, actionData);
        resolve({ success: true, timestamp: Date.now() });
      }, 800);
    });
  };

  // Real-time clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // Aggregations
  const presentStaff = staff.filter(s => s.status === "in").length;
  const occupiedTables = tables.filter(t => t.status === "occupied").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingPOs = purchaseOrders.filter(po => po.status !== "received").length;

  const doStaffCheckIn = async () => {
    if (!form.name) return showToast("Name required to clock in");
    const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const staffId = form.id.trim() || `S${Date.now().toString().slice(-3)}`;
    const existing = staff.find(s => s.id === staffId);

    if (existing) {
      setStaff(prev => prev.map(s => s.id === staffId ? { ...s, status: "in", checkInTime: now, checkOutTime: null } : s));
      showToast(`${existing.name} clocked in at ${now}`);
      await mockDatabaseSave("STAFF_CHECKIN", { id: staffId, time: now });
    } else {
      const newStaff = { id: staffId, name: form.name, role: form.role || STAFF_ROLES[0], phone: form.phone, status: "in", checkInTime: now, checkOutTime: null };
      setStaff(prev => [newStaff, ...prev]);
      showToast(`${newStaff.name} checked in as ${newStaff.role}`);
      await mockDatabaseSave("STAFF_CHECKIN", newStaff);
    }
    setForm({ id: "", name: "", role: STAFF_ROLES[0], phone: "" });
  };

  const clockOutStaff = async (id: string) => {
    const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const member = staff.find(s => s.id === id);
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: "out", checkOutTime: now } : s));
    showToast(`${member ? member.name : id} clocked out at ${now}`);
    await mockDatabaseSave("STAFF_CHECKOUT", { id, time: now });
  };

  const clockInAgain = async (id: string) => {
    const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const member = staff.find(s => s.id === id);
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: "in", checkInTime: now, checkOutTime: null } : s));
    showToast(`${member ? member.name : id} clocked back in at ${now}`);
    await mockDatabaseSave("STAFF_CHECKIN", { id, time: now });
  };

  const isLate = (checkInTime: string | null) => Boolean(checkInTime) && (checkInTime ?? "") > "08:00";

  const updateTable = async (id: number, newStatus: string) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, status: newStatus, guests: newStatus === "free" ? 0 : t.guests } : t));
    showToast(`Table updated to ${newStatus}`);
    await mockDatabaseSave("TABLE_STATUS_UPDATE", { tableId: id, status: newStatus });
  };

  const addToOrder = (item: any) => {
    setNewOrder(prev => {
      const exists = prev.selectedItems.find(i => i.id === item.id);
      let updatedItems;
      if (exists) {
        updatedItems = prev.selectedItems.map(i => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      } else {
        updatedItems = [...prev.selectedItems, { ...item, quantity: 1 }];
      }
      const newTotal = updatedItems.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
      return { ...prev, selectedItems: updatedItems, total: newTotal };
    });
    showToast(`Added ${item.name} to order list`);
  };

  const removeFromOrder = (id: number) => {
    setNewOrder(prev => {
      const updatedItems = prev.selectedItems.filter(i => i.id !== id);
      const newTotal = updatedItems.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
      return { ...prev, selectedItems: updatedItems, total: newTotal };
    });
  };

  const addOrder = async () => {
    if (!newOrder.table || newOrder.selectedItems.length === 0) {
      return showToast("Please select table and at least one item");
    }
    processUnifiedOrder({
      orderType: "dine-in",
      table: parseInt(newOrder.table),
      items: newOrder.selectedItems,
      total: newOrder.total,
      phone: newOrder.phone,
    });
    setNewOrder({ table: "", selectedItems: [], total: 0, phone: "" });
  };

  const processUnifiedOrder = async ({ orderType, table, items, total, phone, address = "" }: { orderType: string; table: number | null; items: any[]; total: number; phone: string; address?: string }) => {
    const itemsString = items.map(item => `${item.name} x${item.quantity || 1}`).join(", ");
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const order = {
      id: orderId,
      orderType,
      table: table || null,
      address,
      items: itemsString,
      total,
      status: "preparing",
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      customerPhone: phone
    };
    setOrders(prev => [order, ...prev]);

    if (orderType === "dine-in" && table) {
      setTables(prev => prev.map(t => t.number === table ? { ...t, status: "occupied", orderTotal: (t.orderTotal || 0) + total } : t));
    }

    setInventory(prev => prev.map(inv => {
      if (itemsString.toLowerCase().includes("rice") && inv.id === "INV-01") return { ...inv, qty: Math.max(0, inv.qty - 1) };
      if (itemsString.toLowerCase().includes("chicken") && inv.id === "INV-02") return { ...inv, qty: Math.max(0, inv.qty - 2) };
      if (itemsString.toLowerCase().includes("tilapia") && inv.id === "INV-03") return { ...inv, qty: Math.max(0, inv.qty - 1) };
      return inv;
    }));

    if (phone) {
      const earnedPoints = Math.floor(total / 5);
      setLoyalty(prev => {
        const checkCust = prev.find(c => c.phone === phone);
        if (checkCust) {
          return prev.map(cust => cust.phone === phone ? { ...cust, points: cust.points + earnedPoints, tier: cust.points + earnedPoints > 150 ? "Platinum" : "Gold" } : cust);
        } else {
          return [...prev, { id: `C-${Date.now().toString().slice(-3)}`, name: "Walk-in Guest", phone, points: earnedPoints, tier: "Bronze" }];
        }
      });
    }

    showToast(`Order ${orderId} successfully pushed to Kitchen KDS!`);
    await mockDatabaseSave("NEW_ORDER_PIPELINE", order);
  };

  const addToCustomerCart = (item: any) => {
    setCustomerCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your mobile cart`);
  };

  const changeCustomerQty = (id: number, amount: number) => {
    setCustomerCart(prev => prev.map(i => {
      if (i.id === id) {
        const target = i.quantity + amount;
        return target > 0 ? { ...i, quantity: target } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const submitCustomerOrder = () => {
    if (customerCart.length === 0) return showToast("Your cart is empty");
    const total = customerCart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    processUnifiedOrder({
      orderType: "dine-in",
      table: parseInt(customerTable),
      items: customerCart,
      total,
      phone: customerPhone,
    });
    setCustomerCart([]);
    showToast("✨ Order sent directly to the kitchen!");
  };

  const addToRemoteCart = (item: any) => {
    setRemoteCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your order`);
  };

  const changeRemoteQty = (id: number, amount: number) => {
    setRemoteCart(prev => prev.map(i => {
      if (i.id === id) {
        const target = i.quantity + amount;
        return target > 0 ? { ...i, quantity: target } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const remoteCartTotal = remoteCart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  const submitRemoteOrder = () => {
    if (remoteCart.length === 0) return showToast("Your basket is empty");
    if (!remotePhone) return showToast("Phone number required for order updates");
    if (remoteOrderType === "delivery" && !remoteAddress) return showToast("Delivery address required");

    processUnifiedOrder({
      orderType: remoteOrderType,
      table: null,
      items: remoteCart,
      total: remoteCartTotal,
      phone: remotePhone,
      address: remoteOrderType === "delivery" ? remoteAddress : "Pickup at counter",
    });
    setRemoteCart([]);
    setRemoteAddress("");
    showToast(remoteOrderType === "delivery" ? "🛵 Delivery order sent to the kitchen!" : "🥡 Pickup order sent to the kitchen!");
  };

  const triggerReceiptPrint = (order: any) => {
    alert(`=== PRINT RECEIPT ===\nOrder ID: ${order.id}\nType: ${order.orderType}\n${order.table ? `Table Assigned: ${order.table}` : `Address: ${order.address}`}\nBreakdown: ${order.items}\nTotal Charges: £${order.total.toFixed(2)}\n====================`);
    showToast("Receipt payload routed to wireless printer");
  };

  const fireWhatsAppAlert = (order: any) => {
    if (!order.customerPhone) return showToast("No phone number linked");
    const msg = encodeURIComponent(`Your order ${order.id} status is now [${order.status.toUpperCase()}]. Total due: £${order.total.toFixed(2)}. Thank you for dining with us!`);
    window.open(`https://wa.me/${order.customerPhone}?text=${msg}`, "_blank");
  };

  const updateOrderStatus = async (orderId: string, nextStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    showToast(`Order updated to ${nextStatus}`);
    await mockDatabaseSave("ORDER_STATUS_UPDATE", { orderId, nextStatus });
  };

  const triggerCloudSync = () => {
    setCloudStatus("Syncing...");
    setTimeout(() => { setCloudStatus("Synchronized"); showToast("Full ecosystem backup complete!"); }, 1000);
  };

  const raisePurchaseOrder = async () => {
    if (!newPO.itemId || !newPO.qty) return showToast("Select an item and quantity");
    const invItem = inventory.find(i => i.id === newPO.itemId);
    if (!invItem) return showToast("Item not found");

    const po = {
      id: `PO-${Date.now().toString().slice(-4)}`,
      supplier: newPO.supplier,
      itemId: invItem.id,
      itemName: invItem.name,
      qty: parseInt(newPO.qty),
      unit: invItem.unit,
      status: "pending",
      dateRaised: new Date().toISOString().slice(0, 10),
    };
    setPurchaseOrders(prev => [po, ...prev]);
    showToast(`Purchase order ${po.id} raised with ${po.supplier}`);
    await mockDatabaseSave("PURCHASE_ORDER_RAISED", po);
    setNewPO({ itemId: "", supplier: SUPPLIERS[0], qty: "" });
  };

  const advancePOStatus = async (poId: string, nextStatus: string) => {
    const po = purchaseOrders.find(p => p.id === poId);
    setPurchaseOrders(prev => prev.map(p => p.id === poId ? { ...p, status: nextStatus } : p));

    if (nextStatus === "received" && po) {
      setInventory(prev => prev.map(inv => inv.id === po.itemId ? { ...inv, qty: inv.qty + po.qty } : inv));
      showToast(`${po.qty} ${po.unit}(s) of ${po.itemName} added to stock`);
    } else {
      showToast(`Purchase order ${poId} marked ${nextStatus}`);
    }
    await mockDatabaseSave("PURCHASE_ORDER_STATUS", { poId, nextStatus });
  };

  const filteredMenu = menuFilter === "All" ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === menuFilter);
  const filteredCustomerMenu = customerCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === customerCategory);
  const filteredRemoteMenu = remoteCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === remoteCategory);

  const activeLiveOrders = orders.filter(o => {
    const locationLabel = o.table ? `table ${o.table}` : (o.address || "");
    const matchesSearch = o.id.toLowerCase().includes(liveSearch.toLowerCase()) || locationLabel.toLowerCase().includes(liveSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (liveStatusFilter === "all-active") return o.status !== "delivered";
    return o.status === liveStatusFilter;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>

      {/* Floating toast */}
      {toast.visible && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: C.blue, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 600, zIndex: 1000, boxShadow: "0 8px 30px rgba(59,130,246,0.4)" }}>
          🚀 {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "16px 24px", background: C.surface, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.green, color: "#000", fontWeight: 700, padding: "5px 12px", borderRadius: 6 }}>SASS</div>
          <span style={{ fontWeight: 700, fontSize: "1.15rem" }}>Smart Restaurant Hub</span>
          <select value={currentBranch} onChange={(e) => { setCurrentBranch(e.target.value); showToast("Switched terminal views."); }} style={{ padding: "6px 12px", background: C.card, color: C.text, border: `1px solid ${C.border}`, borderRadius: 6, marginLeft: 10 }}>
            {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <button onClick={triggerCloudSync} style={{ background: C.card, color: C.text, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: "0.85rem" }}>
            ☁️ Database State: <strong style={{ color: C.green }}>{cloudStatus}</strong>
          </button>
          <div style={{ fontFamily: "monospace", background: C.card, padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}` }}>LIVE • {clock}</div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>

        {/* KPI board */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ background: C.card, padding: 20, borderRadius: 12, flex: 1, minWidth: 220, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>STAFF PRESENT</div>
            <div style={{ fontSize: "2.4rem", color: C.purple, fontWeight: 700 }}>{presentStaff} <span style={{ fontSize: "1.2rem", color: C.muted }}>of {staff.length}</span></div>
          </div>
          <div style={{ background: C.card, padding: 20, borderRadius: 12, flex: 1, minWidth: 220, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>OCCUPIED TABLES</div>
            <div style={{ fontSize: "2.4rem", color: C.amber, fontWeight: 700 }}>{occupiedTables} <span style={{ fontSize: "1.2rem", color: C.muted }}>Active</span></div>
          </div>
          <div style={{ background: C.card, padding: 20, borderRadius: 12, flex: 1, minWidth: 220, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>REVENUE ENGINE</div>
            <div style={{ fontSize: "2.4rem", color: C.green, fontWeight: 700 }}>£{totalRevenue.toFixed(2)}</div>
          </div>
          <div style={{ background: C.card, padding: 20, borderRadius: 12, flex: 1, minWidth: 220, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>OPEN SUPPLIER POs</div>
            <div style={{ fontSize: "2.4rem", color: C.red, fontWeight: 700 }}>{pendingPOs}</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", background: C.surface, padding: 8, borderRadius: 12, border: `1px solid ${C.border}` }}>
          {TAB_LIST.map(t => {
            const isHighlight = t.key === "customer_scan" || t.key === "remote_landing" || t.key === "purchase_orders";
            return (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                padding: "10px 16px", borderRadius: 8, border: "none",
                background: isHighlight ? (tab === t.key ? C.green : "rgba(37,211,102,0.15)") : (tab === t.key ? C.blue : "transparent"),
                color: isHighlight ? (tab === t.key ? "#000" : C.green) : (tab === t.key ? "#fff" : C.muted),
                cursor: "pointer", fontWeight: 700, fontSize: "0.85rem",
                transition: "all 0.2s ease"
              }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flexWrap: "wrap" }}>
            <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <h3>🔥 Top Menu Velocity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                {POPULAR_ITEMS.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: 12, background: C.card, borderRadius: 8 }}>
                    <span>{item.name}</span>
                    <strong style={{ color: C.green }}>{item.sales} sold (£{item.revenue.toFixed(2)})</strong>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <h3>📊 Active Workspace Overview</h3>
              <p style={{ color: C.muted, lineHeight: 1.5 }}>
                All localized terminal points are connected and configured under the workspace route. Inventory depletions, loyalty updates, and supplier pipeline updates will operate in simulation mode.
              </p>
            </div>
          </div>
        )}

        {/* SYSTEM TRANSACTION PIPELINE */}
        {tab === "live_orders" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <input type="text" placeholder="Search orders by ID or location..." value={liveSearch} onChange={e => setLiveSearch(e.target.value)} style={{ padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, flex: 1, minWidth: "200px" }} />
              <select value={liveStatusFilter} onChange={e => setLiveStatusFilter(e.target.value)} style={{ padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <option value="all-active">All Active</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeLiveOrders.map(o => (
                <div key={o.id} style={{ padding: 16, background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <span style={{ fontWeight: "bold", color: C.blue }}>{o.id}</span> ({o.orderType.toUpperCase()}) {o.table ? `• Table ${o.table}` : `• ${o.address}`}
                    <div style={{ fontSize: "0.9rem", color: C.muted, marginTop: 4 }}>{o.items}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => triggerReceiptPrint(o)} style={{ background: C.surface, color: "#fff", border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>🖨️ Print</button>
                    <button onClick={() => fireWhatsAppAlert(o)} style={{ background: "rgba(37,211,102,0.2)", color: C.green, border: `1px solid ${C.green}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>💬 WhatsApp</button>
                    <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)} style={{ padding: "6px", background: C.surface, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATALOG MENU */}
        {tab === "menu" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["All", "Main", "Drink", "Side"].map(cat => (
                <button key={cat} onClick={() => setMenuFilter(cat)} style={{ padding: "8px 16px", borderRadius: 20, background: menuFilter === cat ? C.blue : C.card, color: "#fff", border: "none", cursor: "pointer" }}>{cat}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {filteredMenu.map(item => (
                <div key={item.id} style={{ background: C.card, padding: 16, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <h4>{item.name}</h4>
                  <div style={{ color: C.green, fontWeight: "bold", marginTop: 8 }}>£{item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE TERMINAL CHECKOUT */}
        {tab === "orders" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
            <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <h3>Terminal POS Menu Selection</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginTop: 16 }}>
                {MENU_ITEMS.map(item => (
                  <button key={item.id} onClick={() => addToOrder(item)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, color: "#fff", textAlign: "left", cursor: "pointer" }}>
                    <strong>{item.name}</strong>
                    <div style={{ color: C.blue, marginTop: 4 }}>£{item.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <h3>Cart Draft</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "16px 0" }}>
                <select value={newOrder.table} onChange={e => setNewOrder(prev => ({ ...prev, table: e.target.value }))} style={{ padding: 10, background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                  <option value="">Select Desk/Table</option>
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>Table {n}</option>)}
                </select>
                <input type="text" placeholder="Customer Phone (Optional)" value={newOrder.phone} onChange={e => setNewOrder(prev => ({ ...prev, phone: e.target.value }))} style={{ padding: 10, background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }} />
                {newOrder.selectedItems.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", background: C.card, padding: 8, borderRadius: 4 }}>
                    <span>{item.name} x{item.quantity}</span>
                    <button onClick={() => removeFromOrder(item.id)} style={{ background: "transparent", color: C.red, border: "none", cursor: "pointer" }}>❌</button>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "12px 0" }}>Total: £{newOrder.total.toFixed(2)}</div>
              <button onClick={addOrder} style={{ width: "100%", padding: 12, background: C.green, color: "#000", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>Complete POS Checkout</button>
            </div>
          </div>
        )}

        {/* KITCHEN INTERFACE (KDS) */}
        {tab === "kds" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h3>🍳 Kitchen Production Queue</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 16 }}>
              {orders.filter(o => o.status !== "delivered").map(o => (
                <div key={o.id} style={{ background: C.card, padding: 16, borderRadius: 8, border: `1px solid ${o.status === "ready" ? C.green : C.amber}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ color: C.blue }}>{o.id}</strong>
                    <span style={{ color: C.muted }}>{o.time}</span>
                  </div>
                  <div style={{ margin: "12px 0", fontSize: "1.1rem" }}>{o.items}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ textTransform: "uppercase", fontSize: "0.8rem", background: C.surface, padding: "4px 8px", borderRadius: 4 }}>{o.status}</span>
                    {o.status === "preparing" ? (
                      <button onClick={() => updateOrderStatus(o.id, "ready")} style={{ background: C.green, color: "#000", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>Mark Ready</button>
                    ) : (
                      <button onClick={() => updateOrderStatus(o.id, "delivered")} style={{ background: C.blue, color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>Deliver</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR TERMINAL GENERATION */}
        {tab === "qr" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}`, textAlign: "center" }}>
            <h3>📱 Tabletop QR Link Generator</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} style={{ background: C.card, padding: 20, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <h4>Table #{num}</h4>
                  <div style={{ background: "#fff", width: 130, height: 130, margin: "16px auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "0.8rem", borderRadius: 8 }}>
                    [ MOCK QR CODE ]
                  </div>
                  <button onClick={() => { setCustomerTable(String(num)); setTab("customer_scan"); }} style={{ background: C.blue, color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", width: "100%" }}>Test Live Scan</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER APP VIEW */}
        {tab === "customer_scan" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, background: "rgba(255,255,255,0.02)", padding: 24, borderRadius: 16, border: `1px dashed ${C.green}` }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, color: C.green }}>📱 Customer Mobile Browser Simulator</h3>
                  <p style={{ color: C.muted, margin: "4px 0 0 0", fontSize: "0.85rem" }}>This is what a diner sees on their phone right after scanning the tabletop QR code.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <label style={{ fontSize: "0.85rem", color: C.muted }}>Simulating QR Scan at Desk #</label>
                  <select value={customerTable} onChange={e => setCustomerTable(e.target.value)} style={{ background: C.surface, color: "#fff", border: "none", fontWeight: "bold" }}>
                    {[1, 2, 3, 4].map(num => <option key={num} value={num.toString()}>Table {num}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["All", "Main", "Drink", "Side"].map(cat => (
                  <button key={cat} onClick={() => setCustomerCategory(cat)} style={{ padding: "8px 16px", borderRadius: 20, background: customerCategory === cat ? C.green : C.surface, color: customerCategory === cat ? "#000" : C.text, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {filteredCustomerMenu.map(item => (
                  <div key={item.id} style={{ background: C.card, padding: 16, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <strong style={{ fontSize: "1rem", display: "block" }}>{item.name}</strong>
                      <span style={{ fontSize: "1.2rem", fontWeight: 700, color: C.green, display: "block", margin: "6px 0" }}>£{item.price.toFixed(2)}</span>
                    </div>
                    <button onClick={() => addToCustomerCart(item)} style={{ background: "rgba(37,211,102,0.1)", color: C.green, border: `1px solid ${C.green}`, padding: "8px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>
                      ➕ Add To Order
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ textAlign: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 15, marginBottom: 15 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>⚡ Direct Guest Checkout</div>
                  <div style={{ fontSize: "0.8rem", color: C.green, marginTop: 4 }}>📍 Logged in via QR code: Table {customerTable}</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: "0.8rem", color: C.muted, display: "block", marginBottom: 6 }}>Enter Mobile Number for Loyalty Rewards:</label>
                  <input type="text" placeholder="e.g. 447700998888" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ width: "100%", padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: "0.9rem" }} />
                </div>

                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  <span style={{ fontSize: "0.8rem", color: C.muted, fontWeight: "bold" }}>Cart Summary:</span>
                  {customerCart.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "30px 10px", color: C.muted, fontSize: "0.85rem", fontStyle: "italic" }}>Your basket is empty. Choose food from the menu on the left.</div>
                  ) : (
                    customerCart.map(item => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: C.card, borderRadius: 8, margin: "6px 0", border: `1px solid ${C.border}` }}>
                        <div>
                          <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{item.name}</span>
                          <span style={{ display: "block", fontSize: "0.8rem", color: C.green }}>£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button onClick={() => changeCustomerQty(item.id, -1)} style={{ background: C.surface, border: "none", color: "#fff", width: 24, height: 24, borderRadius: 4, cursor: "pointer" }}>-</button>
                          <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                          <button onClick={() => changeCustomerQty(item.id, 1)} style={{ background: C.surface, border: "none", color: "#fff", width: 24, height: 24, borderRadius: 4, cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 15, marginTop: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "1.1rem", fontWeight: "bold" }}>
                  <span>Subtotal:</span>
                  <span style={{ color: C.green }}>£{customerCart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</span>
                </div>
                <button onClick={submitCustomerOrder} disabled={customerCart.length === 0} style={{ width: "100%", padding: "12px", background: customerCart.length === 0 ? C.border : C.green, color: "#000", border: "none", borderRadius: 8, fontWeight: "bold", fontSize: "1rem", cursor: customerCart.length === 0 ? "not-allowed" : "pointer" }}>
                  🚀 Push Order to Kitchen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REMOTE ORDER LANDING */}
        {tab === "remote_landing" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, background: "rgba(255,255,255,0.02)", padding: 24, borderRadius: 16, border: `1px dashed ${C.blue}` }}>
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ margin: 0, color: C.blue }}>🛵 Remote Order Landing Page</h3>
                <p style={{ color: C.muted, margin: "4px 0 0 0", fontSize: "0.85rem" }}>What a customer sees when they order online for delivery or pickup — no table or QR code involved.</p>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["All", "Main", "Drink", "Side"].map(cat => (
                  <button key={cat} onClick={() => setRemoteCategory(cat)} style={{ padding: "8px 16px", borderRadius: 20, background: remoteCategory === cat ? C.blue : C.surface, color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {filteredRemoteMenu.map(item => (
                  <div key={item.id} style={{ background: C.card, padding: 16, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <strong style={{ fontSize: "1rem", display: "block" }}>{item.name}</strong>
                      <span style={{ fontSize: "1.2rem", fontWeight: 700, color: C.blue, display: "block", margin: "6px 0" }}>£{item.price.toFixed(2)}</span>
                    </div>
                    <button onClick={() => addToRemoteCart(item)} style={{ background: "rgba(59,130,246,0.1)", color: C.blue, border: `1px solid ${C.blue}`, padding: "8px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>
                      ➕ Add To Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ textAlign: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 15, marginBottom: 15 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🥡 Digital Order Form</div>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <button onClick={() => setRemoteOrderType("delivery")} style={{ flex: 1, padding: "8px", background: remoteOrderType === "delivery" ? C.blue : C.card, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>🛵 Delivery</button>
                  <button onClick={() => setRemoteOrderType("pickup")} style={{ flex: 1, padding: "8px", background: remoteOrderType === "pickup" ? C.blue : C.card, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>🥡 Pickup</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                  <input type="text" placeholder="Full Name" value={remoteName} onChange={e => setRemoteName(e.target.value)} style={{ width: "100%", padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8 }} />
                  <input type="text" placeholder="Phone Number" value={remotePhone} onChange={e => setRemotePhone(e.target.value)} style={{ width: "100%", padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8 }} />
                  {remoteOrderType === "delivery" && (
                    <textarea placeholder="Full Delivery Address" value={remoteAddress} onChange={e => setRemoteAddress(e.target.value)} style={{ width: "100%", padding: "10px", background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, minHeight: 60, fontFamily: "inherit" }} />
                  )}
                </div>

                <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                  <span style={{ fontSize: "0.8rem", color: C.muted, fontWeight: "bold" }}>Basket Breakdown:</span>
                  {remoteCart.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "20px 10px", color: C.muted, fontSize: "0.85rem", fontStyle: "italic" }}>Your basket is empty.</div>
                  ) : (
                    remoteCart.map(item => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: C.card, borderRadius: 8, margin: "4px 0", border: `1px solid ${C.border}` }}>
                        <div>
                          <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{item.name}</span>
                          <span style={{ display: "block", fontSize: "0.75rem", color: C.blue }}>£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => changeRemoteQty(item.id, -1)} style={{ background: C.surface, border: "none", color: "#fff", width: 22, height: 22, borderRadius: 4, cursor: "pointer" }}>-</button>
                          <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>{item.quantity}</span>
                          <button onClick={() => changeRemoteQty(item.id, 1)} style={{ background: C.surface, border: "none", color: "#fff", width: 22, height: 22, borderRadius: 4, cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 15, marginTop: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "1.1rem", fontWeight: "bold" }}>
                  <span>Grand Total:</span>
                  <span style={{ color: C.blue }}>£{remoteCartTotal.toFixed(2)}</span>
                </div>
                <button onClick={submitRemoteOrder} disabled={remoteCart.length === 0} style={{ width: "100%", padding: "12px", background: remoteCart.length === 0 ? C.border : C.blue, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", fontSize: "1rem", cursor: remoteCart.length === 0 ? "not-allowed" : "pointer" }}>
                  Place Remote Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESTAURANT SUPPLIER ORDERS */}
        {tab === "purchase_orders" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h3>🚚 Logistics Procurement Pipeline</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
              <div>
                <h4>Draft Supplier Purchase Order (PO)</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                  <select value={newPO.itemId} onChange={e => setNewPO(p => ({ ...p, itemId: e.target.value }))} style={{ padding: 10, background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    <option value="">Select Raw Ingredient Stock...</option>
                    {inventory.map(i => <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>)}
                  </select>
                  <select value={newPO.supplier} onChange={e => setNewPO(p => ({ ...p, supplier: e.target.value }))} style={{ padding: 10, background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input type="number" placeholder="Quantity Needed" value={newPO.qty} onChange={e => setNewPO(p => ({ ...p, qty: e.target.value }))} style={{ padding: 10, background: C.card, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }} />
                  <button onClick={raisePurchaseOrder} style={{ padding: 12, background: C.green, color: "#000", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>Issue Purchase Order</button>
                </div>
              </div>
              <div>
                <h4>Active Supplier Ledger Logs</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                  {purchaseOrders.map(po => (
                    <div key={po.id} style={{ padding: 12, background: C.card, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong>{po.id}</strong> - {po.itemName} (x{po.qty})
                        <div style={{ fontSize: "0.8rem", color: C.muted }}>Supplier: {po.supplier} | {po.dateRaised}</div>
                      </div>
                      <div>
                        {po.status === "pending" && (
                          <button onClick={() => advancePOStatus(po.id, "shipped")} style={{ background: C.amber, color: "#000", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: "0.8rem" }}>Mark Shipped</button>
                        )}
                        {po.status === "shipped" && (
                          <button onClick={() => advancePOStatus(po.id, "received")} style={{ background: C.green, color: "#000", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: "0.8rem" }}>Mark Received</button>
                        )}
                        {po.status === "received" && (
                          <span style={{ color: C.green, fontSize: "0.85rem", fontWeight: "bold" }}>✅ Stocked</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOGISTICS STOCK */}
        {tab === "inventory" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h3>📦 Supply Logistics Core</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginTop: 16 }}>
              {inventory.map(item => {
                const lowStock = item.qty <= item.minQty;
                return (
                  <div key={item.id} style={{ background: C.card, padding: 16, borderRadius: 8, border: `1px solid ${lowStock ? C.red : C.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h4>{item.name}</h4>
                      <span style={{ color: C.muted, fontSize: "0.85rem" }}>{item.id}</span>
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "12px 0", color: lowStock ? C.red : C.text }}>
                      {item.qty} <span style={{ fontSize: "1rem", color: C.muted }}>{item.unit}(s)</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: C.muted }}>
                      Minimum Alert Threshold: {item.minQty} {item.unit}(s)
                      {lowStock && <strong style={{ color: C.red, display: "block", marginTop: 4 }}>⚠ CRITICAL DEFICIT: PO REQUIRED</strong>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CRM REWARDS */}
        {tab === "loyalty" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h3>🎁 Guest Loyalty Hub Matrix</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {loyalty.map(c => (
                <div key={c.id} style={{ padding: 14, background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{c.name}</strong> <span style={{ fontSize: "0.85rem", color: C.muted }}>({c.phone})</span>
                    <div style={{ fontSize: "0.85rem", color: C.amber, marginTop: 4 }}>Tier Class: {c.tier}</div>
                  </div>
                  <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: C.green }}>{c.points} PTS</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HUMAN CAPITAL */}
        {tab === "staff" && (
          <div style={{ background: C.surface, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h3>👥 Workspace Shift Roster</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
              <div style={{ background: C.card, padding: 16, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <h4>Staff Check-In Portal</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                  <input type="text" placeholder="Staff ID (Optional)" value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} style={{ padding: 10, background: C.surface, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }} />
                  <input type="text" placeholder="Full Employee Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ padding: 10, background: C.surface, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }} />
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={{ padding: 10, background: C.surface, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    {STAFF_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <input type="text" placeholder="Phone Contact" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ padding: 10, background: C.surface, color: "#fff", border: `1px solid ${C.border}`, borderRadius: 6 }} />
                  <button onClick={doStaffCheckIn} style={{ padding: 12, background: C.purple, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>Trigger Shift Clock-In</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {staff.map(s => (
                  <div key={s.id} style={{ padding: 14, background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>{s.name}</strong> - <span style={{ color: C.purple }}>{s.role}</span>
                      <div style={{ fontSize: "0.85rem", color: C.muted, marginTop: 4 }}>
                        {s.status === "in" ? (
                          <span>Clocked In: <span style={{ color: isLate(s.checkInTime) ? C.red : C.green }}>{s.checkInTime} {isLate(s.checkInTime) && "(LATE)"}</span></span>
                        ) : (
                          <span>Shift Out: {s.checkOutTime}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      {s.status === "in" ? (
                        <button onClick={() => clockOutStaff(s.id)} style={{ background: C.red, color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>Clock Out</button>
                      ) : (
                        <button onClick={() => clockInAgain(s.id)} style={{ background: C.surface, color: C.text, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>Re-entry</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
