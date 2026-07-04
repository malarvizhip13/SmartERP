import { useState, useEffect } from "react";

function Stock() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState([]);

  // 📄 GET STOCK
  const fetchStock = async () => {
    const res = await fetch("http://localhost:5000/api/stock");
    const data = await res.json();
    setStocks(data);
  };

  // ➕ SAVE STOCK
  const saveStock = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: itemName,
        category,
        quantity: Number(quantity) || 0,
        price: Number(price) || 0,
      }),
    });

    await res.json();

    fetchStock();

    setItemName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <h2>Stock Management</h2>

      {/* FORM */}
      <form onSubmit={saveStock}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

        <button type="submit">Save Stock</button>
      </form>

      {/* LIST */}
      <h3>Stock List</h3>

      {stocks.length === 0 ? (
        <p>No Stock Found</p>
      ) : (
        stocks.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{s.item_name}</h4>
            <p>Category: {s.category}</p>
            <p>Qty: {s.quantity}</p>
            <p>Price: ₹{s.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Stock;