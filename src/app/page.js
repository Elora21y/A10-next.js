import Image from "next/image";
import Hero from "./components/Hero";
import ProductHighlights from "./components/ProductHighlights";

export default function Home() {
  return (
    <div className='space-y-15 sm:space-y-20 md:space-y-28 lg:space-y-32'>
     <Hero/>
     <ProductHighlights/>
    </div>
  );
}
