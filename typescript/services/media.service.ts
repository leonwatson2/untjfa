import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export enum MediaLocation{
	TEMP,
	EVENT,
	DATE
}

@Injectable()

export class MediaService{
	public apiLocation = 'api';
	constructor(private http:Http){}

	events:any;
	getMedia(){
			return this.http.get(`${this.apiLocation}/events/media`)
					.map(res => {
						return res.json();
					});
			
		
	}
	addMediaToGallery(data){
		return this.http.post(`${this.apiLocation}/gallery/add`, data)
					.map((res)=>{
						return res.json();
					}).catch((err, caught)=>{
						return Observable.of(err);
					});	

	}

	deleteMedia(media:any[]){
		let mediaIds = media.map((p)=>p.id).join(',');
		return this.http.delete(`${this.apiLocation}/gallery?fields=${mediaIds}`).map((res)=>{
			console.log(res);
			return res;
		}).catch(err => {
			console.log(err);
			return Observable.of(err);
		});
	}

	getPicture(id){
		return this.http.get(`${this.apiLocation}/events/types`)
					.map(res =>{
						return res.json().eventTypes;
					});
	}
	addPictureTo(place:MediaLocation, picturedata){
		//send post to php, return image path


	}
	addPicture(){

	}
	
	
}