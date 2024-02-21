import axios from 'axios'
import { load } from 'cheerio'
import { utils, writeFile } from 'xlsx'

const products = []

const getData = async () => {
	try {
		// Getting data from response object sent by axios
		const { data } = await axios.get(
			'https://nirzon47.github.io/html-datasets/products-dataset.html',
			{
				headers: {
					'Content-Type': 'application/json',
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36',
				},
			}
		)

		// Parsing data using cheerio
		const $ = load(data)

		// Extracting job postings
		$('.product-card').each((index, element) => {
			const product = {
				product_name: $(element).find('.product-name').text(),
				price: $(element).find('.price').text(),
				availability: $(element).find('.availability').text(),
				product_rating: $(element).find('.product-rating').text(),
			}

			products.push(product)
		})

		const workbook = utils.book_new() // Creating a new workbook
		const worksheet = utils.json_to_sheet(products) // Creating a new worksheet with the extracted data
		utils.book_append_sheet(workbook, worksheet, 'Sheet 1') // Adding the worksheet to the workbook
		writeFile(workbook, 'products.xlsx') // Writing the workbook to an Excel file
	} catch (error) {
		console.error(error)
	}
}

getData()
