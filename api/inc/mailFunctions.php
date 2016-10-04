<?php 

function mailHandler($params){
	global $method;
	if($method == "POST"){
		sendEmailSetup();
	}else {
		errorHandler(NOT_VALID);
	}
}

function sendEmailSetup(){
	$response_array = ['status'=>201, 'email'=>getPostVariables()];

	sendMassEmail();

	

}

function sendMassEmail(){
	$email = getPostVariables();
	$boundary = uniqid('jfa');

	$headers = "From: UNT Juggling and Flow Arts <" . JFA_MAIN_EMAIL . ">\r\n";
	$headers .= "Reply-To: \r\n";
	$headers .= "CC: \r\n";
	$headers .= "BCC: \r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: multipart/alternative;boundary=". $boundary ."\r\n";

	$msg = createFromTemplate($email['message'], $email['subject'], $boundary);

	if(boolval($email['test'])){
		$to = $email['testEmailRecipient'];

		if(mail($to, $email['subject'], $msg, $headers))
			$response_array = ['status' => 201, 'testemail'=>$email, '$to'=>$to];
		else
			$response_array = ['status' => 202, 'error'=>$email, 'msg'=>$msg];
	}else {
		$userEmails = getMemberEmails(); 
		var_dump($userEmails);
		foreach ($userEmails as $recipient){
			mail($recipient['email'], $email['subject'], $msg, $headers);
				array_push($recipients, $recipient['email']);
		}
		$response_array = ['status' => 201, 'testemail'=>false, 'msg'=>$msg, 'recipients'=>$userEmails];

	}

	setResponse($response_array);
}

function sendEmail($subject, $msg, $recipent, $sender){

	$boundary = uniqid('jfa');

	$headers = "From: {$sender["name"]} <" . strip_tags($sender["email"]) . ">\r\n";
	$headers .= "Reply-To: ". strip_tags($sender["email"]) . "\r\n";
	$headers .= "CC: \r\n";
	$headers .= "BCC: JFA Pres <president@untjfa.com>\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: multipart/alternative;boundary=". $boundary ."\r\n";

	$msg = createFromTemplate($msg, $subject, $boundary, $recipient);
	if(mail($recipent, $subject, $msg, $headers))
		return true;
	return false;
}

function createFromTemplate($msg, $subject, $boundary, $recipient){
	$socials = [

	"facebook" => "https://www.facebook.com/groups/untjfa/",

	"instagram" => "https://www.instagram.com/untjfa/",

	"twitter" => "https://www.twitter.com/untjfa/"

	];
	$message = "";
	$message .= "\r\n\r\n--" . $boundary . "\r\n";
	$message .= "Content-Type:text/plain; charset=utf-8\r\n\r\n";

	$message .= '
	Juggling and Flow Arts '.$subject.'

	'. $msg;

	$message .= "\r\n\r\n--" . $boundary . "\r\n";
	$message .= "Content-Type:text/html; charset=utf-8\r\n\r\n";

	$message .= '
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Juggling and Flow Arts</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">


	</head>
	<style>'.
		file_get_contents('../style/css/email.css')
		.'</style>
		<body>
			<div class="container">
				<header>
					<div class="nav-container">
						<a href="#" class="logo">
							<img src="http://untjfa.com/letter-logo.png" alt="JFA logo">
						</a>
						<h2> '. $subject . '</h2>
					</div> <!---/ .nav-container -->
				</header>

				<div class="message">'. 

					$msg

					.'<section id="footer">
					<div class="links">
						<ul class="socials">';
							foreach ($socials as $social => $url) {	
								$message .='
								<a href="'. $url .'" target="_blank" class="badge social '. $social .'">
									<i class="fa fa-2x fa-'. $social .'"></i>
								</a>';
							} 

							$message .='
						</ul>

						<div class="copyright">
							<div>&copy; Juggling and Flow Arts</div>
						</div>
					</div>
					<div>
						<small><a href="'.BASEURL.'/register/unsubscribe/'. $recipient .'">unsubscribe</a></small>
					</div>
				</section>
			</div> <!---/ .container-->
		</body>
		</html>
		';
		$message .= "\r\n\r\n--" . $boundary . "--";

		return $message;
	}



	function sendVerificationEmail($member){
		$subject = "Account Verification";
		$recipent = $member['email'];
		$sender = [
		"name"=>"JFA Site",
		"email"=>"us@untjfa.com"
		];
		$msg = '<div class="container">';
		$msg .= "<h1>Welcome to JFA ".$member['name']."</h1>";

		$msg .= 'Verify your account with this <a href="'.BASEURL.'/register/verify/'.$member["id"].'">link</a>';
		$msg .= '<div>Or you can use this url '.BASEURL.'/register/verify/'.$member["id"] .'</div>';
		$msg .= '</div>';


		return sendEmail($subject, $msg, $recipent, $sender);
	}


	?>