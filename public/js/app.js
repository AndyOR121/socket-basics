var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + message.text + '</strong>  - ' + momentTimestamp.local().format('MMM Do YYYY, h:mm:ss a') + '</p>');
});

var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});