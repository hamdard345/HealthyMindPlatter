<?php
  use FirebaseJWT\JWT;
/**
 * Authenticate username and password
 *
 * This class will check a username and password again those held in the 
 * database. Where authentication is successful it will return a JWT.
 *@author Noorullah Niamatullah w18002720
 */
class Authenticate extends Endpoint
{
  public function __construct() {

    $db = new Database("db/healthymindplatter.sqlite");

    // check the request method is POST
    $this->validateRequestMethod("POST");

    // check there is a username and password parameter
    $this->validateAuthParameters();

    // execute an SQL query to select the user
    $this->initialiseSQL();
    $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

     //check if username parameter matches one in database
     $this->validateUsername($queryResult);

    // validate the password
    $this->validatePassword($queryResult); 
    //Call a new method that will return a JWT 
    $data['token'] = $this->createJWT($queryResult);
    
    $this->setData( array(
      "length" => 0,
      "message" => "Success",
      "data" => $data
    )); 
  }
  
  private function validateRequestMethod($method) {
      if ($_SERVER['REQUEST_METHOD'] != $method){
        throw new ClientException("Invalid Request Method", 405);
      }
  }

  private function validateAuthParameters() {
    if ( !isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']) ) {
      throw new ClientException("Please supply username and password", 401);
    }
  }
  protected function initialiseSQL() {
    $sql = "SELECT userID, userName, password FROM user WHERE userName = :userName";
    $this->setSQL($sql);
    $this->setSQLParams(['userName'=>$_SERVER['PHP_AUTH_USER']]);
  }
  //implement in some endpoints to check if returned result is more than one
  private function validateUsername($queryResult) {
    if (count($queryResult)!=1) {
      throw new ClientException("ivalid email", 401);
    }
  }
  private function validatePassword($queryResult) {
    if (!password_verify($_SERVER['PHP_AUTH_PW'], $queryResult[0]['password'])) {
      throw new ClientException("Invalid password", 401);
    }
    // if (!password_hash($_SERVER['PHP_AUTH_PW'],PASSWORD_DEFAULT,$queryResult[0]['password'])){
    //   throw new ClientException("Invalid password", 401);
    // }
  }
  private function createJWT($queryResult) {

    // Uses the secret key defined earlier
    $secretKey =SECRET;
    // Specify what to add to the token payload. for the iat and exp claims we need to know the time
    $time = time();
    /**
     * In the payload we use the time for the iat claim and add  
     * one day for the exp claim. For the iss claim we get
     * the name of the host the code is executing on
     * sub user of the token
     */
    $tokenPayload = [
      'iat' => $time,
      'exp' => strtotime('+1 day', $time),
      'iss' => $_SERVER['HTTP_HOST'],
      'sub' => $queryResult[0]['userID']
    ];

    // 3. Use the JWT class to encode the token  
    $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');

    return $jwt;
  }
}