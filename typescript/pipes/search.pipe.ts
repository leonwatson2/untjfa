import {Pipe} from '@angular/core';
/*
* Seach pipe that filters through an array of objects.
* The pipe modifier is an object with a key and value.
* Return the filtered objects that includes the value at the key
*
* key: the key you want to check against, default:"name"
* value: the value you are searching for
*
* Ex. 
*	<div class="search"><input type="text" [(ngModel)]="searchValue"/></div>
*		<div *ngFor="let member of members | find:{key:'name', value:searchValue}">
* 		<display-member-info [checkIn]="member"></display-member-info>
*	</div>
*/


@Pipe({
	name:'find'
})


export class SearchPipe{
	transform(pipeData, pipeModifier){
		console.log("pipeModifier: ", pipeModifier);
		if(pipeModifier.key == undefined){
			pipeModifier.key = "name";
		}
		return pipeData.filter( (eachItem) => {
			return eachItem[pipeModifier.key].toLowerCase().includes(pipeModifier.value.toLowerCase())
					||
					eachItem[pipeModifier.key].toLowerCase().includes(pipeModifier.value.toLowerCase()); 

		});
	}
}