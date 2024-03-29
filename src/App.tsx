import { Routes, Route, Outlet, Link } from "react-router-dom";
import User from "./User";
import UserPaginated from "./UserPaginated";
import AvatarChildren from "./AvatarChildren";

export default function App() {
  return (
    <div>
      <h1>Workshop Medway</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user/:username" element={<User />} />
          <Route path="user-pagination/:username" element={<UserPaginated />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user/silviomoreto">User</Link>
            </li>
            <li>
              <Link to="/user-pagination/silviomoreto?page=1">
                User Pagination
              </Link>{" "}
            </li>
          </ul>
        </nav>
        <AvatarChildren />
      </div>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
