import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SpotifySongComponent} from './';

@Component({
	selector: 'spotify-list-item',
	template: `
			<h3>{{list.name}} - {{index}}</h3>
				<ul *ngFor="let track of list.data">
					<div class="suggestion">
					<div class="foot" *ngIf="list.isPending">
						<button (click)="addToPlaylist(track)" class="confirm">Accept</button>
						<button (click)="denySpotifySuggestion(track)" class="deny">Deny</button>
					</div>

					<spotify-song [track]="track"></spotify-song>
				</div>
				</ul>
			`,
  directives: [SpotifySongComponent],
  styleUrls: ['style/css/spotify.css', 'style/css/confirm-modal.css']

})

export class SpotifyListItemComponent {
	@Input() list;
	@Output('onDenySong') removeSuggestion = new EventEmitter();
	@Output('onAddSong') addSuggestion = new EventEmitter();

	denySpotifySuggestion(track:iSpotifyTrack){
		this.removeSuggestion.emit(track);
	}
	addToPlaylist(track:iSpotifyTrack){
		this.addSuggestion.emit(track);
		
	}
}
