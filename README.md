# Zendesk-Coding-Challenge

## Instructions on how to run the app:

1. Run `npm install` inside the root of both the back-end and front-end directories.
2. Inside the back-end directory, create a .env file with the following format:
   `API_USER=YOUR_EMAIL/token API_KEY=YOUR_KEY SUBDOMAIN=YOUR_SUBDOMAIN`
   Replace `YOUR_EMAIL, YOUR_KEY, YOUR_SUBDOMAIN` with your own respective values.
3. In two separate terminals, run `npm start` at the root of both the back-end and front-end directories.
4. The client will be running on port 3000.

## Design Decisions:
### How am I retrieving the tickets?
To retrieve the list of tickets, I decided to use offset pagination. I went with offset pagination so that my application would be more scalable as the list of tickets grows. 
### How am I rendering the tickets on the front end?
Instead of fetching all the tickets on render, I decided to only make an API call depending on which page the client is currently visiting. For example, if the client clicks on "page 3", an API request will be made on the backend via Express to specifically only request the tickets that are on page 3. That list of tickets is then stored within the local state of the React component. This will also ensure that my app does not use up too much memory because the local state is designed to only store up to 25 items at any page. 
### Pros vs Cons to my approach
There is a drawback to my approach, which is that my app will be prone to slow load times due to the asynchronous nature of the API requests. I could have fetched the entire list of tickets on the backend before rendering the component, which would have reduced the load times significantly. However, that approach would use up a lot of memory since my local state would hold a lot of items.
