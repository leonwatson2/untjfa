import {Component} from '@angular/core';

@Component({
	selector: 'social-media',
	template: 
		`<div class="socials">
			<div class="social">
				<img src="images/twitter-icon.png" alt=""><span> & </span> 
				<img src="images/instagram-icon.png" alt="">
				<span class=".cf">@untjfa</span>
			</div>
		</div>`,
  directives: [],
  styleUrls: ["style/css/social-media.css"]
})

export class SocialMediaComponent {
		
}
