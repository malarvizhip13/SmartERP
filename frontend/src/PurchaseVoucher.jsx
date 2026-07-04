import { useState, useEffect } from "react";

function PurchaseVoucher() {
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchases, setPurchases] = useState([]);

  // 📄 GET PURCHASES
  const fetchPurchases = async () => {
    const res = await fetch("http://localhost:5000/api/purchase");
    const data = await res.json();
    setPurchases(data);
  };

  // ➕ SAVE PURCHASE
  const savePurchase = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplier_name: supplier,
        item_name: item,
        quantity: Number(quantity) || 0,
        price: Number(price) || 0,
      }),
    });

    fetchPurchases();

    setSupplier("");
    setItem("");
    setQuantity("");
    setPrice("");
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div>
      <h2>Purchase Voucher</h2>

      {/* FORM */}
      <form onSubmit={savePurchase}>
        <input
          type="text"
          placeholder="Supplier Name"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
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

        <button type="submit">Save Purchase</button>
      </form>

      {/* LIST */}
      <h3>Purchase List</h3>

      {purchases.length === 0 ? (
        <p>No Purchases Found</p>
      ) : (
        purchases.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{p.item_name}</h4>
            <p>Supplier: {p.supplier_name}</p>
            <p>Qty: {p.quantity}</p>
            <p>Price: ₹{p.price}</p>
            <p>Total: ₹{p.quantity * p.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PurchaseVoucher;