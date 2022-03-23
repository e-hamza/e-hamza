const Mustache = require('mustache');
const fs = require('fs');
const axios = require('axios')

const MUSTACHE_MAIN_DIR = './main.mustache';/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/

function generateReadMe(DATA) {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
      if (err) throw err;
      const output = Mustache.render(data.toString(), DATA);
      fs.writeFileSync('README.md', output);
    });
  }

axios.get('https://pkcspcelzh.execute-api.eu-west-3.amazonaws.com/Prod/articles').then(posts => {


  console.log(posts.data)

    let DATA = {
    name: 'Hamza',
    posts: posts.data,
    date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Europe/Stockholm',
    }),
    };/**
    * A - We open 'main.mustache'
    * B - We ask Mustache to render our file with the data
    * C - We create a README.md file with the generated output
    */


    generateReadMe(DATA);

})