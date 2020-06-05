const fs = require('fs');
const superagent = require('superagent');

/*building promise*/
const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject('file not found');
			resolve(data);
		});
	});
};
const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject(err.message);
			resolve('saved');
		});
	});
};

readFilePro(`${__dirname}/dog.txt`)
	.then((data) => {
		console.log(`breed: ${data}`);
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);

		return writeFilePro('dog-img.txt', res.body.message);
	})
	.then(() => {
		console.log('saved');
	})
	.catch((err) => {
		console.log(err.message);
	});
