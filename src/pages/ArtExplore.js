import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import "../components/Style/Styling.css";

export default function ArtFeed() {
  const [state, setState] = useState({ status: "idle" });
  const history = useHistory();
  const { searching } = useParams();
  const [searchArt, setSearchArt] = useState(searching);

  useEffect(() => {
    async function fetchData() {
      if (!searching || searching === "") {
        setState({ status: "idle" });
        return;
      }

      try {
        setState({ status: "searching" });
        const queryParam = encodeURIComponent(searching);

        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/en/collection?key=KakAy1eR&involvedMaker=${queryParam}`
        );

        if (response.data.artObjects.Error) {
          setState({ status: "error" });
        } else {
          setState({ status: "done", data: response.data.artObjects });
          setSearchArt("");
        }
      } catch (error) {
        console.log("error searching", error.message);
      }
    }

    fetchData();
  }, [searching]);

  const navigateToSearch = (event) => {
    event.preventDefault();
    const routeParam = encodeURIComponent(searchArt);
    history.push(`/art/${routeParam}`);
  };

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
        {state.status === "error" && <p>Sorry, no art found... Try again!</p>}
        {state.status === "searching" && <p>Loading....</p>}
        {state.status === "done" && (
          <div>
            {state.data.map((art) => (
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
