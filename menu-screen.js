// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
	constructor(menuElem) {
		// TODO(you): Implement the constructor and add fields as necessary.
		
		this.elem=menuElem
		//create song list
		const LIST_URL="https://cs165.github.io/homework4-fsesb9801/online/songs.json"
		this.jsonData=undefined
		this.jsonKeys=undefined
		this.selector=document.getElementById('song-selector')
		this.selValue=undefined
		let op=document.createElement('option')
		op.setAttribute('value',-1)
		op.innerText='---Select song---'
		this.selector.appendChild(op)
		this.optCount=0
		fetch(LIST_URL).then(response=>{return response.json()}).then(json=>{
			this.jsonData=json
			this.jsonKeys=Object.keys(this.jsonData)
			this.jsonKeys.forEach(key=>{
				let displayName=json[key].artist+' - '+json[key].title
				let op=document.createElement('option')
				op.setAttribute('value',this.optCount++)
				op.innerText=displayName
				this.selector.appendChild(op)
			})
			console.log('List loaded')
		}).catch(reason=>{console.warn('Failed to read song list.');console.error(reason)})
		
		//gif theme filler
		this.GIF_THEME=['candy','charlie brown','computers','dance','donuts','hello kitty','flowers','nature','turtles','space']
		this.input=document.getElementById('query-input')
		this.selector.onchange=()=>{
			this.selValue=this.selector.value
			if(this.selValue==='-1')
				this.input.value=''
			else
				this.input.value=this.GIF_THEME[Math.floor(Math.random()*(this.GIF_THEME.length-1))]
		}
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
	getUrl()
	{
		if(this.jsonData[this.jsonKeys[this.selValue]]!==undefined)
			return this.jsonData[this.jsonKeys[this.selValue]].songUrl
		else
			return null
	}
}
