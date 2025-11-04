export default function Logo() {
  return (
    <picture title="Weather now logo">
      <source srcSet="/logo.svg" media="(min-width: 768px)" />
      <img src="/logo-small.svg" alt="Weather Now" />
    </picture>
  );
}
