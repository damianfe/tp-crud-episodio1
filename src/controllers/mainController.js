const products= require('../data/productsDataBase.json')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product=> product.category === "visited");
		let productsInSale = products.filter(product=> product.category === "in-sale");
		res.render('index', {
			productsInSale,
			productsVisited, 
			toThousand, 
		})
	},
	search: (req, res) => {
		const {keywords}= req.query;
		
		const resultado= products.filter(product=> product.name.toLowerCase().includes(keywords.toLowerCase())||product.description.toLowerCase().includes(keywords.toLowerCase())); 


		return res.render('results', {resultado,
		toThousand,
	keywords})
	},
};

module.exports = controller;