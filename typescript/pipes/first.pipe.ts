import {Pipe} from '@angular/core';


@Pipe({
	name:'firstword'
})


export class JFAFirstWordPipe{
	transform(pipeData, pipeModifier){
		return pipeData.split(' ')[0];
	}
}