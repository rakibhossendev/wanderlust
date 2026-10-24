import { Navbar } from "@/components/Home/navbar";
import { Banner } from "@/components/Home/banner";
import { WhyChooseUs } from "@/components/Home/why-choose-us";
import { Testimonials } from "@/components/Home/testimonials";
import { Cta } from "@/components/Home/cta";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </div>
  );
}
