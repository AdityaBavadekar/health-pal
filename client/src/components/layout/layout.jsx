import Navbar from "@/components/layout/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
};

export default Layout;
