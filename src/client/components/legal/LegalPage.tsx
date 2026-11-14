import { Link } from "@tanstack/react-router";

export const LEGAL_LAST_UPDATED = "November 13, 2026";
export const LEGAL_CONTACT_EMAIL = "ufsase.webmaster@gmail.com";

const linkClass = "font-medium text-saseBlue underline underline-offset-2 hover:text-saseGreen";

interface LegalPageProps {
  title: string;
  other: { label: string; to: "/privacy" | "/terms" };
  children: React.ReactNode;
}

export const LegalPage = ({ children, other, title }: LegalPageProps) => (
  <div className="flex w-full justify-center px-6 py-12 md:px-8">
    <article className="flex w-full max-w-3xl flex-col gap-10 font-redhat text-foreground">
      <header className="flex flex-col gap-3">
        <h1 className="font-oswald text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated: {LEGAL_LAST_UPDATED}</p>
        <p className="text-sm text-muted-foreground">
          Applies to the UF SASE app. See also the{" "}
          <Link to={other.to} className={linkClass}>
            {other.label}
          </Link>
          .
        </p>
      </header>
      {children}
    </article>
  </div>
);

export const LegalSection = ({ children, heading }: { heading: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-4">
    <h2 className="font-oswald text-2xl font-medium">{heading}</h2>
    {children}
  </section>
);

export const LegalText = ({ children }: { children: React.ReactNode }) => <p className="text-base leading-7">{children}</p>;

export const LegalList = ({ items }: { items: Array<React.ReactNode> }) => (
  <ul className="flex list-disc flex-col gap-2 pl-6 text-base leading-7">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

export const LegalEmail = () => (
  <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className={linkClass}>
    {LEGAL_CONTACT_EMAIL}
  </a>
);

export const LegalContact = () => (
  <>
    <LegalText>Society of Asian Scientists and Engineers at the University of Florida, Gainesville, FL</LegalText>
    <LegalText>
      Email: <LegalEmail />
    </LegalText>
  </>
);

export const LegalLink = ({ children, to }: { to: "/privacy" | "/terms"; children: React.ReactNode }) => (
  <Link to={to} className={linkClass}>
    {children}
  </Link>
);
