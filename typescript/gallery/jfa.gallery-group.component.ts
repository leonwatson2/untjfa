import {Component, Input, OnChanges} from '@angular/core';

require('../../js/FWDGrid.js');

declare var FWDGrid;
declare var FWDUtils;
var grid;

@Component({
	selector: 'gallery-group',
	template: `
		<h1>{{photosId}}</h1>
		<div [id]="photosId" style="width:100%;"></div>
		
			<ul id="playlist" style="display: none;">
				
				<!-- skin -->
				<ul data-skin="">
					<li data-preloader-path="style/load/skin_minimal_dark_square/rotite-30-29.png"></li>
					<li data-show-more-thumbnails-button-normal-path="style/load/skin_minimal_dark_square/showMoreThumbsNormalState.png"></li>
					<li data-show-more-thumbnails-button-selectsed-path="style/load/skin_minimal_dark_square/showMoreThumbsSelectedState.png"></li>
					<li data-image-icon-path="style/load/skin_minimal_dark_square/photoIcon.png"></li>
					<li data-video-icon-path="style/load/skin_minimal_dark_square/videoIcon.png"></li>
					<li data-link-icon-path="style/load/skin_minimal_dark_square/linkIcon.png"></li>
					<li data-iframe-icon-path="style/load/skin_minimal_dark_square/iframeIcon.png"></li>
					<li data-hand-move-icon-path="style/load/skin_minimal_dark_square/handnmove.cur"></li>
					<li data-hand-drag-icon-path="style/load/skin_minimal_dark_square/handgrab.cur"></li>
					<li data-combobox-down-arrow-icon-normal-path="style/load/skin_minimal_dark_square/combobox-down-arrow.png"></li>
					<li data-combobox-down-arrow-icon-selected-path="style/load/skin_minimal_dark_square/combobox-down-arrow-rollover.png"></li>
					<li data-lightbox-slideshow-preloader-path="style/load/skin_minimal_dark_square/slideShowPreloader.png"></li>
					<li data-lightbox-close-button-normal-path="style/load/skin_minimal_dark_square/galleryCloseButtonNormalState.png"></li>
					<li data-lightbox-close-button-selected-path="style/load/skin_minimal_dark_square/galleryCloseButtonSelectedState.png"></li>
					<li data-lightbox-next-button-normal-path="style/load/skin_minimal_dark_square/nextIconNormalState.png"></li>
					<li data-lightbox-next-button-selected-path="style/load/skin_minimal_dark_square/nextIconSelectedState.png"></li>
					<li data-lightbox-prev-button-normal-path="style/load/skin_minimal_dark_square/prevIconNormalState.png"></li>
					<li data-lightbox-prev-button-selected-path="style/load/skin_minimal_dark_square/prevIconSelectedState.png"></li>
					<li data-lightbox-play-button-normal-path="style/load/skin_minimal_dark_square/playButtonNormalState.png"></li>
					<li data-lightbox-play-button-selected-path="style/load/skin_minimal_dark_square/playButtonSelectedState.png"></li>
					<li data-lightbox-pause-button-normal-path="style/load/skin_minimal_dark_square/pauseButtonNormalState.png"></li>
					<li data-lightbox-pause-button-selected-path="style/load/skin_minimal_dark_square/pauseButtonSelectedState.png"></li>
					<li data-lightbox-maximize-button-normal-path="style/load/skin_minimal_dark_square/maximizeButtonNormalState.png"></li>
					<li data-lightbox-maximize-button-selected-path="style/load/skin_minimal_dark_square/maximizeButtonSelectedState.png"></li>
					<li data-lightbox-minimize-button-normal-path="style/load/skin_minimal_dark_square/minimizeButtonNormalState.png"></li>
					<li data-lightbox-minimize-button-selected-path="style/load/skin_minimal_dark_square/minimizeButtonSelectedState.png"></li>
					<li data-lightbox-info-button-open-normal-path="style/load/skin_minimal_dark_square/infoButtonOpenNormalState.png"></li>
					<li data-lightbox-info-button-open-selected-path="style/load/skin_minimal_dark_square/infoButtonOpenSelectedState.png"></li>
					<li data-lightbox-info-button-close-normal-path="style/load/skin_minimal_dark_square/infoButtonCloseNormalPath.png"></li>
					<li data-lightbox-info-button-close-selected-path="style/load/skin_minimal_dark_square/infoButtonCloseSelectedPath.png"></li>
				</ul> 
				
				
				
				<ul data-cat="Category one">
					<ul *ngFor="let photo of photos">
							<li data-type="media" [attr.data-url]="photo.url"></li>
							<li [attr.data-thumbnail-path]="photo.thumbnailUrl"></li>
							<li data-thumbnail-text>
								<p class="largeLabel"></p>
								<p class="smallLabel">{{photo.description}}</p>
							</li>
							<li data-info>
								<p class="mediaDescriptionHeader"></p>
								<p class="mediaDescriptionText"><a [href]="photo.url" download>Download This Photo</a></p>
							</li>
					</ul>
				</ul>
			
			</ul>
		
			`,
  directives: [],
  styleUrls:[ 'style/load/skin_modern_global.css']

})

export class GalleryGroupComponent {
	@Input() photos;
	@Input() photosId;
	private grid;
	
	constructor(){}
	

	ngOnInit(){
			setTimeout(()=>{this.galleryInit()}, 400);
		}
	galleryInit(){
				grid = new FWDGrid({
					//main settings
					gridHolderId:this.photosId,
					gridPlayListAndSkinId:"playlist",
					showContextMenu:"no",
					//grid settings
					thumbnailOverlayType:"text",
					addMargins:"yes",
					loadMoreThumbsButtonOffest:2,
					thumbnailBaseWidth:50,
					thumbnailBaseHeight:25,
					nrOfThumbsToShowOnSet:29,
					horizontalSpaceBetweenThumbnails:0,
					verticalSpaceBetweenThumbnails:0,
					thumbnailBorderSize:1,
					thumbnailBorderRadius:0,
					thumbnailOverlayOpacity:.85,
					backgroundColor:"#fff",
					thumbnailOverlayColor:"#FFFFFF",
					thumbnailBackgroundColor:"#FFFFFF",
					thumbnailBorderNormalColor:"#b2b2b2",
					thumbnailBorderSelectedColor:"#cccccc",
					//combobox settings
					startAtCategory:1,
					selectLabel:"SELECT CATEGORIES",
					allCategoriesLabel:"All Categories",
					showAllCategories:"no",
					comboBoxPosition:"topleft",
					selctorBackgroundNormalColor:"#FFFFFF",
					selctorBackgroundSelectedColor:"#FFFFFF",
					selctorTextNormalColor:"#b2b2b2",
					selctorTextSelectedColor:"#000000",
					buttonBackgroundNormalColor:"#FFFFFF",
					buttonBackgroundSelectedColor:"#FFFFFF",
					buttonTextNormalColor:"#b2b2b2",
					buttonTextSelectedColor:"#000000",
					comboBoxShadowColor:"#000000",
					comboBoxHorizontalMargins:5,
					comboBoxVerticalMargins:5,
					comboBoxCornerRadius:0,
					//ligtbox settings
					addLightBoxKeyboardSupport:"yes",
					showLightBoxNextAndPrevButtons:"yes",
					showLightBoxZoomButton:"yes",
					showLightBoxInfoButton:"yes",
					showLighBoxSlideShowButton:"yes",
					showLightBoxInfoWindowByDefault:"no",
					slideShowAutoPlay:"no",
					lightBoxVideoAutoPlay:"no",
					lighBoxBackgroundColor:"#000",
					lightBoxInfoWindowBackgroundColor:"#000",
					lightBoxItemBorderColor:"#b2b2b2",
					lightBoxItemBackgroundColor:"#333333",
					lightBoxMainBackgroundOpacity:.8,
					lightBoxInfoWindowBackgroundOpacity:.9,
					lightBoxBorderSize:2,
					lightBoxBorderRadius:0,
					lightBoxSlideShowDelay:4
				});
			
	}
}
