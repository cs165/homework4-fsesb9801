// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
	constructor(buttonElem) {
		// TODO(you): Implement the constructor and add fields as necessary.
		this.elem=buttonElem
		this.elem.src='./images/play.png'
		this.playing=false
		this.elem.addEventListener('click',()=>this.mode())
		this.clickEvent=new Event('pausePlay')
	}
	// TODO(you): Add methods as necessary.
	
	mode=()=>{
		this.playing=!this.playing
		if(this.playing)
			this.elem.src='./images/pause.png'
		else
			this.elem.src='./images/play.png'
		let musicScreen=document.getElementById('player')
		musicScreen.dispatchEvent(this.clickEvent)
	}
}
