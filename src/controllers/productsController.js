const fs = require('fs');
const path = require('path');
const products = require('../data/productsDataBase.json');
const guardarJson= (products)=>fs.writeFileSync(path.resolve(__dirname,'..','data', 'productsDataBase.json'), JSON.stringify(products, null, 3),'utf-8')
	
const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify( dataBase), 'utf-8')
}
//voy a sobreescribir el json y como esta parseado lo paso a string. recibe el array de products
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");





//configuracion del controlador
const controller = {
	// Root - Show all products
	index: (req, res) => {
		//los productos guardados en json que se leerán nuevamente
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	
		const product = products.find(product => product.id === +req.params.id)
		//va + porque viene como string y en json tengo el id coomo number asi que parseo
		return res.render('detail', {
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		//viene por body, ocultamos la info
		
		const {name,price,discount,description,category} = req.body;
		
		let lastID = products[products.length - 1].id;
		let newProduct = {
			id: +lastID + 1,
			//detecto ultimo id y sumo uno
			name,
			description,
			price: +price,
			discount: +discount,
			image: "default-image.png",
			category,
		}
		
		products.push(newProduct)
		guardarJson(products)
		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		
		let product = products.find(product => product.id === +req.params.id)

		return res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		
/* Destructuring the req.body object. */
		const {id} = req.params
		const {name,price,discount,description,category} = req.body
		
		/* Iterating over the products array and returning a new array with the modified product. */
		const productsModify = products.map(product => {
			if (product.id === +id) {
				let productModify = {
					...product,
					name : name.trim(),
					price : +price,
					discount: +discount,
					description: description.trim(),
					category
				}
				return productModify
			}
			return product
			//el producto tal como estaba. 
		})

		/* Guarda los productos modificados en el json */
		guardarJson(productsModify)
		return res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = +req.params.id;
		products.forEach(product => {
			if(product.id === productId){
				let eraser = products.indexOf(product);
				products.splice(eraser, 1);
			}
		})
		/* hay que sobreescribir el json */
		writeJSON(products);
		res.redirect('/products');
	}
};

module.exports = controller;