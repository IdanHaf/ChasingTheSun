import Body from "../components/homePage/Body";
import Footer from "../components/homePage/Footer";
import Header from "../components/homePage/Header";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full -z-10 bg-gradient-to-tl from-[#041816] to-[#10645C] font-thin">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default HomePage;
