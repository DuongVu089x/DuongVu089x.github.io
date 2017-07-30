<?php
    header('Access-Control-Allow-Origin: *');  
    $list_user_name = Array('1231@gmail.com','123456@gmail.com','duonganhvu123@gmail.com');
    if (isset($_GET['name'])) {
        $result = false;
        foreach ($list_user_name as $key => $user_name) {
            if($user_name === $_GET['name']){
                $result = true;
                break;
            }
        } 
        echo $result? "true":"false"; 
    }
?>