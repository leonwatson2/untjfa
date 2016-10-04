import {Pipe} from '@angular/core';

@Pipe({
	name:'orderby'
})

export class OrderByPipe {
	transform(data, [modifier]) {
		return data.sort((f,s) => f[modifier] >s[modifier]);
	};
}