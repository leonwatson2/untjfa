<?php 

function settingsHandler($params){
	
	global $method;
	if($method == "POST"){
		addSignup();
	} else if($method == "DELETE"){
		deleteSignUp($params);
	}else 
		if(empty($params[0]))
			getSettings();
		else{
			switch($params[0]){
				case 'tshirt-sizes':
				getShirtSizes();
				break;
				default:
				errorHandler(NOT_VALID);
			}
		}
		
}//signupsHandlers

function getSettings(){
	$jfaDb = getDatabaseObject();	

	$settings = $jfaDb->select(DB_SETTINGS, ['id', 'name', 'on']);

	$response_array = getResponseArray($jfaDb, $settings, 'settings');

	setResponse($response_array);		
}

function getSetting($params){
	$jfaDb = getDatabaseObject();
	

	$setting = $jfaDb->select(DB_SETTINGS, ['id', 'name', 'on']);
	

	$response_array = getResponseArray($jfaDb, $setting, 'settings');
	setResponse($response_array);	

}
function getShirtSizes(){
	$jfaDb = getDatabaseObject();

	$shirtSizes = $jfaDb->select(DB_SHIRT_SIZES, ['id', 'name', 'abbr']);

	setResponse(getResponseArray($jfaDb, $shirtSizes, 'shirtSizes'));
}



 ?>