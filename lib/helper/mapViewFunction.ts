export const normalMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=900&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName,
    )})&t=m&z=15&ie=UTF8&iwloc=B&output=embed`;
};

export const satelliteMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=900&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName,
    )})&t=k&z=18&ie=UTF8&iwloc=B&output=embed`;
};

export const threeDimensionalMapURL = (latitude: number, longitude: number, establishmentName: string) => {
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}+(${encodeURIComponent(
        establishmentName,
    )})&t=k&z=18&ie=UTF8&iwloc=B&output=embed&layer=t&tilt=60`;
};

export const OSMMapURL = (latitude: number, longitude: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.0005},${latitude - 0.0003},${
        longitude + 0.0005
    },${latitude + 0.0003}&layer=mapnik&marker=${latitude},${longitude}&zoom=18`;
};

export const SatteliteMap = (latitude: number, longitude: number) => {
    return `https://www.bing.com/maps/embed?h=1200&w=1000&cp=${latitude}~${longitude}&lvl=20&typ=a&sty=h&src=SHELL&FORM=MBEDV8`;
};
