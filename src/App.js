import IssueForm from "./components/IssueForm";
import Home from "./components/Home";
// import Nothing from "./components/Nothing";
// import Dashboard from "./components/Dashboard";
import React, { useState, useEffect } from 'react';
// import { getDinosaurs } from "./services/services";
import { Routes, Route } from "react-router-dom";

function App() {

  // const [issues, setIssues] = useState([]);

  // useEffect(() => {
  //   getDinosaurs().then((data) => {
  //     setIssues(data);
  //   });
  // }, []);

  // console.log(issues);

  return (
    <div>
      {/* <Nothing /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bins" element={<IssueForm category="bins" />} />
        <Route path="/grass" element={<IssueForm category="grass" />} />
        <Route path="/roads" element={<IssueForm category="roads" />} />
        <Route path="/lights" element={<IssueForm category="lights" />} />
        <Route path="/other" element={<IssueForm category="other" />} />
        {/* <Route path="/dashboard" element={<Dashboard issues={issues} setIssues={setIssues} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
