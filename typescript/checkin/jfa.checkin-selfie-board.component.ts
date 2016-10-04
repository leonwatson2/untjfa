import {Component, Input} from '@angular/core';
import {SelfieComponent} from './';

@Component({
	selector: 'selfie-board',
	template: `
			<h2>{{event.name}}</h2>
			<div class="selfie-board" >
				<selfie *ngFor="let checkin of checkins" [checkin]="checkin" ></selfie>
			</div>
			`,
  directives: [SelfieComponent],
  styleUrls:['style/css/checkin-board.css']
})

export class SelfieBoardComponent {
	@Input() event;
	checkins:any[];

	ngOnInit(){
		this.checkins = this._checkins;
		setInterval(()=>{this.addCheckin()}, 2000);
	}
	addCheckin(){
		this.checkins.push({
    "_id": "57c349b9eb0053b4b6791c3e",
    "name": "Elsie Perkins",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  })
	}

	_checkins = [
  {
    "_id": "57c349b9eb0053b4b6791c3e",
    "name": "Elsie Perkins",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b91f12a72b6b7971d1",
    "name": "Patti Mcmillan",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9ad02396ce1fb6d25",
    "name": "Clare Payne",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b994d8585745762614",
    "name": "Dodson Bentley",
    "hasPhoto": true,
    "photoUrl": "references/selfie1.jpg"
  },
  {
    "_id": "57c349b918a62f1b8e52b63b",
    "name": "Greene Alexander",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9bc85726193418034",
    "name": "Suzette Lawrence",
    "hasPhoto": true,
    "photoUrl": "references/selfie1.jpg"
  },
  {
    "_id": "57c349b96d31e5e5f79b4145",
    "name": "Farmer Foley",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9736caebec3a50ce8",
    "name": "Marcia Mendez",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9ed32ac3d7c33eb4f",
    "name": "Reyna Rios",
    "hasPhoto": true,
    "photoUrl": "references/selfie2.jpg"
  },
  {
    "_id": "57c349b9b51b9ba23b9bd463",
    "name": "Rosanna Pollard",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b97c89d12ccf88f3e0",
    "name": "Victoria Barrera",
    "hasPhoto": false,
    "photoUrl": "references/selfie1.jpg"
  },
  {
    "_id": "57c349b93c935b520283c03f",
    "name": "Eileen Pena",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9538e8cf00c43c354",
    "name": "Rogers Mcguire",
    "hasPhoto": true,
    "photoUrl": "references/selfie2.jpg"
  },
  {
    "_id": "57c349b9026d5d219d6c682a",
    "name": "Nita Henderson",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b985a3b443c734d91c",
    "name": "Abby Dunlap",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b94dba78069d5e9f7b",
    "name": "Huff Valentine",
    "hasPhoto": false,
    "photoUrl": "references/selfie1.jpg"
  },
  {
    "_id": "57c349b9c6c46de82d300bff",
    "name": "Barry Barton",
    "hasPhoto": true,
    "photoUrl": "references/selfie3.jpg"
  },
  {
    "_id": "57c349b9b2946863bba0db7b",
    "name": "Cortez Villarreal",
    "hasPhoto": false,
    "photoUrl": "references/selfie2.jpg"
  },
  {
    "_id": "57c349b96db8c6f211d3e3c6",
    "name": "Skinner Acevedo",
    "hasPhoto": true,
    "photoUrl": "references/selfie1.jpg"
  },
  {
    "_id": "57c349b9e37989ed985ed099",
    "name": "Karin Mckinney",
    "hasPhoto": false,
    "photoUrl": "references/selfie3.jpg"
  }
];
}
