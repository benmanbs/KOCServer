# KOC Server

This server powers the KOC iOS app. 

The following API endpoints should work:

GET /api/days - get all the days

POST /api/day/create              TODO

POST /api/days/#/events/create    TODO


GET / - returns the static site

GET /api/images - gets the list of all available images

POST /api/images - uploads an image

POST /api/images/[image]/approve - approves an image.

POST /api/images/[image]/reject - rejects an image
