
<?php 
define('NOT_VALID', "Not a valid request");

require_once 'medoo.php';

require_once 'config.php';
require_once 'inc/eventFunctions.php';
require_once 'inc/interestFunctions.php';
require_once 'inc/memberFunctions.php';
require_once 'inc/signupFunctions.php';
require_once 'inc/trickFunctions.php';
require_once 'inc/settingsFunctions.php';
require_once 'inc/checkInFunctions.php';
require_once 'inc/mailFunctions.php';
require_once 'inc/galleryFunctions.php';

//directory where api is hosted
$dirName = "api";
//get method
$method = $_SERVER['REQUEST_METHOD'];
//get parameters from request 
$queryString = $_SERVER['QUERY_STRING'];
$request = $_SERVER['REQUEST_URI'];
$requestArr = explode('/', $request);
$key = array_search($dirName, $requestArr);
//take out anyting before the api directory
$allParameters = array_slice($requestArr, $key + 1);
if($queryString){
	$allParameters = explode('/',explode('?',implode("/", $allParameters))[0]);
}
$params = array_slice($allParameters, 1);

switch ($allParameters[0]) {
	case 'tricks':
		tricksHandler($params);
	break;
	case 'interests':
		interestsHandler($params);
	break;
	case 'signups':
		signupsHandler($params);
	break;
	case 'events':
		eventsHandler($params);
	break;
	case 'members':
		membersHandler($params);
	break;
	case 'settings':
		settingsHandler($params);
	break;
	case 'checkin':
		checkInHandler($params);
	break;
	case 'sendmail':
		mailHandler($params);
	break;
	case 'gallery':
		galleryHandler($params);
	break;
	default:
	errorHandler(NOT_VALID);

}


function errorHandler($error){
	global $allParameters;
	$response_array = ['status' => 404, 'error' => $error];
	setResponse($response_array);
}

function setResponse($responseArray){
	http_response_code($responseArray['status']);
	header('Content-type: application/json');
	echo json_encode($responseArray);
}


function getEncryptedPass($member){
	return md5($member['email'] . md5($member['password']) . JFA_SALT);
}

function getResponseArray($jfaDb, $values, $valueName){
	/* Error Checking */

	if ($jfaDb->error()[1] == NULL) {

		return ['status' => 201, $valueName => $values];

	} else {

		return ['status' => 404, $valueName => $jfaDb->error()[2]];

	}
}

function make_thumb($src, $dest, $desired_width, $ext) {

	$ext = strtolower($ext);
	/* read the source image */
	if ($ext == 'gif')
		$source_image = imagecreatefromgif($src);
	else if ($ext == 'png')
		$source_image = imagecreatefrompng($src);
	else if ($ext == 'jpg' || $ext == 'jpeg')
		$source_image = imagecreatefromjpeg($src);
	else return;

	/* read the source image */
	$width = imagesx($source_image);
	$height = imagesy($source_image);
	
	/* find the "desired height" of this thumbnail, relative to the desired width  */
	$desired_height = floor($height * ($desired_width / $width));
	
	/* create a new, "virtual" image */
	$virtual_image = imagecreatetruecolor($desired_width, $desired_height);
	
	/* copy source image at a resized size */
	imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
	
	/* create the physical thumbnail image to its destination */
	imagejpeg($virtual_image, $dest);
}

function getPostVariables(){
	return json_decode(file_get_contents('php://input'), true);
}

function getDatabaseObject(){
	return new medoo([

		'database_type' => 'mysql',

		'database_name' => DB_NAME,

		'server' => 'localhost',

		'username' => DB_USERNAME,

		'password' => DB_PASS,

		'charset' => 'utf8'

		]);
}

function getFieldValues(){
	$str = $_SERVER["QUERY_STRING"];
	strpos($str, "fields");
	
	$fieldName = explode("=", $str);
	if($fieldName[0] != "fields"){
		throw new Exception("No parameter with name of {$fieldName[0]}", 1);
		
	}
	if(count($fieldName) > 2){

		throw new Exception("To many parameters set: " . implode(",", $fieldName), 1);
		
	}
	if(count($fieldName) < 2){
		throw new Exception("Fields parameter not set.", 101);

	} else {
		
		$fields = explode(",",$fieldName[1]);

		return $fields;
	}
	
}


?>
