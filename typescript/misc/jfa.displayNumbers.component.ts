import {Component, Input} from '@angular/core';


@Component({
	selector: 'display-numbers',
	template: `
		<div class="card signup total">
			<h1>{{title}}</h1>
			<h2 class="big-number">{{numberOfSignups}}</h2>
		</div>
	`,
  styleUrls:['style/css/signup.css']
  
})

export class DisplayNumbersComponent {
  @Input('numberOfUsers') public numberOfSignups:number;
  @Input() title:String;

    constructor(){
  };

  ngOnInit(){
   
  }

}


