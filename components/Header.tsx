import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <div className="main-container inner">
        <Link href={'/'}>
          <Image src="/assets/logo.svg" alt="Logo" width={132} height={40} />
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
