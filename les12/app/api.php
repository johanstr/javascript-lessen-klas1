<?php

if(!isset($_GET['page'])) {
    getIndexPage();
    exit(0);
}

switch(strtoupper($_GET['page'])) {
    case 'THREAD':
        getThreadPage($_GET['id']);
        break;
    case 'TOPIC':
        getTopicPage($_GET['id']);
        break;
}

function sendData($data, $http_code = 200, $http_message = 'OK')
{
    header("HTTP/1.1 $http_code $http_message");
    header('Content-type: application/json');
    echo json_encode($data);
}

function getIndexPage()
{
    try {
        $db_connection = new PDO('mysql:host=127.0.0.1;dbname=forum_klas1', 
        'root', 'root');

        $db_sql_statement = $db_connection->prepare('
            SELECT  threads.id,
                    threads.title,
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

            sendData($rijen);
            exit(0);
        } else {
            sendData([], 404, 'Not found');
            exit(0);
        }

    } catch(PDOException $error) {
        echo $error->getMessage();
        die();
    }
}


function getThreadPage($id)
{
    try {
        $db_connection = new PDO('mysql:host=127.0.0.1;dbname=forum_klas1', 
        'root', 'root');

        $db_sql_statement = $db_connection->prepare('
            SELECT  topics.id,
                    topics.title,
                    topics.content,
                    topics.thread_id,
                    topics.created_at,
                    users.username,
                    (SELECT COUNT(replies.id)
                     FROM replies
                     WHERE replies.topic_id = topics.id) AS ReplyCount
            FROM topics
            INNER JOIN users ON users.id = topics.user_id
            WHERE topics.thread_id = :threadid
        ');

        // Verstuur de SQL nu maar naar de db server
        $db_sql_statement->execute([
            ':threadid' => $id
        ]);

        // Nu de dataset binnenhalen in PHP
        if($db_sql_statement->rowCount() > 0) {
            $rijen = $db_sql_statement->fetchAll(PDO::FETCH_ASSOC);

            sendData($rijen);
            exit(0);
        } else {
            sendData([], 404, 'Not found');
            exit(0);
        }

    } catch(PDOException $error) {
        echo $error->getMessage();
        die();
    }
    
}


function getTopicPage($id)
{
    try {
        $db_connection = new PDO('mysql:host=127.0.0.1;dbname=forum_klas1', 
        'root', 'root');

        $db_sql_statement = $db_connection->prepare('
            SELECT  replies.content,
                    replies.created_at,
                    replies.updated_at,
                    users.username
            FROM replies
            INNER JOIN users ON users.id = replies.user_id
            WHERE replies.topic_id = :topicid
        ');

        // Verstuur de SQL nu maar naar de db server
        $db_sql_statement->execute([
            ':topicid' => $id
        ]);

        // Nu de dataset binnenhalen in PHP
        if($db_sql_statement->rowCount() > 0) {
            $rijen = $db_sql_statement->fetchAll(PDO::FETCH_ASSOC);

            sendData($rijen);
            exit(0);
        } else {
            sendData([], 404, 'Not found');
            exit(0);
        }

    } catch(PDOException $error) {
        echo $error->getMessage();
        die();
    }
    
    
}
