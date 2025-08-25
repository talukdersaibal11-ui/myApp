import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
