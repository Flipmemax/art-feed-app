import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import "../components/Style/Styling.css";

export default function ArtFeed() {
  const { searching } = useParams();
  const [state, setState] = useState({ status: "idle" });
  const [searchArt, setSearchArt] = useState(searching);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (!searching || searching === "") {
        setState({ status: "idle" });
        return;
      }

      try {
        setState({ status: "searching" });
        const queryParams = encodeURIComponent(searching);

        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/en/collection?key=KakAy1eR&involvedMaker=${queryParams}&p=1&ps=10000`
        );

        setState({ status: "done", data: response.data.artObjects });
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

  console.log("data:", state);

  return (
    <div>
      <div>
        <h1>Explore some art!</h1>

        <Link to="/">
          <button className="ArtPageBtn">Go to Home Page</button>
        </Link>

        <div>
          <form onSubmit={navigateToSearch}>
            <input
              type="text"
              placeholder="Search art by artist"
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
        {state.status === "idle" && (
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            Please type in the artist's full name to search, oh and it's case
            sensitive!<br></br>
            <br></br>
            Example: Rembrandt van Rijn
          </p>
        )}
        {state.status === "searching" && <p>Searching for Art.....</p>}
        {state.status === "done" && state.data.length === 0 && (
          <div>
            <p
              style={{
                fontSize: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              Are you sure you gave me the correct name? <br></br>Because I
              searched The Rijksmuseum's database and couldn't find anything!
              <br></br> Maybe you made a typo? Or maybe your artist doesn't
              exist?<br></br> Or maybe, just maybe, The Rijksmuseum doesn't have
              any art from the artist you are searching for!<br></br>
              <br></br>
              Anyway, don't forget the search is case sensitive!<br></br>
              Here's an example of a correct search input:<br></br>
              <strong>V</strong>incent van <strong>G</strong>ogh
            </p>
          </div>
        )}
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
