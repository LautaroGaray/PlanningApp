import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import NavBar from './Components/NavBar.jsx'
import Projects from  './Pages/Projects.jsx'
import Groups from './Pages/Groups.jsx'
import CreateGroup from './Pages/Views/CreateGroup.jsx'
import GroupXTasks from './Pages/Views/GroupXTasks.jsx';
import Tasks from './Pages/Tasks.jsx'
import CreateTask from './Pages/Views/CreateTask.jsx'


import './root.css'

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

const Main = () => (
  <Router>
    <div>
      <NavBar/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Groups" element={<Groups />} />  
            <Route path="/Groups/CreateGroups" element={<CreateGroup />} />   
            <Route path="/Groups/ManageTasks" element={<GroupXTasks/>}/>  
          <Route path="/Tasks" element={<Tasks />} />   
            <Route path="/Tasks/CreateTask" element={<CreateTask />} />   
        </Routes>    
    </div>
    
  </Router>
);


reactRoot.render(<Main />);
