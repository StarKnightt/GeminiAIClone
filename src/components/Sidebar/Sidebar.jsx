import "./Sidebar.css"; // Importing CSS file for styling
import { useContext, useState } from "react"; // Importing useContext and useState hooks from React
import { assets } from "../../assets/assets"; // Importing assets (images/icons)
import { Context } from "../../context/Context"; // Importing the context

const Sidebar = () => {
  const [extended, setExtended] = useState(false); // State to track if sidebar is extended
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); // Destructuring values from Context

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Set the recent prompt
    await onSent(prompt); // Call onSent function with the prompt
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)} // Toggle sidebar extended state
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}{" "}
          {/* Show 'New Chat' text if extended */}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index} // Unique key for each item
                onClick={() => loadPrompt(item)} // Load the clicked prompt
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)} ...</p>{" "}
                {/* Show truncated prompt text */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null} {/* Show 'Help' text if extended */}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}{" "}
          {/* Show 'Activity' text if extended */}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}{" "}
          {/* Show 'Settings' text if extended */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // Export Sidebar component as default
