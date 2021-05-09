import "./Style/Styling.css";
import { Link } from "react-router-dom";

export default function ArtCard({ art }) {
  return (
    <div className="DivBORDER">
      <div className="InnerDivBorder">
        <h3 style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {art.title}
        </h3>
        <p>
          <strong> Artist:</strong>
        </p>
        <p>{art.principalOrFirstMaker}</p>

        <Link to={`/art/${art.objectNumber}`}>
          <img
            src={art.headerImage.url}
            alt={art.title}
            className="ArtCardIMG"
          ></img>
        </Link>
      </div>
    </div>
  );
}
