# flower-delivery-app

Frontend To-Do

Base

- Set up project with HTML/CSS/TypeScript (React or plain TS is fine). +
- Create Flower Shops Page: +
- Fetch list of shops and flowers from backend. +
- Display flowers with option to add to cart. +
- Create Shopping Cart Page: +
- Show added products with quantity & price. +
- Allow removing items and updating quantity.
- Add form inputs: email, phone, address. +
- "Submit" button sends order to backend. +

Middle

- Add sorting on Flower Shops page (by price/date).
- Add favorites feature:
- Mark/unmark bouquets.
- Show favorites first when sorting. +
- Persist cart in localStorage.
- On order creation, send date & time in user's timezone. // not needed, since
  backend saves time in UTC
- Create Order Details Page:
- Show order id, products, total price, address, datetime (converted to user's
  timezone).

Advanced

- Add pagination for flowers on shop page. +
- On Shopping Cart page, integrate Google Maps:
- User can set delivery address with pin or text.
- Show shop location.
- (extra) Show route + estimated delivery time.
- (extra) Add captcha before submitting order.

Optional / Bonus

- Orders History Page (search by email/phone/order id). +
- Coupons Page (apply discounts on cart). -+ // no applying discount yet
