import * as http from 'http';
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

const protocolConfiguration = {
    path: 'COM4',
    baudRate: 9600
}


const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

app.get('/', (req, res) => {
    parser.on('data', (data) => {
        console.log(data);
    });
})
port.on('error', function (err) {
    console.log('Error: ', err.message);
})
parser.on('data', (data) => {
    console.log(data);
    let ardInput = [];
    let input = data.split(":");
    console.log(input[1]);
    if (input[0] == "X") {
        ardInput[0] = input[1];
    } else if (input[0] == "Y") {
        ardInput[1] = input[1];
    } else if (input[0] == "F") {
        ardInput[2] = input[1]
    } else {
        console.log("wtf is this?", input[0]);
    }
    io.emit("mensaje", {"x":ardInput[0], "y":ardInput[1], "f":ardInput[2]})
});

//conexion de cliente
io.on('connect', (socket) => {
    //HOLA
    console.log('Usuario conectado');

    /*socket.on('send-element', (element) => {
        io.emit('element-received', element)
    })

    socket.on('send-cursor', (element) => {
        io.emit('cursor-received', element);
    })*/

    //desconexion
    socket.on('disconnect', () => {
        console.log('Usuario conectado');
    })
})

server.listen(3000, () => {
    console.log('LISTENING PORT 3000')
});

//librerias
/*const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

//generar instancia
const app = express();
const server = http.createServer(app);
const io = socketIO(server);*/
/*
import express from 'express'//Express
import http from 'http'
import { server } from 'socket.io'
import { io } from "socket.io-client";
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'

const app = express();
const mainServer = http.createServer(app);
const serverPort = 3000;



//envio estatico de contenido de public
//app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
    var data = giveData();
    res.send(`<h1>${data}</h1>`)//hacer lo que haya hecho monk
});

//conexion de cliente
/*io.on('connect', (socket) => {
    //HOLA
    console.log('Usuario conectado');

    //detectar recepción de mensaje tag: send-element
    socket.on('send-element', (element) => {
        io.emit('element-received', element)
    })

    //detectar recepción de mensaje tag: send-cursor
    socket.on('send-cursor', (element) => {
        io.emit('cursor-received', element);
    })

    //desconexion
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })
})
*/
/*
mainServer.listen(serverPort, () => {
    console.log('LISTENING PORT 3000')
})

//Arduino ////////////////////////////////////////////////////////////
const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}
// list serial ports:
SerialPort.list().then(
    ports => ports.forEach(port => console.log(port.path)),
    err => console.log(err)
)

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());
parser.on('data', (data) => {
    console.log(data);
});

function giveData() {
    parser.on('data', (data) => {
        console.log(data);
        return data;
    });
}*/