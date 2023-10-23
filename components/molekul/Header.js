import React from 'react';
import NavItem from '../atom/NavItem';

const Header = () => {
  return (
    <header className="flex justify-center h-12 p-2 space-x-4 rounded bg-two">
      <NavItem link={'/'} title={'Pilihan Beasiswa'} />
      <NavItem link={'/daftar/akademik'} title={'Daftar'} />
      <NavItem link={'/hasil'} title={'Hasil'} />
    </header>
  );
};

export default Header;
