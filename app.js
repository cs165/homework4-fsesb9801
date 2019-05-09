// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
	constructor() {
		// TODO(you): Implement the constructor and add fields as necessary.
		const menuElem=document.getElementById('menu')
		this.menuScreen=new MenuScreen(menuElem)
		
		const playerElem=document.getElementById('player')
		this.musicScreen=new MusicScreen(playerElem)
		this.musicScreen.hide()
		
		this.url=undefined
		this.gif_set=undefined
		this.jsonObj=undefined
		const form=document.querySelector('form')
		form.addEventListener('submit',e=>{
			e.preventDefault()
			this.url=this.menuScreen.getUrl()
			this.gif_set=document.getElementById('query-input').value
			if(this.url!==null&&this.gif_set!=='')
			{
				this.jsonObj={"songValue":this.url,"gifValue":this.gif_set}
				this.musicScreen.setData(this.url,this.gif_set)
				console.log(this.jsonObj)
			}
			this.menuScreen.hide()
			this.musicScreen.show()
		})
	}
	// TODO(you): Add methods as necessary.
	
	
}
