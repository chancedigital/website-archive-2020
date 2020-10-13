declare module 'gatsby-plugin-transition-link' {
  // TODO: Add real type declarations. We're just stopping errors for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface TransitionLinkProps<P, S> {
    [key: string]: any;
  }

  export class TransitionLink<
    P extends TransitionLinkProps<P, S>,
    S = any
  > extends React.Component<TransitionLinkProps<P, S>> {}

  export class TransitionState<
    P extends TransitionLinkProps<P, S>,
    S = any
  > extends React.Component<TransitionLinkProps<P, S>> {}
}
