<?php 
/**
 * request class that can be used to handle the request method and path.
 * @author Noorullah Niamatullah w18002720
 */
class request
{
  
    private $method;
    private $path;

    public function __construct(){
        $this->setMethod();
        $this->setPath();

    }

    private function setMethod(){
      $this->method = $_SERVER['REQUEST_METHOD'];

    }

    public function validateRequestMehtod($validMehtods){
      if(!in_array($this->method, $validMehtods)) {
        $output['message'] = "Invalid request method: ".$this->method;
      }die(json_encode($output));

    }
    /**
     *  // Work out the request from the path
     */
    private function setPath(){
      $this->path = parse_url($_SERVER['REQUEST_URI'])['path'];
      $this->path = str_replace("/hmp/api","",$this->path);

    }
    public function getPath(){
      return $this->path;

    }

}
