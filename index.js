const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 5000

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	// 先和 db 聯繫，才開始 listen requests
	.then(result => app.listen(port))
	.catch(err => console.log(err))

const Schema = mongoose.Schema
const stockSchema = new Schema(
	{
		date: {
			type: String,
			required: true
		},
		data: {
			type: Array,
			required: true
		}
	},
	{
		timestamps: true
	}
)
const Stock = mongoose.model('Stock', stockSchema)

app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
	Stock.find()
		.sort({ createdAt: -1 }) // 根據 createdAt 由新到舊排列
		.then(result => {
			res.send(result)
		})
		.catch(err => {
			console.log(err)
		})
})
