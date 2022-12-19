export const extractLocations = (events) => {
    const extractLocations = events.map((event) => event.location);
    let locations = [...new Set(extractLocations)];
    return locations;
};