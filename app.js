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
		this.giphyDown=false
		
		const IGNORE_API_CHECK=false
		//set this to true if giphy api key exceed limit
		//and you want to check input field and random gif theme
		
		
		//test giphy api
		fetch('https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=giphy&limit=1').then(response=>{if(response.ok)console.log('api ok')}).catch(reason=>{if(!IGNORE_API_CHECK)this.lockInput()})
		this.url=undefined
		this.gif_set=undefined
		this.jsonObj=undefined
		const form=document.querySelector('form')
		form.addEventListener('submit',e=>{
			e.preventDefault()
			this.url=this.menuScreen.getUrl()
			this.gif_set=document.getElementById('query-input').value
			if(this.url===null||(this.gif_set===''&&this.giphyDown===false))
				return
			this.jsonObj={"songValue":this.url,"gifValue":this.gif_set}
			console.log(this.jsonObj)
			
			if(!this.giphyDown)
			{
			//request gif list
				fetch('https://api.giphy.com/v1/gifs/search?q='+encodeURIComponent(this.gif_set)+'&rating=g&api_key=dc6zaTOxFJmzC&limit=25').then(response=>{if(response.ok)return response.json()}).then(json=>{
					this.gif_set=json
					if(this.gif_set.pagination.count<2)
					{
						this.menuScreen.showError()
						return
					}
					else
						this.proceed()
				}).catch(reason=>{console.warn('Failed to start Music Screen.');console.error(reason);this.lockInput()})
			}
			else
			{
			//if giphy down(again),get default gifs
				fetch('https://cs165.github.io/homework4-fsesb9801/online/gifs.json').then(response=>{if(response.ok)return response.json()}).then(json=>{
					this.gif_set=json
					this.proceed()
				}).catch(reason=>{console.warn('Failed to start Music Screen.');console.error(reason)})
			}
		})
	}
	// TODO(you): Add methods as necessary.
	
	proceed()
	{
		this.musicScreen.setYTinfo(this.menuScreen.hasYTinfo())
		this.musicScreen.init(this.url,this.gif_set)
		
		this.menuScreen.hide()
		this.musicScreen.show()
	}
	lockInput()
	{
		let e=document.getElementById('query-input')
		e.disabled=true
		e.value=''
		e.placeholder='🔒 Unable to use GIPHY API,use default GIFs.'
		this.giphyDown=true
	}
}
