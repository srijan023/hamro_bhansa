import Image from "next/image";

export default function MenuItem({ name, description, price, image }) {
  return (
    <div className="hover:scale-105 hover:transition-all transition-all hover:bg-gray-100  rounded-xl">
      <div className="relative h-64 ">
        <Image
          className="rounded-xl"
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="text-center flex flex-col gap-2 mt-3 p-4">
        <h3 className="font-semibold text-xl text-gray-600">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <h4 className="font-semibold text-gray-600"> Rs. {price}</h4>
        <button className="py-2 px-5 text-white bg-primary rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
