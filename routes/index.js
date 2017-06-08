var express = require('express');
var router = express.Router();
var config = require('../config/config')
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection({
	host: config.sql.host,
	user: config.sql.user,
	password: config.sql.password,
	database: config.sql.database
})
var request = require('request');

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bytesAndBrews' });
});

// router.get('/login', (req,res)=>{
// 	res.send('LOGIN PAGE, YO')
// });

// router.get('/register', (req,res)=>{
// 	res.send('REGISTRATION PAGE')
// });

// router.get('/account', (req,res)=>{
// 	res.render('account', {})
// })

// router.get('/restaurants', (req,res)=>{
// 	res.render('restaurants', {})
// })

// router.get('/recipes', (req,res)=>{
// 	res.render('recipes', {})
// })

// router.get('/beverages', (req,res)=>{
// 	res.render('beverages', {})
// })

// router.get('/contact', (req,res)=>{
// 	res.render('contact', {})
// })





////// Snooth
const snoothBaseUrl = "http://api.snooth.com/wines/";
const snoothBaseUrl2 = 'http://api.snooth.com/wine/';
const wineKey = config.wineKey;
const ip = '&ip=66.28.234.115';


// var wineToSearch = wineName.split(' ').join('+');                             // UNCOMMENT


// What color wine do you like? Red, white, rose, amber, clear? Get our preferences?
// var wineColor = 't='+ colorSelected                                              // UNCOMMENT
// var snoothTypeUrl = snoothTypeUrl + wineKey + ip + wineColor;					// UNCOMMENT


// Found a good wine? Input a particular wine and get recipes


// router.get('/beverages', function(req, res, next) {
// 	request.get(,(error, response, wineData)=>{
// 		var wineData = JSON.parse(wineData);
// 		res.render('beverages', { 
// 			wineName: wine[i].recipes.name,
// 			wineImage: wine[i].recipes.image,
// 			wineRecipeLink: wine[i].recipes.link

// 			});

// 	});

// });

router.post('/recipes', (req,res)=>{
	// req.body is availbale because of the body-parser module
	// req.body is where POSTED data will live
	console.log(req.body);	
	var wineName = (req.body.searchString)
	var wineId = wineName.replace(" ","-");
	// console.log(wineId)
	var snoothRecipeUrl = snoothBaseUrl2 + wineKey + ip + '&id='+wineId + '&food=1';
	// console.log(snoothRecipeUrl)
	// res.json(req.body);
	request.get(snoothRecipeUrl,(error, response, wineData)=>{
		var wineFormatted = JSON.parse(wineData);
		// console.log(wineFormatted)
		// res.json(wineFormatted.wines[0].recipes[0]);
		// var wineData = JSON.parse(wineData);
		// res.json(wineFormatted.wines[0].recipes[0].name),
		// res.json(wineFormatted.wines[0].recipes[0].image),
		// res.json(wineFormatted.wines[0].recipes[0].link)

		// console.log(wineFormatted.wines[0].recipes[0].name);
		// console.log(wineFormatted.wines[0].recipes[0].image);
		// console.log(wineFormatted.wines[0].recipes[0].link);
		res.render('recipes', { 
			wineName: wineFormatted.wines[0].recipes[0].name,
			wineImage: wineFormatted.wines[0].recipes[0].image,
			wineRecipeLink: wineFormatted.wines[0].recipes[0].link,

			wineName1: wineFormatted.wines[0].recipes[1].name,
			wineImage1: wineFormatted.wines[0].recipes[1].image,
			wineRecipeLink1: wineFormatted.wines[0].recipes[1].link,

			wineName2: wineFormatted.wines[0].recipes[2].name,
			wineImage2: wineFormatted.wines[0].recipes[2].image,
			wineRecipeLink2: wineFormatted.wines[0].recipes[2].link



		});
	});

});

module.exports = router;