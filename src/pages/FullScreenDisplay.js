import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/Style/Styling.css";

export default function FullScreenDisplay() {
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
          <img
            src={artData.webImage.url}
            alt={artData.longTitle}
            className="FullScreenIMG"
          />
        </div>
      ) : (
        <h1> Loading....</h1>
      )}
    </div>
  );
}
