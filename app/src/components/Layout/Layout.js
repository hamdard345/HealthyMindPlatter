import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
/**
 *
 * @returns layout for our web application
 * @author Noorullah Niamatullah w18002720
 */
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
