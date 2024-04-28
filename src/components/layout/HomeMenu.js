import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section className="mt-6">
      <SectionHeader leftImage={'/spices.png'} rightImage={'/leaf.png'} heading={"Menu"} subheading={"Check out"} />
      <div className="grid grid-cols-3 gap-x-6 gap-y-10">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  )
}
