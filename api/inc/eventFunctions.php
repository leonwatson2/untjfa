<?php 

function eventsHandler($params){
	global $method;
	if($method == "POST"){
		switch ($params[0]) {
				case 'add':
					addEvent();
					break;
				case 'types':
					getEventTypes();
				break;
				case 'email':
					// getEmails(array_slice($params, 1));
				break;
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
	} else if($method == "DELETE"){
		deleteEvent($params);
	}else if($method == "PUT"){
		updateEvent($params);
	}else 
	if(empty($params[0])){
			getEvents();
		} else {
			switch ($params[0]) {
				case 'id':
					//echo "All with id {$params[1]}<br>";
					break;
				case 'types':
					getEventTypes();
				break;
				case 'media':
					getEventsAndMedia();
				break;
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
		}//else
}



function getEvents(){
	$jfaDb = getDatabaseObject();
	$columns = ['name', 'start_time', 'end_time', 'description','number_of_checkins', 'id', 'creator', 'type', 'image_url', 'location', 'date_created'];
	$events = $jfaDb->select(DB_EVENTS, $columns);
	$response_array = ['status' => 201, 'events'=> $events];

	setResponse($response_array);

}//getEvents

function addEvent(){
	$jfaDb = getDatabaseObject();

	$postVariables = getPostVariables();
	$newEvent = $postVariables;
	$newEvent['date_created'] = date('Y-m-d H:i:s');	
	
	unset($newEvent['id']);
	
	$eventDirectoryName = getEventDirectoryName($newEvent);

	if(!is_dir(EVENT_DIR . $eventDirectoryName))
		mkdir(EVENT_DIR . $eventDirectoryName, 0777, true);
	
	if(!isset($newEvent['imageFromFacebook']) || !$newEvent['imageFromFacebook']){
		$newEvent['image_url'] = moveTempPhotoToEventDirectory(TEMP_MEDIA_DIR, $eventDirectoryName, $newEvent['image_url']);
	}
	
	unset($newEvent['imageChanged']);
	unset($newEvent['imageFromFacebook']);
	
	$jfaDb->insert(DB_EVENTS, $newEvent);

		$response_array = getResponseArray($jfaDb, $newEvent, 'event');
		setResponse($response_array);


}//addEvent

function updateEvent($params){
	$jfaDb = getDatabaseObject();
	$event = getPostVariables();
	if(isset($event['imageChanged'])){
		$event['image_url'] = moveTempPhotoToEventDirectory(TEMP_MEDIA_DIR, getEventDirectoryName($event), $event['image_url']);
		unset($event['imageChanged']);
	}
	unset($event['imageFromFacebook']);

	if($jfaDb->has(DB_EVENTS, [ 'id' => $event['id']])){
			$jfaDb->update(DB_EVENTS, $event, ['id' => $event['id']]);
	}	

	setResponse(getResponseArray($jfaDb, $event, 'event'));

}

function deleteEvent($params){
	$jfaDb = getDatabaseObject();
	if(count($params) == 1){
		$event = $jfaDb->get(DB_EVENTS, ['date_created'], ['id' => $params[0]]);

		$response = $jfaDb->delete(DB_EVENTS, ['id' => $params[0]]);

		deleteEventDirectory($event);

		$response_array = getResponseArray($jfaDb, $event, 'event');
	}else {

		$response_array = ['status' => 404, 'error' => "Doesn't exist"];
	}

	setResponse($response_array);
}

function getEventsAndMedia(){
	$jfaDb = getDatabaseObject();
	$events = $jfaDb->select(DB_EVENTS, 
							[
								'name',
								'id',
								'start_time(date)'

							]);
	$columns = ['name', 'description', 'thumbnail_url(thumbnailUrl)', 'url', 'original_name(originalName)', 'id', 'uploaded_by(uploadedBy)', 'date_uploaded(dateUploaded)'];
	error_reporting(E_ALL ^ E_WARNING); // surpress unable to create temp file. warning
	foreach ($events as $key => $value) {
		$events[$key]['media'] = $jfaDb->select(DB_MEDIA, $columns, ['event_id'=>$value['id']]);
		
		//get sizes for all images
		foreach($events[$key]["media"] as $pkey => $media){
			if($img = getimagesize(BASEURL."/".$media["url"])){
				$events[$key]["media"][$pkey]["size"] = ["width"=>$img[0], "height"=>$img[1]];
			}
			if($img = getimagesize(BASEURL."/".$media["thumbnailUrl"])){
				$events[$key]["media"][$pkey]["tn_size"] = ["width"=>$img[0], "height"=>$img[1]];
			}
		}
	}
	setResponse(getResponseArray($jfaDb, $events, 'events'));
}

function getEventTypes(){
	$jfaDb = getDatabaseObject();
	$eventTypes = $jfaDb->select(DB_EVENT_TYPES, ['name', 'id']);

	$response_array = getResponseArray($jfaDb, $eventTypes, 'eventTypes');
		setResponse($response_array);
}

function moveTempPhotoToEventDirectory($tempDirectory, $eventDirectoryName, $imageName){
	$tempPhotoLocation = $tempDirectory . $imageName;
	$photoInfo = pathinfo($tempPhotoLocation);
	$eventMediaLocation = $eventDirectoryName . "/mainPhoto." . $photoInfo['extension'];
	copy($tempPhotoLocation, EVENT_DIR . $eventMediaLocation);
	unlink($tempPhotoLocation);

	return EVENT_PATH . $eventMediaLocation;
}


function getEventDirectoryName($event){
	$dir = $event['date_created']. "-" . md5($event['date_created']);
	return str_replace(" ","", $dir);
}
function deleteEventDirectory($event){
	$eventDirectory = getEventDirectoryName($event);
	rrmdir(EVENT_DIR . $eventDirectory);
}
function rrmdir($dir) { 
  foreach(glob($dir . '/*') as $file) { 
    if(is_dir($file)) rrmdir($file); 
    	else unlink($file); 
  } 
  rmdir($dir); 
}
 
 ?>