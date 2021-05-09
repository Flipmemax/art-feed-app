import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../components/Style/Styling.css";

export default function ArtDetailPage() {
  const { objectNumber } = useParams();
  const [artData, setArtData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=KakAy1eR`
        );
        setArtData(response.data.artObject);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [objectNumber]);

  return (
    <div>
      {artData ? (
        <div>
          <h1>{artData.longTitle}</h1>
          <Link to={`/fullscreen/${objectNumber}`}>
            <img
              src={artData.webImage.url}
              alt={artData.longTitle}
              className="ArtCardIMG"
            />
          </Link>
          <h2>Plaque description:</h2>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            {artData.plaqueDescriptionEnglish}
          </p>
          <p
            style={{
              fontSize: "20px",
            }}
          >
            <strong>Materials:</strong>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "60px",
                paddingRight: "60px",
              }}
            >
              {artData.materials.map((materials) => (
                <li>{materials}</li>
              ))}
            </ul>
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Artist:</strong>
            <br></br>
            <br></br>
            {artData.principalOrFirstMaker}
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong> Biography:</strong>
            <br></br>
            <br></br>
            {artData.principalMakers[0].biography}
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Nationality:</strong>
            <br></br>
            <br></br>
            {artData.principalMakers[0].nationality}
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Place of Birth:</strong>
            <br></br>
            <br></br>
            {artData.principalMakers[0].placeOfBirth}
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Date of Birth:</strong>
            <br></br>
            <br></br>
            {artData.principalMakers[0].dateOfBirth}
          </p>
          <p
            style={{
              fontSize: "20px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Date of Death:</strong>
            <br></br>
            <br></br>
            {artData.principalMakers[0].dateOfDeath}
          </p>
        </div>
      ) : (
        <h1> Loading....</h1>
      )}
    </div>
  );
}
