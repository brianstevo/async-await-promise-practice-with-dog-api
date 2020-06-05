const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
	console.log(`breed: ${data}`);
	superagent
		.get(`https://dog.ceo/api/breed/${data}/images/random`)
		.end((err, res) => {
			if (err) return console.log(err.message);

			fs.writeFile('dog-img.txt', res.body.message, (err) => {
				if (err) console.log(err.message);
				console.log('saved');
			});
		});
});
