<?php 

function checkInHandler($params){
	global $method;

	if($method == "POST"){
		switch($params[0]){
			case 'email':
				getCheckInByEmail();
				break;
			case 'add':
				addCheckIn();
				break;
			case 'spotify':
				addSpotifySongs();
				break;
			default:
				errorHandler(NOT_VALID);
		}
	} else if($method == "DELETE"){
			switch($params[0]){
				case "spotify":
					deleteSpotifySuggestion($params[1]);
					break;
				default:
			deleteCheckin($params);
			}
	}else if($method == "PUT"){
		switch($params[0]){
			case 'shirtstatus':
				updateShirtStatus($params);
				break;
			default:
				updateCheckin($params);
		}
	}else 
	if(empty($params[0])){
			getCheckins(); //GET
		} else {
			switch ($params[0]) {
				case 'list':
					getCheckInList();
					break;
				case 'event':
					getEventCheckInList($params[1]);
					break;
				case 'suggestions':
					getSpotifySuggestions();
					break;
				default:
					getCheckinById($params[0]);
				break;
			}
		}

}//checkInHandler()



function getCheckInByEmail(){
	$jfaDb = getDatabaseObject();
	
	$variables = getPostVariables();

	$checkIn = getCheckInWithInfo($jfaDb, strtolower($variables["email"]), "email");
	
	 
	


	setResponse(getResponseArray($jfaDb, $checkIn, 'checkIn'));

}//getCheckInByEmail
function getCheckInById($id){
	$jfaDb = getDatabaseObject();

	$checkIn = getCheckInWithInfo($jfaDb, $id,'id');
	if($checkIn){
		$checkIn = getNumberOfCheckins($jfaDb, $checkIn);
	}

	setResponse(getResponseArray($jfaDb, $checkIn, 'checkIn'));

}
function getEventCheckInList($id){
	if(!$id) errorHandler(NOT_VALID) && die();
	
	$jfaDb = getDatabaseObject();

	$checkIns = $jfaDb->select(DB_CHECKIN_LIST, ['checkin_id(id)'], ['event_id'=>$id]);

	$columns = getCheckInColumns();
	foreach ($checkIns as $key => $checkIn) {
		$checkInInfo = $jfaDb->get(DB_CHECKINS, [
					"[>]".DB_CHECKIN_INFO => ["id"],
					"[>]".DB_SHIRT_SIZES => [DB_CHECKIN_INFO.".t_shirt_size"=>"id"]
					], $columns, [DB_CHECKINS.".id" =>$checkIn['id']]);
		$checkIns[$key] = $checkInInfo;
	}
	setResponse(getResponseArray($jfaDb, $checkIns, 'checkins'));
}
function addCheckIn(){
	$jfaDb = getDatabaseObject();

	$newCheckin = getPostVariables();
	$newCheckin = $newCheckin['checkIn'];

	//email is not set if checking in by id
	if(isset($newCheckin['email']))
		$newCheckin['email'] = strtolower($newCheckin['email']);

	//add to checkins table
	if(!isset($newCheckin['id'])){
		$where = $newCheckin;
		unset($where['event_id']);
		$newCheckin['id'] = $jfaDb->insert(DB_CHECKINS, $where);
	}


	if(isset($newCheckin['tShirtSize'])){
		$jfaDb->insert(DB_CHECKIN_INFO, ["id" => $newCheckin['id'], "t_shirt_size" => $newCheckin['tShirtSize']]);
	}


	$checkInData = [
					'event_id' => $newCheckin['event_id'],
					'checkin_id' => intval($newCheckin['id'])
					];
	if(!$jfaDb->has(DB_CHECKIN_LIST, $checkInData)){

		$jfaDb->insert(DB_CHECKIN_LIST, $checkInData);
		
	}	
	else {
		$newCheckin['checkedIn'] = true;
	}
	$newCheckin['numberOfCheckins'] = $jfaDb->count(DB_CHECKIN_LIST,['checkin_id'=>$newCheckin['id']]);
	
	setResponse(getResponseArray($jfaDb, $newCheckin, 'checkIn'));


}//addCheckIn

function updateCheckin($checkIn){
	$jfaDb = getDatabaseObject();

	$event = getPostVariables();

	if(isset($event['imageChanged'])){
		$event['image_url'] = moveTempPhotoToEventDirectory(getEventDirectoryName($event), $event['image_url']);
		unset($event['imageChanged']);
	}

	if($jfaDb->has(DB_EVENTS, [ 'id' => $event['id']])){
			$jfaDb->update(DB_EVENTS, $event, ['id' => $event['id']]);
	}	

	/* Error Checking */

	if ($jfaDb->error()[1] == NULL) {

		$response_array = ['status' => 201, 'event' => $event];

	} else {

		$response_array = ['status' => 404, 'reason' => $jfaDb->error()[2]];

	}
	setResponse($response_array);
}//updateCheckin()

function addSpotifySongs(){
	$jfaDb = getDatabaseObject();
	$checkInSuggestion = getPostVariables();
	$suggestion = [
		'checkin_id'=>$checkInSuggestion['id'], 
		'spotify_track_id'=>$checkInSuggestion['track']
		];
	$jfaDb->insert(DB_SPOTIFY_SUGGESTIONS, $suggestion);

	setResponse(getResponseArray($jfaDb, $suggestion, 'suggestion'));
}

function getSpotifySuggestions(){
	$jfaDb = getDatabaseObject();
	$tracks = $jfaDb->select(DB_SPOTIFY_SUGGESTIONS,["[>]".DB_CHECKINS => ["id"]],
		['checkin_id(checkinId)','spotify_track_id(spotifyId)', 'id', DB_CHECKINS.'.name(suggestor)']);

	setResponse(getResponseArray($jfaDb, $tracks, 'tracks'));
}

function deleteSpotifySuggestion($spotifyIds){
	$jfaDb = getDatabaseObject();
	$numberAffected = 0;
	foreach (explode(",",$spotifyIds) as $id) {
		
		$oldId = $jfaDb->delete(DB_SPOTIFY_SUGGESTIONS,['spotify_track_id'=>$id]);
		if($oldId)
			$numberAffected++;
	}
	setResponse(getResponseArray($jfaDb, $numberAffected, 'numberAffected'));
}

function getCheckIns(){
	$jfaDb = getDatabaseObject();
	$columns = getCheckInColumns();
	echo var_dump($columns);
	$checkIns = $jfaDb->select(DB_CHECKINS, [
					"[>]".DB_CHECKIN_INFO => ["id"],
					"[>]".DB_SHIRT_SIZES => [DB_CHECKIN_INFO.".t_shirt_size"=>"id"]
					], $columns);
	foreach ($checkIns as $key => $newCheckin) {
		if(isset($newCheckin['id']))
			$checkIns[$key]['numberOfCheckins'] = $jfaDb->count(DB_CHECKIN_LIST,['checkin_id'=>$newCheckin['id']]);
	}
	setResponse(getResponseArray($jfaDb, $checkIns, 'checkIns'));
}

function deleteCheckin($params){
	$jfaDb = getDatabaseObject();
	if(count($params) == 1){
		$event = $jfaDb->get(DB_CHECKINS, ['date_created'], ['id' => $params[0]]);

		$response = $jfaDb->delete(DB_CHECKINS, ['id' => $params[0]]);

		deleteEventDirectory($event);

		$response_array = getResponseArray($jfaDb, $event, 'event');
	
	}else {

		$response_array = ['status' => 404, 'error' => "No event id given."];
	}

	setResponse($response_array);
}



function getCheckInList($id = NULL){
	$jfaDb = getDatabaseObject();
	if($id == NULL){
		$events = $jfaDb->select(DB_EVENTS,
			[
			"[>]".DB_CHECKIN_LIST => ['id'=> 'event_id'],
			]
			,
			[
				DB_EVENTS.".name",
				DB_EVENTS.".start_time(startTime)",
				DB_EVENTS.".location",
				DB_EVENTS.".creator",
				DB_EVENTS.".image_url(imageUrl)",
				
			],
			[
				"ORDER" => DB_EVENTS.".start_time ASC",
				"DISTINCT"=> "id"			
			]
			);
		setResponse(getResponseArray($jfaDb, $events, 'events'));
	}
}

function updateShirtStatus(){
	$member = getPostVariables()["member"];
	$jfaDb = getDatabaseObject();
	if(!$jfaDb->has(DB_CHECKIN_INFO, ["id"=> $member["id"]]))
		$jfaDb->insert(DB_CHECKIN_INFO, ["id"=> $member["id"]]);
	$jfaDb->update(DB_CHECKIN_INFO, ["received_shirt"=> $member["receivedShirt"]], ["id"=>$member["id"]]);

	setResponse(getResponseArray($jfaDb, $member, 'member'));

}
function updateMembershipStatus(){
	$member = getPostVariables()["member"];
	$jfaDb = getDatabaseObject();
	$jfaDb->update(DB_CHECKIN_INFO, ["paid_member"=> $member["paidMember"]], ["id"=>$member["id"]]);

	setResponse(getResponseArray($jfaDb, $member, 'member'));

}

function getCheckInWithInfo($jfaDb, $value, $by = "id"){
	$checkIn = $jfaDb->get(DB_CHECKINS, 
					[
					"[>]".DB_CHECKIN_INFO => ["id", "id"]
					], [
						DB_CHECKINS.".name",
						DB_CHECKINS.".id",
						DB_CHECKINS.".email",
						DB_CHECKINS.".student_id(studentId)",
						DB_CHECKIN_INFO.".t_shirt_size(tShirtSize)"
					], [$by => $value]);
	if($checkIn)
		$checkIn = getNumberOfCheckins($jfaDb, $checkIn);
	else return null;

	return $checkIn;

}
function getNumberOfCheckins($jfaDb, $checkIn){
		$checkInNumber = $jfaDb->count(DB_CHECKIN_LIST, ['checkin_id' => $checkIn['id']]);
		
		return $checkIn;
}

function getCheckInColumns(){
	$columns = [];
	//
	if($_SERVER['QUERY_STRING'])
		try{
			$fields = getFieldValues();

			foreach ($fields as $field) {
				$column = getCheckInDataPart($field);
				array_push($columns, $column);
			}
		}catch (Exception $e){

			setResponse(['status' => 404, 'error' => $e->getMessage()]);
			die();
		}
	else {
		$columns = [
						DB_CHECKINS.".name",
						DB_CHECKINS.".id",
						DB_CHECKINS.".student_id(studentId)",
						DB_SHIRT_SIZES.".abbr(tShirtSize)",
						DB_CHECKIN_INFO.".paid_member(paidMember)",
						DB_CHECKIN_INFO.".received_shirt(receivedShirt)"	
					];
	}
	return $columns;
}
function getCheckInDataPart($field){
	$checkInFields = [
			'name'=>DB_CHECKINS.".name", 
			'id'=>DB_CHECKINS.".id", 
			'student_id'=>DB_CHECKINS.".student_id(studentId)", 
			't_shirt_size'=>DB_SHIRT_SIZES.".abbr(tShirtSize)",
			'favorite_prop'=>DB_CHECKIN_INFO.".favorite_prop(favoriteProp)"
			];
	if(isset($checkInFields[$field]))
		return $checkInFields[$field];

	throw new Exception("'{$field}' is not a field name for checkins.");
	
}
?>
