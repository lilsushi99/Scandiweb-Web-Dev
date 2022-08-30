<?php
$sku = $_POST['sku'];
$name = $_POST['name'];
$price = $_POST['price'];
//$size = $_POST['size'];
//$weight = $_POST['Weight'];
//$height = $_POST['height'];
//$width = $_POST['width'];
//$length = $_POST['length'];

if (!empty($sku) || !empty($name) || !empty($price) || !empty($size)) {
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "add_products";
 
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if (mysqli_connect_error()) {
        die('Connect Error('. mysqli_connect_error().')'. mysqli_connect_error());
    } else {
        $SELECT = "SELECT sku from products WHERE sku = ? Limit 1";
        $INSERT = "INSERT Into products (sku, name, price) values(?,?,?)";

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $sku);
        $stmt->execute();
        $stmt->bind_result($sku);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if ($rnum==0) {
            $stmt->close();

            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("ssi", $sku, $name, $price);
            $stmt->execute();
            echo "<h1> Thank You $name Prodcuts Saved Successfully. <a href=Add_Product.html>Click Here</a> </h1>";
        } else {
            echo "Stocking Unit Inputted Already";
        }
        //$stmt->close();
        $conn->close();

    }
   
} else {
    echo "All Fields Required";
    die();
}
?>