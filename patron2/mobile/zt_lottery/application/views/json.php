<?php
$this->output->set_header('Content-type: application/json');
$json = json_encode($output);
if(isset($_GET["callback"]))
{        
    $json = $_GET["callback"]."(".$json.")";    
}    
echo $json;    
