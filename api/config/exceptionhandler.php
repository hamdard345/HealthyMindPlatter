<?php
/**
 *generic exception handler that will be automatically triggered in the event of an *exception
 * @ $e  object with information about the exception
 * @author Noorullah Niamatullah w18002720
 */
function exceptionHandler($e) {
   http_response_code(500);
   $output['message'] = $e->getMessage();
   $output['location']['file'] = $e->getFile();
   $output['location']['line'] = $e->getLine();
   echo json_encode($output);
}