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
				//request gif list
				//API key exceed limit,ignore gif display
				/*fetch('https://api.giphy.com/v1/gifs/search?q='+encodeURIComponent(this.gif_set)+'&rating=g&api_key=dc6zaTOxFJmzC&limit=25',{mode:'no-cors'}).then(response=>{if(response.ok)return response.json()}).then(json=>{
					console.log(json)
				}).catch(reason=>{console.warn('Failed to load gif list.');console.error(reason)})*/
				if(this.gif_set.length<=2)//temporary solution
				{
					this.menuScreen.showError()
					return
				}
				this.jsonObj={"songValue":this.url,"gifValue":this.gif_set}
				this.musicScreen.init(this.url,this.gif_set)//gif_set is temporary
				this.musicScreen.setYTinfo(this.menuScreen.hasYTinfo())
				console.log(this.jsonObj)
			}
			this.musicScreen.load()
			this.menuScreen.hide()
			this.musicScreen.show()
		})
	}
	// TODO(you): Add methods as necessary.
	
	
}
