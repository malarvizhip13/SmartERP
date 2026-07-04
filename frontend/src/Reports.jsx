import { useEffect, useState } from "react";

function Reports() {
  const [sales, setSales] = useState(0);
  const [purchase, setPurchase] = useState(0);
  const [stock, setStock] = useState({
    totalItems: 0,
    totalQty: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const salesRes = await fetch("http://localhost:5000/api/reports/sales-total");
    const salesData = await salesRes.json();

    const purchaseRes = await fetch("http://localhost:5000/api/reports/purchase-total");
    const purchaseData = await purchaseRes.json();

    const stockRes = await fetch("http://localhost:5000/api/reports/stock-summary");
    const stockData = await stockRes.json();

    setSales(salesData.total);
    setPurchase(purchaseData.total);
    setStock(stockData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reports Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
          <h3>Total Sales</h3>
          <h2>₹{sales}</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
          <h3>Total Purchase</h3>
          <h2>₹{purchase}</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
          <h3>Profit</h3>
          <h2>₹{sales - purchase}</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
          <h3>Total Stock Items</h3>
          <h2>{stock.totalItems}</h2>
          <p>Quantity: {stock.totalQty}</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;