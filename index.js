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

const getDogPic = async () => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`breed: ${data}`);
		const res = await superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		console.log(res.body.message);

		await writeFilePro('dog-img.txt', res.body.message);
		console.log('saved');
	} catch (err) {
		console.log(err);
	}
};

getDogPic();
// readFilePro(`${__dirname}/dog.txt`)
// 	.then((data) => {
// 		console.log(`breed: ${data}`);
// 		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// 	})
// 	.then((res) => {
// 		console.log(res.body.message);

// 		return writeFilePro('dog-img.txt', res.body.message);
// 	})
// 	.then(() => {
// 		console.log('saved');
// 	})
// 	.catch((err) => {
// 		console.log(err.message);
// 	});
