<?php 

function signupsHandler($params){
	
	global $method;
	if($method == "POST"){
		addSignup();
	} else if($method == "DELETE"){
		deleteSignUp($params);
	}else 
		if(empty($params[0])){
			getSignups();

		} else {
			switch ($params[0]) {
				case 'id':
					//echo "All with id {$params[1]}<br>";
					break;
				case 'name':
					//echo "All with Name {$params[1]}<br>";
				break;
				case 'email':
					getEmails(array_slice($params, 1));
				break;
				case 'interests':
					// echo "All with interests {$params[1]}<br>";
				break;
				case 'birthdays':
					getBirthdaysInMonth($params);
				break;
				
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
		}//else
}//signupsHandlers

function getSignups(){
	$jfaDb = getDatabaseObject();

	$users = $jfaDb->select(DB_SIGNUPS_LIST, ['id', 'name', 'birthday']);
	$response_array = ['status' => 201, 'signups' => $users];
	setResponse($response_array);		
}

function getEmails($params){
	// signups/email/:pass => gets all emails
	// signups/email/:email/:pass => gets signup email
	$jfaDb = getDatabaseObject();
	$response_array = [];
	if(count($params) == 1){
		if($params[0] == AUTH_PASS){
			$signups = $jfaDb->select(DB_SIGNUPS_LIST, ['id', 'name', 'email', 'birthday']);
			$response_array = ['status' => 201, 'signup' => $signups];
		} else {
			$response_array = ['status' => 403, 'error' => "You're not authorized."];
		}
	} else {
		if($params[1] == AUTH_PASS){
			$email = $params[0];
			$signup = $jfaDb->get(DB_SIGNUPS_LIST, ['id', 'name', 'email'], ['email' => $email]);
			$response_array = ['status' => 201, 'signup' => $signup];

		} else {
			$response_array = ['status' => 403, 'error' => "You're not authorized."];
		}
	}
	setResponse($response_array);	
}

function addSignup(){
	$jfaDb = getDatabaseObject();

	$postVariables = json_decode(file_get_contents('php://input'));
		$ids = [];
		//get all interests for signup
		foreach ($postVariables->interests as $value) {
			array_push($ids, intval($value->id));
		}
		
		//get interests name from database
		$interests = $jfaDb->select(DB_FLOW_TYPES, ['name'], ["id" => $ids]);

		//remove interests from object for insertion to db
		unset($postVariables->interests);
		//set signup date
		$postVariables->signup_date = date('Y-m-d');
		//insert signup
		$jfaDb->insert(DB_SIGNUPS_LIST, [$postVariables]);
		//get signups id
		$id = intval($jfaDb->get(DB_SIGNUPS_LIST,'id',["email" => $postVariables->email]));
		//insert interest into table
		if($interests)
		foreach ($interests as $value) {
			$jfaDb->insert(DB_SIGNUPS_INTERESTS, ['id' => $id, 'interest' => $value["name"]]);

		}
		/* Error Checking */

		if ($jfaDb->error()[1] == NULL) {

			$response_array = ['status' => 201, 'signups' => $postVariables];

		} else {

			$response_array = ['status' => 404, 'reason' => $jfaDb->error()[2]];

		}

		setResponse($response_array);

}
function deleteSignUp($params)
{
		$jfaDb = getDatabaseObject();


	$jfaDb->delete(DB_SIGNUPS_LIST, ['id'=>$params[0]]);

	/* Error Checking */

		if ($jfaDb->error()[1] == NULL) {

			$response_array = ['status' => 201, 'user' => $params[0]];

		} else {

			$response_array = ['status' => 404, 'reason' => $jfaDb->error()[2], 'id' => $param[0]];

		}

		setResponse($response_array);

}

function getBirthdaysInMonth($monthNumber){
	$jfaDb = getDatabaseObject();
	try {
		$months = getFieldValues();
		$where = "(";
		foreach ($months as $key => $month) {
			if($key != 0) $where .= " OR ";
			$where .= "DATE_FORMAT(birthday,'%M')='". $month ."'";
		}
		$where .= ")";
		$d = $jfaDb->query("
			SELECT name, birthday as 'birth'
				FROM ". DB_SIGNUPS_LIST." 
				WHERE 
					".$where."
					
					LIMIT 50")->fetchAll();
		
	} catch (Exception $e) {
		$d = $jfaDb->select(DB_SIGNUPS_LIST, ['name', 'birthday']);
	}

	$r = getResponseArray($jfaDb, $d, 'birthdays');
	setResponse($r);
}









 ?>