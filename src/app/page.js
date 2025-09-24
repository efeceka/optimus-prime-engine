import About from "@/components/anasayfa/About";
import Hero from "@/components/anasayfa/Hero";
import MotorSec from "@/components/anasayfa/MotorSection";
import UseAreas from "@/components/anasayfa/UseAreas";
import Stats from "@/components/anasayfa/Stats"
import Numbers from "@/components/anasayfa/Numbers"

export default function Home() {
  return (
      <div>
        <Hero/>
        <About/>
        <MotorSec/>
        <Stats/>
        <UseAreas/>
      </div>
  );
}
