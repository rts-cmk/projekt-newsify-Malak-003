import { Outlet, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <div className="logo">
          <img src="/img/newsify_logo3.png" alt="newify-logo" />
          <h2>Newsify</h2>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <nav className="bottom-nav">
          <NavLink className="Link" to="/app" end>
            <img className="bottom-nav__icon" src="/img/icon-home.png" alt="Home" />
            Home
          </NavLink>

          <NavLink className="Link" to="/app/archive">
            <img className="bottom-nav__icon" src="/img/feather-icon.png" alt="Archive" />
            Archive
          </NavLink>

          <NavLink className="Link" to="/app/popular">
            <img className="bottom-nav__icon" src="/img/star-icon.png" alt="Popular" />
            Popular
          </NavLink>

          <NavLink className="Link" to="/app/settings">
            <img className="bottom-nav__icon" src="/img/settings-icon.png" alt="Settings" />
            Settings
          </NavLink>
        </nav>
      </footer>
    </>
  );
}
