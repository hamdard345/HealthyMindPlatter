<?php
use FirebaseJWT\JWT;
use FirebaseJWT\Key;
/** 
 * delete an activity from the database 
 * @author Noorullah Niamatullah
 */
class DeleteActivity extends Endpoint
{   private $userid=32;
    public function __construct()
    {
      $this->validateRequestMethod("POST");
      
      $this-> validateToken();
      $this->validateUpdateParams();

      // conecct to the database
      $db = new Database("db/healthymindplatter.sqlite");
      // Initialise and execute the update
      $this->initialiseSQL();
      $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData( array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }

    private function validateRequestMethod($method) {
          if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new ClientException("Invalid Request Method", 405);
           }
    }
    private function validateToken() {
      // 1. Use the secret key
      $secretkey = SECRET;
            
      // Get all headers from the http request using php method getallheaders()
      $allHeaders = getallheaders();
      $authorizationHeader = "";

      /**
       * Look for an Authorization header. using key called Authoriazation in all 
       * headers associative array both with a capital A or lowercase a from allHeaders
       */
      if (array_key_exists('Authorization', $allHeaders)) {
        $authorizationHeader = $allHeaders['Authorization'];
      } elseif (array_key_exists('authorization', $allHeaders)) {
        $authorizationHeader = $allHeaders['authorization'];
      }
        
      /**
       * Check if there is a Bearer token in the header from first to 7th charecter in the authorisation header
       * if its empty or not a Bearer token throw exception
       */
      if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
        throw new ClientException("Bearer token required", 401);
      }
      /**
       * Extract the JWT from the header (by cutting the text 'Bearer ') getting 
       * everything after 7 charecter also triming white spaces
       */
      $jwt = trim(substr($authorizationHeader, 7));
    
      /**
       * Use the JWT class static method decode to decode the token
       *  HS256 algorithm which is used for encode $decoded is the object
       */
      try{
          $decoded = JWT::decode($jwt, new Key($secretkey, 'HS256'));
      } catch ( Exception $e) {
      throw new ClientException($e->getMessage(), 401);
    }
      //check the issuer of the jwt token
    if ($decoded->iss != $_SERVER['HTTP_HOST']){
      throw new ClientException(" Invalid Token issuer ", 401);
    }
    $this->userid = $decoded->sub;

  }

    private function validateUpdateParams(){
  
      if(!isset($_POST['activityID'])){
        throw new ClientException("please supply required parameters", 400);
      }
    }

    protected function initialiseSQL() {   
      $sql = "DELETE from  activity WHERE activityID =:activityID";
      $this->setSQL($sql);
      $this->setSQLParams(['activityID'=> $_POST['activityID']]);
    }

}