import { LegalContact, LegalList, LegalPage, LegalSection, LegalText } from "./LegalPage";

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" other={{ label: "Terms of Service", to: "/terms" }}>
    <LegalSection heading="1. Who we are">
      <LegalText>
        The UF SASE app (the "App") is run by the Society of Asian Scientists and Engineers at the University of Florida ("UF SASE", "we", "us"). UF
        SASE is a registered student organization. The App is not an official product of the University of Florida and is not operated by SASE
        National.
      </LegalText>
      <LegalText>This policy explains what information the App collects, why, who receives it, and how you can have it deleted.</LegalText>
    </LegalSection>

    <LegalSection heading="2. Information we collect">
      <LegalText>
        <strong>Account and profile information you give us</strong>
      </LegalText>
      <LegalList
        items={[
          "Name, email address, and username",
          "Major, minor, and graduation date",
          "Bio",
          "Discord handle, Instagram handle, and LinkedIn URL",
          "The preset avatar you choose",
        ]}
      />
      <LegalText>You sign in with your email and a password. Our sign-in provider stores the password in hashed form; we cannot read it.</LegalText>
      <LegalText>
        <strong>Event and participation information</strong>
      </LegalText>
      <LegalList items={["Events you check in to, with the date and time of each check-in", "RSVPs", "Points earned and your points history"]} />
      <LegalText>
        <strong>Reports and blocks</strong>
      </LegalText>
      <LegalList items={["Reports you submit about other members, with the reason and any details you add", "The members you block"]} />
      <LegalText>
        <strong>Diagnostics</strong>
      </LegalText>
      <LegalList
        items={[
          "If you have chosen to share analytics with app developers in your device settings, Apple sends us crash reports. These do not identify you, and the App itself contains no crash reporting or analytics tool.",
        ]}
      />
      <LegalText>
        <strong>Device permissions</strong>
      </LegalText>
      <LegalList items={["Camera, used only to scan event check-in QR codes"]} />
      <LegalText>We do not collect location, contacts, photos, or advertising identifiers, and the App does not send push notifications.</LegalText>
    </LegalSection>

    <LegalSection heading="3. How we use information">
      <LegalText>We use the information above to:</LegalText>
      <LegalList
        items={[
          "Create and secure your account",
          "Show your profile to other signed-in members",
          "Show events and record RSVPs and attendance",
          "Award points and run member recognition",
          "Keep chapter attendance records",
          "Fix bugs and keep the App reliable",
          "Respond to reports and enforce our Terms of Service",
        ]}
      />
      <LegalText>We do not use your information for advertising, and we do not track you across other companies' apps or websites.</LegalText>
    </LegalSection>

    <LegalSection heading="4. Who we share information with">
      <LegalText>We do not sell your personal information.</LegalText>
      <LegalText>We share it only with:</LegalText>
      <LegalList
        items={[
          <>
            <strong>Service providers that run the App for us:</strong> Supabase, for sign-in and the database. It handles data only to provide its
            service to us and is expected to protect it at a level at least equal to this policy. We build the App with Expo, which does not receive
            your personal information.
          </>,
          <>
            <strong>Other members:</strong> any signed-in member can see your name, username, avatar, major, minor, graduation date, bio, and social
            handles. Your email address is not shown to other members.
          </>,
          <>
            <strong>UF SASE officers and authorized app administrators,</strong> who can see member and attendance records, plus reports that members
            submit, to run the chapter.
          </>,
          <>
            <strong>The University of Florida or SASE National,</strong> only as attendance or membership totals, or where chapter reporting rules
            require member records.
          </>,
          <>
            <strong>Authorities,</strong> where the law requires it.
          </>,
        ]}
      />
    </LegalSection>

    <LegalSection heading="5. How long we keep information">
      <LegalText>We keep your account, profile, RSVP, and attendance information until you delete your account.</LegalText>
      <LegalText>
        Deleting your account from Profile &gt; Settings &gt; Delete Account removes your account and profile immediately. Past check-ins are kept
        with no link to you, for attendance counts only. Reports you submitted are kept without your name so officers can still act on them; reports
        about you and your block list are deleted. We also keep totals that cannot identify you, such as event headcounts and overall points
        statistics. Any remaining personal information is removed within 30 days, and copies in backups and logs may last up to 90 days before they
        are overwritten.
      </LegalText>
    </LegalSection>

    <LegalSection heading="6. Your choices">
      <LegalList
        items={[
          <>
            <strong>View and correct:</strong> edit your profile in the App at any time.
          </>,
          <>
            <strong>Delete your account:</strong> go to Profile &gt; Settings &gt; Delete Account in the App. If you cannot access the App, email us
            at the address in section 10 and we will delete it for you.
          </>,
          <>
            <strong>Withdraw consent:</strong> turn off camera access in your device settings. The App keeps working, apart from QR check-in.
          </>,
          <>
            <strong>Ask a question or request a copy of your data:</strong> email us at the address in section 10.
          </>,
        ]}
      />
    </LegalSection>

    <LegalSection heading="7. Security">
      <LegalText>
        Data is encrypted in transit. Access to member records is limited to officers and administrators who need it, and access is removed when their
        term ends. No system is perfectly secure; if a breach affects your information, we will notify you as the law requires.
      </LegalText>
    </LegalSection>

    <LegalSection heading="8. Children">
      <LegalText>
        The App is meant for college students, alumni, and professionals. It is not directed to children under 13, and we do not knowingly collect
        their information. If you believe a child has given us information, contact us and we will delete it.
      </LegalText>
    </LegalSection>

    <LegalSection heading="9. Changes to this policy">
      <LegalText>
        If we change this policy, we will post the new version here with a new "Last updated" date. For significant changes, we will also notify you
        in the App.
      </LegalText>
    </LegalSection>

    <LegalSection heading="10. Contact">
      <LegalContact />
    </LegalSection>
  </LegalPage>
);

export default PrivacyPolicy;
