'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <Link
        className={cn('nav-link', {
          'is-active': pathname === '/',
          'is-home': true,
        })}
        href="/"
      >
        Home
      </Link>

      <p>Search Modal</p>

      <Link
        className={cn('nav-link', {
          'is-active': pathname === '/coins',
        })}
        href="/coins"
      >
        All coins
      </Link>
    </nav>
  );
};

export default Navbar;
