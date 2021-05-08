import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <p>
        This web app is built with the{" "}
        <Link
          to="https://www.rijksmuseum.nl/en"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          Rijksmuseum
        </Link>{" "}
        API
      </p>
    </div>
  );
}
