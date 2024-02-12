export default function Checkbox({ className, children, ...rest }) {
  return (
    <label className={className}>
      <input type="checkbox" {...rest} />
      {children}
    </label>
  );
}
