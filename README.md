# Technology Bites
Technology Bites is serverless web application that scrapes news from technology web sites. 

* Whenever a user runs the app on the local server, article headlines, the article link, and the article snippet are scraped from techcrunch.com's website. 
* I used cheerio to easily grab and scrape  techcrunch's DOM elements. Mongoose was used to save the scraped data to our database (mongodb.)
* The comments button allows user to view comments on an article or add/delete their own comments; all comments are saved to our mongodb database. 

This app was made using cheerio to serve  as the ORM to simplify the database interactions.

---

### Pre-requisites

* Install Node.js. visit https://nodejs.org/en/ and download

### Technologies used

*node.js
*Express.js
*Bootstrap V4
*MongoDb

### Getting Started
This app is built with anf made possible with the following npm packages:

* express 
* express-handlebars
* body-parser
* cheerio 
* mongoose 
* morgan
* request

Type `npm install` in the command line to install all the dependcies located within package.json

## Default test (included in package.json file)
In order to connect to the scraper web app on the local server, type the following in the command line:

 `node server.js`

The user will also be notified in the command line interface on which PORT its connected on.

`localhost:port/scrape` will scrape the petapixel website

`localhost:port/articles` will display all the scraped articles from petapixel.com



### Author
* [Rohit Singh]


