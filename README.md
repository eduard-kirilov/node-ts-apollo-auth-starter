<h1 align="start">
  Node, TS, Apollo, Auth, - Starter
</h1>
<p align="start">
  <a href="https://nodejs.org/">
    <img alt="nodejs" src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" width="50"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="typescriptlang" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="50"/>
  </a>
  <a href="https://www.apollographql.com/">
    <img alt="apollographql" src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" width="100"/>
  </a>
  <a href="https://graphql.org">
    <img alt="graphql" src="https://graphql.org/img/logo.svg" width="50"/>
  </a>
  <a href="https://www.mongodb.com/">
    <img alt="mongodb" src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="100"/>
  </a>
</p>


## 🚀 Quick start

1.  **You need to install dependencies.**

    You can use yarn or npm.

    ```shell
    # install dependencies
    yarn
    # or
    npm install
    ```

1.  **Create the .env.development and .env.production**

    Create the .env file from the .env.example file.
    Description of environment variables:
    - DB_HOST - you mongo database url;
    - PORT - your port on which the api will work.

1.  **Start the project.**

    You can start a project using yarn or npm.

    ```shell
    # install dependencies
    yarn start
    # or
    npm run start
    ```

    Once launched, the server will be available on `http://localhost:${PORT}`!
    
    _You will also see a second link: _`http://localhost:${PORT}/graphqll`_.
    This is a tool that you can use to experiment with requesting your data.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a this project.

    .
    ├── src
    ├──/──models
    ├──/──resolvers
    ├──/──shema
    ├──/──utils
    ├──/──index.ts
    ├── .dockerignore
    ├── .env
    ├── .eslintrc.js
    ├── .gitignore
    ├── .huskyrc.js
    ├── .prettierrc
    ├── Dockerfile
    ├── LICENSE
    ├── README.md
    ├── babel.config.js
    ├── nodemon.json
    ├── package.json
    └── tsconfig.json
