<?php 

function interestsHandler($params){
	global $method;
	if($method == "POST"){
		addInterest();
	} else 
		if(empty($params[0])){
			getInterests();

		} else{
			global $request;
			errorHandler(NOT_VALID, "Can't process our request on interests. Request: {$request}");
		}
}//interestHandeler

function getInterests(){
	$jfaDb = new medoo([

						'database_type' => 'mysql',

						'database_name' => DB_NAME,

						'server' => 'localhost',

						'username' => DB_USERNAME,

						'password' => DB_PASS,

						'charset' => 'utf8'

				]);	

	/* Get users id */
	$interests = $jfaDb->select('flow_types', ['id', 'name']);
	
	
	/* Error Checking */

	if ($jfaDb->error()[1] == NULL) {

		$response_array = ['status' =>'201', 'interests' => $interests];

	} else {

		$response_array = ['status' =>'404', 'reason' => $jfaDb->error()[2]];

	}

	setResponse($response_array);
}

function addInterests(){

}



 ?>