// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const newVerticalNavItems = [
  {
    name: 'createpayments',
    title: 'Создать платёж',
    path: '/transaction/newtransaction',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12 0.959991C5.91212 0.959991 0.959961 5.91215 0.959961 12C0.959961 18.0878 5.91212 23.04 12 23.04C18.0878 23.04 23.04 18.0878 23.04 12C23.04 5.91215 18.0878 0.959991 12 0.959991ZM17.76 12.48H12.48V17.76H11.52V12.48H6.23996V11.52H11.52V6.23999H12.48V11.52H17.76V12.48Z'
          fill='white'
        />
      </svg>
    )
  },
  {
    name: 'accounts',
    title: 'Счета',
    path: '/accounts',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M11.5204 1.43999C11.4468 1.43999 11.3734 1.45677 11.3057 1.49061L10.5604 1.86374L9.81512 1.49061C9.66632 1.41717 9.48936 1.42433 9.34824 1.51217C9.20712 1.59953 9.12043 1.75343 9.12043 1.91999V5.27999H12.4823C13.8052 5.28095 14.8804 6.35711 14.8804 7.67999V8.63999H13.9204V7.67999C13.9204 6.88655 13.2748 6.24047 12.4814 6.23999H12.4804H2.88043C2.08651 6.23999 1.44043 6.88607 1.44043 7.67999V22.08C1.44043 22.2465 1.52664 22.4009 1.66824 22.4887C1.80936 22.5771 1.98536 22.5828 2.13512 22.5094L2.88043 22.1362L3.62574 22.5094C3.76062 22.577 3.91976 22.577 4.05512 22.5094L4.80043 22.1362L5.54574 22.5094C5.68062 22.577 5.83976 22.577 5.97512 22.5094L6.72043 22.1362L7.46574 22.5094C7.60062 22.577 7.75976 22.577 7.89512 22.5094L8.64043 22.1362L9.38574 22.5094C9.52062 22.577 9.67976 22.577 9.81512 22.5094L10.5604 22.1362L11.3057 22.5094C11.3734 22.5434 11.447 22.56 11.5204 22.56C11.6083 22.56 11.6958 22.5363 11.7726 22.4887C11.9142 22.4009 12.0004 22.2465 12.0004 22.08V7.67999C12.0004 7.41503 12.2155 7.19999 12.4804 7.19999C12.7454 7.19999 12.9604 7.41503 12.9604 7.67999V8.63999V9.59999H18.9361C19.4141 9.59999 19.5792 9.86437 19.8192 10.424C19.9161 10.6516 20.0091 10.8661 20.167 11.024C20.3484 11.206 20.6132 11.3075 20.8936 11.415C21.2804 11.5638 21.6014 11.7006 21.6014 11.8753V16.4447C21.6014 16.6194 21.2804 16.7562 20.8936 16.905C20.6132 17.013 20.3484 17.1145 20.167 17.2959C20.0091 17.4538 19.9166 17.6684 19.8192 17.8959C19.5792 18.4556 19.4141 18.72 18.9361 18.72H12.9604V19.68H22.5604V8.63999H19.6804V1.91999C19.6804 1.75343 19.5942 1.59908 19.4526 1.51124C19.311 1.42292 19.1345 1.41669 18.9857 1.49061L18.2404 1.86374L17.4951 1.49061C17.3602 1.42293 17.2011 1.42293 17.0657 1.49061L16.3204 1.86374L15.5751 1.49061C15.4402 1.42293 15.2811 1.42293 15.1457 1.49061L14.4004 1.86374L13.6551 1.49061C13.5202 1.42293 13.3611 1.42293 13.2257 1.49061L12.4804 1.86374L11.7351 1.49061C11.6677 1.45677 11.5941 1.43999 11.5204 1.43999ZM11.5204 3.35999H13.9204C14.1859 3.35999 14.4004 3.57455 14.4004 3.83999C14.4004 4.10543 14.1859 4.31999 13.9204 4.31999H11.5204C11.255 4.31999 11.0404 4.10543 11.0404 3.83999C11.0404 3.57455 11.255 3.35999 11.5204 3.35999ZM16.3204 3.35999H17.2804C17.5459 3.35999 17.7604 3.57455 17.7604 3.83999C17.7604 4.10543 17.5459 4.31999 17.2804 4.31999H16.3204C16.055 4.31999 15.8404 4.10543 15.8404 3.83999C15.8404 3.57455 16.055 3.35999 16.3204 3.35999ZM16.3204 5.27999H17.2804C17.5459 5.27999 17.7604 5.49455 17.7604 5.75999C17.7604 6.02543 17.5459 6.23999 17.2804 6.23999H16.3204C16.055 6.23999 15.8404 6.02543 15.8404 5.75999C15.8404 5.49455 16.055 5.27999 16.3204 5.27999ZM3.84043 10.56H6.24043C6.50587 10.56 6.72043 10.7745 6.72043 11.04C6.72043 11.3054 6.50587 11.52 6.24043 11.52H3.84043C3.57499 11.52 3.36043 11.3054 3.36043 11.04C3.36043 10.7745 3.57499 10.56 3.84043 10.56ZM8.64043 10.56H9.60043C9.86587 10.56 10.0804 10.7745 10.0804 11.04C10.0804 11.3054 9.86587 11.52 9.60043 11.52H8.64043C8.37499 11.52 8.16043 11.3054 8.16043 11.04C8.16043 10.7745 8.37499 10.56 8.64043 10.56ZM12.9604 10.56V17.76C14.8127 17.76 16.3204 16.1453 16.3204 14.16C16.3204 12.1747 14.8127 10.56 12.9604 10.56ZM3.84043 12.48H4.80043C5.06587 12.48 5.28043 12.6945 5.28043 12.96C5.28043 13.2254 5.06587 13.44 4.80043 13.44H3.84043C3.57499 13.44 3.36043 13.2254 3.36043 12.96C3.36043 12.6945 3.57499 12.48 3.84043 12.48ZM8.64043 12.48H9.60043C9.86587 12.48 10.0804 12.6945 10.0804 12.96C10.0804 13.2254 9.86587 13.44 9.60043 13.44H8.64043C8.37499 13.44 8.16043 13.2254 8.16043 12.96C8.16043 12.6945 8.37499 12.48 8.64043 12.48ZM18.9604 12.96C18.2985 12.96 17.7604 13.4981 17.7604 14.16C17.7604 14.8219 18.2985 15.36 18.9604 15.36C19.6224 15.36 20.1604 14.8219 20.1604 14.16C20.1604 13.4981 19.6224 12.96 18.9604 12.96ZM3.84043 14.4H6.24043C6.50587 14.4 6.72043 14.6145 6.72043 14.88C6.72043 15.1454 6.50587 15.36 6.24043 15.36H3.84043C3.57499 15.36 3.36043 15.1454 3.36043 14.88C3.36043 14.6145 3.57499 14.4 3.84043 14.4ZM8.64043 14.4H9.60043C9.86587 14.4 10.0804 14.6145 10.0804 14.88C10.0804 15.1454 9.86587 15.36 9.60043 15.36H8.64043C8.37499 15.36 8.16043 15.1454 8.16043 14.88C8.16043 14.6145 8.37499 14.4 8.64043 14.4ZM3.84043 16.32H5.28043C5.54587 16.32 5.76043 16.5345 5.76043 16.8C5.76043 17.0654 5.54587 17.28 5.28043 17.28H3.84043C3.57499 17.28 3.36043 17.0654 3.36043 16.8C3.36043 16.5345 3.57499 16.32 3.84043 16.32ZM8.64043 16.32H9.60043C9.86587 16.32 10.0804 16.5345 10.0804 16.8C10.0804 17.0654 9.86587 17.28 9.60043 17.28H8.64043C8.37499 17.28 8.16043 17.0654 8.16043 16.8C8.16043 16.5345 8.37499 16.32 8.64043 16.32Z'
          fill='#F4F3F3'
        />
      </svg>
    )
  },
  {
    name: 'payments',
    title: 'Транзакции',
    path: '/transaction',
    icon: (
      <svg width='21' height='24' viewBox='0 0 21 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0.360352 0.959991V23.04H13.3382C14.1393 23.6395 15.1287 24 16.2004 24C18.8404 24 21.0004 21.84 21.0004 19.2C21.0004 17.0614 19.5822 15.2386 17.6404 14.6231V7.00124L11.5991 0.959991H0.360352ZM11.8804 2.59874L16.0016 6.71999H11.8804V2.59874ZM15.7204 15.3937V19.2C15.7204 19.3273 15.7709 19.4494 15.861 19.5394C15.951 19.6294 16.0731 19.68 16.2004 19.68H20.0066C19.768 21.567 18.1495 23.04 16.2004 23.04C14.0884 23.04 12.3604 21.312 12.3604 19.2C12.3604 17.2509 13.8333 15.6324 15.7204 15.3937ZM16.6804 15.3937C18.4097 15.6124 19.7879 16.9907 20.0066 18.72H16.6804V15.3937Z'
          fill='white'
        />
      </svg>
    )
  },
  {
    name: 'loans',
    title: 'Документы',
    path: '/documents',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M4.28043 0.440002C4.01547 0.440002 3.80043 0.655042 3.80043 0.920002V1.88H18.2004V0.920002C18.2004 0.655042 17.9854 0.440002 17.7204 0.440002H4.28043ZM3.32043 2.84C3.05547 2.84 2.84043 3.05504 2.84043 3.32V4.28H19.1604V3.32C19.1604 3.05504 18.9454 2.84 18.6804 2.84H3.32043ZM2.36043 5.24C2.09547 5.24 1.88043 5.45504 1.88043 5.72V11.96H7.64043C8.17083 11.96 8.60043 12.3896 8.60043 12.92V13.2931C8.60043 14.5459 9.51387 15.6668 10.7604 15.7888C12.1908 15.9284 13.4004 14.8026 13.4004 13.4V12.92C13.4004 12.3896 13.83 11.96 14.3604 11.96H20.1204V5.72C20.1204 5.45504 19.9054 5.24 19.6404 5.24H2.36043ZM0.92043 12.92C0.65547 12.92 0.44043 13.135 0.44043 13.4V21.08C0.44043 21.345 0.65547 21.56 0.92043 21.56H21.0804C21.3454 21.56 21.5604 21.345 21.5604 21.08V13.4C21.5604 13.135 21.3454 12.92 21.0804 12.92H14.8404C14.5755 12.92 14.3604 13.135 14.3604 13.4V13.88C14.1267 15.5062 12.6905 16.76 11.0004 16.76C9.31035 16.76 7.87419 15.5062 7.64043 13.88V13.4C7.64043 13.135 7.42539 12.92 7.16043 12.92H0.92043Z'
          fill='#F4F3F3'
        />
      </svg>
    )
  },

  // {
  //   name: 'loans',
  //   title: 'Документы',
  //   path: '/documents/preview',
  //   icon: (
  //     <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
  //       <path
  //         d='M4.28043 0.440002C4.01547 0.440002 3.80043 0.655042 3.80043 0.920002V1.88H18.2004V0.920002C18.2004 0.655042 17.9854 0.440002 17.7204 0.440002H4.28043ZM3.32043 2.84C3.05547 2.84 2.84043 3.05504 2.84043 3.32V4.28H19.1604V3.32C19.1604 3.05504 18.9454 2.84 18.6804 2.84H3.32043ZM2.36043 5.24C2.09547 5.24 1.88043 5.45504 1.88043 5.72V11.96H7.64043C8.17083 11.96 8.60043 12.3896 8.60043 12.92V13.2931C8.60043 14.5459 9.51387 15.6668 10.7604 15.7888C12.1908 15.9284 13.4004 14.8026 13.4004 13.4V12.92C13.4004 12.3896 13.83 11.96 14.3604 11.96H20.1204V5.72C20.1204 5.45504 19.9054 5.24 19.6404 5.24H2.36043ZM0.92043 12.92C0.65547 12.92 0.44043 13.135 0.44043 13.4V21.08C0.44043 21.345 0.65547 21.56 0.92043 21.56H21.0804C21.3454 21.56 21.5604 21.345 21.5604 21.08V13.4C21.5604 13.135 21.3454 12.92 21.0804 12.92H14.8404C14.5755 12.92 14.3604 13.135 14.3604 13.4V13.88C14.1267 15.5062 12.6905 16.76 11.0004 16.76C9.31035 16.76 7.87419 15.5062 7.64043 13.88V13.4C7.64043 13.135 7.42539 12.92 7.16043 12.92H0.92043Z'
  //         fill='#F4F3F3'
  //       />
  //     </svg>
  //   )
  // },
  {
    name: 'employees',
    title: 'Мои сотрудники',
    path: '/employees',
    icon: (
      <svg width='24' height='21' viewBox='0 0 24 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M18.5529 17.9612H24.0297L23.9979 17.4531C23.8497 14.9537 21.866 14.17 20.2722 13.5419C19.3872 13.1912 18.5491 12.8612 18.3054 12.3287C18.2679 11.8787 18.2716 11.5281 18.2754 11.125V10.9619C18.6579 10.5625 19.0029 9.77686 19.1397 9.11873C19.4341 8.95186 19.7866 8.56748 19.8935 7.68248C19.946 7.23811 19.8222 6.89123 19.646 6.65498C19.8879 5.81873 20.351 3.75436 19.5185 2.41561C19.1641 1.84561 18.6316 1.48373 17.9304 1.33936C17.5291 0.851858 16.7847 0.587483 15.791 0.587483C14.651 0.609983 13.7416 0.887483 13.0722 1.40311C12.7704 1.20998 12.4272 1.06936 12.0335 0.992483C11.5797 0.418733 10.7116 0.107483 9.54535 0.107483C7.77723 0.141233 6.48535 0.681233 5.7016 1.71248C4.77348 2.93498 4.60098 4.78936 5.18785 7.22498C4.97223 7.48936 4.81285 7.89623 4.8766 8.43061C5.0041 9.48998 5.41473 9.92123 5.7616 10.0937C5.9266 10.9244 6.38035 11.86 6.82098 12.3006L6.82285 12.5256C6.8266 13.0112 6.83035 13.435 6.78348 13.9806C6.49098 14.6556 5.51223 15.04 4.38535 15.4844C2.50848 16.2212 0.174101 17.1381 -0.000273438 20.0519L-0.0302734 20.56H19.2297L19.1997 20.0519C19.1472 19.1969 18.9072 18.5181 18.5529 17.9612ZM1.0216 19.6C1.38348 17.695 3.08598 17.0275 4.73598 16.3769C6.05223 15.8612 7.29348 15.3719 7.70785 14.2619L7.73598 14.1362C7.79223 13.51 7.78848 13.0281 7.78285 12.5162L7.78098 12.0719L7.79035 11.7869L7.53348 11.6519C7.32348 11.5094 6.76098 10.5419 6.6691 9.67561L6.62598 9.27998L6.23035 9.24811C6.16848 9.24248 5.92098 9.06998 5.83098 8.31623C5.7841 7.92998 5.97348 7.79311 5.97348 7.79311L6.2791 7.60748L6.1891 7.26248C5.60598 5.01998 5.70348 3.30248 6.46848 2.29373C7.06473 1.50623 8.10723 1.09373 9.55473 1.06748C10.4566 1.06748 11.1222 1.29248 11.3379 1.66936L11.4541 1.87561L11.6885 1.90748C12.3297 1.99748 12.7854 2.26936 13.0797 2.74373C13.8166 3.93061 13.3891 6.12248 13.0216 7.23061L12.9204 7.59061L13.2279 7.79311C13.2297 7.79311 13.4172 7.92998 13.3704 8.31623C13.2804 9.06998 13.0329 9.24248 12.971 9.24811L12.5754 9.28186L12.5322 9.67561C12.4404 10.5456 11.8947 11.5131 11.7035 11.6481L11.4466 11.7831L11.4447 12.5181C11.4391 13.03 11.4354 13.51 11.4916 14.1362L11.5197 14.2619C11.9322 15.3719 13.1697 15.8594 14.4804 16.3769C15.4197 16.7481 16.3741 17.1269 17.0885 17.7362C17.1372 17.8131 17.2029 17.8769 17.2854 17.9162C17.7222 18.3456 18.0447 18.8875 18.1816 19.6H1.0216Z'
          fill='white'
        />
      </svg>
    )
  }

  // {
  //   name: 'oferta',
  //   title: 'Публичная оферта',
  //   path: '/',
  //   icon: (
  //     <svg width='18' height='24' viewBox='0 0 18 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
  //       <path
  //         d='M0.360352 0.960022V23.04H17.6404V7.00502L11.5954 0.960022H0.360352ZM11.4004 2.11502L16.4854 7.20002H11.4004V2.11502ZM3.72035 4.80002H9.96035V5.76002H3.72035V4.80002ZM3.72035 6.72002H9.96035V7.68002H3.72035V6.72002ZM3.72035 8.64002H14.7604V9.60002H3.72035V8.64002ZM3.72035 10.56H14.7604V11.52H3.72035V10.56ZM3.72035 12.48H14.7604V13.44H3.72035V12.48ZM6.67535 14.67C7.50035 14.67 8.02535 15.2381 8.02535 16.125C8.02535 17.1038 7.59785 17.9719 7.09535 18.645C8.19785 18.5569 8.6741 17.73 9.00035 17.175C9.1991 16.8356 9.37535 16.545 9.73535 16.545C10.2135 16.545 10.371 17.0456 10.5454 17.565C10.551 17.5781 10.5547 17.595 10.5604 17.61C10.6447 17.5444 10.7404 17.46 10.8154 17.4C11.2897 17.0194 11.8822 16.545 12.6004 16.545C12.8666 16.545 13.0804 16.7588 13.0804 17.025C13.0804 17.2913 12.8666 17.505 12.6004 17.505C12.2197 17.505 11.7922 17.8481 11.4154 18.15C11.0404 18.45 10.7216 18.72 10.3504 18.72C9.9491 18.72 9.80473 18.3638 9.66035 17.94C9.23848 18.615 8.45098 19.62 6.88535 19.62C6.68098 19.62 6.50473 19.5806 6.33035 19.515C5.97598 19.8581 5.68723 20.0606 5.65535 20.085C5.57098 20.1469 5.48285 20.175 5.38535 20.175C5.23723 20.175 5.0891 20.1094 4.99535 19.98C4.83973 19.7663 4.8866 19.4606 5.10035 19.305C5.10598 19.3013 5.28035 19.1644 5.53535 18.93C5.11723 18.4163 4.90535 17.7019 4.90535 17.115C4.90535 15.7875 5.71723 14.67 6.67535 14.67ZM6.67535 15.63C6.35848 15.63 5.86535 16.2656 5.86535 17.115C5.86535 17.4563 5.99285 17.8875 6.21035 18.21C6.65848 17.6475 7.06535 16.92 7.06535 16.125C7.06535 15.6263 6.8141 15.63 6.67535 15.63Z'
  //         fill='white'
  //       />
  //     </svg>
  //   )
  // }
]

const OpenVerticalNavItems = props => {
  // ** Props
  console.log('props ', props.verticalNavItems)
  console.log('newVerticalNavItems ', newVerticalNavItems)

  const router = useRouter()
  const { pathname } = router

  const RenderOpenMenuItems = newVerticalNavItems.map((item, index) => {
    const navItem = (
      <Box className={`nav_item ${item.path == pathname && 'nav_item_active'}`} key={index}>
        <Link className='nav_item_text_link' to={item.path} href={item.path}>
          {item.icon}

          <Typography className='nav_item_text'>{item.title}</Typography>
        </Link>
      </Box>
    )

    return navItem
  })

  return <>{RenderOpenMenuItems}</>
}

export default OpenVerticalNavItems