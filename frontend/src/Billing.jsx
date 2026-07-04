import { useState, useEffect } from "react";

function Billing() {
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const [cart, setCart] = useState([]);
  const [bills, setBills] = useState([]);

  // 📄 GET BILLS
  const fetchBills = async () => {
    const res = await fetch("http://localhost:5000/api/bills");
    const data = await res.json();
    setBills(data);
  };

  // ➕ ADD TO CART
  const addToCart = () => {
    if (!item || !qty || !price) return;

    const newItem = {
      item,
      qty: Number(qty),
      price: Number(price),
      total: Number(qty) * Number(price),
    };

    setCart([...cart, newItem]);

    setItem("");
    setQty("");
    setPrice("");
  };

  // 💰 FINAL BILL SAVE
  const saveBill = async () => {
    const total = cart.reduce((sum, i) => sum + i.total, 0);

    await fetch("http://localhost:5000/api/bills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: customer,
        items: cart,
        total: total,
      }),
    });

    setCart([]);
    setCustomer("");

    fetchBills();
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div>
      <h2>Billing System</h2>

      {/* CUSTOMER */}
      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <br /><br />

      {/* ITEM ENTRY */}
      <input
        type="text"
        placeholder="Item Name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <input
        type="number"
        placeholder="Qty"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addToCart}>Add Item</button>

      {/* CART */}
      <h3>Cart</h3>

      {cart.map((c, i) => (
        <div key={i}>
          {c.item} - {c.qty} x ₹{c.price} = ₹{c.total}
        </div>
      ))}

      <h3>
        Total: ₹{cart.reduce((sum, i) => sum + i.total, 0)}
      </h3>

      <button onClick={saveBill}>Save Bill</button>

      {/* BILL LIST */}
      <h3>Saved Bills</h3>

      {bills.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{b.customer_name}</h4>
          <p>Total: ₹{b.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Billing;