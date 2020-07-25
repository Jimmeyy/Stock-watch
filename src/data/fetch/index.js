export const fetchSingle = async endpoint => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
};

export const fetchMultiple = async endpoints => {
    const promises = endpoints.map(endpoint => fetchSingle(endpoint));
    const data = await Promise.all(promises);
    return data;
};
