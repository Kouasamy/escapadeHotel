# TODO: Fix Suite Images Display on Reservation Pages

## Current Issue
Suite images created in the Filament dashboard are not displaying on reservation pages because they are static HTML files with hardcoded suite information.

## Plan
1. Create a ReservationController method for showing reservation step 2 dynamically
2. Create a Blade view (resources/views/reservations/step2.blade.php) that displays suites from database
3. Update routes/web.php to use the dynamic controller for reservation pages
4. Ensure proper image URL generation for uploaded images
5. Update both public/reservation1.html and escapade-front-end/reservation1.html to use dynamic loading

## Steps
- [ ] Add step2 method to ReservationController
- [ ] Create resources/views/reservations/step2.blade.php view
- [ ] Update routes/web.php to use dynamic controller
- [ ] Update public/reservation1.html to use dynamic loading
- [ ] Update escapade-front-end/reservation1.html to use dynamic loading
- [ ] Test that dashboard-uploaded suite images display on reservation pages
- [ ] Verify reservation flow still works
- [ ] Check image URLs are properly generated
