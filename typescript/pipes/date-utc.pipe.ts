import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name:'utcmoment'
})


export class JFADateUtcPipe{
	transform(pipeData, pipeModifier){
		return moment.utc(pipeData).format(pipeModifier);
	}
}