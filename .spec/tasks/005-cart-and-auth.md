# Task 005: Shopping Cart, Login & Signup Pages

## Status
Completed

## Priority
High

## Description
Implement the Shopping Cart page with full cart state management using React Context API. Build the Login and Signup authentication pages with form validation and polished UI. Also build the About page. All pages must follow the project's design system and be fully responsive.

## Acceptance Criteria

### Shopping Cart
- [x] `lib/cartContext.tsx` implements a CartProvider with React Context API
  - State: cart items array, functions to add/remove/update quantity/clear cart
  - Cart state persisted in localStorage
- [x] CartProvider wraps the app in `app/layout.tsx`
- [x] `app/cart/page.tsx` renders the shopping cart with:
  - List of cart items with image, name, price, quantity controls (+/−), and remove button
  - Order summary sidebar: subtotal, shipping, tax, and total
  - "Proceed to Checkout" CTA button
  - Empty cart state with a "Continue Shopping" link
- [x] `components/CartItem.tsx` renders a single cart item row
- [x] Cart icon in Navbar shows item count badge

### Authentication Pages
- [x] `app/login/page.tsx` renders a login form with:
  - Email and password fields
  - "Remember me" checkbox
  - "Login" submit button
  - Link to Signup page ("Don't have an account? Sign up")
  - Form validation (required fields, email format)
  - Styled error messages
- [x] `app/signup/page.tsx` renders a signup form with:
  - Full name, email, password, and confirm password fields
  - "Create Account" submit button
  - Link to Login page ("Already have an account? Log in")
  - Form validation (required fields, email format, password match, min length)
  - Styled error messages
- [x] Both pages use a centered card layout with the brand logo

### About Page
- [x] `app/about/page.tsx` renders project/store information, team info, and mission statement

### General
- [x] All pages are fully responsive
- [x] Consistent design language with the rest of the site
- [x] No TypeScript errors

## Time Estimation
4 hours

