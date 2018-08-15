const express = require('express');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Secure apps by setting various HTTP headers
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(
		chalk.yellow(
			`
======================================================
Production server is running at http://localhost:${PORT}
======================================================
`
		)
	);
});
