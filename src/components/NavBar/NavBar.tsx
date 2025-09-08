import { NavLink } from 'react-router';

export const NavBar = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cart">Shopping cart</NavLink>
      <NavLink to="/order/history">Order history</NavLink>
      <NavLink to="/coupons">Coupons</NavLink>
    </>
  );
};
