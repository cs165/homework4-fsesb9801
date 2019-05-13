// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
	preload_Gifs=[]
	gifCount=0
	constructor(gifViewElem) {
		// TODO(you): Implement the constructor and add fields as necessary.
		this.elem=gifViewElem
		this.gifLoadCount=0
		this.event=new Event('loadComplete')
	}
	// TODO(you): Add methods as necessary.
	loadGifs(gif_url_list)
	{
		let l=gif_url_list.length
		gif_url_list.forEach(url=>{
			let img=new Image(0,0)
			img.onload=e=>{
				this.gifCount++
				if(this.gifCount===l)
					document.getElementById('player').dispatchEvent(this.event)
			}
			img.src=url
			this.preload_Gifs.push(img)
		})
	}
	newGif=()=>{
		let url=this.preload_Gifs[Math.floor(Math.random()*(this.gifCount-1))].src
		this.elem.style.backgroundImage='url("'+url+'")'
		console.log('kick')
	}
}
