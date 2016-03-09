# Readme.md

## Stackstore project "Feedme" (Ksenia, Dorothy, Terry)

### Deployed at:
http://agile-fjord-44617.herokuapp.com/
_You may run node seed.js to seed the database_

## What is working: 

### Unauthenticated user actions
* View products (catalog)
* Refine listing by category
* View a product's details
* Product information
* Photo(s)
* View reviews left by authenticated users
* Manage their cart
* Add an item to the cart from product listing or product detail pages
* Remove an item from the cart
* Edit/update quantities of items in the cart
* Refresh the page without being logged in and have the cart persist

### Account Management
* Create an account

### Authenticated user actions
* Checkout
* Logout
* View past order list
* View order detail
* Current order status
* Leave a review (with text and a 5-star rating) for a product

## Remaining to be fixed: 

### Unauthenticated user actions

* Search product listing
* Log in and continue editing the cart

* Create and edit products with name, description, price and one or more photos

### Authenticated user actions 
* Login with Google
* Purchase items from cart
* Specify shipping address and email address
* Receive confirmation email
* Receive notification emails upon order shipping, then order delivery

Past orders:
* Items with quantity and subtotal
* Link to the original product detail page
* Date/time order was created
* Product reviews


### Admin user actions
* Manage products

* Create categories for items, each item can have multiple categories
* Manage the availability of a product. 
* Add/remove categories from items
* Manage orders
* View a list of all orders
* Filter orders by status (Created, Processing, Cancelled, Completed)
* Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
* View details of a specific order
* Manage users
* Promote other user accounts to have admin status
* Delete a user
* Trigger password reset for a user 

