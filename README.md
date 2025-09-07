# flower-delivery-app

Frontend To-Do

Base

- Set up project with HTML/CSS/TypeScript (React or plain TS is fine).
- Create Flower Shops Page:
- Fetch list of shops and flowers from backend.
- Display flowers with option to add to cart.
- Create Shopping Cart Page:
- Show added products with quantity & price.
- Allow removing items and updating quantity.
- Add form inputs: email, phone, address.
- "Submit" button sends order to backend.

Middle

- Add sorting on Flower Shops page (by price/date).
- Add favorites feature:
- Mark/unmark bouquets.
- Show favorites first when sorting.
- Persist cart in localStorage.
- On order creation, send date & time in user's timezone.
- Create Order Details Page:
- Show order id, products, total price, address, datetime (converted to user's
  timezone).

Advanced

- Add pagination for flowers on shop page.
- On Shopping Cart page, integrate Google Maps:
- User can set delivery address with pin or text.
- Show shop location.
- (extra) Show route + estimated delivery time.
- (extra) Add captcha before submitting order.

Optional / Bonus

- Orders History Page (search by email/phone/order id).
- Coupons Page (apply discounts on cart).

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install
[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and
[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
