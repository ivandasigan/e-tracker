<?php
 print_r($_POST['message']);
function sendNotification($title, $body, $click){
$url ="https://fcm.googleapis.com/fcm/send";

$to = $_POST['topic'];

$notification = array(
'title' => $title,
'body' => $body,
"click_action"=> $click
);

$fields = array('to'=>$to, 'notification'=>$notification);

$headers=array(
'Authorization: key=AAAAKh7pZK0:APA91bGG_A4yhW8vMq1xYtp6dMBqidDAiQbWfNodmJdOSgmNi4roKlJ-iRZ-ZOWVIJP8MJ6tSfE8DEgD9lSpGdLy9Aeyh8Eq4NGeSTft0P9K7D9swf305--ctdJiifvyya6EQtssZLMd',
'Content-Type:application/json'
);

$ch=curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_POST,true);
curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($fields));
$result=curl_exec($ch);
print_r($result);
curl_close($ch);
}
print_r($_POST['topic']);
sendNotification($_POST['subject'],$_POST['message'], "https://www.google.com/");
//"cbJcnbcOQLKCxxX5Nb42PV:APA91bEY3Vfm5d-WnOoGxe2uWG7PeMKM36JlTHHScp7gNamTqXef_71g2OSZyqiry9Rqhwy0PdsfaTCBBEAHLZ5HHbqqERM9F06BnHWV-JV_rMWSr7cR7xuVrm8C-Zr3SwgQvuvw3CeL"
?>  