import {Component, Input, Output, EventEmitter, Renderer} from '@angular/core';
import {SpotifySongComponent} from './';
import {BooleanWordComponent} from '../../misc/jfa.boolean-word.component';
@Component({
	selector: 'spotify-list-item',
	template: `
			<div id="suggestion-pane">
			<div 
				*ngIf="list.data.length > 0"
				class="side-panel">
				<div *ngIf ="currentSuggestion && !select" class="track-info">
					<div class="album-cover">
						<div class="suggestor"
							*ngIf="currentSuggestion?.suggestor"
						>
							<small>Suggested by &#183; </small>{{currentSuggestion?.suggestor}}
						</div>

						<img 
						[src]="currentSuggestion?.track?.album?.images[0].url" 
						[alt]="currentSuggestion?.track?.album?.name" 
						/>
					</div>
						<div class="track-name">{{currentSuggestion?.track?.name}}</div>
						<div class="album-name">{{currentSuggestion?.track?.album?.name}}</div>
						<div class="artist-name">{{currentSuggestion?.track?.artists[0]?.name}}</div>
				</div>
				<div *ngIf="select" class="number-selected">
					<h2>{{selectedTracks.length}}</h2>
					<div><bool-word trueWord="tracks" falseWord="track" [bool]="selectedTracks.length != 1"></bool-word> selected</div>
				</div>
			</div>
			<div class="table-container">
				<table 
				*ngIf="list.data.length > 0"
				class="table table-bordered">
					<div *ngIf="list.isPending" class="edit-buttons">
						<button
							class="edit"						
							(click)="toggleSelect()"
							>
							<bool-word trueWord = "Done" falseWord = "Edit Suggestions" [bool]="select"></bool-word>
						</button>
							
						<button
							*ngIf="select" 
							(click)="addToPlaylist()" class="confirm">Add
						</button>
							<button
							*ngIf="select" 
							(click)="denySpotifySuggestions()" class="deny">Deny
						</button>
					</div>
					<thead>
						<tr>
							<th>#</th>
					     	<th>Song</th>
					     	<th>Artist</th>
					     	<th class="hidden-xs hidden-sm">Album</th>
					     	<th class="hidden-xs">Suggested By</th>	
						</tr>
					      	
					</thead>
					<tbody
					(mouseleave)="setCurrentSuggestion(null)"
					>
						<tr 
							*ngFor="let suggestion of list.data; let i = index;" 
							[ngClass]="{'info':isSelected(suggestion)}"
							(click)="addOrRemoveFromSelected(suggestion)"
							(mouseover)="setCurrentSuggestion(suggestion)"
							>
							
							<td>{{i}}</td>
							<td>{{suggestion.track.name}}</td>
							<td>{{suggestion.track.artists[0].name}}</td>
							<td class="hidden-xs hidden-sm">
								{{suggestion.track.album.name}}
							</td>
							<td class="hidden-xs">{{suggestion.suggestor}}</td>
						
						</tr>
					</tbody>
				</table>
			</div>
			<div
				*ngIf="list.data.length == 0"
			>
				<h1>No Songs to Show <i class="fa fa-smile"></i></h1>
			</div>
			</div>
			`,
  styleUrls: ['style/css/spotify.css', 'style/css/confirm-modal.css', 'style/css/events.css']

})

//TODO:Syles for side panel
//TODO:Hover affect and styles for song list
//TODO: Styles for top list 
export class SpotifyListItemComponent {
	@Input() list;
	@Output('onDenySong') removeSuggestion = new EventEmitter();
	@Output('onAddSong') addSuggestion = new EventEmitter();
	
	select = false
	selectedTracks:iSpotifySuggestion[] = []
	currentSuggestion:iSpotifySuggestion;

	constructor(private renderer:Renderer){
		renderer.listenGlobal('window', 'scroll', this.scrollEvent)
	}

	denySpotifySuggestions(){
		this.removeSuggestion.emit(this.selectedTracks);
		this.selectedTracks = []
	}
	addToPlaylist(){
		this.addSuggestion.emit(this.selectedTracks);
		this.selectedTracks = []
		
	}
	//Adds and remove suggestion from selected list
	addOrRemoveFromSelected(suggestion){
		if(this.select){

			if(this.selectedTracks.includes(suggestion)){
				var indexOfSug = this.selectedTracks.indexOf(suggestion)
				this.selectedTracks.splice(indexOfSug,1)
			}else{
				this.selectedTracks.push(suggestion)
			}
		}else{
			this.setCurrentSuggestion(suggestion);
		}
	}
	setCurrentSuggestion(suggestion){
		this.currentSuggestion = null;
		this.currentSuggestion = suggestion;
	}
	//checks if the suggestion is selected
	isSelected(suggestion){
		return this.selectedTracks.includes(suggestion)
	}
	toggleSelect(){
		if(this.select){
			this.select = false;
			this.selectedTracks = [];
		}else{
			this.select = true;
		}
	}
	scrollEvent(event){
		// console.log(event);
	}
}
