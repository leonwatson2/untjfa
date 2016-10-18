

declare interface iSpotifyResponse{
	accessToken?:string
	expiresIn?:string
	tokenType?:string
	error?:string
	isLoggedIn:boolean
}

declare interface iSpotifyAlbum{
	album_type:string
	available_markets:string[]
	external_urls:Object
	href:string
	id:string
	images:iSpotifyImage[]
	name:string
	type:string
	uri:string
}
declare interface iSpotifyArtist{
	external_urls:Object
	followers?:iSpotifyFollowers
	genres?:string[]
	href:string
	id:string
	images:iSpotifyImage[]
	name:string
	popularity?:number
	type:string
	uri:string
}
declare interface iSpotifyEndPoints{
	albums?:string
	users?:string
	currentUserProfile?:string
	tracks?:string
	currentUserPlaylist?:string
	playlist?:string
}

declare interface iSpotifyFollowers{
	href:string
	total:number
}
/**
* The offset-based paging object is a container for a set of objects. 
* It contains a key called items (whose value is an array of the requested objects) 
* along with other keys like previous, next and limit that can be useful in future calls.
*/
declare interface iSpotifyPaging{
	href:string
	items:Object[] // The requested Data
	limit:number
	next:string
	offset:number
	previous:string
	total:number
}
declare interface iSpotifyPlaylist{
	collborative:boolean
	description:string
	external_urls:Object
	followers:iSpotifyFollowers
	href:string
	id:string
	images:iSpotifyImage[]
	name:string
	owner:iSpotifyUser
	public:boolean
	snapshot_id:string
	tracks:iSpotifyTrack[]
	type:string
	uri:string
}
declare interface iSpotifyImage{
	height:number
	url:string
	width:number
}
declare interface iSpotifyUser{
	birthdate?:string
	country?:string
	display_name?:string
	email?:string
	external_urls?:Object
	followers?:iSpotifyFollowers
	href?:string
	id?:string
	images?:iSpotifyImage[];
	playlists?:iSpotifyPlaylist[]
	product?:string
	type?:string
	uri?:string
}
declare interface iSpotifyTrack{
	album?:iSpotifyAlbum
	artists?:iSpotifyArtist[]
	available_markets?:string[]
	disc_number?:number
	duration_ms?:number
	explicit?:Boolean
	external_ids?:Object
	external_urls?:Object
	href?:string
	id?:string
	is_playable?:boolean
	linked_from?:iSpotifyTrackLink
	name?:string
	popularity?:number
	preview_url?:string
	track_number?:number
	type?:string
	uri?:string
}
declare interface iSpotifyTrackLink{
	external_urls:Object
	href:string
	id:string
	type:string
	uri:string
}

