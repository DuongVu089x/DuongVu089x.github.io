<?php
    header('Access-Control-Allow-Origin: *');  
    $list_user_name = Array('duonganhvu','123456789','duonganhvu123');
    if (isset($_GET['name']) && strlen(trim($_GET['name']))) {
        $name = $_GET['name']; 
        $result = false;
        foreach ($list_user_name as $key => $user_name) {
            if($user_name === $_GET['name']){
                $result = true;
                break;
            }
        } 
        echo $result? "true":"false"; 
    }else{
        echo "Please input the username";
    }
?>