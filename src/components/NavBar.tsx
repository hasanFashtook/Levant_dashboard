'use client';
import { NextPage } from 'next'
import { Nav } from 'rsuite'
import Link from 'next/link'
import { useEffect, useState } from 'react';
interface Props { }

const paths = [
  {
    name: 'home',
    path: "/",
  },
  {
    name: 'register',
    path: "/register",
  },
  {
    name: 'login',
    path: "/login",
  },
]

const navs = paths.map((path, i) => (
  <Nav.Item
    key={i}
  >
    <Link className=' hover:no-underline' href={path.path}>{path.name}</Link>
  </Nav.Item>
));

const NavBar: NextPage<Props> = ({ }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return <Nav>
      {navs}
    </Nav>
  }
}

export default NavBar
