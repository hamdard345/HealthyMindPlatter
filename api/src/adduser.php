<?php

/** 
 * add a new user to the database. 
 * @author Noorullah Niamatullah
 */
class AddUser extends Endpoint
{
    public function __construct()
    {
      $this->validateRequestMethod("POST");
      $this->validateUser();
      $this->validateUpdateParams();
      // conecct to the database
      $db = new Database("db/healthymindplatter.sqlite");
      $this->validateUser();


      // Initialise and execute the update
      $this->initialiseSQL();
      $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData( array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }
    protected function validateUser(){
       // Initialise the SQL command and parameters to get userName list from database.
      $sql ="SELECT userName  FROM user where userName = :userName ;";
      $this->setSQL($sql);
      $this->setSQLParams(['userName'=> $_POST['userName']]);
      $db = new Database("db/healthymindplatter.sqlite");
      $userName =$db->executeSQL($this->getSQL(), $this->getSQLParams());
      if(!empty($userName)){
        throw new ClientException("username already exist", 400);

      }


    }

    private function validateRequestMethod($method) {
          if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new ClientException("Invalid Request Method", 405);
           }
    }

    private function validateUpdateParams(){
      // 1. Look for award status  and paper_id parameter
      if (!filter_has_var(INPUT_POST,'userName')) {
        throw new ClientException("username parameter required", 400);
      }
      if (!filter_has_var(INPUT_POST,'password')) {
        throw new ClientException("password parameter required", 400);
      }
      
    }

    protected function initialiseSQL() {   
      //$award = $awardtype[strtolower($_POST['award'])];
      $passwordHash = password_hash($_POST['password'],PASSWORD_DEFAULT);
    
      // $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
      $sql = "INSERT INTO user (userName,password)VALUES (:userName ,:password)";
      $this->setSQL($sql);
      $this->setSQLParams(['userName'=> $_POST['userName'], 'password'=>$passwordHash]);
    }

}