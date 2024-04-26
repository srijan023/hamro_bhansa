import Link from "next/link"
export default function Header(){
  return (
    <header className="flex items-center justify-between">
      <Link className='text-primary font-semibold text-2xl' href="">HAMRO BHANSA</Link>
      <nav className="flex gap-6 text-gray-500 items-center">
        <Link href={''}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        <Link href={''} className="px-5 py-2 rounded-full bg-primary text-white">Login</Link>
      </nav>
    </header>
  )
}
