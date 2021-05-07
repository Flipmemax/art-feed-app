import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/art">
        <button>Go to Art Feed</button>
      </Link>
    </div>
  );
}
