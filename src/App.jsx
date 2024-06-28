import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/Nordahub_logo_white.svg";
import middleLogo from "./images/Nordahub_logo_white.svg";
import FAQModal from "./components/FAQModal.js";
import QuizModal0 from "./components/QuizModal0.js";
import Spacer from "./Spacer.js";
import NewsModal from "./components/NewsModal.js";
import BybitSVG from "./images/bybit-seeklogo.svg";
import ETHsvg from "./images/ethereum-eth-logo-full-horizontal_white.svg";
import concordiumsvg from "./images/Concordium-Logo-White.svg";
import solanasvg from "./images/solanaLogo.svg";
import Polygonsvg from "./images/Polygon_Logo.svg";
import BSCsvg from "./images/Binance_logo.svg";
import FNXsvg from "./images/FNX.svg";
import WalletConnector from "./components/WalletConnector.jsx";
import WalletConnectButton from "./components/WalletConnectButton.jsx";
import { useWeb3 } from "./components/contexts/Web3Context.js";
import Web3Modal from "./components/Web3Modal.js";
import { redactAddress } from "./components/web3utils.js";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [Web3ModalOpen, setWeb3ModalOpen] = useState(false);
  const [quizModal0Open, setQuizModal0Open] = useState(false);

  const [NewsModalOpen, setNewsModalOpen] = useState(false);
  const [FAQModalOpen, setFAQModalOpen] = useState(false);

  const { account } = useWeb3();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleCategorySelect = (content) => {
    setSelectedContent(content);
    setMenuOpen(false);
  };

  const openQuizModal0 = () => {
    setQuizModal0Open(true);
  };
  const closeQuizModal0 = () => {
    setQuizModal0Open(false);
  };

  const openWeb3Modal = () => {
    setWeb3ModalOpen(true);
  };
  const closeWeb3Modal = () => {
    setWeb3ModalOpen(false);
  };

  const openNewsModal = () => {
    setNewsModalOpen(true);
  };

  const openFAQModal = () => {
    setFAQModalOpen(true);
  };

  const closeNewsModal = () => {
    setNewsModalOpen(false);
  };
  const closeFAQModal = () => {
    setFAQModalOpen(false);
  };
  const handleReset = () => {
    // Reload the entire app
    window.location.reload();
  };
  useEffect(() => {
    const menuButtons = document.querySelectorAll(".menu-button");
    const menu = document.querySelector(".menu");

    // Add event listener to each menu button
    menuButtons.forEach((menuButton) => {
      menuButton.addEventListener("click", () => {
        // Toggle the 'open' class on the menu to show/hide it
        menu.classList.toggle("open");

        // Close the menu if it's already open on mobile
        if (
          window.matchMedia("(max-width: 800px)").matches &&
          menu.classList.contains("open")
        ) {
          menu.classList.remove("open");
        }
      });
    });
  }, []);

  return (
    <div className="app">
      <body>
        <div class="scrollbarbs">
          <main>
            <header className="header">
              <div className="left-section fackdiv">
                <div className="logo-container">
                  <button className="clickable-button2" onClick={openNewsModal}>
                    News
                  </button>
                  <button className="clickable-button2" onClick={openFAQModal}>
                    FAQ
                  </button>
                </div>
              </div>
              <button
                className="middle-section fackdiv"
                onClick={handleReset}
                style={{ background: "transparent", border: "none" }}
              >
                <div className="logotop">
                  <img src={middleLogo} alt="middelogo" />
                </div>
              </button>

              <div className="right-section fackdiv">
                <div className="headermenu">
                  <div className="menu-tab" onClick={toggleMenu}>
                    ☰
                  </div>
                </div>
              </div>
            </header>
            <div className={`menu ${menuOpen ? "open" : ""}`}>
              <div className="menu-content">
                <div className="menu-header">
                  <div>
                    <button class="wallet-button" onClick={openWeb3Modal}>
                      Connect Wallet
                    </button>
                  </div>
                  <div>
                    <div className="accountinfo">
                      {account ? <p>{redactAddress(account)}</p> : <p></p>}
                    </div>
                  </div>
                </div>
                {/* Buttons with images */}
                <button
                  className={`menu-button ${
                    activeButton === "Category 5" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 5")}
                >
                  <img
                    src="https://i.postimg.cc/8FpLyG5Z/bybit-menu.png"
                    alt="Bybit"
                  />
                </button>
                <button
                  className={`menu-button ${
                    activeButton === "Category 2" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 2")}
                >
                  <img
                    src="https://i.postimg.cc/R6qKBTwf/erc20-menu.png"
                    alt="Ethereum"
                  />
                </button>
                <button
                  className={`menu-button ${
                    activeButton === "Category 3" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 3")}
                >
                  <img
                    src="https://i.postimg.cc/QFrQT1rG/bsc-menu.png"
                    alt="BSC"
                  />
                </button>
                <button
                  className={`menu-button ${
                    activeButton === "Category 4" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 4")}
                >
                  <img
                    src="https://i.postimg.cc/8J3WPrbY/polygon-menu.png"
                    alt="Polygon"
                  />
                </button>
                <button
                  className={`menu-button ${
                    activeButton === "Category 6" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 6")}
                >
                  <img
                    src="https://i.postimg.cc/WqkZDbW1/solana-menu.png"
                    alt="solana"
                  />
                </button>
                <button
                  className={`menu-button ${
                    activeButton === "Category 1" ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect("Category 1")}
                >
                  <img
                    src="https://i.postimg.cc/3kCgCNKy/concordium-menu.png"
                    alt="Concordium"
                  />
                </button>
              </div>
              <div className="close-menu-tab" onClick={toggleMenu}></div>
              {menuOpen && (
                <div className="banner">
                  <a
                    href="https://t.me/TrustCallers2023"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.postimg.cc/Hxs56MHt/photo-2024-06-22-16-13-47.jpg"
                      alt="Advertisement Banner"
                    />
                  </a>
                </div>
              )}
            </div>
            <div classname="cyka">
              <div className="dividerbox">
                <div className="dividercontent">
                  <h2 className="section-header"></h2>
                </div>
              </div>

              {selectedContent !== "Category 1" && (
                <div className="Quizmenu">
                  <div className="quizlist">
                    <h2>Welcome To NordaHub L2E </h2>{" "}
                    <hr className="section-divider" />
                    <div className="quizintro">
                      <div className="text-box">
                        <div className="object-details">
                          <p>
                            Our platform also features a robust quiz and task
                            system to reinforce learning and track your
                            progress. Challenge yourself with interactive
                            quizzes and complete tasks to earn rewards and
                            certificates. This system ensures you understand the
                            material thoroughly and stay motivated throughout
                            your learning journey
                          </p>
                        </div>
                      </div>
                      <div className="image-container">
                        <div className="image-inner-container">
                          <img
                            className="object-image"
                            src="https://i.postimg.cc/KzxHBy03/Nordahub-logo-white.png"
                            alt="Nordahub Logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="body-content">
                {/* Render different content based on selectedContent */}
                {selectedContent === "Category 1" && (
                  <div>
                    {/* <div className="dividerbox"> */}
                    {/* <div className="dividercontent"> */}
                    <h2 className="section-header">
                      <img src={concordiumsvg} alt="concoarduim" />
                    </h2>
                    {/* </div> */}
                    {/* </div> */}

                    {/* Content for Category 1 */}
                    <div className="Quizmenu">
                      <div className="quizlist">
                        <h2>What is Concordium?</h2>{" "}
                        <div className="Rewardsleft">
                          <p>Rewards Left 500/500</p>
                          <p>Non Available for US residents</p>
                        </div>
                        <div className="quizintro">
                          <div className="text-box">
                            <div className="object-details">
                              <p>
                                Explore the innovative world of Concordium, a
                                groundbreaking blockchain platform redefining
                                digital trust. Discover its integration of
                                identity verification, privacy, and regulatory
                                compliance. Learn about its unique governance
                                model balancing decentralization and legal
                                adherence. Whether you're a blockchain
                                enthusiast or curious learner, join us to
                                uncover Concordium's transformative potential in
                                shaping the future of blockchain technology.
                                Let's begin!
                              </p>
                              <h5>
                                Disclaimer: Rewards gets airdropped once per
                                week due to US regulations, manual airdropping
                                system is required. Please only complete the
                                quiz once!
                              </h5>
                            </div>
                          </div>
                          <div className="image-container">
                            <div className="image-inner-container">
                              <img
                                className="object-image"
                                src="https://i.postimg.cc/s2F8fWSc/maxresdefault.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="clickable-button"
                          onClick={openQuizModal0}
                        >
                          {" "}
                          Start Quiz{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {selectedContent === "Category 2" && (
                  <div>
                    <div className="dividerbox">
                      <div className="dividercontent">
                        <img src={ETHsvg} alt="ETH" width="200" height="50" />
                      </div>
                    </div>
                    {/* Content for Category 2  */}
                  </div>
                )}
                {selectedContent === "Category 3" && (
                  <div className="dividerbox">
                    <div className="dividercontent">
                      <img src={BSCsvg} alt="BSC" width="200" height="50" />
                    </div>
                  </div>
                )}
                {/* Add more conditional rendering for additional categories */}
              </div>
              <div>
                {selectedContent === "Category 4" && (
                  <div>
                    <div className="dividerbox">
                      <div className="dividercontent">
                        <img
                          src={Polygonsvg}
                          alt="Poly"
                          width="300"
                          height="100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {selectedContent === "Category 5" && (
                <div>
                  <div className="dividerbox">
                    <div className="dividercontent">
                      <img src={BybitSVG} alt="Bybit" width="200" height="50" />
                    </div>
                  </div>
                  {/* Content for Category 5 */}
                </div>
              )}
              {/* Add more conditional rendering for additional categories */}
            </div>
            {selectedContent === "Category 6" && (
              <div>
                <div className="dividerbox">
                  <div className="dividercontent">
                    <img
                      src={solanasvg}
                      alt="Solana"
                      width="300"
                      height="100"
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
          <Spacer height="500px" />
          <footer className="footer">
            <div className="footer-content">
              <div className="fackdiv"></div>
              <div className="footer-text fackdiv ">
                <p>Powered by FNX.</p>{" "}
                <div className="fnx-logo-container">
                  <img src={FNXsvg} alt="FNX" width="300" height="100" />
                </div>
              </div>

              <div className="footer-copyright fackdiv">
                <p>&copy; 2024 NordaHub AB. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
      {NewsModalOpen && <NewsModal onClose={closeNewsModal} />}
      {FAQModalOpen && <FAQModal onClose={closeFAQModal} />}
      {quizModal0Open && <QuizModal0 onClose={closeQuizModal0} />}
      {Web3ModalOpen && <Web3Modal onClose={closeWeb3Modal} />}
    </div>
  );
};

export default App;
