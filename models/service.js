/**
 * Scraper for gaining access to news from news centers all over the world
 * @param {string} [source] [news source name]
 * @param {url/array of urls} [link] [link to be scraped]
 * @returns {object} [blog post in a json format]
 */

var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

// headers for removing unsupported browser error
var headers = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
   'Content-Type' : 'application/x-www-form-urlencoded'
}

// ever adding sources
var sources = ['techcrunch', 'wired-de'];

// primary module
module.exports = function(source, link, callback) {
	var json_post = [];
	// for crufting requests for unsupported browsers
	if (sources.indexOf(source) == -1)
		return {'body': 'sorry! support not available yet for the required source'};

	// source mapper
	var scrape_map = {
		"techcrunch": techcrunch,
		"wired-de": wired
	};

	var blog_json = scrape_map[source](link);

	// scraper for techcrunch posts
	function techcrunch(link) {
		// for handling incoming links array
		if (Array.isArray(link)) {
			async.eachSeries(link, function(url, next) {
				request({url: url, headers: headers}, function(err, res, html) {
					if(!err) {
						// here comes cheerio for handling DOM traversal
						var $ = cheerio.load(html);
						json_post.push({url: url, post: $('.article-entry p').text()});
						next();
					} else {
						// handle error here
					}
				})
			}, function() {
				// sending result back to the client
				return callback(json_post);
			});
		}
		// for handling incoming single link
		else {
			request(link, function(err, res, html) {
				if(!err) {
					// here comes cheerio for handling DOM traversal
					var $ = cheerio.load(html);
					json_post.push({url: link, post: $('.article-entry p').text()});
					return callback(json_post);
				} else {
					// handle error here
				}
			})
		}
	}

	// scraper for wired posts
	function wired(link) {
		// for handling incoming links array
		if (Array.isArray(link)) {
			async.eachSeries(link, function(url, next) {
				request({url: url, headers: headers}, function(err, res, html) {
					if(!err) {
						// here comes cheerio for handling DOM traversal
						var $ = cheerio.load(html);
						json_post.push({url: url, post: $('.article-content .body-wrapper p').text()});
						next();
					} else {
						// handle error here
					}
				})
			}, function() {
				// sending result back to the client
				return callback(json_post);
			});
		}
		// for handling incoming single link
		else {
			request(link, function(err, res, html) {
				if(!err) {
					// here comes cheerio for handling DOM traversal
					var $ = cheerio.load(html);
					json_post.push({url: link, post: $('.article-content .body-wrapper p').text()});
					return callback(json_post);
				} else {
					// handle error here
				}
			})
		}
	}
}