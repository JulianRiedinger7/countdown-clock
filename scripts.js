let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerBtns = document.querySelectorAll('.timer__button');
const form = document.querySelector('#custom');
const input = document.querySelector('input[name="minutes"]');

function timer(seconds) {
	//clear any existing timers
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
			clearInterval(countdown);
			document.querySelector('audio').play();
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${
		remainderSeconds < 10 ? '0' : ''
	}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be back at ${hour}:${
		minutes < 10 ? '0' : ''
	}${minutes}`;
}

timerBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => {
		timer(parseInt(e.target.dataset.time));
	})
);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const minutes = input.value;
	timer(minutes * 60);
	e.target.reset();
});
