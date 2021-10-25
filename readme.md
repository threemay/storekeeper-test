# Storekeeper server

## Environment setup

0. We use `yarn` to manage the packages, so make sure you have `yarn` installed. You can run `npm install -g yarn` to install yarn.
1. clone this repo.
2. run `yarn` in the project root.
3. run `yarn setup` to setup git hooks.
4. add a `.env` file, and include the following

```
NODE_ENV=development
PORT=8080
DB_URL=mongodb://localhost:27017/storekeeper
```

5. run `yarn dev` to start developing.

## Fake data setup use mongorestore and mongodump

0. Download and install The MongoDB Database Tools follow the guide `https://docs.mongodb.com/database-tools/`
1. Windows system needs to add the install directory to your system's PATH environment variable.
2. Download the dbDump folder in the root directory of this project.
3. run `mongorestore -d <DATABASE> -c <COLLECTION> <PATH>` 
4. Run mongodump and mongorestore from the system command line, not the mongo shell.

```
<DATABASE> : storekeeper
<COLLECTION> : users
<PATH> : The path of the dbDump folder you downloaded
```