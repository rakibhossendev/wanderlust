
import { Banner } from "@/components/Home/banner";
import { WhyChooseUs } from "@/components/Home/why-choose-us";
import { Testimonials } from "@/components/Home/testimonials";
import { Cta } from "@/components/Home/cta";
import { FeaturedDestinations } from "@/components/Home/featured-destinations";
import { CommonDataType } from "@/Ts/Type";

export default async function Home() {
  const response = await fetch('http://localhost:5000/all-destinations');
  const data: CommonDataType[] = await response.json();


  return (
    <div className="relative">

      <Banner />

      <FeaturedDestinations destinations={data.slice(0, 5)} />

      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </div>
  );
}
