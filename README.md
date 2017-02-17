This project is live at: https://twitchtv-viewer.herokuapp.com/

Responsively-designed full-stack application that allows users to search for streams and channels on twitch.tv, a live streaming video platform.
When registered, users can browse the current most-watched titles, or search for streams and channels by username or game. 
Users can save specific channels for convenient access later.
Information related to the stream or channel will be displayed upon look-up, including viewer/follower counts and status messages.

The application architecture consists of a front-end written using React.js, an Express API server on the back-end, and a MySQL database for persistent data-storage.
The application receives JSON data from the *[Twitch API](https://dev.twitch.tv/docs/)* in order to generate relevant stream/channel information.
The front-end architecture is primarily structured around stateful container components within which stateless functional components render UI.
Routing on the front-end is handled by React-Router. Database operations within the Express server are mediated by the mysqljs driver.

Express-Session manages session-storage within the database. 
User passwords are hashed and salted using bcrypt, whilst user input is sanitized via Sanitize-Html. 
Application styling is achieved through the use of modular Sass stylesheets.

Note: This application is hosted on Heroku. 
Please allow a few seconds for the hosting server to wake up when attempting to view it live.
