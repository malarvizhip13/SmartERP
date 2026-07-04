import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Company from "./Company";
import Dashboard from "./Dashboard";
import Ledger from "./Ledger";
import Group from "./Group";
import Stock from "./Stock";
import PurchaseVoucher from "./PurchaseVoucher";
import SalesVoucher from "./SalesVoucher";
import Billing from "./Billing";
import Reports from "./Reports";
import KeyboardShortcuts from "./KeyboardShortcuts";
function App() {
  return (
    
    <BrowserRouter>
     <KeyboardShortcuts />
      <Routes>
        <Route path="/" element={<Company />} />
       
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ledger" element={<Ledger />} />

        <Route path="/group" element={<Group />} />

        <Route path="/stock" element={<Stock />} />

        <Route path="/purchase" element={<PurchaseVoucher />} />

        <Route path="/sales" element={<SalesVoucher />} />

        <Route path="/billing" element={<Billing />} />

        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
