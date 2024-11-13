import { socket } from "src/config/socket";
import styles from "./Map.module.scss";
import { useEffect, useState } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { Grid, Skeleton } from "@mui/material";
import truck from "src/assets/truck.png";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 10.775954569856939,
  lng: 106.65081148676141,
};

function Map() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<GeolocationCoordinates | null>(
    null
  );
  const [transporterLocation, setTransporterLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY,
  });

  useEffect(() => {
    socket.emit("join_room_location", 1, (response: string) =>
      console.log(response)
    );
  }, []);

  useEffect(() => {
    const listener = (coordinate: ICoordinate) => {
      const { latitude, longitude } = coordinate;
      setTransporterLocation({
        lat: latitude,
        lng: longitude,
      });
    };
    socket.on("new_coordinate", listener);

    return () => {
      socket.off("new_coordinate", listener);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation(position.coords);
      });
    } else {
      alert("Quyền truy cập vị trí bị từ chối");
    }
  }, []);

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={8}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              myLocation
                ? { lat: myLocation.latitude, lng: myLocation.longitude }
                : center
            }
            zoom={12}
            onLoad={(map) => setMap(map)}
            onUnmount={() => setMap(null)}
          >
            <OverlayView
              position={
                transporterLocation
                  ? {
                      lat: transporterLocation.lat,
                      lng: transporterLocation.lng,
                    }
                  : center
              }
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <img src={truck} width={30} />
            </OverlayView>
          </GoogleMap>
        ) : (
          <Skeleton width={"100%"} height={"70vh"} />
        )}
      </Grid>
    </Grid>
  );
}

export default Map;
