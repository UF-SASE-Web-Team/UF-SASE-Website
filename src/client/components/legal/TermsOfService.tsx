import { LegalContact, LegalEmail, LegalLink, LegalList, LegalPage, LegalSection, LegalText } from "./LegalPage";

const TermsOfService = () => (
  <LegalPage title="Terms of Service" other={{ label: "Privacy Policy", to: "/privacy" }}>
    <LegalSection heading="1. Agreeing to these terms">
      <LegalText>
        By creating an account or using the UF SASE app (the "App"), you agree to these Terms and to our{" "}
        <LegalLink to="/privacy">Privacy Policy</LegalLink>. If you do not agree, do not use the App. If you are a University of Florida student, you
        also remain bound by the Student Honor Code and Student Conduct Code (UF Regulation 4.040), and everyone remains bound by applicable law.
      </LegalText>
    </LegalSection>

    <LegalSection heading="2. Who runs the App">
      <LegalText>
        The App is run by the Society of Asian Scientists and Engineers at the University of Florida ("UF SASE", "we", "us"), a registered student
        organization. It is not an official University of Florida product, and it is not operated or endorsed by SASE National. UF SASE officers and
        volunteers maintain it without charge to members. Nothing in the App speaks for the University of Florida.
      </LegalText>
    </LegalSection>

    <LegalSection heading="3. What the App is for">
      <LegalText>
        The App helps members find chapter events, RSVP, check in, earn points, and view other members' profiles. It is a free, non-commercial service
        for chapter operations.
      </LegalText>
    </LegalSection>

    <LegalSection heading="4. Eligibility and accounts">
      <LegalList
        items={[
          "You must be at least 13 years old. If you are under 18, a parent or guardian must agree to these Terms for you. The App is intended for college students, alumni, and professionals.",
          "Give accurate information when you sign up, and keep your login details to yourself. You are responsible for activity on your account.",
          "UF SASE alone decides chapter membership status, officer eligibility, and access to member-only features.",
          <>You can delete your account at any time from Profile &gt; Settings &gt; Delete Account.</>,
        ]}
      />
    </LegalSection>

    <LegalSection heading="5. Events">
      <LegalText>
        Event details can change or be cancelled without notice. Some events are run by partners or other organizations. We are not responsible for
        what happens at events, for the conduct of attendees, or for errors in listings.
      </LegalText>
    </LegalSection>

    <LegalSection heading="6. Conduct">
      <LegalText>When using the App, you agree not to:</LegalText>
      <LegalList
        items={[
          "Harass, haze, threaten, or discriminate against anyone",
          "Pretend to be another person or misstate your affiliation",
          "Check in to events you did not attend, check in for someone else, or otherwise game points",
          "Post content that is unlawful, sexually explicit, hateful, or that infringes someone else's rights",
          "Attempt to access other members' data, probe or disrupt the App, or reverse engineer it",
          "Scrape or bulk-collect member information",
        ]}
      />
    </LegalSection>

    <LegalSection heading="7. Your content">
      <LegalText>
        Your username, bio, and social handles are visible to other signed-in members. You own what you post and are responsible for it. You give UF
        SASE a non-exclusive, royalty-free permission to store and display it inside the App for as long as it stays posted. Deleting the content or
        your account ends that permission.
      </LegalText>
      <LegalText>
        We do not tolerate objectionable content or abusive users. You can report or block a member from their profile in the App, or email{" "}
        <LegalEmail />. Blocking hides that member's profile from you. We review reports within 24 hours, remove content that breaks these Terms, and
        suspend or remove the accounts responsible.
      </LegalText>
    </LegalSection>

    <LegalSection heading="8. Enforcement">
      <LegalText>
        If you break these Terms, we may remove content, adjust points, limit features, or suspend or close your account. Where conduct may also break
        University of Florida regulations, we may refer it to the University; that process is separate from ours.
      </LegalText>
    </LegalSection>

    <LegalSection heading="9. Points and recognition">
      <LegalText>
        Points, rankings, and awards exist for member engagement only. They have no cash value, cannot be transferred or sold, and may be changed,
        reset, or ended at any time.
      </LegalText>
    </LegalSection>

    <LegalSection heading="10. Ownership">
      <LegalText>
        The App's design and code belong to UF SASE or its licensors. The SASE name and marks belong to SASE National. University of Florida names and
        marks belong to the University and are not licensed to you through the App. You may use the App for personal, non-commercial purposes only.
      </LegalText>
    </LegalSection>

    <LegalSection heading="11. Third-party services">
      <LegalText>
        The App links to or relies on services we do not control, such as external event pages and the social profiles members list. Their own terms
        and privacy policies apply to your use of them.
      </LegalText>
    </LegalSection>

    <LegalSection heading="12. No warranty">
      <LegalText>
        The App is provided "as is" and "as available". We make no promises that it will be uninterrupted, error-free, or that event information will
        always be accurate.
      </LegalText>
    </LegalSection>

    <LegalSection heading="13. Limit of liability">
      <LegalText>
        To the fullest extent the law allows, UF SASE and its officers, members, and volunteers are not liable for indirect, incidental, or
        consequential damages arising from your use of the App or attendance at events. Our total liability for any claim relating to the App is
        limited to $100. Nothing in these Terms limits liability that cannot be limited by law.
      </LegalText>
    </LegalSection>

    <LegalSection heading="14. Indemnity">
      <LegalText>
        You agree to cover losses and costs UF SASE incurs because of your misuse of the App or your breach of these Terms or the law.
      </LegalText>
    </LegalSection>

    <LegalSection heading="15. Non-discrimination">
      <LegalText>
        In line with the University of Florida Non-Discrimination Policy (UF Regulation 1.006), UF SASE does not discriminate on the basis of race,
        creed, color, religion, age, disability, sex, sexual orientation, gender identity and expression, marital status, national origin, political
        opinions or affiliations, genetic information, or veteran status.
      </LegalText>
    </LegalSection>

    <LegalSection heading="16. Changes">
      <LegalText>
        We may update the App or these Terms. We will post the new Terms with a new "Last updated" date and, for significant changes, notify you in
        the App. Using the App after a change means you accept it.
      </LegalText>
    </LegalSection>

    <LegalSection heading="17. Governing law">
      <LegalText>
        These Terms are governed by the laws of the State of Florida. If you have a dispute with us, email us first so we can try to resolve it. Any
        dispute that goes to court will be heard in the state or federal courts in Alachua County, Florida.
      </LegalText>
    </LegalSection>

    <LegalSection heading="18. App store terms">
      <LegalText>
        If you downloaded the App from the Apple App Store: these Terms are between you and UF SASE, not Apple. Apple is not responsible for the App,
        its content, its maintenance or support, or any claims relating to it. Apple and its subsidiaries are third-party beneficiaries of these Terms
        and may enforce them. Your use must also comply with the App Store Terms of Service. If you downloaded the App from Google Play, Google has no
        obligations under these Terms.
      </LegalText>
    </LegalSection>

    <LegalSection heading="19. General">
      <LegalText>
        These Terms and the Privacy Policy are the whole agreement between you and UF SASE about the App. If a court finds part of these Terms
        unenforceable, the rest stays in effect. If we do not enforce a term, we have not given up the right to enforce it later. Sections 7, 10, 12,
        13, 14, and 17 continue to apply after your account is closed.
      </LegalText>
    </LegalSection>

    <LegalSection heading="20. Contact">
      <LegalContact />
    </LegalSection>
  </LegalPage>
);

export default TermsOfService;
