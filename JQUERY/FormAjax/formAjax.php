<?php
    header('Access-Control-Allow-Origin: *');  
    $list_user_name = Array('duonganhvu','123456789','duonganhvu123');

    $username = $_POST['username'];
    $password = $_POST['password'];

    if (strlen(trim($username))>6 && strlen(trim($password))>6) {
        $result = false;
        foreach ($list_user_name as $key => $user_name) {
            if($user_name === $username && $password === '123456789Aa'){
                $result = true;
                break;
            }
        } 
        echo $result? "true":"false"; 
    }else{
        echo "Please input the username";
    }
?>