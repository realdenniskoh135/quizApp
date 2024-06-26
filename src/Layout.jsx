import { Link } from "react-router-dom";
import { useAuth, logout } from "wasp/client/auth";
import { getEmail } from "wasp/auth";
import "./Main.css";

export const Layout = ({ children }) => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Link to="/">
            <h1 className="text-xl2 font-semibold">Quiz</h1>
          </Link>
          { user ? (
            <span>
              Hi, {getEmail(user)}!{' '}
              <button onClick={logout} className="text-xl2 underline">
                (Log out)
              </button>
            </span>
          ) : (
            <Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </Link>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow">
        {children}
      </main>
    </div>
  );
};