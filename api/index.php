<?php
 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Headers: Content-Type, authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
}
 /**
  * Request object are created and the path used in the switch statement. passing the request object to the endpoint
  * @author Noorullah Niamatullah w18002720
  */
define('SECRET',"4PpgK/?h.Y<2G7lbnM'}t3QGbt&|e");
// include and register the autoloader
include 'config/config.php';


$request = new Request();
    /**
     * switch statement that will match different paths and return different results based upon different 'cases'
     * break will stop execution if none of those cases matches
     */
    try{
        switch($request->getPath()) {
            case '/auth/':
            case '/auth':
            case '/auths/':
            case '/auths':
                $endpoint = new Authenticate($request);
                break;
            case '/update/':
            case '/update':
                $endpoint = new Update();
                break; 
            case '/adduser/':
            case '/adduser':
                $endpoint = new AddUser();
                break;
            case '/addactivity/':
            case '/addactivity':
                $endpoint = new AddActivity();
                break;
            case '/getdays/':
            case '/getdays':
                $endpoint = new Getdays();
                break;
            case '/weeklyreport/':
            case '/weeklyreport':
                $endpoint = new Weeklyreport();
                break;
            case '/updateactivity/':
                $endpoint = new UpdateActivity();
                break;
            case '/deleteactivity/':
                $endpoint = new DeleteActivity();
                break;
            default:
            $endpoint = new ClientError("Path not found: " . $path, 404);
                
        }
    } catch (ClientException $e){
        $endpoint = new ClientError($e->getMessage(), $e->getCode());
    }
 
$response = $endpoint->getData();
echo json_encode($response);