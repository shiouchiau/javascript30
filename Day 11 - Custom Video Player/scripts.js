/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    console.log('Skipping!!!');
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange(e) {
    console.log(this.name);
    // console.log(e); 
    // const range = this.max - this.min;
    video[this.name] = e.target.value; // the target in the change event.
    // video[this.name] = this.value; // better
}

function handleProgress() {
    const percentage = (this.currentTime / this.duration ) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}

/* Hook up the event listners */
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRange));
// ranges.forEach(range => range.addEventListener('mousemove', updateRange)); // need update css

video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // if mousedown == true then scrub
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);