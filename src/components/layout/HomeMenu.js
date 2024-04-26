import Image from "next/image";
import MenuItem from "../menu/MenuItem";

export default function HomeMenu() {
  return (
    <section>
      <div className="relative h-64 left-0 right-0 justify-start">
        <div className="absolute left-0  -z-10">
          <Image src={"/spices.png"} alt={"spices"} height={150} width={230} />
        </div>

        <div className="text-center relative top-20">
          <h3 className="text-2xl text-gray-600 font-semibold">Check out</h3>
          <h2 className="text-5xl text-primary font-semibold">Menu</h2>
        </div>
        <div className="absolute right-0 top-0 -z-10">
          <Image src={"/leaf.png"} alt={"spices"} height={150} width={230} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-10">
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
    </section>
  )
}
