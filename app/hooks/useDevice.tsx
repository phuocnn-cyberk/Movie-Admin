import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1280;

export type DeviceType = "mobile" | "tablet" | "desktop";

const getDeviceType = (): DeviceType => {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < MOBILE_BREAKPOINT
    ? "mobile"
    : window.innerWidth < TABLET_BREAKPOINT
      ? "tablet"
      : "desktop";
};

export function useDevice() {
  const deviceTypeRef = React.useRef<DeviceType>(getDeviceType());
  const [deviceType, setDeviceType] = React.useState<DeviceType>(deviceTypeRef.current);

  React.useEffect(() => {
    const updateDeviceType = () => {
      const newDeviceType = getDeviceType();

      // Only update state if device type has changed
      if (deviceTypeRef.current !== newDeviceType) {
        deviceTypeRef.current = newDeviceType;
        setDeviceType(newDeviceType);
      }
    };

    // Initial device type check
    updateDeviceType();

    // Only listen for resize events
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  };
}
