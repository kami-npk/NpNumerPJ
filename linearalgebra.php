    <?php
    header("Access-Control-Allow-Origin: http://localhost:8081"); // Allow your React app
    header("Access-Control-Allow-Methods: GET"); 
    header("Access-Control-Allow-Headers: Content-Type"); 
    header("Content-Type: application/json");

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "numerequation";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
    }
    $sql = "SELECT * FROM linearalgebra WHERE id IN (1, 2, 3)";
    $result = $conn->query($sql);

    $equations = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $equations[] = $row;
        }
        echo json_encode($equations);
    } else {
        echo json_encode(["error" => "No data found"]);
    }
    $conn->close();
    ?>
