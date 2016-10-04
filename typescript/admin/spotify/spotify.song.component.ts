import {Component, Input} from '@angular/core';

@Component({
	selector: 'spotify-song',
	template: `
			<h4 >{{song.name}} by {{song.artists[0].name}}</h4>
			<div class="photo">
				<img [src]="song?.album?.images[0].url" [alt]="song?.album?.name" />
			</div>
			`,
  directives: [],
  styles:[`
	h4{
		text-align:center;
	}
	img{
		width:100%;
	}
  	`]
})

export class SpotifySongComponent {
	@Input('track') song;
	
}
