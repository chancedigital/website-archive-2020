// Use to extend JSX Element props by passing a string reference to the tag
// e.g.: interface MyButtonProps extends Element<'button'>
export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

// Use to map types to another interface where all keys are optional
// https://stackoverflow.com/a/40076355
export type Partial<T> = {
  [P in keyof T]?: T[P];
};
