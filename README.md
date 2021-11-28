# mini_wallet_exercise

### How to start Server
1. run your own mysql server
	- if you don't have mysql server, please contact me to get my personal cloud RMDBS
2. run "cp config.template.json config.json"
3. replace db_dev credential with your mysql database credential
4. run "npm i"
5. run "npm run migrate"
6. run "npm run start"
The server will run on localhost:3001