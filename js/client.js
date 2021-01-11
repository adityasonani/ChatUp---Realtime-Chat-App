// listen from port 5500
const socket = io('http://localhost:5500')

const form = document.getElementById('send-container')
const messageInp = document.getElementById('messageInp')
const messageCon = document.querySelector(".container")

// to append any messages/left notif of users in the container of message
// based on position(left/right)
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageCon.append(messageElement)
}

// when someone submits the form i.e. their input message 
form.addEventListener('submit', (e) =>{
    // prevents from reloading
    e.preventDefault();
    const message = messageInp.value
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInp.value = ''
})
// when user lands on index.html take their name
const name = prompt("Enter your name")
// let index.js node server know {name} has joined
socket.emit('new-user-joined', name)

// when a new user joins, accept the info from our node server and append 
// the name of joined user to message container
socket.on('user-joined', name =>{
    // console.log('joined is ', name)
    append(`${name} joined the chat`, 'right')
})

// when a new message comes, accept the message from our node server and append 
// the name of joined user and message received to message container
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// when a user leaves the server, accept the info from our node server and append 
// the name of left user to message container
socket.on('leftChat', name =>{
    append(`${name} left the chat`, 'left')
})
