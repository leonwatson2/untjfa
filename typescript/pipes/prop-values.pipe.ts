import {Pipe} from '@angular/core';


@Pipe({
	name:'values'
})


export class ValuesPipe{
	transform(pipeData, pipeModifier){
		let keys = Object.keys(pipeData);
			let data = [];
			keys.forEach((k)=>{
				data.push({key:k, data:pipeData[k]});
			});
			return data;
	}
}