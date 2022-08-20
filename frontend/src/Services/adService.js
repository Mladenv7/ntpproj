const AdService = {

    getAdsPage : (setAds, page, requestOptions) => {
        fetch('http://localhost:8081/api/ads?page='+page, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
        })
    },

    getTotalPages : (setTotalPages, setPageNumbers, requestOptions) => {
        fetch('http://localhost:8081/api/ads/totalPages', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setTotalPages(responseJson)
            setPageNumbers(Array.from({length: responseJson}, (_, i) => i + 1))
        })
    },
}

export default AdService