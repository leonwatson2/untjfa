<?php 
require_once "mailFunctions.php";
function membersHandler($params){
	global $method;
	if($method == "POST"){
		if(empty($params[0])){
			checkMemberCreditials();
		} else
		switch ($params[0]) {
				case 'add':
					addMember($params);
				 break;
				case 'verify':
					verifyMember();
				break;
				case 'id':
					getMemberById();
				break;
				case 'facebook':
					facebookLogin();
					break;
				case 'unsubscribe':
					unsubscribeSignUp();
					break;
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
	} else if($method == "DELETE"){
		deleteSignUp($params);
	}else 
		if(empty($params[0])){
			getMembers();
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
				case 'birthday':
					// echo "All with Birthday {$params[1]}<br>";
				break;
				
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
		}//else
}

function verifyMember(){
	$jfaDb = getDatabaseObject();
	$member = getPostVariables();
	$member = $jfaDb->get(UNVERIFIED_MEMBERS,['name', 'email', 'password'], ["id" => $member['id']]);

	if($member){

		$jfaDb->delete(UNVERIFIED_MEMBERS, ["id" => $member['id']]);
		$member['signup_date'] = date('Y-m-d');
		$response_array = ['status' =>'201', 'member' => $member];
		$jfaDb->insert(DB_MEMBERS, $member);
	}else{

		$response_array = ['status' =>'202', 'dberror'=>$jfaDb->error()[1], 'reason' => $jfaDb->error()[2]];
	}
	

		setResponse($response_array);
		
	


}
function getMemberEmails(){
	$jfaDb = getDatabaseObject();

	$signups = $jfaDb->select(DB_SIGNUPS_LIST, ['email']);

	return $signups;
}
function checkMemberCreditials(){
	$jfaDb = getDatabaseObject();
	$member = getPostVariables();

	$member = [
		"email" => $member['email'],
		"password" => $member['password']
	];
	$password = getEncryptedPass($member);

	$member = $jfaDb->get(DB_MEMBERS, 
		['name', 'password','email', 'facebook_id(facebookId)', 'spotify_id(spotifyId)', 'is_admin(isAdmin)', 'id', 'birthday', 'signup_date(signUpDate)'], ["email" => $member["email"]]);
	
	/* Checking if in database if in database */
	if ($member) {
	/* Checking if password is correct*/
		if($member['password'] == $password){
			/* Don't send password*/
			unset($member['password']);
			$response_array = ['status' =>'201', 'member' => $member];
		}
		else
			$response_array = ['status' =>'202', 'error' => "Wrong Password ", 'errorCode' => 1020];

	} else {
		$response_array = ['status' =>'202', 'error'=>"Not in database", 'errorCode' => 1021];
	}

		setResponse($response_array);
}
function addMember($params){
	$jfaDb = getDatabaseObject();

	$postVariables = getPostVariables();
		
	$member = [
		"name"=>$postVariables['name'],
		"email"=>$postVariables['email'],
		"password"=>getEncryptedPass($postVariables),
		"id"=>md5(uniqid(rand()))
	];
	$jfaDb->insert(UNVERIFIED_MEMBERS, $member);

	/* Error Checking */

	if ($jfaDb->error()[1] == NULL) {

		$response_array = ['status' =>'201', 'member' => $member];
		if(!sendVerificationEmail($member))
			$response_array = ['status' =>'204', 'error' => "Mail was not sent"];
			

	} else {

		$response_array = ['status' =>'202', 'dberror'=>$jfaDb->error()[1], 'reason' => $jfaDb->error()[2]];
		
	}

		setResponse($response_array);
		
}
function facebookLogin(){
	$jfaDb = getDatabaseObject();

	$facebookCredentials = getPostVariables();
	$columns = ['name','email', 'facebook_id', 'is_admin', 'id', 'birthday', 'signup_date'];

	if($jfaDb->has(DB_MEMBERS, ['facebook_id'=>$facebookCredentials['id']])){
		$where = ["OR"=>[
						'facebook_id' => $facebookCredentials['id'],
						'email' => $facebookCredentials['email']
						]];
		$member = $jfaDb->get(DB_MEMBERS, $columns, $where);

		$response_array = getResponseArray($jfaDb, $member, 'member');
		
	} else {

		$facebookCredentials['facebook_id'] = $facebookCredentials['id'];
		unset($facebookCredentials['id']);
		$facebookCredentials['signup_date'] = date('Y-m-d');
 		$facebookCredentials['id'] = $jfaDb->insert(DB_MEMBERS, $facebookCredentials);
		
		$member = $jfaDb->get(DB_MEMBERS, $columns, $facebookCredentials);
		$response_array = getResponseArray($jfaDb, $member, 'member');
	}

	setResponse($response_array);
}

function getMemberById(){
	$jfaDb = getDatabaseObject();

	$postVariables = getPostVariables();

	$id = $jfaDb->get(DB_MEMBERS, ['id'], ['id' => intval($postVariables['id'])]);

	setResponse(getResponseArray($jfaDb, $id['id'], 'id'));
}


function unsubscribeSignUp(){
	$jfaDb = getDatabaseObject();
	$signupEmail = getPostVariables();
	
	$id = $jfaDb->delete(DB_SIGNUPS_LIST, ["email"=>$signupEmail]);

	setResponse(getResponseArray($jfaDb, $id, "wasDeleted"));

}

 ?>