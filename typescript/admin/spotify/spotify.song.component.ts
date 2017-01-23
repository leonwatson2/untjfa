import {Component, Input} from '@angular/core';

@Component({
	selector: 'spotify-song',
	template: `
			<td>{{index}}</td>
			<td>{{song.name}}</td>
			<td>{{song.artists[0].name}}</td>
			<td>
				{{song.album.name}}
			</td>
			<td>It was me</td>

			`,
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
	// TODO on hover event emit track details
	@Input('track') song;
	@Input() index;
	
}
