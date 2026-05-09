import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '@/content/site';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
      }}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -ml-2 focus-ring"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text)' }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-8 flex items-center"
          aria-label={site.brand.name}
        >
          <img
            src="/images/logo/mehr-logo.png"
            alt="MEHR"
            className="h-5 md:h-6 w-auto select-none"
            style={{ filter: 'brightness(0)' }}
            draggable={false}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {site.navigation.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-body relative transition-colors duration-200 hover:opacity-70 focus-ring"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--color-text)',
                letterSpacing: '0.01em',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-1">
          <button
            className="p-2 focus-ring hidden md:flex"
            aria-label="Search"
            style={{ color: 'var(--color-text)' }}
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            className="p-2 focus-ring hidden md:flex"
            aria-label="Account"
            style={{ color: 'var(--color-text)' }}
          >
            <User size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={onOpenCart}
            className="p-2 focus-ring relative"
            aria-label="Cart"
            style={{ color: 'var(--color-text)' }}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-fg)',
                  fontSize: '11px',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-t"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--color-border)',
          }}
        >
          <nav className="container-main py-6 flex flex-col gap-4">
            {site.navigation.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body py-2"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
