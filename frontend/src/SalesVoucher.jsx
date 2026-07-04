import { useState, useEffect } from "react";

function SalesVoucher() {
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState([]);

  // 📄 GET SALES
  const fetchSales = async () => {
    const res = await fetch("http://localhost:5000/api/sales");
    const data = await res.json();
    setSales(data);
  };

  // ➕ SAVE SALE
  const saveSale = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: customer,
        item_name: item,
        quantity: Number(quantity) || 0,
        price: Number(price) || 0,
      }),
    });

    fetchSales();

    setCustomer("");
    setItem("");
    setQuantity("");
    setPrice("");
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Sales Voucher</h2>

      {/* FORM */}
      <form onSubmit={saveSale}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Item Name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <button type="submit">Save Sale</button>
      </form>

      {/* LIST */}
      <h3>Sales List</h3>

      {sales.length === 0 ? (
        <p>No Sales Found</p>
      ) : (
        sales.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{s.item_name}</h4>
            <p>Customer: {s.customer_name}</p>
            <p>Qty: {s.quantity}</p>
            <p>Price: ₹{s.price}</p>
            <p>Total: ₹{s.quantity * s.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SalesVoucher;