declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'redux-persist/integration/react' {
  import * as React from 'react';
  import { Persistor } from 'redux-persist';

  interface PersistGateProps {
    loading?: React.ReactNode | null;
    persistor: Persistor;
    children?: React.ReactNode;
  }

  export class PersistGate extends React.Component<PersistGateProps> {}
}
