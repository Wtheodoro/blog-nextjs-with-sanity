import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className='w-full relative flex items-center justify-between py-4 max-w-5xl mx-auto'>
      <Link href='/' className='font-bold text-3xl'>
        Theodoro <span className='text-primary'>Blog</span>
      </Link>

      <ThemeToggle />
    </nav>
  )
}
export default Navbar
