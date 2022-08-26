const AdService = {

    getAdsPage : (setAds, page, requestOptions) => {
        fetch('http://localhost:8081/api/ads?page='+page, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
        })
    },

    getInactiveAdsPage : (setAds, page, requestOptions) => {
        fetch('http://localhost:8081/api/ads/inactive?page='+page, requestOptions)
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

    getInactiveTotalPages : (setTotalPages, setPageNumbers, requestOptions) => {
        fetch('http://localhost:8081/api/ads/inactive/totalPages', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setTotalPages(responseJson)
            setPageNumbers(Array.from({length: responseJson}, (_, i) => i + 1))
        })
    },

    sendAd : (requestOptions) => {
        fetch('http://localhost:8081/api/ads/new', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    updateAd : (requestOptions) => {
        fetch('http://localhost:8081/api/ads/update', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    getSingleAd : (id, setAdData) => {
        fetch('http://localhost:8081/api/ads/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
            setAdData(responseJson)
        })
    },

    deleteAd : (id, requestOptions) => {
        fetch('http://localhost:8081/api/ads/delete/'+id, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    manufacturers : [
        ["Acura" , []],
        ["Aston Martin" , ["DB7", "DB9", "DB11", "V8", "Vanquish", "Lagonda", "Rapide"]],
        ["BMW" , ["323i", "523i", "M3", "M5", "118i", "320d"]],
        ["Bentley" , []],
        ["Chrysler" , []],
        ["Chevrolet" , []],
        ["Citroen" , ["C3", "C2", "C5", "Saxo", "C4"]],
        ["Cadillac" , ["CTS", "ATS", "Escalade", "Seville"]],
        ["Dodge" , []],
        ["Ford" , ["Mustang", "Focus", "Fiesta", "Kuga", "Puma", "Ranger", "F150"]],
        ["Ferrari" , []],
        ["Honda" , ["Civic", "Accord", "NSX", "S2000", "Ridgeline", "Odyssey", "Jazz"]],
        ["Hummer" , ["H1", "H2", "H3"]],
        ["Holden" , []],
        ["Isuzu" , []],
        ["Mazda" , ["3", "2", "6", "MX-5", "RX-8", "CX-3"]],
        ["Mercedes-Benz" , []],
        ["Mini" , ["One", "Cooper"]],
        ["Nissan" , ["Altima", "Primera", "Micra", "Qashqai", "Sentra", "GT-R"]],
        ["Opel" , ["Astra", "Vectra", "Adam", "Omega", "Calibra", "Corsa", "Zafira"]],
        ["Porsche" , ["718 Cayman", "911 Carrera", "Panamera", "Cayenne"]],
        ["Pontiac" , []],
        ["Peugeot" , ["206", "208", "307", "508", "407", "RC Z"]],
        ["Renault" , ["Megane", "Clio", "Talisman", "Scenic", "Espace"]],
        ["Subaru" , ["Impreza", "Legacy", "Levorg", "BRZ"]],
        ["Suzuki" , ["Baleno", "Swift", "SX4"]],
        ["Toyota" , ["Yaris", "Camry", "Auris", "Avensis", "Corolla", "Supra", "Tacoma"]],
        ["Volkswagen" , ["Polo", "Golf", "Passat", "Transporter", "Tiguan", "Arteon"]],
    ],

    bodyType : [ 
        "Hatchback",
        "Sedan",
        "Station wagon",
        "Coupe",
        "Minivan",
    ],
    
    fuelType :   [
        "Petrol",
        "Diesel",
        "Electric",
        "Petrol + LPG",
        "Hybrid",
        "Hydrogen",
    ],
    

}

export default AdService