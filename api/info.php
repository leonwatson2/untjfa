SQL Queries

add event_type
define("DB_EVENT_TYPE", event_types)

$eventName = 'Thursday Flow Jam';
$jfaDb->insert(DB_EVENT_TYPE, ['id' => NULL, 'name' => $eventName]);

define("DB_EVENTS", "events")
$event = array(
'name' => "Fire Night in the trees",
'description' => "blah",
'type' => 1,
'start_time' => "2016-08-09 12:00:00",
'end_time' => "2016-08-09 15:00:00",
'number_of_checkins' => 0,
'creator' => "Me",
'id'=> NULL
);
$jfaDb->insert(DB_EVENTS, $event);


TODO: FINISHH EVENT THINGS
TODO: DO UPLOAD PICTURES


ERRORS 
1062 DUPLICATE
1020 WRONG PASS
1021 NOT REGISTERED