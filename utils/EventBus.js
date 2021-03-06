// based on implementation at https://github.com/scottcorgan/tiny-emitter

// EXAMPLE:
// EventBus.subscribe('test', function (args) { 
// 	console.log(args.date);
// });

// EventBus.trigger('test', { date: 'date' });


import Emitter from 'tiny-emitter';

const emitter = new Emitter();

// event types
const Events = {
	VIEW_GAME: 'View Game',
	ADD_GAME: 'Add Game',
	ADD_LEAGUE: 'Add League',
	SELECT_PLAYER: 'Select Player',
	SELECT_LEAGUETYPE: 'Select League Type',
	SELECTED_LEAGUETYPE: 'League Type Selected',
};

const EventBus = {

	subscribe(eventName, callback) {
		emitter.on(eventName, callback);
	},

	trigger(eventName, args) {
		emitter.emit(eventName, args);
	},
};

module.exports = {EventBus, Events};