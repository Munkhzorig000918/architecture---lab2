let http = require('http');
let fs = require('fs')
let port = 3000

let server = http.createServer((req,res) => {
	res.writeHead(200, { 'Cotent-Type': 'text/html' })
	switch (req.url) {
		case '/':
			fs.readFile('./index.html', (error, data) => {
				if (error) {
					res.writeHead(404);
					res.write('Huselt amjiltgui bolloo');
				} else {
					res.write(data);
				}
				res.end();
			})
			break;
		case '/laboratoriinAjil2':
			let body = '';
			let data;
			let saveData;
			req.on('data', chunk => {
				body += chunk.toString();
				data = JSON.parse(body);
				saveData = `\n${data.name}\n${data.phone}`;
				fs.appendFile('saveData.txt', saveData, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log('Done');
					}
				})
			});
			res.end();
			break;
		 default:
			res.writeHead(404);
			res.write('ERROR !!!');
			res.end();
			break;
	}
	
})


server.listen(port, (error) => {
	if (error) {
		console.log('Server ajillaj chadsangui :(')
	} else {
		console.log('Server amjilttai holbogdloo ;)', port )
	}
})
