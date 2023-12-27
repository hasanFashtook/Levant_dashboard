import { SideNavItem } from "./types/types";
import HomeIcon from '@rsuite/icons/legacy/Home';
import GlobalIcon from '@rsuite/icons/Global';
import BarChartIcon from '@rsuite/icons/BarChart';
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: '/',
    icon: <HomeIcon />
  },
  {
    title: "Website 1",
    icon: <GlobalIcon />,
    submenu: true,
    subMenuItems: [
      {
        title: "Services Request",
        icon: <BarChartIcon />,
        submenu: true,
        subMenuItems: [
          {
            title: "Requseted",
            path: '/website-1/services-request/requseted',
            icon: <BarChartIcon />,
          },
          {
            title: "Accepted",
            path: '/website-1/services-request/accepted',
            icon: <BarChartIcon />,
          },
          {
            title: "Declined",
            path: '/website-1/services-request/declined',
            icon: <BarChartIcon />,
          }
        ]
      }, {
        title: "Products",
        icon: <BarChartIcon />,
        submenu: true,
        subMenuItems: [
          {
            title: "Facebook",
            path: '/website-1/products/facebook',
            icon: <BarChartIcon />,
          },
          {
            title: "Instagram",
            path: '/website-1/products/instagram',
            icon: <BarChartIcon />,
          },
          {
            title: "Telegram",
            path: '/website-1/products/telegram',
            icon: <BarChartIcon />,
          },
          {
            title: "Youtube",
            path: '/website-1/products/youtube',
            icon: <BarChartIcon />,
          }
        ]
      }, {
        title: "Users",
        path: '/website-1/users',
        icon: <BarChartIcon style={{ fontSize: '1rem', fontWeight: 'bold' }} />,
      }
    ]
  },
  {
    title: "Website 2",
    path: "website-2",
    icon: <GlobalIcon />,
    submenu: true,
    subMenuItems: [
      {
        title: "Tasks",
        path: '/website-2/tasks',
        icon: <BarChartIcon />,
        submenu: true,
        subMenuItems: [
          {
            title: "Admin Task",
            path: '/website-2/tasks/admin-task',
            icon: <BarChartIcon />,
          }, {
            title: "Users Task",
            path: '/website-2/tasks/users-task',
            icon: <BarChartIcon />,
          }
        ]
      }, {
        title: "Coins History",
        path: '/website-2/coins-history',
        icon: <BarChartIcon />,
      }, {
        title: "Users",
        path: '/website-2/users',
        icon: <BarChartIcon />,
      }
    ]
  }
]