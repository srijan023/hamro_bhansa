import Image from "next/image"
import Star from "../icons/Star"

export default function MenuItem() {
  return (
    <div className="hover:scale-105 hover:transition-all transition-all hover:bg-gray-100  rounded-xl">
      <div className="relative h-64 ">
        <Image className="rounded-xl" src={"/daal-bhat.jpg"} alt={"Daal Bhat"} layout="fill" objectFit="cover" />
      </div>
      <div className="text-center flex flex-col gap-2 mt-3 p-4">
        <h3 className="font-semibold text-xl text-gray-600">Plain Daal Bhat Set</h3>
        <p className="text-sm text-gray-500">Bastmati Rice along with tempered daal</p>
        <div className="flex gap-2 mx-auto justify-center">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <h4 className="font-semibold text-gray-600"> Rs. 400.00</h4>
        <button className="py-2 px-5 text-white bg-primary rounded-full">Add to Cart</button>
      </div>
    </div>
  )
}
