import {Component} from '@angular/core';

interface DashboardItem{
	name:String

}

interface DashboardSection{
	name:String
	items:DashboardItem[]
}

@Component({
	selector: 'jfa-dashboard',
	template: `
			<div class="dashboard">
				<h2><span>{{user.name | firstword}}'s</span> Dashboard</h2>

				<officer-settings></officer-settings>
				
			</div>	
			`,
})

export class DashboardComponent {
	private user = {
		name: "Leon Watson",
		imageUrl: "references/pic.jpg",
		tShirtSize: "xs",
		membership: "Officer"
	}

	private dashboardItems:DashboardSection[] = [{
		name:"Profile",
		items:[{name:"change info"}, {name:"Change Password"}]
	},{
		name:"Members",
		items:[{name:"Edit Things"}]
	},{
		name:"Website",
		items:[{name:"Edit Things"}]
	}]



}
	