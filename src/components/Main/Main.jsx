import { useContext } from "react"; // Importing useContext hook from React
import "./Main.css"; // Importing CSS file for styling
import { assets } from "../../assets/assets"; // Importing assets (images/icons)
import { Context } from "../../context/Context"; // Importing the context

const Main = () => {
  const {
    onSent, // Function to send input
    recentPrompt, // The most recent prompt entered
    showResult, // Boolean to show result or not
    loading, // Loading state
    resultData, // Data to display as result
    setInput, // Function to set the input state
    input, // Current input value
  } = useContext(Context); // Destructuring values from Context

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent(); // Call onSent function when Enter key is pressed
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <div className="social">
          <a
            href="https://github.com/StarKnightt/GeminiAIClone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.github_icon}
              alt="GitHub"
              style={{ width: "44px", height: "44px" }}
            />
          </a>
        </div>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? ( // Check if showResult is false
          <>
            <div className="greet">
              <p>
                <span>Hello, Developer.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Is HTML a programming Language, Explain it!</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>What are some necessary skills to improve yourself?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Add some comments to the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          // If showResult is true
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p> {/* Display the recent prompt */}
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? ( // Check if loading is true
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: resultData, // Display the result data
                  }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)} // Update input value on change
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown} // Handle key down event
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? ( // Check if input is not empty
                <img
                  onClick={() => onSent()} // Call onSent function on click
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your Privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main; // Export Main component as default
