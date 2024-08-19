---
title: 自动重定向
---
# 自动重定向

# Pluto

Pluto is a dwarf planet in the Kuiper belt.

## Contents
Pluto is a dwarf planet in the Kuiper belt.111
## History
asdasfaf1

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…
针对父路由，自动重定向到第一个有权限的子路由。
针对没有权限的路由，自动重定向到第一个有权限的兄弟路由。

```javascript
// app.tsx
import { history, matchRoutes, Navigate } from 'umi'
function flattenRoutes(routes) {
  const flattened = []
  routes.forEach((route) => {
    flattened.push(route)
    if (route.routes && Array.isArray(route.routes)) {
      const _flattRoutes = flattenRoutes(route.routes)
      flattened.push(..._flattRoutes)
    }
  })

  return flattened
}

function flattenChildRoutes(routes) {
  const flattened = []
  routes.forEach((route) => {
    if (route.routes && Array.isArray(route.routes)) {
      const _flattRoutes = flattenRoutes(route.routes)
      flattened.push(..._flattRoutes)
    } else {
      flattened.push(route)
    }
  })

  return flattened
}

const addChildNavigate = (routes) => {
  routes.forEach((route) => {
    if (route.children?.length > 0) {
      const isAdd = !(route.children[0].element.props && route.children[0].element.props.to)
      const children = route.children.filter((r) => !(r.element.props && r.element.props.to))
      if (children.length > 0 && isAdd) {
        const hasSameParentPath = children.some((c) => c.path === route.path)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !hasSameParentPath &&
          route.children.unshift({
            path: route.path,
            element: <Navigate to={children[0].path} replace />
          })
      }
      addChildNavigate(route.children)
    }
  })
}
export const patchClientRoutes = ({ routes }) => {
  addChildNavigate(routes)
}

export const onRouteChange = async({ clientRoutes, location }) => {
  const useSidebar = hasShowSidebar()
  if (!useSidebar) return
  const routeFlat = flattenRoutes(clientRoutes)
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route || ({} as any)

  if (route?.unaccessible as boolean) {
    const routeList = Object.values(routeFlat)
    const broRoutes = routeList.filter(
      (el) => el.parentId === route.parentId && el.path !== route.path && !el.unaccessible
    )
    const _borRoutes = broRoutes.filter((el) => {
      if (el.element && el.element.props && el.element.props.to) {
        return false
      }
      return true
    })
    const _route = _borRoutes.find((i) => !i.hideInMenu && i.path)
    if (_route.routes) {
      const _childFalt = flattenChildRoutes(_route.routes)
      const nextRoute = _childFalt.find((i) => !i.hideInMenu && i.path)
      history.push(nextRoute.path)
    } else {
      history.push(_route.path)
    }
  }
}
```