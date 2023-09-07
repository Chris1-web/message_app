export default function Form({ formClass, children, submitForm }) {
  return (
    <form className={formClass} onSubmit={submitForm}>
      {children}
    </form>
  );
}
