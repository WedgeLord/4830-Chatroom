# 4830-Chatroom
# Get Started:
Download dependencies with `npm i`

Start one terminal and run `npm run start-backend`. This starts the server.

In a second terminal, run `ng serve`. This can be run on any computer to connect to the server.

Navigate to http://localhost:4200/home

# Short Description

A chatroom with an account creation/login page, a chatroom page, and an error 404 page. Users can select one of the other users in the database and strike up a conversation. Users can log out anytime.

Our service component uses two Subject subscriptions to update the chatroom. One is for the list of users in the database, which can change dynamically. The other is for the chat history between the user and the selected recipient. 

In the chatroom component, there is a timer that retrieves information from the server to read new messages and 
