const API_BASE = process.env.REACT_APP_API_URL || "";

export async function fetchMenu() {
  const res = await fetch(`${API_BASE}/api/menu`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function saveCart(cartId, items) {
  const res = await fetch(`${API_BASE}/api/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartId, items })
  });
  return res.json();
}

export async function loadCart(cartId) {
  const res = await fetch(`${API_BASE}/api/carts/${cartId}`);
  if (!res.ok) return { items: [] };
  return res.json();
}

export async function placeOrder(orderBody) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderBody)
  });
  return res.json();
}
