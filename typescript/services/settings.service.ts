import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class SettingsService{
	private apiLocation = 'api';
	constructor(private http:Http){}
	events:any;
	getHomePageData(){
		var headers = new Headers();

		headers.append("Accept", "text/xml");
		return this.http.get(`${this.apiLocation}/data/home-page.xml`, {headers})
		.map((res)=>{
			let json = this.parseXml(res.text());
			return json.homePage.parts;
		});
	}
	getOfficerData(){
		var headers = new Headers();

		headers.append("Accept", "text/xml");
		return this.http.get(`${this.apiLocation}/data/officers.xml`, {headers})
		.map((res)=>{
			let json = this.parseXml(res.text());
			return json.who;
		});
	}
	getShirtSizes(){
		return this.http.get(`${this.apiLocation}/settings/tshirt-sizes`)
		.map(res =>{
			return res.json().shirtSizes;
		});
	}

	parseXml(text:string){
		if(window.DOMParser){
			var p = new DOMParser();
			return  this.xmlToJson(p.parseFromString(text, "text/xml"));

		}else{
			console.log("Nope");
		}
	}


	// Credit: https://davidwalsh.name/convert-xml-json
	xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj[attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3 && xml.nodeValue.trim().length != 0) { // text
		obj = xml.nodeValue.trim();
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = this.xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(this.xmlToJson(item));
			}
			if(nodeName == "#text") delete obj[nodeName];
		}
	}
	return obj;
};

}