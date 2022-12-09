const callToApi = () => {
    return fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((data) => {
            const cleanData = data.results.map((eachData) => {
            return {
                    name: eachData.name.first,
                    lastname: eachData.name.last,
                    picture: eachData.picture.small ? eachData.picture.small : '../images/unknown-character.jpg',
                    city: eachData.location.city,
                    age: eachData.registered.age,
                    gender: eachData.gender,
                    id: eachData.id.value ? eachData.id.value : crypto.randomUUID(),
                }
            })
            return cleanData
        })
        .then((cleanData) => {
            const compare = (a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            };
            return cleanData.sort(compare);
            //return cleanData.sort((a,b) => {return compare(a.name, b.name)});
        });        
};

export default callToApi;
