import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Search, ListVideo, User2 } from 'lucide-react'
import Spline from '@splinetool/react-spline'

export default function Layout({ children, withHero = false }) {
  const navigate = useNavigate()

  const activeCls = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 text-xs ${isActive ? 'text-white' : 'text-red-200/70'}`

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top banner like Globoplay */}
      <header className="sticky top-0 z-30 bg-[#FF0000] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="font-extrabold tracking-tight text-2xl">globoplay</button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive})=>isActive? 'font-semibold': 'opacity-90 hover:opacity-100'}>Início</NavLink>
            <NavLink to="/canais" className={({isActive})=>isActive? 'font-semibold': 'opacity-90 hover:opacity-100'}>Canais ao vivo</NavLink>
            <NavLink to="/buscar" className={({isActive})=>isActive? 'font-semibold': 'opacity-90 hover:opacity-100'}>Buscar</NavLink>
            <NavLink to="/minha-lista" className={({isActive})=>isActive? 'font-semibold': 'opacity-90 hover:opacity-100'}>Minha lista</NavLink>
          </nav>
        </div>
      </header>

      {withHero && (
        <div className="relative h-[42vh] md:h-[56vh] w-full overflow-hidden bg-[#1a0000]">
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"/>
          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Tudo para maratonar</h1>
              <p className="mt-2 text-red-100/90 max-w-xl">Novelas, séries, filmes, canais ao vivo e programas da Globo — agora com áudio premium.</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      {/* Bottom tab bar */}
      <footer className="sticky bottom-0 z-30 bg-black/80 backdrop-blur border-t border-white/10 md:hidden">
        <div className="grid grid-cols-4 py-2">
          <NavLink to="/" className={activeCls}>
            <Home size={20} />
            <span>Início</span>
          </NavLink>
          <NavLink to="/buscar" className={activeCls}>
            <Search size={20} />
            <span>Buscar</span>
          </NavLink>
          <NavLink to="/minha-lista" className={activeCls}>
            <ListVideo size={20} />
            <span>Minha Lista</span>
          </NavLink>
          <NavLink to="/conta" className={activeCls}>
            <User2 size={20} />
            <span>Conta</span>
          </NavLink>
        </div>
      </footer>
    </div>
  )
}
