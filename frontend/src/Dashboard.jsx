import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [companies, setCompanies] = useState([]);
const navigate = useNavigate();
  const fetchCompanies = async () => {
    const res = await fetch("http://localhost:5000/api/companies");
    const data = await res.json();
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  return (
    <div className="dashboard">
      <h1>SmartERP Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>Total Companies</h2>
          <p>{companies.length}</p>
        </div>

        <div className="card">
          <h2>Total Employees</h2>
          <p>0</p>
        </div>

        <div className="card">
          <h2>Total Products</h2>
          <p>0</p>
        </div>

        <div className="card">
          <h2>Total Sales</h2>
          <p>₹0</p>
        </div>
<div className="recent">
  <h2>Recent Companies</h2>

  {companies.slice(0, 5).map((c) => (
    <div key={c.id} className="recent-card">
      <h4>{c.company_name}</h4>
      <p>{c.email}</p>
    </div>
  ))}
</div>

      </div>
      <button onClick={() => navigate("/ledger")}>
  Go to Ledger
</button>
<button onClick={() => navigate("/group")}>
  Go to Group
</button>
<button onClick={() => navigate("/stock")}>
  Go to Stock
</button>
<button onClick={() => navigate("/purchase")}>
  Go to Purchase
</button>
<button onClick={() => navigate("/sales")}>
  Go to Sales
</button>
    </div>
  );
}

export default Dashboard;