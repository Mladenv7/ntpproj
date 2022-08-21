import CarService from "./carService"

const AdService = {

    getAdsPage : (setAds, setCars, page, requestOptions) => {
        fetch('http://localhost:8081/api/ads?page='+page, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
            let carIds = responseJson.map(ad => ad.ID)

            CarService.getCertainCars(setCars, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carIds)
            })
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