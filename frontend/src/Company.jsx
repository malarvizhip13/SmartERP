import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Company.css';
function Company() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [companies, setCompanies] = useState([]);
  const [gstNumber, setGstNumber] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
const saveCompany = async (e) => {
     e.preventDefault(); 
  const res = await fetch("http://localhost:5000/api/companies", {
 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: "demo-user",
      company_name: companyName,
      address,
      gst_number: gstNumber,
      financial_year: financialYear,
      state,
      phone,
      email,
      
    }),
  });
  const data = await res.json();
console.log(data);

if (data) {
  navigate("/dashboard");
}
fetchCompanies();

setCompanyName("");
setAddress("");
setGstNumber("");
setFinancialYear("");
setState("");
setPhone("");
setEmail("");
};
const fetchCompanies = async () => {
  try{
  const res = await fetch("http://localhost:5000/api/companies");
  const data = await res.json();
  setCompanies(data);
   } catch (err) {
    console.log("Error fetching companies:", err);
    setCompanies([]);
  }
};
useEffect(() => {
  fetchCompanies();
}, []);
const deleteCompany = async (id) => {
  await fetch(`http://localhost:5000/api/companies/${id}`, {
    method: "DELETE",
  });

  fetchCompanies(); 
};

  return (
    <div>
       <form onSubmit={saveCompany}>
        
      <h2>Company Management</h2>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="GST Number"
        value={gstNumber}
        onChange={(e) => setGstNumber(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Financial Year"
        value={financialYear}
        onChange={(e) => setFinancialYear(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
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

     <button type="submit">Save Company</button>
    
     </form>
     <h3>Company List</h3>

{companies.length === 0 ? (
  <p>No companies found.</p>
) : (
  companies.map((company) => (
    <div
      key={company.id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h4>{company.company_name}</h4>
      <p>Address: {company.address}</p>
      <p>GST: {company.gst_number}</p>
      <p>Financial Year: {company.financial_year}</p>
      <p>State: {company.state}</p>
      <p>Phone: {company.phone}</p>
      <p>Email: {company.email}</p>
      <button onClick={() => deleteCompany(company.id)}>
  Delete
</button>
    </div>
    
  ))
)}

    </div>
  );
}
export default Company;