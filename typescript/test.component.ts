import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ValuesPipe} from './pipes/prop-values.pipe';

@Component({
	selector: 'test-me',
	template: `
		<div *ngIf="unparsedInfo.length > 0" class="test top" [class]="location">
			<ul >
			<li class="info" *ngFor="let i of unparsedInfo">
			<h3>{{i.name}}</h3>
			<table>
				<tr *ngFor="let prop of i?.props | values">
					<td [innerHTML]="prop.key"></td><td [innerHTML]="prop.data"></td>
				</tr>
			</table>
			</li>
			</ul>		
	
		</div>
	`,
  directives: [],
  styleUrls:['style/css/test.css'],
  pipes:[ValuesPipe]
})

export class TestComponent implements OnChanges{
	@Input('info') unparsedInfo;
	@Input() location;

	OnInit(){

	}

	ngOnChanges(){
		//console.warn("Test Component: "+this.unparsedInfo);
	}

	
}
