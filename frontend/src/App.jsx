import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Company from "./Company";
import Dashboard from "./Dashboard";
import Ledger from "./Ledger";
import Group from "./Group";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Company />} />
       
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ledger" element={<Ledger />} />

        <Route path="/group" element={<Group />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
