// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) return VerticalNavGroup

  return VerticalNavLink
}

const newVerticalNavItems = [
  {
    name: 'createpayments',
    title: 'Создать платёж',
    path: 'transaction/addItem/',
    icon: 'material-symbols:add-circle-outline'
  },

  // {
  //   name: 'homeaccounts',
  //   title: 'Главная',
  //   path: 'home',
  //   icon: 'mdi:home'
  // },
  // {
  //   name: '',
  //   title: 'Создать платёж',
  //   path: 'additem',
  //   icon: 'material-symbols:add-circle-outline'
  // },
  {
    name: 'accounts',
    title: 'Счета',
    path: 'accounts',
    icon: 'material-symbols:card-travel-outline'
  },

  // {
  //   name: 'payments',
  //   title: 'Платежи',
  //   path: 'transaction',
  //   icon: 'fluent:payment-32-regular'
  // },

  // {
  //   name: 'paymentsTemplate',
  //   title: 'Шаблоны',
  //   path: 'paymentsTemplate',
  //   icon: 'fluent:payment-32-regular'
  // },
  {
    name: 'payments',
    title: 'Транзакции',
    path: 'transaction',
    icon: 'fluent:payment-32-regular'
  },
  {
    name: 'loansAgreements',
    title: 'Документы',
    path: 'documents',
    icon: 'fluent:payment-32-regular'
  },
  {
    name: 'myEmployees',
    title: 'Мои сотрудники',
    path: 'paymentsMyEmployees',
    icon: 'fluent:payment-32-regular'
  },

  // {
  //   name: 'settings',
  //   title: 'Настройки',
  //   path: 'paymentsSettings',
  //   icon: 'fluent:payment-32-regular'
  // },
  // {
  //   name: 'loansprofile',
  //   title: 'Публичная оферта',
  //   path: 'paymentsSettings',
  //   icon: 'fluent:payment-32-regular'
  // },
  {
    name: 'oferta',
    title: 'Публичная оферта',
    path: 'paymentsOferta',
    icon: 'fluent:payment-32-regular'
  },
  {
    name: '',
    title: 'Шаблоны и автоплатежи',
    path: 'autopayments',
    icon: 'mdi:paper-check-outline'
  },

  // {
  //   name: 'loans',
  //   title: 'Кредитные договора',
  //   path: 'credits',
  //   icon: 'mdi:credit-card-check-outline'
  // },
  {
    name: '',
    title: 'Депозит',
    path: 'depozit',
    icon: 'ri:luggage-deposit-line'
  },
  {
    name: '',
    title: 'Выписки и отчёты',
    path: 'otchyoti',
    icon: 'uil:import'
  },
  {
    name: '',
    title: 'Зарплатный проект',
    path: 'project',
    icon: 'eos-icons:project-outlined'
  },
  {
    name: '',
    title: 'Контрагенты',
    path: 'kontragenti',
    icon: 'mdi:user-convert'
  },
  {
    name: '',
    title: 'Эквайринг',
    path: 'ekvayring',
    icon: 'icon-park-outline:buy'
  },

  // {
  //   name: 'kartoteka',
  //   title: 'Картотека',
  //   path: 'kartoteka',
  //   icon: 'material-symbols:credit-card-outline'
  // },
  {
    name: '',
    title: 'Документы',
    path: 'document',
    icon: 'et:documents'
  },
  {
    name: '',
    title: 'Государственные услуги',
    path: '',
    icon: 'carbon:cloud-service-management'
  },
  {
    name: '',
    title: 'ЕЭИСВО',
    path: '',
    icon: 'gis:search-country'
  },
  {
    name: '',
    title: 'Заказ корпоративной карты',
    path: 'carti',
    icon: 'material-symbols:add-card-outline-rounded'
  },
  {
    name: '',
    title: 'Налоговые отчеты',
    path: '',
    icon: 'iconoir:reports'
  },
  {
    name: '',
    title: 'Банковская гарантия',
    path: '',
    icon: 'mdi:bank-check'
  },
  {
    name: '',
    title: 'Импорт данных',
    path: '',
    icon: 'uil:import'
  },
  {
    name: '',
    title: 'Справочник',
    path: '',
    icon: 'mdi:faq'
  },
  {
    name: 'loansorganisation',
    title: 'Мои сотрудники',
    path: 'my_employees',

    // path: 'organisation',
    icon: 'mdi:people'
  }

  // {
  //   name: 'loansprofile',
  //   title: 'Настройки',
  //   path: 'profile',
  //   icon: 'mdi:settings'
  // }
]

const VerticalNavItems = props => {
  // ** Props
  // console.log(props.verticalNavItems);
  // const { verticalNavItems } = props // komment
  console.log('props ', props.verticalNavItems)
  console.log('newVerticalNavItems ', newVerticalNavItems)

  let verticalNavItems = props.verticalNavItems
  let activeVersticalItems = []
  for (const key in verticalNavItems) {
    console.log(key)
    for (let index = 0; index < newVerticalNavItems.length; index++) {
      if (newVerticalNavItems[index].name.includes(key)) {
        if (newVerticalNavItems[index].name === 'createpayments') {
          activeVersticalItems.unshift(newVerticalNavItems[index])
        } else {
          activeVersticalItems.push(newVerticalNavItems[index])
        }
      }
    }
  }

  const RenderMenuItems = activeVersticalItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
