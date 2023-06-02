# APP

## RFs (Functional Requirements)
   - [X] It must be possible to register;
   - [X] It must be possible to authenticate;
   - [X] It must be possible to obtain the profile of a logged-in user;
   - [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
   - [ ] It must be possible to obtain your check-in history;
   - [ ] It must be possible for the user to search for nearby gyms;
   - [ ] It must be possible for the user to search for gyms by name;
   - [X] It must be possible to check in at a gym;
   - [ ] It must be possible to validate a user's check-in;
   - [X] It must be possible to register a gym;
   
## RNs (Business Rules)
  - [X] The user must not be able to register with a duplicate email;
  - [X] The user cannot make 2 check-ins on the same day;
  - [X] The user cannot check-in if he is not close (100m) to the gym;
  - [ ] The check-in can only be validated up to 20 minutes after being created;
  - [ ] Check-in can only be validated by administrators;
  - [ ] An Gym can only be registered by administrators;

## NFRs (Non-Functional Requirements)
  - [X] The user's password must be encrypted;
  - [X] Application data must be persisted in a PostgreSQL database;
  - [ ] All data lists must be paginated with 20 items per page;
  - [ ] The user must be identified by a JWT (JSON Web Token);