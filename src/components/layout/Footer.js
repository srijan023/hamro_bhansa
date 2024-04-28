export default function Footer () {
  const year = new Date().getFullYear();
  return(
      <footer className="text-center text-gray-500 mt-14 text-sm font-semibold">
        <hr />
        <p className="pt-6 italic">&copy; {year} All rights reserved</p>
      </footer>
  )
}
