import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name:'moment'
})


export class JFADatePipe{
	transform(pipeData, pipeModifier){
		let t = moment(pipeData, 'YYYY-MM-DD HH:mm:ss', true);
		return t.isValid() ? t.format(pipeModifier) : "";
	}
}