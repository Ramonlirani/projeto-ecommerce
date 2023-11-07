import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.png";

export function Banner() {
  return (
    <Carousel infiniteLoop showThumbs={false} showStatus={false}>
      <div>
        <Image
          width={1600}
          height={1200}
          src={banner1}
          alt="banner1"
          className="object-top object-cover w-full h-[300px] sm:h-[750px]"
        />
      </div>
      <div>
        <Image
          width={1600}
          height={1200}
          src={banner2}
          alt="banner2"
          className="object-top object-cover w-full h-[300px] sm:h-[750px]"
        />
      </div>
      <div>
        <Image
          width={1600}
          height={1200}
          src={banner3}
          alt="banner2"
          className="object-top object-cover w-full h-[300px] sm:h-[750px]"
        />
      </div>
    </Carousel>
  );
}
