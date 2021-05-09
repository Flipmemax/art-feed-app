import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import "../components/Style/Styling.css";

export default function ArtFeed() {
  const { searching } = useParams();
  const [state, setState] = useState([]);
  const [searchArt, setSearchArt] = useState(searching);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const queryParams = encodeURIComponent(searching);
        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/en/collection?key=KakAy1eR&involvedMaker=${queryParams}&p=1&ps=10000`
        );

        setState(response.data.artObjects);
      } catch (error) {
        console.log("error searching", error.message);
      }
    }

    fetchData();
  }, [searching]);

  const navigateToSearch = (event) => {
    event.preventDefault();
    const routeParam = encodeURIComponent(searchArt);
    history.push(`/explore/${routeParam}`);
  };

  console.log(searchArt);
  console.log(state);

  return (
    <div>
      <div>
        <div className="ArtpageBtnRightFlex">
          <Link to="/">
            <button className="ArtPageBtn">Go to Home Page</button>
          </Link>
        </div>
        <h1>Explore some art!</h1>
        <p style={{ fontSize: "20px" }}>
          Please type in the artist's full name to search, oh and it's case
          sensitive!<br></br>
          Example: Rembrandt van Rijn
        </p>
        <div>
          <form onSubmit={navigateToSearch}>
            <input
              type="text"
              placeholder="search art"
              defaultValue={searchArt}
              onChange={(event) => {
                setSearchArt(event.target.value);
              }}
              className="inputField"
            />
            <button type="submit" className="ArtPageBtn">
              search
            </button>
          </form>
        </div>
        {state.length === 0 ? (
          <div>
            <p
              style={{
                fontSize: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              Ooops... I couldn't find any art from the artist you gave me.. Are
              you sure he/she existst? Did you make a typo by any chance? Don't
              forget the search is case sensitive! For example, if you are
              looking for Vincent van Gogh, you should not type vincent van
              gogh, or VINCENT VAN GOGH! <br></br>
              <br></br>Your input:{" "}
              <strong style={{ color: "darkred" }}>{searchArt}</strong>
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
