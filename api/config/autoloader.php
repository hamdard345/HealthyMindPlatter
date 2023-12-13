<?php
/**
 * automatically load classes, whenever a class is instantiated , the autoloader 
 * is called to look for a file named after that class, and will include that code.
 * @author Noorullah Niamatullah w18002720
 */
function autoloader($className) {
  $filename = "src\\" . strtolower($className) . ".php";
  $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
  if (is_readable($filename)){
    include_once $filename;
  }else {
    exit("File not found: " .$className . "(" . $filename . ")");
  }
}