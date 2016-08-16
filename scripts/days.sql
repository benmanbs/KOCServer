CREATE TABLE `sDay` (
 `dayID` int(11) NOT NULL UNIQUE,
 `displayName` varchar(255) NOT NULL,
 `available` tinyint(1) NOT NULL,
 `text_red` smallint(6) NOT NULL DEFAULT '0',
 `text_green` smallint(6) NOT NULL DEFAULT '0',
 `text_blue` smallint(6) NOT NULL DEFAULT '0'
);