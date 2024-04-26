import Image from 'next/image'
import Right from '../icons/Right'
import Info from '../icons/Info'
export default function Hero() {
  return (
    <section className='grid grid-cols-3 mt-5'>
      <div className='py-16 pr-6 col-span-1'>
        <h1 className='font-semibold text-4xl text-gray-700 leading-snug'>Vibrant Flavour <br/> of <span className='text-primary'>Spices</span> in every bite!</h1>
        <p className='my-6 text-gray-600'>Experience a tantalizing journey for your taste buds with the rich flavors and aromatic spices of authentic Nepali cuisine!</p>
        <div className='flex gap-4'>
          <button className='bg-primary text-white px-5 py-2 rounded-full flex gap-4 uppercase font-semibold text-sm items-center'>Order now <Right /></button>
          <button className='flex gap-4 py-2 font-semibold text-gray-600'>Learn More
            <Info />
          </button>
        </div>
      </div>
      <div className='relative mt-3 col-span-2'>
        <Image src={'/thakali_set.jpg'} alt={'nepali traditional dish'} objectFit={'cover'} layout={'fill'} className='rounded-lg'/>
      </div>
    </section>
  )
}
