const fs = require('fs');
const path = require('path');
const saveProducts = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3));
//voy a sobreescribir el json y como esta parseado lo paso a string
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

//hago esta function para que vuelva a leer el array cuando se modifica
const readProducts = () => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	//quito decimales con toFixed y luego agrega un punto cada tres decimales	
	return products
}



//configuracion del controlador
const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = readProducts();
		//los productos guardados en json que se leerán nuevamente
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products = readProducts();
		const product = products.find(product => product.id === +req.params.id)
		//va + porque viene como string y en json tengo el id coomo number asi que parseo
		return res.render('detail', {
			product
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = readProducts();
		//viene por formulario y queremos ocultar la info por eso viene por body
		const {name, price, discount, description, category} = req.body;
		let newProduct = {
			id : products[products.length -1].id +1,
			name : name.trim(),
			//trim le quita los espacios al principio y al final
			description : description.trim(),
			price : +price,
			discount : +discount,
			image : "default-image.png",
			category
			//cateogry no lleva nada porque es cerrado al ser un select
		}

		products.push(newProduct)
		saveProducts(products)
		return res.redirect('/products')
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