"use client";
import React, { forwardRef, useState } from 'react';
import Link from 'next/link';
import { SIDENAV_ITEMS } from '@/Constants';
import { Sidenav, Nav } from 'rsuite';
import Image from 'next/image';
import MoveDownIcon from '@rsuite/icons/MoveDown';
import { signOut } from 'next-auth/react';


interface NavLinkProps {
  as: string;
  href: string;
}

const NavLink = forwardRef((props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} ref={ref} as={as} {...rest} />
  );
});
NavLink.displayName = 'NavLink';

function SideBar() {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <div className=' bg-white h-screen w-full md:flex'>
      <Sidenav appearance='subtle' >
        <Sidenav.Header className='grid place-items-center h-24 py-5 px-8'>
          <Image
            src={'/Group_210.svg'}
            width={200}
            height={50}
            alt='levant'
          />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            {SIDENAV_ITEMS.map((item, i) => (
              item.submenu ? (
                <Nav.Menu
                  key={i}
                  eventKey={`${i + 1}`}
                  title={item.title}
                  icon={item.icon}
                >
                  {item.subMenuItems?.map((subItem, index) => (
                    subItem.submenu ? (
                      <Nav.Menu
                        key={index}
                        eventKey={`${i}-${index}`}
                        title={subItem.title}
                        icon={subItem.icon}
                      >
                        {subItem.subMenuItems?.map((nestedSubItem, idx) => (
                          <Nav.Item
                            key={idx}
                            icon={nestedSubItem.icon}
                            eventKey={`${i}-${index}-${idx}`}
                            as={NavLink}
                            href={nestedSubItem.path}
                          >
                            {nestedSubItem.title}
                          </Nav.Item>
                        ))}
                      </Nav.Menu>
                    ) : (
                      <Nav.Item
                        key={index}
                        eventKey={`${i}-${index}`}
                        icon={subItem.icon}
                        as={NavLink}
                        href={subItem.path}
                      >
                        {subItem.title}
                      </Nav.Item>
                    )
                  ))
                  }
                </Nav.Menu>
              ) : (
                <Nav.Item
                  key={i}
                  eventKey={`${i + 1}`}
                  icon={item.icon}
                  as={NavLink}
                  href={item.path}>
                  {item.title}
                </Nav.Item>
              )
            ))}
            <Nav.Item
              eventKey={`${SIDENAV_ITEMS.length + 1}`}
              icon={<MoveDownIcon />}
              as={'button'}
              onClick={() => signOut({callbackUrl:'/login'})}
              className=' text-left'
            >
              log out
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  )
}

export default SideBar
