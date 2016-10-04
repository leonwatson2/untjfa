<?php 
define("UPLOAD_PATH", "../uploads/tempPictures/");
define("EVENT_UPLOAD_PATH", "uploads/events.");


if($_SERVER['REQUEST_METHOD'] == "POST"){

	$filePath = $_FILES['file']['name'];
	$file = $_FILES['file'];
	$fileSize = $file['size'];
	$fileExt = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
	$trgtDir = UPLOAD_PATH;
	$trgtFile = basename($file['name']);
	$goodUpload = true;


	if(in_array($fileExt, ['jpeg','jpg', 'png','gif'])){
		
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

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Upload Files</title>
</head>
<body>
	<form action="./uploadTemp.php" method="post" enctype="multipart/form-data">
		<input type="file" name="file" id="the_file">
		<input type="text" name="location">
		<input type="submit" name="" value="Mike"> 
	</form>
</body>
</html>