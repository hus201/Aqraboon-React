import { Icon } from '@iconify/react';
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
// import peopleFill from '@iconify/icons-eva/people-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill)
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  {
    title: 'طلب خدمة',
    path: '/Service/RequestService',
    icon: getIcon(personAddFill),
    ISVolunteer: false
  },
  {
    title: 'طلب ملحق ظبي',
    path: '/Service/RequestAttatchment',
    icon: getIcon(personAddFill),
    ISVolunteer: false
  },
  {
    title: 'طلباتي',
    path: '/Service/NeedRequestsList',
    icon: getIcon(shoppingBagFill),
    ISVolunteer: false
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
