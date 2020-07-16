const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);
userPrompts();
async function userPrompts() {
    try {
        
        const userInput = await inquirer.prompt([
            {
                type: "input",
                message: "Please enter your project title",
                name: "title"
            },
            {
                type: "input",
                message: "Please enter a badge link",
                name: "badge"
            },
            {
                type: "input",
                message: "Please enter Description",
                name: "description"
            },
            {
                type: "input",
                message: "Please enter Table of Contents",
                name: "contents"
            },
            {
                type: "input",
                message: "What is Installation for this Project?",
                name: "installation"
            },
            {
                type: "input",
                message: "Author",
                name: "author"
            },
            {
                type: "input",
                message: "Please enter Project homepage",
                name: "homepage"
            },
            {
                type: "input",
                message: "Usage",
                name: "usage"
            },
            {
                type: "list",
                message: "Please enter License name",
                name: "licenseName",
                choices: [
                    "MIT",
                    "Apache license 2.0",
                    "ISC",
                    "Mozilla Public License 2.0"
                ]
            },
            {
                type: "input",
                message: "Please enter License URL",
                name: "licenseURL"
            },
            {
                type: "input",
                message: "Contributing",
                name: "contributing"
            },
            {
                type: "input",
                message: "Tests",
                name: "tests"
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "username"
            },
            {
                type: "input",
                message: "Please enter User GitHub email",
                name: "email"
            }
              
        ]);

        // axios

        // const queryUrl = `https://api.github.com/users/${userInput.username}`;
        const {data} = await 
        axios
        .get(`https://api.github.com/users/${userInput.username}`)
        
        writeFileAsync('README.md',`
# ${userInput.title}

${userInput.badge}

## Description

![Image Alt Text](/assets/video.gif)

${userInput.description}
        
'''sh
node index.js
'''
## User story:

AS A developer
I WANT a README generator
SO THAT I can easily put together a good README for a new project

## Contents

${userInput.contents}

## Installation 

${userInput.installation}

## Author

${userInput.author}

## Project homepage

[GitHub page](${userInput.homepage})

## Usage

${userInput.usage}

## License name

${userInput.licenseName}

## License URL

${userInput.licenseURL}

## Contributing

${userInput.contributing}

## Tests

${userInput.tests}

## GitHub username

[GitHub profile](https://github.com/${userInput.username})

## User GitHub profile picture

[![Build Status](https://img.shields.io/github/followers/khantatyana?label=Follow&style=social)](https://img.shields.io/github/followers/khantatyana?label=Follow&style=social)

![Picture](${data.avatar_url})

## User GitHub email

[email](${userInput.email})
                
                `
                        );
            console.log("Success!")
    } 
    catch (err) {
        console.log(err);
        }
}

