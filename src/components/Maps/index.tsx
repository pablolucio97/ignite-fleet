import { Car, FlagCheckered } from "phosphor-react-native";
import { useRef } from "react";
import { Platform } from "react-native";
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { useTheme } from "styled-components/native";
import { IconBox } from "../IconBox";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinate = coordinates[coordinates.length - 1];

  const mapRef = useRef<MapView>(null);
  const { COLORS } = useTheme();

  const EDGE_PADDING_VALUE = 50;

  async function autoCentralizeMap() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: {
          top: EDGE_PADDING_VALUE,
          bottom: EDGE_PADDING_VALUE,
          left: EDGE_PADDING_VALUE,
          right: EDGE_PADDING_VALUE,
        },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={autoCentralizeMap}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>
      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>
          <Polyline
            coordinates={[...coordinates]}
            strokeColor={COLORS.BRAND_LIGHT}
            strokeWidth={4}
          />
        </>
      )}
    </MapView>
  );
}
