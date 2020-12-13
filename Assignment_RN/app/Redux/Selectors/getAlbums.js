export const getFilteredAlbum = (data, key) => {
    if (data) {
        const result = data.filter(item => {
            // console.log("getFilteredAlbum", item.category.attributes.label)
            if (item.category.attributes.label === key) return true;
            else return false
        });
        return result;
    }
    return [];
};
