import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'utilisateur',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'jeux',
    path: '/admin/jeux',
    icon: icon('ic_game'),
  },
  {
    title: 'Tickets',
    path: '/admin/ticket',
    icon: icon('ic_ticket1'),
  },
  {
    title: 'produit',
    path: '/admin/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
