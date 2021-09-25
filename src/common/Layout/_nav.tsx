import React from 'react'
import CIcon from '@coreui/icons-react'
import Modules from 'Modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser, faUserPlus, faTachometerAlt, faMugHot, faHome, faHouseDamage, faBell, faConciergeBell, faBullhorn, faMoneyBillWave, faCashRegister, faCreditCard, faTags, faDoorOpen, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { strtolower, ucfirst } from 'helpers'
const initModule = () => {
  const arr = Modules.map((module)=>({
    _tag: 'CSidebarNavItem',
    name: ucfirst(module),
    to: '/'+strtolower(module)+'/list',
    icon: <FontAwesomeIcon icon={faUser} />,
    type: "acl",
    module: "role",
    action: "index"
  }))
  return arr
}
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Bảng điều khiển',
    to: '/dashboard',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Phân quyền']
  },
  ...initModule()
]
export default _nav
