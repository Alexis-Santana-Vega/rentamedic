export type TrackCapabilitiesExt = MediaTrackCapabilities & {
  zoom?: { min: number; max: number };
  torch?: boolean;
};

export interface CameraAdvancedSettings {
  advanced: Array<
    MediaTrackConstraintSet & {
      zoom?: number;
      torch?: boolean;
    }
  >;
}
