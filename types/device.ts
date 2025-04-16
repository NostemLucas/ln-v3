export interface DeviceDimensions {
  width: number;
  height: number;
}

export interface DeviceOrientations {
  portrait: DeviceDimensions;
  landscape: DeviceDimensions;
}

export interface DeviceConfig {
  [key: string]: DeviceOrientations;
}

export type DeviceType = "mobile" | "tablet" | "desktop";
export type OrientationType = "portrait" | "landscape";

export interface PreviewState {
  device: DeviceType;
  orientation: OrientationType;
  scale: number;
}
