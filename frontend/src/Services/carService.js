const CarService = {

    getCertainCars : (setCars, requestOptions) => {
        fetch('http://localhost:8081/api/cars/certain', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setCars(responseJson)
        })
    },
}

export default CarService