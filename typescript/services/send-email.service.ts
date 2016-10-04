import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class EmailService{

	public apiLocation = 'api';
	constructor(private http:Http){}
	sendEmail(email){
		return this.http.post(`${this.apiLocation}/sendmail`, email)
				   .map((res)=>{
				   		
				   		console.log(res);
				   		return res.json();
				   });	
	}

}