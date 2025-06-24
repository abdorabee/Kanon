"use client";
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-10 py-3 bg-background transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-text">Kanon</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-text hover:text-accent transition-colors">Home</a>
          <a href="#" className="text-text hover:text-accent transition-colors">About</a>
          <a href="#" className="text-text hover:text-accent transition-colors">Features</a>
          <a href="#" className="text-text hover:text-accent transition-colors">Pricing</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Get Started</Button>
      </div>
    </header>
  );
}