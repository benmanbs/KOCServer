-- CREATE TABLES SCRIPT

-- sDay
CREATE TABLE `sDay` (
 `dayID` int(11) NOT NULL,
 `displayName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `available` tinyint(1) NOT NULL,
 `text_red` smallint(6) NOT NULL DEFAULT '0',
 `text_green` smallint(6) NOT NULL DEFAULT '0',
 `text_blue` smallint(6) NOT NULL DEFAULT '0',
 UNIQUE KEY `dayID` (`dayID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci


-- sEvent
CREATE TABLE `sEvent` (
 `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `hasMap` tinyint(1) NOT NULL DEFAULT '0',
 `mapURL` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `dayNum` int(11) NOT NULL,
 `eventID` int(11) NOT NULL,
 `time` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
 `details` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
