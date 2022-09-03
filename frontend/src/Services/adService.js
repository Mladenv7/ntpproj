const AdService = {

    getAllAds : (setAds) => {
        fetch('http://localhost:8081/api/ads/allAds')
        .then((response) => response.json())
        .then((responseJson) => {
            setAds(responseJson)
        })
    },

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

    getReportedAdsPage : (setAds, page, requestOptions) => {
        fetch('http://localhost:8081/api/ads/reported?page='+page, requestOptions)
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

    getReportedTotalPages : (setTotalPages, setPageNumbers, requestOptions) => {
        fetch('http://localhost:8081/api/ads/reported/totalPages', requestOptions)
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

    getMailingList : (id, setSubscribers) => {
        fetch('http://localhost:8081/api/ads/subscribers/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
            setSubscribers(responseJson)
        })
    },

    subscribe : (requestOptions) => {
        fetch('http://localhost:8081/api/ads/subscribe', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },

    sendBoostRequest : (requestOptions) => {
        fetch('http://localhost:8081/api/ads/newBoostRequest', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },

    manufacturers : [
        ["Acura" , ["NSX", "Integra", "TLX", "RDX"]],
        ["Aston Martin" , ["DB7", "DB9", "DB11", "V8", "Vanquish", "Lagonda", "Rapide"]],
        ["BMW" , ["323i", "523i", "M3", "M5", "118i", "320d"]],
        ["Bentley" , ["Continental", "Mulsanne", "Flying Spur", "Bentayga"]],
        ["Chrysler" , ["300", "200", "Pacifica", "Crossfire"]],
        ["Chevrolet" , ["Camaro", "Corvette", "SS", "Cruze", "Lacetti", "Aveo", "Volt", "Spark"]],
        ["Citroen" , ["C3", "C2", "C5", "Saxo", "C4"]],
        ["Cadillac" , ["CTS", "ATS", "Escalade", "Seville"]],
        ["Dodge" , ["Neon", "Viper", "Challenger", "Charger", "Durango"]],
        ["Ford" , ["Mustang", "Focus", "Fiesta", "Kuga", "Puma", "Ranger", "F150"]],
        ["Ferrari" , ["812", "F12", "F40", "California", "458", "488", "GTC4Lusso", "FF"]],
        ["Honda" , ["Civic", "Accord", "NSX", "S2000", "Ridgeline", "Odyssey", "Jazz"]],
        ["Hummer" , ["H1", "H2", "H3"]],
        ["Holden" , ["Monaro", "Maloo"]],
        ["Isuzu" , ["Piazza"]],
        ["Mazda" , ["3", "2", "6", "MX-5", "RX-8", "CX-3"]],
        ["Mercedes-Benz" , ["C200", "E200", "SL500", "SL55", "SL65", "ML63", "GLE", "GLC", "A180", "B180"]],
        ["Mini" , ["One", "Cooper"]],
        ["Nissan" , ["Altima", "Primera", "Micra", "Qashqai", "Sentra", "GT-R"]],
        ["Opel" , ["Astra", "Vectra", "Adam", "Omega", "Calibra", "Corsa", "Zafira"]],
        ["Porsche" , ["718", "911", "Panamera", "Cayenne", "928", "914"]],
        ["Pontiac" , ["Solstice", "GTO", "Firebird", "G5"]],
        ["Peugeot" , ["206", "208", "307", "508", "407", "RC Z"]],
        ["Renault" , ["Megane", "Clio", "Talisman", "Scenic", "Espace"]],
        ["Subaru" , ["Impreza", "Legacy", "Levorg", "BRZ"]],
        ["Suzuki" , ["Baleno", "Swift", "SX4", "Grand Vitara"]],
        ["Toyota" , ["Yaris", "Camry", "Auris", "Avensis", "Corolla", "Supra", "Tacoma"]],
        ["Volkswagen" , ["Polo", "Golf", "Passat", "Transporter", "Tiguan", "Arteon", "Beetle"]],
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