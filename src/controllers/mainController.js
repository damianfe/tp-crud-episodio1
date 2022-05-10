const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product => product.category === "visited");
	    let productsInsale = products.filter(product => product.category === "in-sale");
		return res.render('index' ,{
			productsVisited,
			productsInsale,
			toThousand
		})
	},
	search: (req, res) => {
		const {keywords} = req.query;
		let result = products.filter(product => product.name.tolowerCase().includes(keywords.tolowerCase())|| product.description.tolowerCase().includes(keywords.tolowerCase()))
		return res.render('results',{
			result,
			keywords,
			toThousand

		})
	},
};

module.exports = controller;
