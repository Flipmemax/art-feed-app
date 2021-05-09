import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import "../components/Style/Styling.css";

export default function ArtFeed() {
  const [state, setState] = useState([]);

  async function fetchData() {
    try {
      const randompage = Math.floor(Math.random() * 100) + 1;

      const response = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=KakAy1eR&p=${randompage}&ps=${randompage}&type=painting`
      );

      setState(response.data.artObjects);
      console.log("data", response.data.artObjects);
    } catch (error) {
      console.log("error searching", error.message);
    }
  }
  const refreshButton = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="ArtpageBtnRightFlex">
          <Link to="/explore">
            <button className="ArtPageBtn">
              Click here to explore some art
            </button>
          </Link>
        </div>
        <h1>Welcome to Artzy</h1>
        <button onClick={refreshButton} className="ArtPageBtn">
          Click here for random art!
        </button>
        {state.length === 0 ? (
          <div>
            <p
              style={{
                fontSize: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              Sorry, I couldn't steal any random art from The Rijksmuseum.. But
              just click the button again, maybe I succeed this time!
            </p>{" "}
          </div>
        ) : (
          <div>
            {state.map((art) => (
              <div key={art.id}>
                <ArtCard art={art} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
