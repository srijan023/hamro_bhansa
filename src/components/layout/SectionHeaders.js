import Image from "next/image"
export default function SectionHeader({ scaleleft = "scale-75", lefttop = 'top-0', leftImage, righttop = "top-0", rightImage, subheading, heading, scaleright = "scale-100" }) {
  return (
    <div className="relative h-60 left-0 right-0 justify-start">
      <div className={`${scaleleft} ${lefttop} absolute left-0 -z-10`}>
        <Image src={leftImage} alt={"spices"} height={150} width={230} className="scale-150" />
      </div>

      <div className="text-center relative top-20">
        <h3 className="text-2xl text-gray-600 font-semibold">{subheading}</h3>
        <h2 className="text-5xl text-primary font-semibold">{heading}</h2>
      </div>
      <div className={`absolute right-0 ${righttop} -z-10 ${scaleright}`}>
        <Image src={rightImage} alt={"spices"} height={150} width={230} />
      </div>
    </div>
  )
}
