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
		this.player=null
		this.ytElem=document.getElementById('ytinfo')
		
		const gifElem=document.getElementById('gif-view')
		this.gifDisplay=new GifDisplay(gifElem)
		
		const buttonElem=document.getElementById('button')
		this.button=new PlayButton(buttonElem)
		this.elem.addEventListener('pausePlay',this.changeState)
		
		this.gifList
	}
	
	// TODO(you): Add methods as necessary.
	
	hide()
	{
		this.elem.classList.add('inactive')
	}
	show()
	{
		this.elem.classList.remove('inactive')
		let ytElemWidth=this.ytElem.offsetWidth
		document.querySelector('#alignblock').style.width=ytElemWidth+'px'
	}
	init=(url,gif)=>{
		this.gifList=gif
		this.player=new AudioPlayer()
		this.player.setSong(url)
		this.player.setKickCallback(this.kickHandler)
	}
	setYTinfo=url=>{
		if(url)
			this.ytElem.href=url
		else
			this.ytElem.classList.add('inactive')
	}
	changeState=()=>{ //play or pause
		if(this.button.playing)
		{
			this.player.play()
			console.log('play')
		}
		else
		{
			this.player.pause()
			console.log('pause')
		}
	}
	load=()=>{
		console.log('load gif')
	}
	kickHandler=()=>{
		console.log('kick')
	}
}
