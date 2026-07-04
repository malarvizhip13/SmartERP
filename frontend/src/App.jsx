import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Company from "./Company";
import Dashboard from "./Dashboard";
import Ledger from "./Ledger";
import Group from "./Group";
import Stock from "./Stock";
import PurchaseVoucher from "./PurchaseVoucher";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Company />} />
       
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ledger" element={<Ledger />} />

        <Route path="/group" element={<Group />} />

        <Route path="/stock" element={<Stock />} />

        <Route path="/purchase" element={<PurchaseVoucher />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
