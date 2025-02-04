# RecycleHub

## Overview
RecycleHub is a Single Page Application (SPA) that connects individuals with certified waste collectors to manage recycling operations. Built with Angular, this platform facilitates waste collection requests, tracking, and rewards users through a points-based system.

## Features

### User Management
- User registration and authentication system
- Profile management for both collectors and individuals
- Profile editing and account deletion capabilities

### Collection Request System
- Create collection requests with waste type specification
- Support for multiple waste types per request
- Optional photo upload functionality
- Weight specification (minimum 1000g required)
- Date and time slot selection
- Maximum of 3 simultaneous pending requests
- Total collection limit of 10kg per request

### Collection Process
- Request status tracking (Pending, Occupied, In Progress, Validated, Rejected)
- City-based collector assignment
- On-site validation system
- Photo documentation capability

### Rewards System
Points attribution per kilogram:
- Plastic: 2 points
- Glass: 1 point
- Paper: 1 point
- Metal: 5 points

Points can be converted to purchase vouchers:
- 100 points = 50 Dh voucher
- 200 points = 120 Dh voucher
- 500 points = 350 Dh voucher

## Technical Stack

### Core Technologies
- Angular 17+
- NgRx for state management
- RxJS/Observables
- Bootstrap/Tailwind CSS

### Key Technical Features
- Dependency Injection
- Reactive Forms/Template Driven Forms
- Route Guards and Resolvers
- Custom Pipes
- Parent/Child Component Communication
- Local Storage for data persistence
- Form Validation with error messaging
- Responsive Design
