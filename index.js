// Import packages
const inquirer = require('inquirer');
const fs = require('fs');

// Import open package and define openFile function
async function openFile(filepath) {
  const open = (await import('open')).default;
  await open(filepath);
}

// Begin user prompts using inquirer
inquirer
  .prompt([
    {
      type: 'input',
      message: 'Project title:',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Project description. Provide a short description explaining the what, why, and how of your project. - What was your motivation? Why did you build this project? What problem does it solve?',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Installation instructions. What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.',
      name: 'install',
    },
    {
      type: 'input',
      message: 'Usage information. Provide instructions and examples for use.',
      name: 'usage',
    },
    {
        type: 'confirm',
        message: 'Do you have a screenshot for your project?',
        name: 'hasScreenshot',
        default: true,
      },
      {
        type: 'input',
        message: 'Screenshot file path (relative to the root directory):',
        name: 'screenshot',
        when: (answers) => answers.hasScreenshot,
      },
    {
      type: 'input',
      message: 'Contribution guidelines. The Contributor Covenant (https://www.contributor-covenant.org/) is an industry standard.',
      name: 'contribution',
    },
    {
      type: 'input',
      message: 'Test instructions:',
      name: 'testing',
    },
    {
      type: 'list',
      message: 'License. If you need help choosing a license, refer to https://choosealicense.com/.',
      name: 'license',
      choices: [
        'Academic Free License v3.0',
        'Apache license 2.0',
        'Artistic license 2.0',
        'Boost Software License 1.0',
        'BSD 2-clause "Simplified" license',
        'BSD 3-clause "New" or "Revised" license',
        'BSD 3-clause Clear license',
        'Creative Commons license',
        'Creative Commons Zero v1.0 Universal',
        'Creative Commons Attribution 4.0',
        'Creative Commons Attribution Share Alike 4.0',
        'Do What The F*ck You Want To Public License',
        'Educational Community License v2.0',
        'Eclipse Public License 1.0',
        'Eclipse Public License 2.0',
        'European Union Public License 1.1',
        'GNU Affero General Public License v3.0',
        'GNU General Public License family',
        'GNU General Public License v2.0',
        'GNU General Public License v3.0',
        'GNU Lesser General Public License family',
        'GNU Lesser General Public License v2.1',
        'GNU Lesser General Public License v3.0',
        'ISC',
        'LaTeX Project Public License v1.3c',
        'Microsoft Public License',
        'MIT',
        'Mozilla Public License 2.0',
        'Open Software License 3.0',
        'PostgreSQL License',
        'SIL Open Font License 1.1',
        'University of Illinois/NCSA Open Source License',
        'The Unlicense',
        'zLib License',
      ],
    },
    {
      type: 'input',
      message: 'GitHub username:',
      name: 'username',
    },
    {
      type: 'input',
      message: 'Email:',
      name: 'email',
    },
  ])
  .then((answers) => {
    // Generate the README content based on the user's answers
    const readMEContent = generateREADME(answers, answers.hasScreenshot, answers.screenshot);

    // Write the README content to a file
    fs.writeFile('README.md', readMEContent, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully created README.md!');

        // Prompt the user if they want to open the README.md file
        inquirer
          .prompt([
            {
              type: 'confirm',
              message: 'Do you want to open the README.md file?',
              name: 'openFile',
            },
          ])
          .then((answer) => {
            // Open the README.md file if the user selects 'Yes'
            if (answer.openFile) {
              openFile('README.md');
            } else {
              console.log('File not opened.');
            }
          });
      }
    });
  });

// Generate README.md from user responses
const generateREADME = (
{
  title,
  description,
  install,
  usage,
  contribution,
  testing,
  license,
  username,
  email,
  },
  hasScreenshot,
  screenshot
) => {
  const screenshotSection = hasScreenshot ? `\n## Screenshot\n\n![Screenshot](${screenshot})\n` : '';
    return `


# ${title}

## Description
${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [Questions](#questions)
- [License](#license)

## Installation
${install}

## Usage
${usage}${screenshotSection}

### Screenshot
![screenshot](${screenshot})

## Contribution Guidelines
${contribution}

## Test Instructions
${testing}

## Questions
https://github.com/${username}
${email}

## License
${license}
`
};
