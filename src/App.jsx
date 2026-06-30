import { useState, useEffect, useRef } from "react";

// Modern Dark Theme Palette
const C = {
  bg: "#0B0F1A",
  surface: "#131929",
  card: "#1A2235",
  border: "#243048",
  green: "#25D366",
  blue: "#3B82F6",
  amber: "#F59E0B",
  red: "#EF4444",
  text: "#E8EDF7",
  muted: "#7B8FB0",
  purple: "#8B5CF6"
};

const MENU_ITEMS = [
  { id: 1, name: "Jollof Rice + Chicken", price: 14.5, category: "Main", image: "https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 2, name: "Banku + Tilapia", price: 16.0, category: "Main", image: "https://images.unsplash.com/photo-1628573587716-72312ed0df65?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 3, name: "Fried Rice + Beef", price: 15.0, category: "Main", image: "https://images.unsplash.com/photo-1772729440867-a99e03ede945?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 4, name: "Waakye + Shito", price: 12.5, category: "Main", image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 5, name: "Fufu + Light Soup", price: 13.5, category: "Main", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 6, name: "Red Red + Plantain", price: 11.0, category: "Main", image: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 7, name: "Coke / Fanta", price: 3.5, category: "Drink", image: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 8, name: "Water (500ml)", price: 2.0, category: "Drink", image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 9, name: "Fresh Juice", price: 4.5, category: "Drink", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=380&fit=crop&q=80&auto=format" },
  { id: 10, name: "Kelewele", price: 6.0, category: "Side", image: "https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?w=600&h=380&fit=crop&q=80&auto=format" }
];

const INIT_STAFF = [
  { id: "S001", name: "Kwame Asante", role: "Waiter", status: "in", checkInTime: "07:52", checkOutTime: null, phone: "447700900001" },
  { id: "S002", name: "Abena Frimpong", role: "Chef", status: "in", checkInTime: "06:45", checkOutTime: null, phone: "447700900002" },
  { id: "S003", name: "Yaw Boateng", role: "Cashier", status: "in", checkInTime: "08:40", checkOutTime: null, phone: "447700900003" }
];

const STAFF_ROLES = ["Waiter", "Chef", "Cashier", "Manager", "Security", "Delivery Rider"];

const INIT_TABLES = [
  { id: 1, number: 1, status: "free", guests: 0, orderTotal: 0 },
  { id: 2, number: 2, status: "occupied", guests: 4, orderTotal: 84.5 },
  { id: 3, number: 3, status: "occupied", guests: 2, orderTotal: 35.0 },
  { id: 4, number: 4, status: "needs-cleaning", guests: 0, orderTotal: 0 }
];

const INIT_ORDERS = [
  {
    id: "ORD-1001",
    orderType: "dine-in",
    table: 2,
    address: "",
    items: "Jollof Rice + Chicken x2, Coke / Fanta x2",
    total: 84.5,
    status: "preparing",
    time: "12:15",
    customerPhone: "447700998888"
  },
  {
    id: "ORD-1002",
    orderType: "dine-in",
    table: 3,
    address: "",
    items: "Banku + Tilapia x1, Fresh Juice x1",
    total: 35.0,
    status: "ready",
    time: "12:28",
    customerPhone: ""
  },
  {
    id: "ORD-1003",
    orderType: "dine-in",
    table: 1,
    address: "",
    items: "Waakye + Shito x1",
    total: 12.5,
    status: "delivered",
    time: "11:40",
    customerPhone: "447700998888"
  },
  {
    id: "ORD-1004",
    orderType: "delivery",
    table: null,
    address: "14 Camberwell Road, London SE5",
    items: "Fried Rice + Beef x1, Kelewele x1",
    total: 21.0,
    status: "preparing",
    time: "12:40",
    customerPhone: "447700991234"
  }
];

const POPULAR_ITEMS = [
  { name: "Jollof Rice + Chicken", sales: 42, revenue: 609.0 },
  { name: "Banku + Tilapia", sales: 28, revenue: 448.0 },
  { name: "Fried Rice + Beef", sales: 19, revenue: 285.0 },
  { name: "Waakye + Shito", sales: 15, revenue: 187.5 }
];

const INIT_INVENTORY = [
  { id: "INV-01", name: "Rice (Bags)", qty: 14, minQty: 5, unit: "bag" },
  { id: "INV-02", name: "Chicken (KG)", qty: 45, minQty: 15, unit: "kg" },
  { id: "INV-03", name: "Tilapia Fish", qty: 8, minQty: 10, unit: "pcs" }
];

const INIT_LOYALTY = [
  { id: "C-1", name: "Ama Serwaa", phone: "447700998888", points: 120, tier: "Gold" }
];

const BRANCHES = [
  { id: "B1", name: "London West End" },
  { id: "B2", name: "Birmingham Branch" }
];

const INIT_PURCHASE_ORDERS = [
  {
    id: "PO-001",
    supplier: "Ocean Fresh Ltd",
    itemId: "INV-03",
    itemName: "Tilapia Fish",
    qty: 20,
    unit: "pcs",
    status: "pending",
    dateRaised: "2026-06-18"
  },
  {
    id: "PO-002",
    supplier: "Accra Grains Co.",
    itemId: "INV-01",
    itemName: "Rice (Bags)",
    qty: 10,
    unit: "bag",
    status: "shipped",
    dateRaised: "2026-06-15"
  }
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
  { key: "staff", label: "👥 Human Capital" }
];

// Reusable Menu Card with Image
const MenuItemCard = ({
  item,
  onAdd,
  accentColor = C.green,
  accentBg = "rgba(37,211,102,0.1)"
}) => (
  <div
    style={{
      background: C.card,
      padding: 16,
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}
  >
    <div
      style={{
        position: "relative",
        height: "180px",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 12
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=380&fit=crop&q=80&auto=format";
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(0,0,0,0.75)",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 20,
          fontSize: "0.75rem",
          fontWeight: 700
        }}
      >
        {item.category}
      </div>
    </div>

    <div style={{ flex: 1 }}>
      <strong
        style={{
          fontSize: "1.1rem",
          display: "block",
          marginBottom: 4
        }}
      >
        {item.name}
      </strong>
    </div>

    <div
      style={{
        marginTop: "auto",
        paddingTop: 12,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span
        style={{
          fontSize: "1.45rem",
          fontWeight: 700,
          color: accentColor
        }}
      >
        £{item.price.toFixed(2)}
      </span>
      <button
        onClick={() => onAdd(item)}
        style={{
          background: accentBg,
          color: accentColor,
          border: `1px solid ${accentColor}`,
          padding: "9px 18px",
          borderRadius: 8,
          fontWeight: 700,
          cursor: "pointer"
        }}
      >
        ➕ Add
      </button>
    </div>
  </div>
);

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

  const [form, setForm] = useState({
    id: "",
    name: "",
    role: STAFF_ROLES[0],
    phone: ""
  });

  const [newOrder, setNewOrder] = useState({
    table: "",
    selectedItems: [],
    total: 0,
    phone: ""
  });

  const [menuFilter, setMenuFilter] = useState("All");
  const [cloudStatus, setCloudStatus] = useState("Synchronized");

  // Search & filter
  const [liveSearch, setLiveSearch] = useState("");
  const [liveStatusFilter, setLiveStatusFilter] = useState("all-active");

  // Customer table-scan ordering
  const [customerTable, setCustomerTable] = useState("1");
  const [customerCart, setCustomerCart] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCategory, setCustomerCategory] = useState("All");

  // Remote order landing
  const [remoteCart, setRemoteCart] = useState([]);
  const [remoteCategory, setRemoteCategory] = useState("All");
  const [remoteOrderType, setRemoteOrderType] = useState("delivery");
  const [remoteName, setRemoteName] = useState("");
  const [remotePhone, setRemotePhone] = useState("");
  const [remoteAddress, setRemoteAddress] = useState("");

  // Purchase order draft
  const [newPO, setNewPO] = useState({
    itemId: "",
    supplier: SUPPLIERS[0],
    qty: ""
  });

  const timerRef = useRef(null);

  // Mock DB
  const mockDatabaseSave = async (payloadType, actionData) => {
    setCloudStatus("Syncing...");
    return new Promise((resolve) => {
      setTimeout(() => {
        setCloudStatus("Synchronized");
        console.log(`[Database Write Success] Type: ${payloadType}`, actionData);
        resolve({ success: true, timestamp: Date.now() });
      }, 800);
    });
  };

  // Clock
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showToast = (msg) => {
    setToast({ msg, visible: true });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000
    );
  };

  // Aggregations
  const presentStaff = staff.filter((s) => s.status === "in").length;
  const occupiedTables = tables.filter((t) => t.status === "occupied").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingPOs = purchaseOrders.filter((po) => po.status !== "received")
    .length;

  // Staff
  const doStaffCheckIn = async () => {
    if (!form.name) return showToast("Name required to clock in");
    const now = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const staffId = form.id.trim() || `S${Date.now().toString().slice(-3)}`;
    const existing = staff.find((s) => s.id === staffId);

    if (existing) {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === staffId
            ? { ...s, status: "in", checkInTime: now, checkOutTime: null }
            : s
        )
      );
      showToast(`${existing.name} clocked in at ${now}`);
      await mockDatabaseSave("STAFF_CHECKIN", { id: staffId, time: now });
    } else {
      const newStaff = {
        id: staffId,
        name: form.name,
        role: form.role || STAFF_ROLES[0],
        phone: form.phone,
        status: "in",
        checkInTime: now,
        checkOutTime: null
      };
      setStaff((prev) => [newStaff, ...prev]);
      showToast(`${newStaff.name} checked in as ${newStaff.role}`);
      await mockDatabaseSave("STAFF_CHECKIN", newStaff);
    }
    setForm({ id: "", name: "", role: STAFF_ROLES[0], phone: "" });
  };

  const clockOutStaff = async (id) => {
    const now = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const member = staff.find((s) => s.id === id);
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "out", checkOutTime: now } : s
      )
    );
    showToast(`${member ? member.name : id} clocked out at ${now}`);
    await mockDatabaseSave("STAFF_CHECKOUT", { id, time: now });
  };

  const clockInAgain = async (id) => {
    const now = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const member = staff.find((s) => s.id === id);
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: "in", checkInTime: now, checkOutTime: null }
          : s
      )
    );
    showToast(`${member ? member.name : id} clocked back in at ${now}`);
    await mockDatabaseSave("STAFF_CHECKIN", { id, time: now });
  };

  const isLate = (checkInTime) =>
    Boolean(checkInTime) && checkInTime > "08:00";

  // Tables
  const updateTable = async (id, newStatus) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              guests: newStatus === "free" ? 0 : t.guests
            }
          : t
      )
    );
    showToast(`Table updated to ${newStatus}`);
    await mockDatabaseSave("TABLE_STATUS_UPDATE", { tableId: id, status: newStatus });
  };

  // POS order (admin)
  const addToOrder = (item) => {
    setNewOrder((prev) => {
      const exists = prev.selectedItems.find((i) => i.id === item.id);
      let updatedItems;
      if (exists) {
        updatedItems = prev.selectedItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      } else {
        updatedItems = [...prev.selectedItems, { ...item, quantity: 1 }];
      }
      const newTotal = updatedItems.reduce(
        (sum, i) => sum + i.price * (i.quantity || 1),
        0
      );
      return { ...prev, selectedItems: updatedItems, total: newTotal };
    });
    showToast(`Added ${item.name} to order list`);
  };

  const removeFromOrder = (id) => {
    setNewOrder((prev) => {
      const updatedItems = prev.selectedItems.filter((i) => i.id !== id);
      const newTotal = updatedItems.reduce(
        (sum, i) => sum + i.price * (i.quantity || 1),
        0
      );
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
      phone: newOrder.phone
    });
    setNewOrder({ table: "", selectedItems: [], total: 0, phone: "" });
  };

  // Unified pipeline
  const processUnifiedOrder = async ({
    orderType,
    table,
    items,
    total,
    phone,
    address = ""
  }) => {
    const itemsString = items
      .map((item) => `${item.name} x${item.quantity || 1}`)
      .join(", ");
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const order = {
      id: orderId,
      orderType,
      table: table || null,
      address,
      items: itemsString,
      total,
      status: "preparing",
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      customerPhone: phone
    };
    setOrders((prev) => [order, ...prev]);

    if (orderType === "dine-in" && table) {
      setTables((prev) =>
        prev.map((t) =>
          t.number === table
            ? { ...t, status: "occupied", orderTotal: (t.orderTotal || 0) + total }
            : t
        )
      );
    }

    // Auto inventory depletion
    setInventory((prev) =>
      prev.map((inv) => {
        const lower = itemsString.toLowerCase();
        if (lower.includes("rice") && inv.id === "INV-01")
          return { ...inv, qty: Math.max(0, inv.qty - 1) };
        if (lower.includes("chicken") && inv.id === "INV-02")
          return { ...inv, qty: Math.max(0, inv.qty - 2) };
        if (lower.includes("tilapia") && inv.id === "INV-03")
          return { ...inv, qty: Math.max(0, inv.qty - 1) };
        return inv;
      })
    );

    // Loyalty
    if (phone) {
      const earnedPoints = Math.floor(total / 5);
      setLoyalty((prev) => {
        const checkCust = prev.find((c) => c.phone === phone);
        if (checkCust) {
          const newPoints = checkCust.points + earnedPoints;
          return prev.map((cust) =>
            cust.phone === phone
              ? {
                  ...cust,
                  points: newPoints,
                  tier:
                    newPoints > 150
                      ? "Platinum"
                      : newPoints > 80
                      ? "Gold"
                      : "Bronze"
                }
              : cust
          );
        } else {
          return [
            ...prev,
            {
              id: `C-${Date.now().toString().slice(-3)}`,
              name: "Walk-in Guest",
              phone,
              points: earnedPoints,
              tier: "Bronze"
            }
          ];
        }
      });
    }

    showToast(`Order ${orderId} successfully pushed to Kitchen KDS!`);
    await mockDatabaseSave("NEW_ORDER_PIPELINE", order);
  };

  // Customer scan
  const addToCustomerCart = (item) => {
    setCustomerCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your mobile cart`);
  };

  const changeCustomerQty = (id, amount) => {
    setCustomerCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const target = i.quantity + amount;
            return target > 0 ? { ...i, quantity: target } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const submitCustomerOrder = () => {
    if (customerCart.length === 0) return showToast("Your cart is empty");
    const total = customerCart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    processUnifiedOrder({
      orderType: "dine-in",
      table: parseInt(customerTable),
      items: customerCart,
      total,
      phone: customerPhone
    });
    setCustomerCart([]);
    showToast("✨ Order sent directly to the kitchen!");
  };

  // Remote landing
  const addToRemoteCart = (item) => {
    setRemoteCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your order`);
  };

  const changeRemoteQty = (id, amount) => {
    setRemoteCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const target = i.quantity + amount;
            return target > 0 ? { ...i, quantity: target } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const remoteCartTotal = remoteCart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const submitRemoteOrder = () => {
    if (remoteCart.length === 0) return showToast("Your basket is empty");
    if (!remotePhone) return showToast("Phone number required for order updates");
    if (remoteOrderType === "delivery" && !remoteAddress)
      return showToast("Delivery address required");

    processUnifiedOrder({
      orderType: remoteOrderType,
      table: null,
      items: remoteCart,
      total: remoteCartTotal,
      phone: remotePhone,
      address:
        remoteOrderType === "delivery"
          ? remoteAddress
          : "Pickup at counter"
    });

    setRemoteCart([]);
    setRemoteAddress("");
    showToast(
      remoteOrderType === "delivery"
        ? "🛵 Delivery order sent to the kitchen!"
        : "🥡 Pickup order sent to the kitchen!"
    );
  };

  // Orders
  const triggerReceiptPrint = (order) => {
    alert(
      `=== PRINT RECEIPT ===
Order ID: ${order.id}
Type: ${order.orderType}
${order.table ? `Table Assigned: ${order.table}` : `Address: ${order.address}`}
Breakdown: ${order.items}
Total Charges: £${order.total.toFixed(2)}
====================`
    );
    showToast("Receipt payload routed to wireless printer");
  };

  const fireWhatsAppAlert = (order) => {
    if (!order.customerPhone) return showToast("No phone number linked");
    const msg = encodeURIComponent(
      `Your order ${order.id} status is now [${order.status.toUpperCase()}]. Total due: £${order.total.toFixed(
        2
      )}. Thank you for dining with us!`
    );
    window.open(`https://wa.me/${order.customerPhone}?text=${msg}`, "_blank");
  };

  const updateOrderStatus = async (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: nextStatus } : o
      )
    );
    showToast(`Order updated to ${nextStatus}`);
    await mockDatabaseSave("ORDER_STATUS_UPDATE", { orderId, nextStatus });
  };

  const triggerCloudSync = () => {
    setCloudStatus("Syncing...");
    setTimeout(() => {
      setCloudStatus("Synchronized");
      showToast("Full ecosystem backup complete!");
    }, 1000);
  };

  // Purchase orders
  const raisePurchaseOrder = async () => {
    if (!newPO.itemId || !newPO.qty)
      return showToast("Select an item and quantity");
    const invItem = inventory.find((i) => i.id === newPO.itemId);
    if (!invItem) return showToast("Item not found");

    const po = {
      id: `PO-${Date.now().toString().slice(-4)}`,
      supplier: newPO.supplier,
      itemId: invItem.id,
      itemName: invItem.name,
      qty: parseInt(newPO.qty),
      unit: invItem.unit,
      status: "pending",
      dateRaised: new Date().toISOString().slice(0, 10)
    };

    setPurchaseOrders((prev) => [po, ...prev]);
    showToast(`Purchase order ${po.id} raised with ${po.supplier}`);
    await mockDatabaseSave("PURCHASE_ORDER_RAISED", po);
    setNewPO({ itemId: "", supplier: SUPPLIERS[0], qty: "" });
  };

  const advancePOStatus = async (poId, nextStatus) => {
    const po = purchaseOrders.find((p) => p.id === poId);
    setPurchaseOrders((prev) =>
      prev.map((p) =>
        p.id === poId ? { ...p, status: nextStatus } : p
      )
    );
    if (nextStatus === "received" && po) {
      setInventory((prev) =>
        prev.map((inv) =>
          inv.id === po.itemId
            ? { ...inv, qty: inv.qty + po.qty }
            : inv
        )
      );
      showToast(`${po.qty} ${po.unit}(s) of ${po.itemName} added to stock`);
    } else {
      showToast(`Purchase order ${poId} marked ${nextStatus}`);
    }
    await mockDatabaseSave("PURCHASE_ORDER_STATUS", { poId, nextStatus });
  };

  // Filters
  const filteredMenu =
    menuFilter === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === menuFilter);

  const filteredCustomerMenu =
    customerCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === customerCategory);

  const filteredRemoteMenu =
    remoteCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === remoteCategory);

  const activeLiveOrders = orders.filter((o) => {
    const locationLabel = o.table ? `table ${o.table}` : o.address || "";
    const matchesSearch =
      o.id.toLowerCase().includes(liveSearch.toLowerCase()) ||
      locationLabel.toLowerCase().includes(liveSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (liveStatusFilter === "all-active") return o.status !== "delivered";
    return o.status === liveStatusFilter;
  });

  const customerCartTotal = customerCart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: C.bg,
        color: C.text,
        minHeight: "100vh"
      }}
    >
      {/* Toast */}
      {toast.visible && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: C.blue,
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 10,
            fontWeight: 600,
            zIndex: 1000,
            boxShadow: "0 8px 30px rgba(59,130,246,0.4)"
          }}
        >
          🚀 {toast.msg}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          background: C.surface,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${C.border}`,
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: C.green,
              color: "#000",
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 6
            }}
          >
            SASS
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.15rem" }}>
            Smart Restaurant Hub
          </span>
          <select
            value={currentBranch}
            onChange={(e) => {
              setCurrentBranch(e.target.value);
              showToast("Switched terminal views.");
            }}
            style={{
              padding: "6px 12px",
              background: C.card,
              color: C.text,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              marginLeft: 10
            }}
          >
            {BRANCHES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <button
            onClick={triggerCloudSync}
            style={{
              background: C.card,
              color: C.text,
              border: `1px solid ${C.border}`,
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "0.85rem"
            }}
          >
            ☁️ Database State:{" "}
            <strong style={{ color: C.green }}>{cloudStatus}</strong>
          </button>
          <div
            style={{
              fontFamily: "monospace",
              background: C.card,
              padding: "6px 12px",
              borderRadius: 6,
              border: `1px solid ${C.border}`
            }}
          >
            LIVE • {clock}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        {/* KPI board */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 24,
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              background: C.card,
              padding: 20,
              borderRadius: 12,
              flex: 1,
              minWidth: 220,
              border: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                color: C.muted,
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              STAFF PRESENT
            </div>
            <div
              style={{
                fontSize: "2.4rem",
                color: C.purple,
                fontWeight: 700
              }}
            >
              {presentStaff}{" "}
              <span style={{ fontSize: "1.2rem", color: C.muted }}>
                of {staff.length}
              </span>
            </div>
          </div>

          <div
            style={{
              background: C.card,
              padding: 20,
              borderRadius: 12,
              flex: 1,
              minWidth: 220,
              border: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                color: C.muted,
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              OCCUPIED TABLES
            </div>
            <div
              style={{
                fontSize: "2.4rem",
                color: C.amber,
                fontWeight: 700
              }}
            >
              {occupiedTables}{" "}
              <span style={{ fontSize: "1.2rem", color: C.muted }}>
                Active
              </span>
            </div>
          </div>

          <div
            style={{
              background: C.card,
              padding: 20,
              borderRadius: 12,
              flex: 1,
              minWidth: 220,
              border: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                color: C.muted,
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              REVENUE ENGINE
            </div>
            <div
              style={{
                fontSize: "2.4rem",
                color: C.green,
                fontWeight: 700
              }}
            >
              £{totalRevenue.toFixed(2)}
            </div>
          </div>

          <div
            style={{
              background: C.card,
              padding: 20,
              borderRadius: 12,
              flex: 1,
              minWidth: 220,
              border: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                color: C.muted,
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              OPEN SUPPLIER POs
            </div>
            <div
              style={{
                fontSize: "2.4rem",
                color: C.red,
                fontWeight: 700
              }}
            >
              {pendingPOs}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
            background: C.surface,
            padding: 8,
            borderRadius: 12,
            border: `1px solid ${C.border}`
          }}
        >
          {TAB_LIST.map((t) => {
            const isHighlight =
              t.key === "customer_scan" ||
              t.key === "remote_landing" ||
              t.key === "purchase_orders";
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: isHighlight
                    ? active
                      ? C.green
                      : "rgba(37,211,102,0.15)"
                    : active
                    ? C.blue
                    : "transparent",
                  color: isHighlight
                    ? active
                      ? "#000"
                      : C.green
                    : active
                    ? "#fff"
                    : C.muted,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease"
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 20
            }}
          >
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 20,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>📊 Popular Items</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem"
                }}
              >
                <thead>
                  <tr style={{ color: C.muted }}>
                    <th style={{ textAlign: "left", padding: "6px 4px" }}>
                      Item
                    </th>
                    <th style={{ textAlign: "right", padding: "6px 4px" }}>
                      Sales
                    </th>
                    <th style={{ textAlign: "right", padding: "6px 4px" }}>
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {POPULAR_ITEMS.map((p) => (
                    <tr key={p.name}>
                      <td style={{ padding: "6px 4px" }}>{p.name}</td>
                      <td
                        style={{
                          padding: "6px 4px",
                          textAlign: "right"
                        }}
                      >
                        {p.sales}
                      </td>
                      <td
                        style={{
                          padding: "6px 4px",
                          textAlign: "right",
                          color: C.green
                        }}
                      >
                        £{p.revenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 20,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>🪑 Table Status</h3>
              {tables.map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: `1px dashed ${C.border}`
                  }}
                >
                  <span>
                    Table {t.number}{" "}
                    <span style={{ color: C.muted }}>
                      ({t.status.replace("-", " ")})
                    </span>
                  </span>
                  <span style={{ color: C.green }}>
                    £{(t.orderTotal || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIVE ORDERS */}
        {tab === "live_orders" && (
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.border}`
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
                flexWrap: "wrap"
              }}
            >
              <h3 style={{ margin: 0 }}>🔴 Live Order Pipeline</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  placeholder="Search by ID or location..."
                  value={liveSearch}
                  onChange={(e) => setLiveSearch(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                />
                <select
                  value={liveStatusFilter}
                  onChange={(e) => setLiveStatusFilter(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                >
                  <option value="all-active">All Active</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem"
                }}
              >
                <thead>
                  <tr style={{ color: C.muted }}>
                    <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Type</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Location</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Items</th>
                    <th style={{ textAlign: "right", padding: 8 }}>Total</th>
                    <th style={{ textAlign: "center", padding: 8 }}>Status</th>
                    <th style={{ textAlign: "center", padding: 8 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeLiveOrders.map((o) => (
                    <tr key={o.id}>
                      <td style={{ padding: 8 }}>{o.id}</td>
                      <td style={{ padding: 8 }}>{o.orderType}</td>
                      <td style={{ padding: 8 }}>
                        {o.table ? `Table ${o.table}` : o.address}
                      </td>
                      <td style={{ padding: 8 }}>{o.items}</td>
                      <td
                        style={{
                          padding: 8,
                          textAlign: "right",
                          color: C.green
                        }}
                      >
                        £{o.total.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          textAlign: "center",
                          textTransform: "capitalize"
                        }}
                      >
                        {o.status}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {o.status === "preparing" && (
                          <button
                            onClick={() => updateOrderStatus(o.id, "ready")}
                            style={{
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: "none",
                              background: C.amber,
                              color: "#000",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              marginRight: 4
                            }}
                          >
                            Mark Ready
                          </button>
                        )}
                        {o.status === "ready" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(o.id, "delivered")
                            }
                            style={{
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: "none",
                              background: C.green,
                              color: "#000",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              marginRight: 4
                            }}
                          >
                            Mark Delivered
                          </button>
                        )}
                        <button
                          onClick={() => triggerReceiptPrint(o)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: `1px solid ${C.border}`,
                            background: C.surface,
                            color: C.text,
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            marginRight: 4
                          }}
                        >
                          🧾 Receipt
                        </button>
                        <button
                          onClick={() => fireWhatsAppAlert(o)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "none",
                            background: "#25D366",
                            color: "#000",
                            fontSize: "0.75rem",
                            cursor: "pointer"
                          }}
                        >
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activeLiveOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: 16,
                          textAlign: "center",
                          color: C.muted
                        }}
                      >
                        No matching active orders.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENU + POS CART */}
        {tab === "menu" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 24
            }}
          >
            <div
              style={{
                background: C.card,
                borderRadius: 14,
                padding: 24,
                border: `1px solid ${C.border}`
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: 12
                }}
              >
                <h3 style={{ margin: 0 }}>🍽️ Menu Catalog</h3>
                <div style={{ display: "flex", gap: 8 }}>
                  {["All", "Main", "Drink", "Side"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setMenuFilter(cat)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        background:
                          menuFilter === cat ? C.blue : C.surface,
                        color: menuFilter === cat ? "#fff" : C.text,
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 20
                }}
              >
                {filteredMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAdd={addToOrder}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: C.surface,
                borderRadius: 14,
                padding: 20,
                border: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}
            >
              <h3 style={{ marginTop: 0 }}>📝 POS Order Builder</h3>
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Table
                </label>
                <select
                  value={newOrder.table}
                  onChange={(e) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      table: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    color: C.text
                  }}
                >
                  <option value="">Select table</option>
                  {tables.map((t) => (
                    <option key={t.id} value={t.number}>
                      Table {t.number}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Customer Phone (for loyalty)
                </label>
                <input
                  value={newOrder.phone}
                  onChange={(e) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      phone: e.target.value
                    }))
                  }
                  placeholder="e.g. 447700998888"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    color: C.text
                  }}
                />
              </div>

              <div
                style={{
                  maxHeight: 220,
                  overflowY: "auto",
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  padding: 8
                }}
              >
                {newOrder.selectedItems.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 16,
                      color: C.muted,
                      fontSize: "0.85rem"
                    }}
                  >
                    No items yet. Add from the menu on the left.
                  </div>
                )}
                {newOrder.selectedItems.map((i) => (
                  <div
                    key={i.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 0",
                      borderBottom: `1px dashed ${C.border}`
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.9rem" }}>{i.name}</div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: C.muted
                        }}
                      >
                        x{i.quantity} • £
                        {(i.price * i.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromOrder(i.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: C.red,
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "auto",
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 10
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8
                  }}
                >
                  <span>Subtotal</span>
                  <span style={{ color: C.green, fontWeight: 700 }}>
                    £{newOrder.total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={addOrder}
                  disabled={
                    !newOrder.table || newOrder.selectedItems.length === 0
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "none",
                    background:
                      !newOrder.table || newOrder.selectedItems.length === 0
                        ? C.border
                        : C.green,
                    color:
                      !newOrder.table || newOrder.selectedItems.length === 0
                        ? C.muted
                        : "#000",
                    fontWeight: 700,
                    cursor:
                      !newOrder.table || newOrder.selectedItems.length === 0
                        ? "not-allowed"
                        : "pointer"
                  }}
                >
                  🚀 Send to Kitchen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS (simple list) */}
        {tab === "orders" && (
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.border}`
            }}
          >
            <h3 style={{ marginTop: 0 }}>🧾 All Orders</h3>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {orders.map((o) => (
                <div
                  key={o.id}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    padding: "8px 0"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem"
                    }}
                  >
                    <span>
                      <strong>{o.id}</strong> • {o.orderType} •{" "}
                      {o.table ? `Table ${o.table}` : o.address}
                    </span>
                    <span style={{ color: C.green }}>
                      £{o.total.toFixed(2)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      marginTop: 2
                    }}
                  >
                    {o.items}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KDS */}
        {tab === "kds" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16
            }}
          >
            {["preparing", "ready", "delivered"].map((status) => (
              <div
                key={status}
                style={{
                  background: C.card,
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${C.border}`
                }}
              >
                <h4 style={{ marginTop: 0, textTransform: "capitalize" }}>
                  {status === "preparing"
                    ? "👨‍🍳 In Progress"
                    : status === "ready"
                    ? "✅ Ready to Serve"
                    : "🚚 Completed"}
                </h4>
                {orders
                  .filter((o) => o.status === status)
                  .map((o) => (
                    <div
                      key={o.id}
                      style={{
                        borderRadius: 8,
                        border: `1px solid ${C.border}`,
                        padding: 8,
                        marginBottom: 8,
                        fontSize: "0.85rem"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <span>
                          <strong>{o.id}</strong> •{" "}
                          {o.table ? `Table ${o.table}` : o.orderType}
                        </span>
                        <span>{o.time}</span>
                      </div>
                      <div style={{ color: C.muted, marginTop: 4 }}>
                        {o.items}
                      </div>
                    </div>
                  ))}
                {orders.filter((o) => o.status === status).length === 0 && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      marginTop: 8
                    }}
                  >
                    No orders in this lane.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* QR */}
        {tab === "qr" && (
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.border}`
            }}
          >
            <h3 style={{ marginTop: 0 }}>📱 QR Terminal Generation</h3>
            <p style={{ color: C.muted, fontSize: "0.85rem" }}>
              Conceptual view: each table gets a QR code that opens the
              Customer Scan experience.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
                marginTop: 12
              }}
            >
              {tables.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: C.surface,
                    borderRadius: 10,
                    padding: 12,
                    border: `1px solid ${C.border}`
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 6
                    }}
                  >
                    Table {t.number}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      marginBottom: 8
                    }}
                  >
                    Status: {t.status}
                  </div>
                  <div
                    style={{
                      height: 80,
                      borderRadius: 8,
                      border: `1px dashed ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      color: C.muted
                    }}
                  >
                    QR CODE HERE
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER TABLE-SCAN */}
        {tab === "customer_scan" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 24,
              background: "rgba(255,255,255,0.02)",
              padding: 24,
              borderRadius: 16,
              border: `1px dashed ${C.green}`
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: 12
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: C.green }}>
                    📱 Customer Mobile Browser Simulator
                  </h3>
                  <p
                    style={{
                      color: C.muted,
                      margin: "4px 0 0 0",
                      fontSize: "0.85rem"
                    }}
                  >
                    This is what a diner sees on their phone after scanning
                    the tabletop QR code.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: C.card,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted
                    }}
                  >
                    Simulating Table
                  </label>
                  <select
                    value={customerTable}
                    onChange={(e) => setCustomerTable(e.target.value)}
                    style={{
                      background: C.surface,
                      color: "#fff",
                      border: "none",
                      fontWeight: "bold"
                    }}
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.number}>
                        Table {t.number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["All", "Main", "Drink", "Side"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCustomerCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      background:
                        customerCategory === cat ? C.green : C.surface,
                      color:
                        customerCategory === cat ? "#000" : C.text,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.8rem"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 14
                }}
              >
                {filteredCustomerMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAdd={addToCustomerCart}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: C.surface,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div
                  style={{
                    textAlign: "center",
                    borderBottom: `1px solid ${C.border}`,
                    paddingBottom: 15,
                    marginBottom: 15
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold"
                    }}
                  >
                    ⚡ Direct Guest Checkout
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: C.green,
                      marginTop: 4
                    }}
                  >
                    📍 Logged in via QR code: Table {customerTable}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      display: "block",
                      marginBottom: 6
                    }}
                  >
                    Enter Mobile Number for Loyalty Rewards:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 447700998888"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: C.card,
                      color: "#fff",
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: "0.9rem"
                    }}
                  />
                </div>

                <div style={{ maxHeight: 250, overflowY: "auto" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      fontWeight: "bold"
                    }}
                  >
                    Cart Summary:
                  </span>
                  {customerCart.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "30px 10px",
                        color: C.muted,
                        fontSize: "0.85rem",
                        fontStyle: "italic"
                      }}
                    >
                      Your basket is empty. Choose food from the menu on the
                      left.
                    </div>
                  ) : (
                    customerCart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          background: C.card,
                          borderRadius: 8,
                          margin: "6px 0",
                          border: `1px solid ${C.border}`
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "600"
                            }}
                          >
                            {item.name}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              color: C.green
                            }}
                          >
                            £
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                          }}
                        >
                          <button
                            onClick={() =>
                              changeCustomerQty(item.id, -1)
                            }
                            style={{
                              background: C.surface,
                              border: "none",
                              color: "#fff",
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: "bold" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeCustomerQty(item.id, 1)
                            }
                            style={{
                              background: C.surface,
                              border: "none",
                              color: "#fff",
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 15,
                  marginTop: 15
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    fontSize: "1.1rem",
                    fontWeight: "bold"
                  }}
                >
                  <span>Subtotal:</span>
                  <span style={{ color: C.green }}>
                    £{customerCartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={submitCustomerOrder}
                  disabled={customerCart.length === 0}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background:
                      customerCart.length === 0 ? C.border : C.green,
                    color: "#000",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor:
                      customerCart.length === 0
                        ? "not-allowed"
                        : "pointer"
                  }}
                >
                  🚀 Push Order to Kitchen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REMOTE LANDING */}
        {tab === "remote_landing" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 24,
              background: "rgba(255,255,255,0.02)",
              padding: 24,
              borderRadius: 16,
              border: `1px dashed ${C.blue}`
            }}
          >
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ margin: 0, color: C.blue }}>
                  🛵 Remote Order Landing Page
                </h3>
                <p
                  style={{
                    color: C.muted,
                    margin: "4px 0 0 0",
                    fontSize: "0.85rem"
                  }}
                >
                  What a customer sees when they order online for delivery or
                  pickup — no table or QR code involved.
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button
                  onClick={() => setRemoteOrderType("delivery")}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: 10,
                    border: `2px solid ${
                      remoteOrderType === "delivery"
                        ? C.blue
                        : C.border
                    }`,
                    background:
                      remoteOrderType === "delivery"
                        ? "rgba(59,130,246,0.12)"
                        : C.surface,
                    color:
                      remoteOrderType === "delivery"
                        ? C.blue
                        : C.muted,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  🚗 Delivery
                </button>
                <button
                  onClick={() => setRemoteOrderType("pickup")}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: 10,
                    border: `2px solid ${
                      remoteOrderType === "pickup"
                        ? C.amber
                        : C.border
                    }`,
                    background:
                      remoteOrderType === "pickup"
                        ? "rgba(245,158,11,0.12)"
                        : C.surface,
                    color:
                      remoteOrderType === "pickup"
                        ? C.amber
                        : C.muted,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  🥡 Pickup
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.8fr",
                  gap: 16,
                  marginBottom: 20
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      display: "block",
                      marginBottom: 4
                    }}
                  >
                    Name
                  </label>
                  <input
                    value={remoteName}
                    onChange={(e) => setRemoteName(e.target.value)}
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      background: C.card,
                      color: C.text,
                      fontSize: "0.85rem"
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      display: "block",
                      marginBottom: 4
                    }}
                  >
                    Phone
                  </label>
                  <input
                    value={remotePhone}
                    onChange={(e) => setRemotePhone(e.target.value)}
                    placeholder="4477009xxxxx"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      background: C.card,
                      color: C.text,
                      fontSize: "0.85rem"
                    }}
                  />
                </div>
              </div>

              {remoteOrderType === "delivery" && (
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      display: "block",
                      marginBottom: 4
                    }}
                  >
                    Delivery Address
                  </label>
                  <textarea
                    value={remoteAddress}
                    onChange={(e) => setRemoteAddress(e.target.value)}
                    placeholder="House number, street, city, postcode"
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      background: C.card,
                      color: C.text,
                      fontSize: "0.85rem",
                      resize: "vertical"
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["All", "Main", "Drink", "Side"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setRemoteCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      background:
                        remoteCategory === cat ? C.blue : C.surface,
                      color:
                        remoteCategory === cat ? "#fff" : C.text,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.8rem"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 14
                }}
              >
                {filteredRemoteMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAdd={addToRemoteCart}
                    accentColor={C.blue}
                    accentBg="rgba(59,130,246,0.1)"
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: C.surface,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h3 style={{ marginTop: 0 }}>
                  {remoteOrderType === "delivery"
                    ? "🚗 Delivery Basket"
                    : "🥡 Pickup Basket"}
                </h3>
                <div style={{ maxHeight: 260, overflowY: "auto" }}>
                  {remoteCart.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: 20,
                        color: C.muted,
                        fontSize: "0.85rem"
                      }}
                    >
                      No items yet. Add from the menu on the left.
                    </div>
                  ) : (
                    remoteCart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                          borderBottom: `1px dashed ${C.border}`
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 600
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: C.green
                            }}
                          >
                            £
                            {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                          }}
                        >
                          <button
                            onClick={() =>
                              changeRemoteQty(item.id, -1)
                            }
                            style={{
                              background: C.surface,
                              border: "none",
                              color: "#fff",
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: "bold" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeRemoteQty(item.id, 1)
                            }
                            style={{
                              background: C.surface,
                              border: "none",
                              color: "#fff",
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 12,
                  marginTop: 12
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: C.blue, fontWeight: 700 }}>
                    £{remoteCartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={submitRemoteOrder}
                  disabled={remoteCart.length === 0}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 8,
                    border: "none",
                    background:
                      remoteCart.length === 0 ? C.border : C.blue,
                    color: "#fff",
                    fontWeight: 700,
                    cursor:
                      remoteCart.length === 0
                        ? "not-allowed"
                        : "pointer"
                  }}
                >
                  🚀 Place {remoteOrderType === "delivery"
                    ? "Delivery"
                    : "Pickup"}{" "}
                  Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PURCHASE ORDERS */}
        {tab === "purchase_orders" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.9fr",
              gap: 20
            }}
          >
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>🧾 Raise Purchase Order</h3>
              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Inventory Item
                </label>
                <select
                  value={newPO.itemId}
                  onChange={(e) =>
                    setNewPO((prev) => ({
                      ...prev,
                      itemId: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text
                  }}
                >
                  <option value="">Select item</option>
                  {inventory.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.name} (Current: {inv.qty} {inv.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Supplier
                </label>
                <select
                  value={newPO.supplier}
                  onChange={(e) =>
                    setNewPO((prev) => ({
                      ...prev,
                      supplier: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text
                  }}
                >
                  {SUPPLIERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  value={newPO.qty}
                  onChange={(e) =>
                    setNewPO((prev) => ({
                      ...prev,
                      qty: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text
                  }}
                />
              </div>

              <button
                onClick={raisePurchaseOrder}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: C.green,
                  color: "#000",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🚚 Raise Purchase Order
              </button>
            </div>

            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>📦 Supplier Orders</h3>
              <div style={{ maxHeight: 360, overflowY: "auto" }}>
                {purchaseOrders.map((po) => (
                  <div
                    key={po.id}
                    style={{
                      borderBottom: `1px solid ${C.border}`,
                      padding: "8px 0",
                      fontSize: "0.85rem"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>
                        <strong>{po.id}</strong> • {po.supplier}
                      </span>
                      <span>{po.dateRaised}</span>
                    </div>
                    <div style={{ color: C.muted, marginTop: 2 }}>
                      {po.itemName} • {po.qty} {po.unit}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 4
                      }}
                    >
                      <span
                        style={{
                          textTransform: "capitalize",
                          color:
                            po.status === "pending"
                              ? C.amber
                              : po.status === "shipped"
                              ? C.blue
                              : C.green
                        }}
                      >
                        {po.status}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {po.status === "pending" && (
                          <button
                            onClick={() =>
                              advancePOStatus(po.id, "shipped")
                            }
                            style={{
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: "none",
                              background: C.blue,
                              color: "#fff",
                              fontSize: "0.75rem",
                              cursor: "pointer"
                            }}
                          >
                            Mark Shipped
                          </button>
                        )}
                        {po.status !== "received" && (
                          <button
                            onClick={() =>
                              advancePOStatus(po.id, "received")
                            }
                            style={{
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: "none",
                              background: C.green,
                              color: "#000",
                              fontSize: "0.75rem",
                              cursor: "pointer"
                            }}
                          >
                            Mark Received
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {purchaseOrders.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 16,
                      color: C.muted
                    }}
                  >
                    No purchase orders yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {tab === "inventory" && (
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.border}`
            }}
          >
            <h3 style={{ marginTop: 0 }}>📦 Inventory</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem"
              }}
            >
              <thead>
                <tr style={{ color: C.muted }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Item</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Qty</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Min</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Unit</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ padding: 8 }}>{inv.name}</td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: "right",
                        color:
                          inv.qty <= inv.minQty ? C.red : C.text
                      }}
                    >
                      {inv.qty}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: "right",
                        color: C.muted
                      }}
                    >
                      {inv.minQty}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: "right"
                      }}
                    >
                      {inv.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LOYALTY */}
        {tab === "loyalty" && (
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.border}`
            }}
          >
            <h3 style={{ marginTop: 0 }}>🎁 Loyalty & CRM</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem"
              }}
            >
              <thead>
                <tr style={{ color: C.muted }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Name</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Phone</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Points</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Tier</th>
                </tr>
              </thead>
              <tbody>
                {loyalty.map((c) => (
                  <tr key={c.id}>
                    <td style={{ padding: 8 }}>{c.name}</td>
                    <td style={{ padding: 8 }}>{c.phone}</td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: "right"
                      }}
                    >
                      {c.points}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: "right",
                        color:
                          c.tier === "Platinum"
                            ? C.purple
                            : c.tier === "Gold"
                            ? C.amber
                            : C.muted
                      }}
                    >
                      {c.tier}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* STAFF */}
        {tab === "staff" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.9fr",
              gap: 20
            }}
          >
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>👤 Staff Check-In</h3>
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Staff ID (optional)
                </label>
                <input
                  value={form.id}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, id: e.target.value }))
                  }
                  placeholder="Leave blank to auto-generate"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                >
                  {STAFF_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: C.muted,
                    display: "block",
                    marginBottom: 4
                  }}
                >
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: "0.85rem"
                  }}
                />
              </div>
              <button
                onClick={doStaffCheckIn}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: C.green,
                  color: "#000",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                ✅ Clock In / Register
              </button>
            </div>

            <div
              style={{
                background: C.card,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 style={{ marginTop: 0 }}>👥 Staff Roster</h3>
              <div style={{ maxHeight: 360, overflowY: "auto" }}>
                {staff.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      borderBottom: `1px solid ${C.border}`,
                      padding: "8px 0",
                      fontSize: "0.85rem"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>
                        <strong>{s.name}</strong> • {s.role}
                        {isLate(s.checkInTime) && s.status === "in" && (
                          <span
                            style={{
                              marginLeft: 6,
                              color: C.amber,
                              fontSize: "0.75rem"
                            }}
                          >
                            (Late)
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          color: s.status === "in" ? C.green : C.muted
                        }}
                      >
                        {s.status === "in" ? "On Shift" : "Off Shift"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                        color: C.muted
                      }}
                    >
                      <span>
                        In: {s.checkInTime || "--"} • Out:{" "}
                        {s.checkOutTime || "--"}
                      </span>
                      <span>{s.phone}</span>
                    </div>
                    <div style={{ marginTop: 4 }}>
                      {s.status === "in" ? (
                        <button
                          onClick={() => clockOutStaff(s.id)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "none",
                            background: C.red,
                            color: "#fff",
                            fontSize: "0.75rem",
                            cursor: "pointer"
                          }}
                        >
                          Clock Out
                        </button>
                      ) : (
                        <button
                          onClick={() => clockInAgain(s.id)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "none",
                            background: C.green,
                            color: "#000",
                            fontSize: "0.75rem",
                            cursor: "pointer"
                          }}
                        >
                          Clock In Again
                        </button>
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

