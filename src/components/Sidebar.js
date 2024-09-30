import React, { useState } from 'react';
import image from '../images/image.png'
import './Sidebar.css';

const Sidebar = ({ tasks, onSelectTask }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  function renderLevelItem(task, index) {
    return (
      <li
        key={index}
        className={task.completed ? 'completed-level' : 'incompleted-level'}
        onClick={() => onSelectTask(index)}
      >
        {task.title}
      </li>
    );
  }

  function renderFolders(dirs) {
    return Object.keys(dirs).map((dirName, index) => {
      return (
        <ul key={index}>
          <li className="folder" onClick={toggleFolder}>
            <span className={`folder-icon ${isOpen ? 'open' : ''}`}>v</span>  {dirName}
          </li>
          {isOpen && (
            <ul className="task-list">
              {dirs[dirName].map((task, index) => renderLevelItem(task, index))}
            </ul>
          )}
        </ul>
      );
    });
  }

  
  
  const dirs = Object.groupBy(tasks, lvl => lvl.dirName);


  
  return (
      <div className={`sidebar ${isMobileView}`}>
        <h2>
          <img src={image} alt="Logo" />
          Clean Code Game
        </h2>
        {renderFolders(dirs)}
      </div>
  );
};

export default Sidebar;
