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
          `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=KakAy1eR`
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
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <strong>Artist:</strong>
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
            <strong>Nationality:</strong>
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
            {artData.principalMakers[0].dateOfDeath}
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
            {artData.principalMakers[0].biography}
          </p>
        </div>
      ) : (
        <p> Loading....</p>
      )}
    </div>
  );
}
