const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');



const readProducts =()=>{
	
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const saveProducts = (products)=> fs.writeFileSync(productsFilePath,JSON.stringify,products)
const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products',{
			product,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = product.find(product => product.id === +req.params.id);
		return res.render('detail',{
			product
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,price,discount,description,category} = req.body
		let newProduct ={
			id : products[products.length -1].id +1,
			name : name.trim(),
			price : +price,
			discount : +discount,
			image : "default-image.png",
			category

		}
		products.push(newProduct);

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;