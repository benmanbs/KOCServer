-- Day 1
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Charter Arrival in Dallas', 0, '', 1, 1000, '12:45 PM', 'Welcome to Texas!'),
('Check-In Upon Arrival', 0, '', 1, 1010, '2:00 PM', 'FYI: Girls Tea Rooms are located in Sunnyside and Washington Irving Ballrooms. Boys Tea Rooms are in Trinity Ballrooms 1, 2 & 3'),
('Mincha in the Hotel Shul', 0, '', 1, 1020, '5:40 PM', '(Located in the Oak Ballroom)'),
('Dinner', 0, '', 1, 1030, '6:00 PM', '(Located in Trinity Ballrooms 4, 5, 6, 7 & 8)'),
('Surprise Night Activities', 0, '', 1, 1040, '6:45 PM', 'Make sure to be there for important announcements and tons of fun!'),
('Maariv', 0, '', 1, 1050, '8:30 PM', '(In the Oak Ballroom)'),
('Bedtime', 0, '', 1, 1060, '9:00 PM', 'Get some rest, we have a big day tomorrow! :)');


-- Day 2
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Wake up, sleepyheads!', 0, '', 2, 2000, '7:30 AM', 'Everybody make sure to wish Dr. D and Howie a good morning'),
('Shachris in Hotel Shul', 0, '', 2, 2010, '8:00 AM', '(Located in the Oak Ballroom)'),
('Breakfast', 0, '', 2, 2020, '8:30 AM', '(Located in Trinity Ballrooms 4, 5, 6, 7 & 8)'),
('Load Buses', 0, '', 2, 2030, '9:00 AM', ''),
('Departure to Six Flags Over Texas', 0, '', 2, 2040, '9:45 AM', '(Located at 2201 Road to Six Flags, Arlington, TX 76011)'),
('Arrival at Six Flags Over Texas', 1, 'Map-SixFlags', 2, 2050, '10:05 AM', 'Make sure to stay hydrated!!'),
('Head to Buses', 0, '', 2, 2060, '2:45 PM', ''),
('Load Buses', 0, '', 2, 2070, '3:00 PM', ''),
('Depart to Hotel', 0, '', 2, 2080, '3:45 PM', ''),
('Arrive at Hotel', 0, '', 2, 2090, '4:05 PM', ''),
('BBQ outside the Ballroom', 0, '', 2, 2100, '4:10 PM', 'Spa time for Girls in the Girls’ Tea Room. Get your mani pedi on'),
('Pre-Shabbos Portraits', 0, '', 2, 2110, '6:00 PM', 'Come take pre-Shabbos portraits with Esti Photography! Gorgeous photos await!'),
('Mincha', 0, '', 2, 2120, '7:00 PM', '(Located in the Oak Ballroom)'),
('Candle Lighting', 0, '', 2, 2130, '7:49 PM', 'Shkia is at 8:07PM'),
('PM Dinner', 0, '', 2, 2140, '8:00 PM', '(Located in the Main Ballroom, aka Trinity Ballrooms 4, 5, 6, 7 & 8)'),
('Activity in the Shul', 0, '', 2, 2150, '9:30 PM', 'Please feel free to visit our delicious tea rooms for delicious tea (and dozens of other goodies)!');


-- Day 3
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Daf Yomi', 0, '', 3, 3000, '8:20 AM', 'With Rabbi Elchonon Shoff'),
('Short Shiur', 0, '', 3, 3010, '8:50 AM', 'With Rabbi Elchonon Shoff'),
('Shacharis', 0, '', 3, 3020, '9:00 AM', ''),
('Breakfast ends', 0, '', 3, 3030, '10:00 AM', ''),
('Lavish Kiddush', 0, '', 3, 3040, '11:15 AM', 'In The Gallery (outside the Ballroom)'),
('Shabbos Lunch', 0, '', 3, 3050, '12:45 PM', 'In the Main Ballroom'),
('Super Duper Activities', 0, '', 3, 3060, '2:15 PM', 'In the Oak Ballroom'),
('Courage Bingo', 0, '', 3, 3070, '5:00 PM', 'With iPod Giveaways!! In the Main Ballroom'),
('Mincha', 0, '', 3, 3080, '6:00 PM', ''),
('Shalosh Seudos', 0, '', 3, 3090, '6:20 PM', 'And Kumzits in the Main Ballroom'),
('Maariv', 0, '', 3, 3100, '8:40 PM', ''),
('Shabbos ends', 0, '', 3, 3110, '8:46 PM', 'Havdala outside the Ballroom'),
('Melava Malka', 0, '', 3, 3120, '9:30 PM', 'Bring your dancing shoes and get ready to enjoy the DJ Party!'),
('Bedtime... Go to sleep!', 0, '', 3, 3110, '10:30 PM', '');


-- Day 4
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Daf Yomi in the Shul', 0, '', 4, 4000, '8:00 AM', ''),
('Logistics Shacharis', 0, '', 4, 4010, '8:45 AM', ''),
('Wake up', 0, '', 4, 4020, '9:00 AM', ''),
('Shachris', 0, '', 4, 4030, '9:30 AM', 'SURPRISE ACTIVITY!'),
('Breakfast', 0, '', 4, 4040, '10:00 AM', ''),
('Lunch', 0, '', 4, 4050, '1:00 PM', ''),
('Load buses', 0, '', 4, 4060, '1:30 PM', 'Depart to North Texas Fair & Rodeo. (2217 N Carroll Blvd, Denton, TX 76201)'),
('Arrive at Fair & Rodeo', 0, '', 4, 4070, '2:15 PM', 'Enjoy the carnival, fair, rides, activities and more! Be on lookout for shows! Big events later!'),
('Spanish Concert', 0, '', 4, 4080, '6:00 PM', 'And Tractor Pull.'),
('The Big Rodeo Event', 0, '', 4, 4090, '7:30 PM', ''),
('Load buses', 0, '', 4, 4100, '9:30 PM', ''),
('Depart to Hotel', 0, '', 4, 4110, '10:15 PM', 'Maariv on buses'),
('Arrive at Hotel', 0, '', 4, 4120, '11:00 PM', 'Go straight to sleep!');


-- Day 5
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Coming Soon!', 0, '', 5, 5000, '', '');

-- Day 6
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Coming Soon!', 0, '', 6, 6000, '', '');

-- Day 7
INSERT INTO `sEvent` (`title`, `hasMap`, `mapURL`, `dayNum`, `eventID`, `time`, `details`) VALUES
('Coming Soon!', 0, '', 7, 7000, '', '');
