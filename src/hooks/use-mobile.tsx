import * as React from "react"

export type DeviceType = "mobile" | "tablet" | "desktop"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = React.useState<DeviceType>(() => {
    if (typeof window === "undefined") return "desktop"
    const width = window.innerWidth
    if (width < MOBILE_BREAKPOINT) return "mobile"
    if (width < TABLET_BREAKPOINT) return "tablet"
    return "desktop"
  })

  React.useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) setDeviceType("mobile")
      else if (width < TABLET_BREAKPOINT) setDeviceType("tablet")
      else setDeviceType("desktop")
    }
    window.addEventListener("resize", onResize)
    onResize()
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return deviceType
}

// Hook antigo mantido para retrocompatibilidade
export function useIsMobile() {
  return useDeviceType() === "mobile"
}
