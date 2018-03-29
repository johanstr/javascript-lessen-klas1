<?php

try {
    $db_connection = new PDO('mysql:host=127.0.0.1;dbname=forum_klas1', 
    'root', 'root');

    $db_sql_statement = $db_connection->prepare('
        SELECT  threads.title,
                threads.content,
                users.username,
                (SELECT COUNT(topics.id)
                 FROM topics
                 WHERE topics.thread_id = threads.id) AS TopicCount
        FROM threads
        INNER JOIN users ON users.id = threads.user_id
    ');

    // Verstuur de SQL nu maar naar de db server
    $db_sql_statement->execute();

    // Nu de dataset binnenhalen in PHP
    if($db_sql_statement->rowCount() > 0) {
        $rijen = $db_sql_statement->fetchAll(PDO::FETCH_ASSOC);

        header("HTTP/1.1 200 OK");
        header('Content-type: application/json');
        echo json_encode($rijen);
        exit(0);
    } else {
        header("HTTP/1.1 404 Not found");
        header('Content-type: application/json');
        echo json_encode([]);
        exit(0);
    }

} catch(PDOException $error) {
    echo $error->getMessage();
    die();
}