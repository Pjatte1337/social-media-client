# Workflow CA

[![Deploy static content to Pages](https://github.com/Pjatte1337/social-media-client/actions/workflows/static.yml/badge.svg)](https://github.com/Pjatte1337/social-media-client/actions/workflows/static.yml)
[![Automated Unit Testing](https://github.com/Pjatte1337/social-media-client/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Pjatte1337/social-media-client/actions/workflows/unit-test.yml)
[![Automated E2E Testing](https://github.com/Pjatte1337/social-media-client/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/Pjatte1337/social-media-client/actions/workflows/e2e-test.yml)

---

## Github actions
- Deploying to github pages
- Running unit testing
- Running end to end testing

---

## About the project
This project is my delivery for the Course Assignment in Workflow from Noroff.

### Goal
To improve the quality of an existing ```environment``` by establishing useful ```workflows``` that make the development process more efficient.

### Brief
In order to complete this task, you will need to select an existing ```JavaScript``` project that has:
- API calls to ```CRUD``` an item
- API call to ```authenticate``` a user
- Does not belong to you

The following workflows/hooks are required:
- Project is configured to run Prettier on commit
- Project is configured to run ESLint on commit
- Project is configured to run Jest on commit
- Project is configured to deploy to pages on merge to default

The following file changes are required:
- Project readme file is updated to include new configuration information and status badges
- Project is configured for hosting (e.g. CDN links or a Bundler)

The following features must be automatically tested with unit tests:
- The login function returns a valid token when provided with valid credentials
- The logout function clears the token from browser storage
-The create item function creates a new item on the API

The following features must be automatically tested with end-to-end tests:
- The login form validates user inputs correctly based on API restrictions
- The create item form validates user inputs correctly based on API restrictions
- The logout button logs the user out when clicked

---

## devDependencies install

Installing Bootstrap
```md
npm i bootstrap
```

Installing SCSS
```md
npm i scss
```

```md
npm i start
```

Install prettier 
```md
npm install --save-dev prettier
```

Install eslint as dev
```md
npm install eslint --save-dev
```

Eslint setup
```md
npx eslint --init
```

Choose these options:
```md
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
```

Updated package.json scripts
```json
    "format": "prettier -w src/**/*.js",
    "lint": "eslint src/**/*.js",
    "lint-fix": "eslint src/**/*.js --cache --fix"
```

Install Mrm, for pre-commit hooks to run eslint and prettier
```md
npx mrm@2 lint-staged
```

Updated package.json tasks
```json
"lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.html": [
      "prettier --write"
    ],
    "*.scss": [
      "prettier --write"
    ]
  }
```

Install Jest
```md
npm i -D jest@29.2.0
```

Updated package.json scripts
```json
"test-unit": "jest"
```

Install eslint jest plugin
```md
npm i -D eslint-plugin-jest
```

eslint configuration
```json
{
  "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
      {
        "files": ["**/*.test.js"],
        "env": { "jest": true },
        "plugins": ["jest"],
        "extends": ["plugin:jest/recommended"],
        "rules": { "jest/prefer-expect-assertions": "off" }
      }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
```

Install Babel
```md
npm -D install @babel/core@7.19.3 @babel/preset-env@7.19.4
```

Add babel.config.json and add configuration
```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}
```

Install Cypress for end to end testing
```md
npm i -D cypress@10.7.0 eslint-plugin-cypress@2.12.1
```

Updated package.json scripts
```json
    "test": "npm run test-unit && npm run test-e2e-cli",
    "test-unit": "jest",
    "test-e2e": "cypress open",
    "test-e2e-cli": "cypress run"
```

Updated eslint config
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "files": ["**/*.cy.js"],
      "env": { "cypress/globals": true },
      "plugins": ["cypress"],
      "extends": ["plugin:cypress/recommended"],
      "rules": {
        "cypress/no-unnecessary-waiting": "off",
        "no-unused-vars": "off"
      }
    },
    {
      "files": ["**/*.test.js"],
      "env": { "jest": true },
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
      "rules": { "jest/prefer-expect-assertions": "off" }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {}
}
```


Install vite
```md
npm install -D vite
```

Update package.json
```json
    "dev": "vite",
    "vite-build": "vite build",
    "vite-preview": "vite preview"
```

Add Vite configuration.

```js
export default {
  server: {
    port: 5500,
    hot: true,
    host: '127.0.0.1',
  },
};

then you can run 
```md
npm run dev
```







