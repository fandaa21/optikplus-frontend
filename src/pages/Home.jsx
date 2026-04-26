import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import HeroBanner from "../components/HeroBanner"
import FlashSale from "../components/FlashSale"
import CategorySection from "../components/CategorySection"
import BestSelling from "../components/BestSelling"
import ExploreProducts from "../components/ExploreProducts"
import Services from "../components/Services"
import Footer from "../components/Footer"


function Home(){
  return(
    <>
      <TopBar/>
      <Navbar/>
      <HeroBanner/>
      <FlashSale/>
      <CategorySection/>
      <BestSelling/>
      <ExploreProducts/>
      <Services/>
      <Footer/>
    </>
  )

}

export default Home