
import { useState, useEffect } from "react";
function Ledger() {
  const [ledgerName, setLedgerName] = useState("");
  const [ledgerType, setLedgerType] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
const [ledgers, setLedgers] = useState([]);
  const saveLedger = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/ledgers", {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ledger_name: ledgerName,
      ledger_type: ledgerType,
      opening_balance: openingBalance,
      phone,
      email,
      address,
      
    }),
    
  });
const data = await res.json();

console.log(data);

fetchLedgers();
};
const fetchLedgers = async () => {
  const res = await fetch("http://localhost:5000/api/ledgers");
  const data = await res.json();
  setLedgers(data);
};
useEffect(() => {
  fetchLedgers();
}, []);

  return (
    <div>
      <form onSubmit={saveLedger}>
      <h2>Ledger Management</h2>

      <input
        type="text"
        placeholder="Ledger Name"
        value={ledgerName}
        onChange={(e) => setLedgerName(e.target.value)}
      />
      <br /><br />

      <select
        value={ledgerType}
        onChange={(e) => setLedgerType(e.target.value)}
      >
        <option value="">Select Ledger Type</option>
        <option value="Customer">Customer</option>
        <option value="Supplier">Supplier</option>
        <option value="Bank">Bank</option>
        <option value="Cash">Cash</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Opening Balance"
        value={openingBalance}
        onChange={(e) => setOpeningBalance(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <button type="submit">Save Ledger</button>
      </form>
      <h3>Ledger List</h3>

{ledgers.length === 0 ? (
  <p>No Ledgers Found</p>
) : (
  ledgers.map((ledger) => (
    <div
      key={ledger.id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h4>{ledger.ledger_name}</h4>
      <p>Type: {ledger.ledger_type}</p>
      <p>Opening Balance: ₹{ledger.opening_balance}</p>
      <p>Phone: {ledger.phone}</p>
      <p>Email: {ledger.email}</p>
      <p>Address: {ledger.address}</p>
    </div>
  ))
)}
    </div>
  );
}

export default Ledger;