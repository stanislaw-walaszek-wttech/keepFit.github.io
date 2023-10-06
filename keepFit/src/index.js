import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // This imports the styles
import { Carousel } from "react-responsive-carousel";

function App() {
  const [view, setView] = useState("home");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const image1 =
    "https://i.iplsc.com/kici-kici-na-to-twoj-kot-na-pewno-zareaguje-dlaczego/000GR52SDJMGH1OD-C122-F4.jpg";
  const image2 = "https://vibracje.pl/userdata/public/news/images/108.jpg";

  const [contentItems, setContentItems] = useState([
    {
      imgUrl: image1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgUrl: image2,
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);
  const [counter, setCounter] = useState(0); 

  useEffect(() => {
    // Sprawdź, czy istnieją zapisane dane w localStorage
    const savedContentItems = JSON.parse(localStorage.getItem("contentItems"));
    if (savedContentItems) {
      setContentItems(savedContentItems);
    }

    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const changeView = (newView) => {
    setView(newView);
  };

  const login = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setView("home");
      localStorage.setItem("isLoggedIn", true);
    } else {
      alert("Nieprawidłowe dane logowania");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setView("login");
    localStorage.setItem("isLoggedIn", false);
  };

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const addContent = (event) => {
    event.preventDefault();

    const newContentItem = {
      text,
      imgUrl,
    };

    const updatedContentItems = [...contentItems];
    updatedContentItems.splice(2, 0, newContentItem);
    setContentItems(updatedContentItems);

    localStorage.setItem("contentItems", JSON.stringify(updatedContentItems));

    setText("");
    setImgUrl("");

    changeView("home");
  };

  let content;

  const headerStyle = {
    padding: "2em",
    background: "#6c757d",
    color: "#FFFFFF",
    textAlign: "center",
  };

  const welcomeTextStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",
    flexDirection: "column",
  };

  const footerStyle = {
    padding: "2em",
    background: "#6c757d",
    color: "#FFFFFF",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  };

  const buttonStyle = {
    margin: "0 1em",
    padding: "1em 2em",
    fontSize: "1em",
    border: "none",
    borderRadius: "5px",
    color: "#FFFFFF",
    background: "#6c757d",
    cursor: "pointer",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1em",
  };

  const inputStyle = {
    padding: "1em",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const counterContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  };
  
  const counterTextStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };
  
  const increaseButtonStyle = {
    margin: "0",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  switch (view) {
    case "home":
      content = (
        <div>
          <h1 style={welcomeTextStyle}>
            Witaj na stronie głównej{isLoggedIn ? `, ${username}` : ""}
          </h1>
          <h2>Counter: {counter}</h2> {/* Wyświetlenie wartości licznika */}
          <button style={buttonStyle} onClick={increaseCounter}>
            Increase Counter
          </button>
          <Carousel
            showThumbs={false}
            dynamicHeight={false}
            emulateTouch
            useKeyboardArrows
            autoPlay
            infiniteLoop
          >
            {contentItems.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "2%",
                    width: "300px",
                    height: "200px",
                    color: "white",
                    display: "flex",
                    alignItems: "center", // To aligns items on the cross-axis
                    justifyContent: "center", // To aligns items on the line
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <h2>{item.text}</h2>
                </div>
                <img
                  src={item.imgUrl}
                  alt="User content"
                  style={{
                    width: "100vw",
                    height: "66.66vh",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      );
      break;
    case "about":
      content = (
        <div style={welcomeTextStyle}>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p>
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
            mi porta gravida at eget metus.
          </p>
        </div>
      );
      break;
    case "login":
      content = (
        <form style={formStyle} onSubmit={login}>
          <input
            style={inputStyle}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input style={buttonStyle} type="submit" value="Login" />
        </form>
      );
      break;
    case "add":
      content = (
        <form style={formStyle} onSubmit={addContent}>
          <textarea
            style={inputStyle}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your text"
            required
          />
          <input
            style={inputStyle}
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image URL"
          />
          <input style={buttonStyle} type="submit" value="Add content" />
        </form>
      );
      break;
    default:
      content = <h1>Nieznany widok</h1>;
  }

  return (
    <div>
      <header style={headerStyle}>
        <h1>Moja aplikacja SPA</h1>
        {!isLoggedIn && (
          <button style={buttonStyle} onClick={() => changeView("login")}>
            Logowanie
          </button>
        )}
        {isLoggedIn && (
          <button style={buttonStyle} onClick={() => changeView("home")}>
            Strona główna
          </button>
        )}
        {isLoggedIn && (
          <button style={buttonStyle} onClick={() => changeView("about")}>
            O nas
          </button>
        )}
        {isLoggedIn && (
          <button style={buttonStyle} onClick={() => changeView("add")}>
            Dodaj treść
          </button>
        )}
        {isLoggedIn && (
          <button style={buttonStyle} onClick={logout}>
            Wyloguj
          </button>
        )}
      </header>
      {content}
      <footer style={footerStyle}>
        <p>© 2023 Moja firma. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

const rootContainer = document.getElementById("root");
ReactDOM.createRoot(rootContainer).render(<App />);
