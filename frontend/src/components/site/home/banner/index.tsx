import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

export function Banner() {
  return (
    <Carousel infiniteLoop showThumbs={false} showStatus={false}>
      <div>
        <Image
          width={1600}
          height={1200}
          src="/banners/banner1.webp"
          alt="banner1"
          className="object-top object-cover w-full h-[300px] sm:h-[500px]"
        />
      </div>
      <div>
        <Image
          width={1600}
          height={1200}
          src="/banners/banner2.jpeg"
          alt="banner2"
          className="object-top object-cover w-full h-[300px] sm:h-[500px]"
        />
      </div>
      <div>
        <Image
          width={1600}
          height={1200}
          src="/banners/convite3.jpg"
          alt="banner2"
          className="object-top object-cover w-full h-[300px] sm:h-[500px]"
        />
      </div>
    </Carousel>
  );
}
