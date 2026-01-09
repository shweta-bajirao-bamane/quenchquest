import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Programs from "./components/pages/Programs";
import Project from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import GetInvolved from "./components/pages/GetInvolved";

import Login from "./components/pages/AdminDashboard/Login";
import Dashboard from "./components/pages/AdminDashboard/Dashboard";

import GlobalNotifier from "./globalNotifier";

import HomeSectionLists from "./components/pages/AdminDashboard/HomeSectionLists";
import AboutSectionList from "./components/pages/AdminDashboard/AboutSectionList";
import ProgramSectionList from "./components/pages/AdminDashboard/ProgramSectionList";
import ProjectSectionList from "./components/pages/AdminDashboard/ProjectSectionList";


function App() {
  return (
    <BrowserRouter>
      <GlobalNotifier />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-involved" element={<GetInvolved />} />
        
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<Login />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="homesectionlist" element={<HomeSectionLists />} />
          <Route path="aboutsectionlist" element={<AboutSectionList />} />
          <Route path="programsectionlist" element={<ProgramSectionList />} />
          <Route path="projectsectionlist" element={<ProjectSectionList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
