import React, { useState } from 'react';
import image from '../images/image.png'

const Sidebar = ({ tasks, onSelectTask }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <h2>
        <img src={image} alt="Logo" />
        Clean Code Game
      </h2>
      <ul>
        <li className="folder" onClick={toggleFolder}>
          <span className={`folder-icon ${isOpen ? 'open' : ''}`}>v</span>  Tasks
        </li>
        {isOpen && (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li
                key={index}
                onClick={() => onSelectTask(index)}
                className={task.completed ? 'completed' : ''}
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
