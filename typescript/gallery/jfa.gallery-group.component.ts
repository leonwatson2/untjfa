import {Component, Input, OnChanges} from '@angular/core';
import {galleryGroupHtml} from './partials/gallery-group' ;


//photoswipe variables
declare var PhotoSwipe;
declare var PhotoSwipeUI_Default;

@Component({
	selector: 'gallery-group',
	template: galleryGroupHtml,
	directives: [],
	styleUrls:[ 'style/css/photoswipe.css', 'style/css/gallery.css']

})

export class GalleryGroupComponent {
	@Input() photos;
	@Input() photosId;
	private items;
	
	constructor(){}
	

	ngOnInit(){
		setTimeout(()=>{this.galleryInit()}, 400);
	}
	galleryInit(){
		var pswpElement = document.getElementById('photoswipe-gal');
		let items = this.photos.filter((photo)=>{
			return (photo.size);
		});
		this.photos = items;
		this.items = items.map((photo)=>{
			return {
				src:photo.url,
				w:photo.size.width,
				h:photo.size.height,
				id:photo.thumbnail
			}
		});
	}

	openPhotoSwipe(photo, index){
		var pswpElement = document.getElementById("photoswipe-gal"),
			options,
			gallery;
				options = {
					closeOnScroll:false,
					// define gallery index (for URL)
					galleryUID: document.getElementById(this.photosId).getAttribute('data-pswp-uid'),
					preload:[2,4],
					getThumbBoundsFn: function(index) {
						// See Options -> getThumbBoundsFn section of documentation for more info
						var thumbnail = document.getElementById(photo.thumbnailUrl), // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect(); 


						return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
					},
					index:index
				};

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, this.items, options);
		gallery.init();
	}
	
}
