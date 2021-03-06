var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'MainRoom';
var socket = io();

jQuery('.room-title').text(room);

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	$message.append('<p><strong>' + message.name + '</strong>  - ' + momentTimestamp.local().format('MMM Do YYYY, h:mm:ss a') + '</p>');
	$message.append('<p>' + message.text + '</p>')
	$messages.append($message);
});

var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
    }
    
    return undefined;
}