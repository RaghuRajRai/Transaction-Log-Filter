# Transaction-Log-Filter
An app to view and filter transactions stored in a Mongo Database using Express.js and Node.js

| Name  | USN |
| ------------- | ------------- |
| Raghu Raj Rai  | 01FE16BCS157  |
| Content Cell  |   |

Usage Guide:

1. Open the project folder in VisualStudio Code.
2. Install Node in the folder to get the Node modules(Not included in the repository due to a 3. large number of files)
4. Install Dependencies: (npm install 'name' --save)
      1. body-parser : To parse the requests sent by the user.
      2. express : Framework to handle the form requests.
      3. moment : Efficient for conversion of dates and times to different formats easily. 
      4. mongoose : An Object Relational Mapper(ORM) to communicate with Mongo Server. 
5. Setup MongoDB: 
      1. Go to the directory where Mongodb is installed and navigate to bin. 
      2. Open command prompt from the explorer(to stay in the same folder) and run the "mongod" command.
      3. Open another command prompt and run the sequence:
            1. mongo : To start the mongo shell
            2. show dbs : See the available databases
            3. use transactionRecords : Creates and selects a database transactionRecords
            4. Now we need to add a collection(which is like a table in SQL). We can create a collection by directly adding data to it. 
            5. Run the following command in the command prompt(NOT THE MONGO SHELL) and provide the link of the DUMMY_DATA.json file:
               mongoimport --db transactionRecords --collection transactions *Link to File here with extension without quotes* --jsonArray
            6. Our database is populated now with dummy records. 
6. We can now run our app. Go to the terminal in VisualStudio Code and run: node mongoserver.js
7. The app will be live at "localhost:3000" (Accessed via browser)
8. Enter the username: "root" and password: "root"


How to create the dummy records: 
The dummy data can be created based on your schema on: https://mockaroo.com/ 
This could be a useful case for testing your database and providing enough records to play around with your filters and features.
