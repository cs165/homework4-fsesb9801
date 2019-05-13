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
	im=undefined
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
		this.ytElem.addEventListener('click',this.ALWAYS_STOP)
		this.elem.addEventListener('loadComplete',this.complete)
		
		//preload loading gif
		this.im=new Image(0,0)
		this.im.src='./images/placeholder.gif'
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
		let urls=[]
		gif.data.forEach(item=>urls.push(item.images.downsized.url))
		this.gifDisplay.loadGifs(urls)
		this.player=new AudioPlayer()
		this.player.setSong(url)
		this.player.setKickCallback(this.gifDisplay.newGif)
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
	ALWAYS_STOP=()=>{
		if(this.button.playing)
			this.button.mode()
	}
	complete=()=>{
		document.getElementById('loadingScreen').classList.add('inactive')
		this.gifDisplay.newGif()
	}
}
