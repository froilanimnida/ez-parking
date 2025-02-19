import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { askLocationPermission, getUserLocation, turnByTurnNavigation } from "@lib/helper/location";
import LoadingComponent from "@components/reusable/LoadingComponent";

const Directions = () => {
    const { latitude, longitude } = useLocalSearchParams() as { latitude: string; longitude: string };
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!latitude || !longitude) {
            alert("Please provide latitude and longitude parameters.");
            router.push("/");
        }
        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            alert("Invalid latitude and longitude parameters.");
            router.push("/");
        }
        const locateUser = async () => {
            setLoading(true);
            const granted = await askLocationPermission();
            if (!granted) {
                alert("Please enable location permissions.");
                router.push("/");
            }
            const location = await getUserLocation();
            if (!location) {
                alert("Failed to get user location.");
                router.push("/");
            }
            return location;
        };
        locateUser().then(
            (location) => {
                setUserLocation(location);
                turnByTurnNavigation(
                    userLocation.latitude,
                    userLocation.longitude,
                    Number(latitude),
                    Number(longitude),
                ).then((res) => console.log(res));
            },
            (error) => {
                alert(`Error: ${error}`);
            },
        );
    }, []);

    return (
        <ResponsiveContainer>
            {loading && <LoadingComponent text={"Loading..."} />}
            <h1>Directions</h1>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
        </ResponsiveContainer>
    );
};

export default Directions;
