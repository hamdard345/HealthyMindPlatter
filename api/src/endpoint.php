<?php
 
/**
 * A general class for endpoints
 * 
 * This class will be a parent for all endpoints (authenticate,addactivity,update etc.) 
 * providing common methods. It has been declared as an abstract class
 * which means it is not possible to make an instance of this class itself.
 * 
 * @author Noorullah Niamatullah
 */
abstract class Endpoint 
{
    private $data;
    private $sql;
    private $sqlParams;
 
    /**
     * Query the database and save the result 
     */
    public function __construct() {
        
        $db = new Database("db/database.db");
 
        /**
         * The initialiseSQL method can be overridden by
         * child classes to set the SQL as appropriate for each endpoint
         */
        $this->initialiseSQL();
        // Check if the params used are valid for endpoint
        $this->validateParams($this->endpointParams());
        
        $data = $db->executeSQL($this->sql, $this->sqlParams);
  
        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }
 
    protected function setSQL($sql) {
        $this->sql = $sql;
    }
    protected function getSQL() {
        return $this->sql;
    }
 
    protected function setSQLParams($params) {
        $this->sqlParams = $params;
    }
    protected function getSQLParams() {
        return $this->sqlParams;
    }
    
    protected function initialiseSQL() {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 
 
    protected function setData($data) {
        $this->data = $data;
    }
 
    public function getData() {
        return $this->data;
    }
    /**
    * Define valid parameters for this endpoint
    */
    protected function endpointParams() {
        return [];
    }
    
    /**
     * Check the parameters used in request against an array of
     * valid parameters for the endpoint
     * 
     * @param array $params An array of valid param names (e.g. ['id'])
     */
    protected function validateParams($params) {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                http_response_code(400);
                $output['message'] = "Invalid parameter: " . $key;
                die(json_encode($output));
            }
        }    
    }
}