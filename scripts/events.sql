CREATE TABLE `sEvent` (
 `title` varchar(255)  NOT NULL,
 `hasMap` tinyint(1) NOT NULL DEFAULT '0',
 `mapURL` varchar(255)  NOT NULL,
 `dayNum` int(11) NOT NULL,
 `eventID` int(11) NOT NULL PRIMARY KEY,
 `time` varchar(10)  NOT NULL,
 `details` varchar(255)  NOT NULL
);