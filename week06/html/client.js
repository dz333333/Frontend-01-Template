const net = require('net');
const parser =require('./parser.js')
class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || "80";
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join("&")
        }

        this.headers["Content-Length"] = this.bodyText.length
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }


    send(connection) {

        const parser = new ResponseParser;
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {

                parser.receive(data.toString())
                // resolve(data.toString())
                if (parser.isFinished) {
                    connection.end();
                    resolve(parser.response)
                }
                
            });
            connection.on('end', () => {
                console.log('disconnected from server');
            });
        })
    }
}

class Response {

}

class ResponseParser {
    constructor() {
        this.WAITTING_STATUS_LINE = 0;
        this.WAITTING_STATUS_LINE_END = 1;
        this.WAITTING_HEADER_NAME = 2;
        this.WAITTING_HEADER_SPACE = 3;
        this.WAITTING_HEADER_VALUE = 4;
        this.WAITTING_HEADER_LINE_END = 5;
        this.WAITTING_HEADER_BLOCK_END = 6;
        this.WAITTING_BODY = 7;
        this.current = this.WAITTING_STATUS_LINE;


        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    receive(string) {
        for (let index = 0; index < string.length; index++) {
            this.receiveChar(string.charAt(index))

        }
    }
    get response() { 
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return{
            statusCode:RegExp.$1,
            statusText:RegExp.$2,
            headers:this.headers,
            body:this.bodyParser.content.join('')
        }
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished
    }
    receiveChar(char) {
        if (this.current === this.WAITTING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITTING_STATUS_LINE_END
            } else {
                this.statusLine += char
            }
        } else if (this.current === this.WAITTING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITTING_HEADER_NAME
            }

        } else if (this.current === this.WAITTING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITTING_HEADER_SPACE
            } else if (char === '\r') {
                this.current = this.WAITTING_HEADER_BLOCK_END
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new ThunkedBodyParser;
                }
            } else {
                this.headerName += char
            }
        }
        else if (this.current === this.WAITTING_HEADER_SPACE) {
            if (char = " ") {
                this.current = this.WAITTING_HEADER_VALUE
            }
        } else if (this.current === this.WAITTING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITTING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue
                this.headerValue = ''
                this.headerName = ''
            } else {
                this.headerValue += char
            }
        } else if (this.current === this.WAITTING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITTING_HEADER_NAME
            }

        } else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITTING_BODY
            }
        } else if (this.current === this.WAITTING_BODY) {

            this.bodyParser.receiveChar(char)
        }
    }
}

class ThunkedBodyParser {
    constructor() {
        this.WAITTING_LENGTH = 0;
        this.WAITTING_LENGTH_LINE_END = 1;
        this.WAITTING_TRUNK = 2;
        this.WAITTING_NEW_LINE = 3;
        this.WAITTING_NEW_LINE_END = 4;
        this.READING_TRUNK = 5;
        this.isFinished = false;
        this.length = 0;
        this.content = [];
        this.current = this.WAITTING_LENGTH
    }
    
    receiveChar(char) {
        
        if (this.current === this.WAITTING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;

                } else
                    this.current = this.WAITTING_LENGTH_LINE_END
            } else {
                
                
                this.length *= 16
                this.length += parseInt(char,16)
            }
        } else if (this.current === this.WAITTING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK
            }
        } else if (this.current === this.READING_TRUNK) {

            this.content.push(char);
            this.length--
            if (this.length === 0) {

                this.current = this.WAITTING_NEW_LINE;
            }
        } else if (this.current === this.WAITTING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITTING_NEW_LINE_END
            }
        } else if (this.current === this.WAITTING_NEW_LINE_END) {
            if (char === '\n') {


                this.current = this.WAITTING_LENGTH
            }
        }

    }
}


void async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8080',
        path: '/',
        headers: {
            ["Foo2"]: 'client'
        },
        body: {
            name: 'huo',
            sex: "man"
        }
    })
    let response = await request.send()
    let dom=parser.parseHTML(response.body)
}()
// const client = net.createConnection({
//     host: '127.0.0.1',
//     port: 8080
// }, () => {
    // 'connect' listener.
    // console.log('connected to server!');
    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('Content-Length: 8\r\n');
    // client.write('\r\n');
    // client.write("name=huo");
//     console.log(request.toString())
    // client.write('field1=aaa&code=x%3D1\r\n');
// });


