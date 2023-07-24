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
  const [contentItems, setContentItems] = useState([
    {
      imgUrl:
        "https://www.bd.com/content/dam/bdcom-assets/en/en-us/images/photography/homepage/homepage_header_main.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgUrl:
        "https://www.bd.com/content/dam/bd-assets/bd-com/en-us/images/corporate/homepage/carrer_site_banner_at_bd_com_photo_580x640.jpg",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  useEffect(() => {
    const savedContentItems =
      JSON.parse(localStorage.getItem("contentItems")) || [];
    setContentItems(savedContentItems);

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

  switch (view) {
    case "home":
      content = (
        <div>
          <h1>Witaj na stronie głównej{isLoggedIn ? `, ${username}` : ""}</h1>
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
        <div>
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

ReactDOM.render(<App />, document.getElementById("root"));
