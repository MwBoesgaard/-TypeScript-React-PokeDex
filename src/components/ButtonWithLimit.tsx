import Button from '@mui/material/Button';

export function ButtonWithLimit({ children, ...props }) {
  const atLimit: Boolean = props.current === props.limit;

  if (atLimit) {
    return (
      <Button disabled {...props}>
        {children}
      </Button>
    );
  }
  return <Button {...props}>{children}</Button>;
}
export default ButtonWithLimit;
