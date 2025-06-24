import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";

const Index = () => {
  return(
    <div className="min-h-screen bg-[#0A1C22] w-full overflow-hidden">
      <Header/>
      <Hero />
      <Footer/>
    </div>
  )
}

export default Index;