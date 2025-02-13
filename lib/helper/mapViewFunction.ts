export const normalMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=900&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName
    )})&t=m&z=15&ie=UTF8&iwloc=B&output=embed`;
};

export const satelliteMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=900&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName
    )})&t=k&z=18&ie=UTF8&iwloc=B&output=embed`;
};

export const threeDimensionalMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName
    )})&t=k&z=18&ie=UTF8&iwloc=B&output=embed&layer=t&tilt=60`;
};
