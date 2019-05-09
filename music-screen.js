// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//	 - 1 AudioPlayer
//	 - 1 GifDisplay
//	 - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
	constructor(playerElem) {
		// TODO(you): Implement the constructor and add fields as necessary.
		this.elem=playerElem
		this.player=new AudioPlayer()
		
		const gifElem=document.getElementById('gif-view')
		this.gifDisplay=new GifDisplay(gifElem)
		
		const buttonElem=document.getElementById('button')
		this.button=new PlayButton(buttonElem)
		//this.elem.addEventListener('pausePlay',_callback)
		this.gifTheme=undefined//temporary
	}
	
	// TODO(you): Add methods as necessary.
	
	hide()
	{
		this.elem.classList.add('inactive')
	}
	show()
	{
		this.elem.classList.remove('inactive')
	}
	setData=(url,gif)=>{
		this.gifTheme=gif//temporary
		this.player.setSong(url)
	}
}
