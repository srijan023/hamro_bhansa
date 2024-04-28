import Link from "next/link"
export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link className='text-primary font-semibold text-2xl' href="">HAMRO BHANSA</Link>
      <nav className="flex gap-8 text-gray-500 items-center">
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex gap-5 items-center">
        <Link href={'/login'} className="border px-5 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all border-gray-500 text-gray-500">Login</Link>
        <Link href={'/'} className="px-5 py-2 rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all hover:border-primary border-primary border">Register</Link>
        {/* TODO: Handle this later */}
      </nav>
    </header>
  )
}
