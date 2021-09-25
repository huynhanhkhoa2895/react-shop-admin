import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser, faUserPlus, faTachometerAlt, faMugHot } from '@fortawesome/free-solid-svg-icons'
// sidebar nav config
import navigation from './_nav'
import { selectorPermissions, selectorSidebarShow, selectorUser } from 'redux/selector'
import { remove } from 'lodash'
import { updateState } from 'redux/action'

const Sidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(selectorSidebarShow())
  const permissions = useSelector(selectorPermissions())
  const user = useSelector(selectorUser())
  const _updateState = (key : any, val : any) => dispatch(updateState(key, val))
  const [_nav, setNav] = useState(navigation)
  useEffect(() => {
    const newNav : any = []
    if (permissions != null && user.role !== "root") {
      navigation.forEach((nav : any, index : any) => {
        if (nav.type === "acl") {
          if (permissions[nav.module] != null && permissions[nav.module].indexOf(nav.action) > -1) {
            newNav.push(nav)
          }
        } else {
          newNav.push(nav)
        }
      })
      setNav(newNav)
    }
  }, [permissions])
  return (
    <CSidebar
      show={show}
      onShowChange={(val : any) => _updateState("sidebarShow", val)}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={_nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(Sidebar)
