const fs = require('fs');
const path = require('path');

let productos = require('../data/productsDataBase.json')
const guardarJson= (products)=> fs.writeFileSync(path.resolve(__dirname,'..','data','productsDatabase.json'),JSON.stringify(products,null,3),'utf-8')
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			productos, 
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const producto= productos.find(product=>product.id === +req.params.id); 
	
		res.render('detail',{
			producto,
			toThousand
		})
		
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let {name, price, discount, category, description}= req.body; 
		let producto={
			id : productos[productos.length-1].id+1,
			name: name.trim(), 
			price: +price, 
			discount: +discount, 
			category, 
			description, 
			image: "default-image.png"
		}
		

		productos.push(producto); 
		guardarJson(productos)
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		
	let productToEdit = productos.find(product=> product.id === +req.params.id); 
	
	res.render('product-edit-form', {
		productToEdit
	}, 
	)
	},
	// Update - Method to update
	update: (req, res) => {
		const{name, price, discount, category, description}= req.body; 
		const productsModify= productos.map(product=>{
			if(product.id === +req.params.id){
				let productModify={
					...product, 
					name: name.trim(),
					price: +price,
					discount: +discount,
					description: description,
					category
				}
				return productModify
			}
			return product
		})
		productos = productsModify; 
		guardarJson(productos)
		return  res.redirect('/')
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;