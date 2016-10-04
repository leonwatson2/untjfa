<?php 

define("UPLOAD_PATH", "../uploads/tempGalleryPictures/");
define("EVENT_UPLOAD_PATH", "uploads/events.");
define("DATE_UPLOAD_PATH", "uploads/gallery");
function galleryHandler($params){
	global $method;
	if($method == "POST"){
		if(isset($params[0]))
		switch ($params[0]) {
				case 'upload':
					uploadPhotos();
					break;
				case 'add':
					addMediaToGallery();
					break;
				default:
					errorHandler(NOT_VALID);		
			}//switch
		else errorHandler(NOT_VALID);
	} else if($method == "DELETE"){
		deleteMedia();
	}else if($method == "PUT"){
		// updateEvent($params);
	}else 
	if(empty($params[0])){
			getPhotos();
		} else {
			
		}//else
}

function getPhotos(){
	setResponse(['status'=>201, 'photos'=>"No Photos"]);
}

function uploadPhotos(){


	$filePath = $_FILES['file']['name'];
	$file = $_FILES['file'];
	$fileSize = $file['size'];
	$fileExt = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
	$trgtDir = UPLOAD_PATH;
	$trgtFile = basename($file['name']);
	$goodUpload = true;


	if(in_array($fileExt, ['jpeg', 'jpg', 'png', 'gif'])){
		
		$trgt = $trgtDir.$trgtFile;

		if(!is_dir($trgtDir)){
			mkdir($trgtDir);
		}
		if (move_uploaded_file($file['tmp_name'], $trgt)) {
			;//Position Like
		} else {
			echo "Nope:".$trgt;
		}
		
	}else if(in_array($fileExt, ["mov", "mp4"])){
		$trgt = $trgtDir.$trgtFile;
		if(!is_dir($trgtDir)){
			mkdir($trgtDir);
		}
		if (move_uploaded_file($file['tmp_name'], $trgt)) {
			echo "Good ". $trgt;			
		} else 
		echo "Nope:".$trgt;
	}

}//uploadPhotos
function deleteMedia(){
	$mediaIds = getFieldValues(); 
	$jfaDb = getDatabaseObject();
	
	foreach ($mediaIds as $value) {
		$media = $jfaDb->get(DB_MEDIA, '*',['id'=>$value]);
		$media = $jfaDb->delete(DB_MEDIA, ['id'=>$value]);
		unlink('../'.$media['url']);
		unlink('../'.$media['thumbnail_url']);
	}
	setResponse(getResponseArray($jfaDb, $mediaIds, 'mediaIds'));
}

function addMediaToGallery(){
	$jfaDb = getDatabaseObject();
	 ini_set('memory_limit', '1024M');

	$mediaData = getPostVariables();
	$date_uploaded = Date('Y-m-d');
	$event = $jfaDb->get(DB_EVENTS, ['date_created'], ['id'=> $mediaData[0]['event_id']]);
	$eventDir =  getEventDirectoryName($event). '/media';
	if(!is_dir(EVENT_DIR . $eventDir)) 
		mkdir(EVENT_DIR . $eventDir);
	if(!is_dir(EVENT_DIR . $eventDir."/tn"))
		mkdir(EVENT_DIR . $eventDir."/tn");

	foreach ($mediaData as $key => $value) {
		$mediaData[$key]['date_uploaded'] = $date_uploaded;
		$mediaFileName = $mediaData[$key]['original_name']; 
		
		$mediaData[$key]['url'] = moveTempMediaToEventDirecory(TEMP_GALLERY_MEDIA_DIR, $eventDir, $mediaData[$key], $mediaFileName);
		
		$mediaData[$key]['thumbnail_url'] = EVENT_PATH. $eventDir."/tn/tn_". $mediaFileName;
	}
	$jfaDb->insert(DB_MEDIA, $mediaData);



	setResponse(getResponseArray($jfaDb, $mediaData, 'mediaData'));
}

function moveTempMediaToEventDirecory($tempDirectory, $eventDirectoryName, $media, $mediaFileName){
	$tempMediaLocation = $tempDirectory . $media['original_name'];
	$eventMediaLocation = $eventDirectoryName . "/" . $mediaFileName;
	
	make_thumb($tempMediaLocation, EVENT_DIR . $eventDirectoryName."/tn/tn_". $mediaFileName, 200, pathinfo($tempMediaLocation)['extension']);	
	
	copy($tempMediaLocation, EVENT_DIR . $eventMediaLocation);
	unlink($tempMediaLocation);

	return EVENT_PATH . $eventMediaLocation;
}



 ?>