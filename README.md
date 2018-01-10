# Overwatchdb

The goal of this app is to provide the average Overwatch player with information and functionallity that allows him to improve in the game and increase his skill rating.

## Backend REST services

The app uses two main backend APIs:
  - Kinvey - for user information and user and admin generated content;
  - OWAPI API - for statistics data, mainly for the My Stats section - https://github.com/SunDwarf/OWAPI/blob/master/api.md;

## Styling and HTML

The used CSS and HTML is mainly from the official owerwatch site and forums:
  - https://playoverwatch.com/en-us/
  - https://eu.battle.net/forums/en/overwatch/

  
## Framework

The app is developed with Angular 2.0 - https://angular.io/


## Functionallity

Unregistered users can:
  
  - Visit the homepage at `/home`;
  - Access the community panel with links to the forum/official blizzard forum/Overwatch subreddit;
  - View the hero list at `/heroes`;
  - View hero details by selecting it from the list and going to `/hero/details/:heroId`;
  - Register themselves at 
  
Registered users can:

  - Do everything unregistered users can;
  - Login from `/login`;
  - Visit My Profile page and edit their details at `/myprofile`;
  - Visit My Replays page and create, edit and delete replays at `/myreplays`, `/replay/edit/:id` and `replay/delete/:id`;
  - Visit My Stats page and inspect ther performance stats from competitive play at `/mystats`;
  
Admin users can:

  - Do everything registered users can;
  - Create, edit and delete heroes from the hero list at `/hero/add`,`/hero/edit/:id`,`/hero/delete/:id`;
  - Edit and delete user profiles at `/user/edit/:id` and `/user/delete/:id`;
  
