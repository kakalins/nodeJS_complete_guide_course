const got = require('got');

const askBR = async(url) => {
    try {
        const response = await got(url);
        return response.body;
        //=> '<!doctype html> ...'
    } catch (error) {
        return error.response.body;
        //=> 'Internal server error ...'
    }
};

const printCountry = async() => {
    const result = await askBR('http://localhost:3000/api/rotas');
    //https://restcountries.eu/rest/v2/name/Peru
    console.log(result);
};

printCountry();