const AdService = {

    getAllAds : (setAds) => {
        fetch('http://localhost:8081/api/ads')
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
        })
    },

    getAdsPage : (setAds, page) => {
        fetch('http://localhost:8081/api/ads?page='+page)
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
        })
    },

    getTotalPages : (setTotalPages) => {
        fetch('http://localhost:8081/api/ads/totalPages')
        .then((response) => response.json())
        .then((responseJson) => {
            setTotalPages(responseJson)
        })
    },
}

export default AdService