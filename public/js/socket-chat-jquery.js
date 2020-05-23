var params = new URLSearchParams(window.location.search);
var name = params.get('nombre');
var room = params.get('room');

var divUsuarios = $('#divUsuarios');
var formSend = $('#send-form');
var inputMessage = $('#txt-message');
var divChatBox = $('#divChatbox');

// Funciones para renderizar usuarios
function renderUser(people) {
    console.log(people);
    var html = "";

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < people.length; i++) {
        html += '<li>';
        html += '<a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderMessage(message, personSend) {
    var html = '';
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';

    if (message.name === 'Admin') {
        adminClass = 'danger';
    }


    if (personSend) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + message.name + '</h5>';
        html += '<div class="box bg-light-inverse">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } else  {
        html += '<li class="animated fadeIn">';
        if (message.name !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>' + message.name + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }

    divChatBox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}

// Listener
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});


formSend.on('submit', function(e) {
    e.preventDefault();

    if (inputMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('createMessage', {
        name: name,
        message: inputMessage.val(),
        room: room
    }, function(message) {
        inputMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    });
});