<?php
 /**
  * response class making sure responses are machine readable JSON 
  * header() to set the content-type as json making sure that the client(e.g web browser) will know that it is JSON document
  * @author Noorullah Niamatullah w18002720
  */
class Response
{
    public function __construct() {
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Origin: *"); 
    }
}