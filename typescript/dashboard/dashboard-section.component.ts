import {Component, Input} from '@angular/core';


@Component({
	selector: 'dashboard-section',
	template: `
		<h3>{{info.name}}</h3>

			`
})

export class DashboardSectionComponent {
	@Input() info;
	ngOnInit(){
		console.log(this.info);
	}
}
