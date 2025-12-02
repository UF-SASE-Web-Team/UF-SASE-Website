export const FreshmanFAQList: Array<{ category: string; heading: string; questions: Array<{ question: string; answer: string | React.ReactNode }> }> =
  [
    {
      category: "Academic",
      heading:
        "Your first 2 years of college can be somewhat of an adjustment academically. Use this time to build essential skills, form effective study habits, and build a solid foundation for your upper-level classes. By having a good understanding of your degree/college requirements, you will be better able to plan the rest of your college career.",
      questions: [
        {
          question: "1.1 - How do I find my academic advisor?",
          answer: (
            <>
              Advisors can vary depending on your college/major. It’s recommended you meet with your advisor once a semester. This is required if you
              are in the College of Engineering. You can discuss your 4-year plan, how to possibly change your major, how drop/add works, or how to
              apply to take transient classes.
              <br /> <br />
              Find advising contacts:
              <ul className="list-disc pl-5">
                <li>
                  For your{" "}
                  <a href="https://www.ufadvising.ufl.edu/college-advising-contacts/" className="text-saseGreen underline">
                    specific college
                  </a>
                </li>
                <li>
                  For{" "}
                  <a href="https://www.ufadvising.ufl.edu/college-advising-contacts/" className="text-saseGreen underline">
                    Pre-Health
                  </a>
                </li>
                <li>
                  For{" "}
                  <a href="https://cals.ufl.edu/current-students/undergraduate/" className="text-saseGreen underline">
                    CALS
                  </a>{" "}
                  (College of Agriculture and Life Sciences)
                </li>
                <li>
                  For{" "}
                  <a href="https://www.advising.ufl.edu/advising/who-is-my-advisor/" className="text-saseGreen underline">
                    CLAS
                  </a>{" "}
                  (College of Liberal Arts and Sciences)
                </li>
                <li>
                  For{" "}
                  <a href="https://www.eng.ufl.edu/students/advising/who-is-my-advisor/" className="text-saseGreen underline">
                    College of Engineering
                  </a>
                  <ul className="list-disc pl-5">
                    <li>Note: Freshmen do have a specific first-year advisor based on your last name</li>
                    <li>
                      You will also have a Canvas course which includes specific assignments (I.e. Resume, goals, 4-year plan, etc.) you should
                      complete before your advising appointment every semester{" "}
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              Also, don’t forget to consult SASE members using #study-chat. In general, upperclassmen are great for advice since they have gone
              through your program themselves!
            </>
          ),
        },
        {
          question: "1.2 - How do I decide which classes I need to take?",
          answer: (
            <>
              As a baseline, you can start off by making your schedule similar to the model semester plan listed for your major (I.e. the Industrial
              Engineering one looks like{" "}
              <a href="https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/ISE_BSIS/#modelsemesterplantext" className="text-saseGreen underline">
                this
              </a>
              ).
              <br /> <br />
              ONE.UF is also useful to see your requirements.
              <ul className="list-disc pl-5">
                <li>To see your major’s requirements listed in categories:</li>
                <ul className="list-disc pl-5">
                  <li>Academics &gt; Degree Audit</li>
                </ul>
                <li>You can see which classes your AP/IB/AICE credit has covered:</li>
                <ul className="list-disc pl-5">
                  <li>Transcripts &gt; Transfer Credit Report</li>
                </ul>
                <li>To explore the requirements of another major or see the requirements of a double major:</li>
                <ul className="list-disc pl-5">
                  <li>Academics &gt; Degree Shopping</li>
                </ul>
              </ul>
              <br />
              Your college will offer different electives (technical, interdisciplinary, etc). These are usually listed on your respective college’s
              page. Also, if you have time, try to take classes outside of your major to gain perspective and develop interdisciplinary skills. Or
              just take a class for fun if you have the space for it.
              <br /> <br />
              If you're still confused about your requirements, you're not alone! You can reach out to both upperclassmen and your advisor.
            </>
          ),
        },
        {
          question: "1.3 - How do I fill out my 4-year plan?",
          answer: (
            <>
              Now that you have a basic understanding of your requirements from 1.2, you can start filling out your 4-year plan. Your 4-year plan is a
              document that lists out 8 semesters and the specific classes/credits you plan to take each semester. Don’t forget to keep track of
              required prereqs. Upperclassmen/mentors can help a lot, especially with professor recommendations and maintaining a balanced schedule.
              <br /> <br />
              Note that it is normal if your 4-year plan deviates a little from the model semester plan or changes a lot as you progress.
              <br /> <br />
              Here are some templates you can use:
              <ul className="list-disc pl-5">
                <li>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1O2eng0m9MGHD-fDHwCFaK5gZUZGy0CUb/edit#gid=1895010424"
                    className="text-saseGreen underline"
                  >
                    Engineering Academic Planner
                  </a>{" "}
                  (Can be sued by other majors as well)
                </li>
                <li>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1FzavR3c4GmiwVGL4BcYpwR0r1wa7_NWkHNZLouCm9fg/edit#gid=592550897"
                    className="text-saseGreen underline"
                  >
                    Less congested general
                  </a>{" "}
                  4-year planner
                </li>
                <li>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1aHeObHxpVZzfjTR-6ygXvFS2Z--1RU_OSXR3jHtIXUY/template/preview"
                    className="text-saseGreen underline"
                  >
                    Simplest and great overall view
                  </a>{" "}
                  4-year planner
                </li>
              </ul>
            </>
          ),
        },
        {
          question: "1.4 - How does registration work?",
          answer: (
            <>
              A few weeks out from registration, your registration date will be available on ONE.UF. Usually, upperclassmen get priority and get an
              earlier date.
              <br /> <br />
              On the date and time listed, your registration will open up. Beforehand be prepared with what classes you want to take. Reference your
              major requirements and 4-year plan for this. You can create a mock schedule using{" "}
              <a href="https://www.coursicle.com/ufl/courses/" className="text-saseGreen underline">
                Coursicle
              </a>{" "}
              or{" "}
              <a href="http://www.registr-uf.com/" className="text-saseGreen underline">
                Registr-UF
              </a>{" "}
              to work out the timings of your classes. Also, it's very important to include backups as some classes fill up fast.
              <br /> <br />
              If possible reach out to an upperclassman (or someone who has an earlier date than you) because they are able to access how many seats
              are left for a specific class/section starting from their registration date.
              <br /> <br />
              On the day of, log in at your given time (usually 9 AM or 2 PM) and select your classes relatively quickly. If you don’t get a class you
              need, don’t stress out yet. More seats may open later on (so keep checking). Also, schedules change a lot during add/drop week, so
              getting a seat then is another possibility. Sometimes, it doesn’t hurt to email an advisor/professor.
            </>
          ),
        },
        {
          question: "1.5 - What resources do I have for my classes?",
          answer: (
            <>
              Actually, go to Office Hours! Going to your professor/TA’s office hours can save you a lot of time on your assignments. Also, professors
              sometimes share unique information about the class/exam during office hours. It’s a great chance to get to know your professor which is
              helpful for rec letters or other professional development opportunities.
              <br /> <br />
              In addition, there is{" "}
              <a href="https://academicresources.clas.ufl.edu/tutoring/" className="text-saseGreen underline">
                free tutoring offered by CLAS
              </a>{" "}
              for Chemistry 1/2, Physics 1/2, and various math classes (pre-calc to Calc 3). You can schedule an appointment or drop in to ask a
              question during the specified time.
              <br /> <br />
              You can use the #study-chat or reach out to people using the{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1ghaMRvGG6REIy-O5AMCLGbVD2blTlxPOUayYd4kddIA/edit#gid=1369741976"
                className="text-saseGreen underline"
              >
                Class Connector
              </a>{" "}
              (Fall 2023) as well.
            </>
          ),
        },
        {
          question: "1.6 - Where is free printing on campus?",
          answer: <>You can print up to 250 pages for free at the Reitz Student Union (on the lowest floor). Also, Newell Hall has free printing.</>,
        },
        {
          question: "1.7 - Where can I find xxx equipment for free?",
          answer: (
            <>
              Marston (sometimes LibWest) has a bunch of equipment/hardware you can rent for free. This is especially handy if you forgot your
              calculator for your macro exam (totally didn’t happen to me).
              <br /> <br />
              All sorts of things like tripods, GoPros, MacBook chargers, binoculars, Arduinos, Raspberry Pis, a Computer Mouse, DAD, drawing tablets,
              drill sets, extension cords, HDMI cables, headphones, laser presenters, projectors, sewing machines can be rented out.
              <br /> <br />
              Note these items can be rented anywhere from 3 hours to 7 days depending on the item.
              <br /> <br />
              Here’s the{" "}
              <a href="https://uflib.ufl.edu/find/tech-tools/" className="text-saseGreen underline">
                link
              </a>
              .
            </>
          ),
        },
        {
          question: "1.8 - Do I need to actually buy textbooks?",
          answer: (
            <>
              It depends. Talk to people who have taken the class before to get more information.
              <br /> <br />
              Sometimes your assignments are embedded within the online textbooks, so in that case yes. Also, some textbooks can be found online.
              Sometimes, finding used textbooks on eBay or FB marketplace can be a cheap alternative too.
            </>
          ),
        },
        {
          question: "1.9 - Where can I find access to free/cheaper software?",
          answer: (
            <>
              UF provides Office 365 and some OneDrive storage for free. Other software is discounted. For example, Adobe Creative Cloud is $65 for 6
              months, and Grammarly Premium is $35.
              <br /> <br />
              Check it out{" "}
              <a href="https://software.ufl.edu/" className="text-saseGreen underline">
                here
              </a>
              .
            </>
          ),
        },
        {
          question: "1.10 - What should I do if I’m considering changing my major?",
          answer: (
            <>
              This is completely normal and happens to a lot of people. Talk to your advisor since they need to approve the switch. Also, try to talk
              to as many people as possible in both your current and exploratory major.
              <br /> <br />
              Check out this{" "}
              <a href="https://career.ufl.edu/gain-experience/student-outcomes/" className="text-saseGreen underline">
                link
              </a>
              , if you want to see some data based on major and career outcomes (median/average salary, internship percentage, etc.).
            </>
          ),
        },
        {
          question: "1.11 - Where are some good study spots?",
          answer: (
            <>
              It depends on your vibe.
              <br />
              <br />
              <div className="grid grid-cols-2">
                <div>
                  Common spots:
                  <ul className="list-disc pl-5">
                    <li>Marston </li>
                    <li>Lib West </li>
                    <li>Newell Hall </li>
                  </ul>
                </div>
                <div>
                  Underrated spots:
                  <ul className="list-disc pl-5">
                    <li>Fine Arts Library </li>
                    <li>2nd floor of the Hub</li>
                    <li>Health Sciences Library</li>
                    <li>Education Library</li>
                    <li>Picnic tables in front of the lake at the Reitz</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },
        {
          question: "1.12 - How does transient credit work?",
          answer: (
            <>
              Transient credit is a great way to knock out some gen-ed requirements over the summer at your local Community College/ Florida
              university. Classes like Calc 2 or Physics 2 are commonly taken at CCs like Sante Fe/ Broward College, or Florida universities in your
              hometown (i.e. UNF in Jacksonville).
              <br /> <br />
              The transient credit does not count toward your overall UF GPA but does count toward your critical tracking GPA. Bright Futures also
              applies to these classes.
              <br /> <br />
              Get started at this{" "}
              <a href="https://www.floridashines.org/succeed-in-college/take-a-course-at-another-school" className="text-saseGreen underline">
                link
              </a>
              . After filling out the application, inform your advisor for their approval. After a couple more approvals, you will receive a login
              link from the other state college/university to register for classes.
              <br /> <br />
              Note, start this process relatively early in the Spring semester as seats do fill up for popular classes like Physics 2. Don’t forget to
              also send your transcript back to UF once the course is finished. Account for the time needed to send/process transcripts especially
              when taking prerequisite classes.
            </>
          ),
        },
      ],
    },
    {
      category: "Professional",
      heading:
        "Don’t underestimate your abilities as a freshman to take advantage of professional opportunities. It might not seem like it, but a lot of people around you have imposter syndrome! Professional opportunities in college offer real-world experience, networking, and skill development. They bridge academic learning with practical application, enhancing career readiness. Internships, workshops, and job fairs connect students to industries, mentors, and potential employers.",
      questions: [
        {
          question: "2.1 - Can I get an internship as a Freshman?",
          answer: (
            <>
              Yes! Companies value enthusiasm and your willingness to learn. Come out to our How to Get an Internship workshop (September) to learn
              more!
            </>
          ),
        },
        {
          question: "2.2 - Should I attend a career fair and/or professional conferences? How should I prepare?",
          answer: (
            <>
              Yes! Attending conferences early on will only boost your confidence in talking to recruiters about your professional goals. It’s really
              important to do your research prior to the conference. For companies you are interested in, learn about their mission statement, open
              positions, and how they create value in their space.
              <br /> <br />
              You can really impress a company by asking thoughtful questions. Even if a company isn’t looking for freshmen, it’s still a great chance
              to talk about what skills they recommend you focus on or the attributes of a stand-out applicant.
              <br /> <br />
              There are many more conferences than the Fall/Spring Career Fairs. Some others include:
              <ul className="list-disc pl-5">
                <li>UF Diversity Meet-up (Fall & Spring)</li>
                <li>SASE National Convention (October)</li>
                <li>SASE Southeast Regional Conference (Spring)</li>
                <li>UF Society of Women Engineers Evening with Industry</li>
                <li>Grace Hopper Conference</li>
              </ul>
              <br />
              Check out more career events on{" "}
              <a href="https://www.instagram.com/ufcareercenter/" className="text-saseGreen underline">
                @ufcareercenter
              </a>{" "}
              's Instagram page. They host some more specific events like some centered around AI and how to prepare for showcases.
            </>
          ),
        },
        {
          question: "2.3 - Can freshmen do research?",
          answer: (
            <>
              Yes! Freshman can do research across multiple disciplines from computer science to botany.
              <br /> <br />
              From the researcher’s perspective, they don’t have to pay you because you’re an undergrad (although some labs might provide a stipend).
              Also, sometimes they might prefer an underclassman because they train you once early on and you can continue working at the lab for
              longer than an upperclassman.
              <br /> <br />
              The number 1 tip is to be persistent when reaching out to professors. Sometimes, you just get ghosted.
              <br />
              <br />
              Here are some resources to find professors/projects
              <ul className="list-disc pl-5">
                <li>
                  <a href="https://cur.aa.ufl.edu/research-search/" className="text-saseGreen underline">
                    CURBS
                  </a>{" "}
                  (Center for Undergraduate Research Board of Students)
                </li>
                <li>
                  <a href="https://www.eng.ufl.edu/graduate/about-us/undergraduate-research/research-projects/" className="text-saseGreen underline">
                    Reseach Projects
                  </a>{" "}
                  organized by engineering discipline
                </li>
                <li>
                  <a href="https://www.eng.ufl.edu/students/students/international/research-abroad/" className="text-saseGreen underline">
                    Research Abroad
                  </a>
                </li>
                <li>
                  <a href="https://cur.aa.ufl.edu/peer-advising/" className="text-saseGreen underline">
                    CURBS peer advising
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          question: "2.4 - How do I set up my LinkedIn?",
          answer: (
            <>
              Use LinkedIn to start growing your network and reaching out for coffee chats. Check out our{" "}
              <a href="https://drive.google.com/file/d/1XkbIRZqIvvK6jzDUSSJegL-1w1vZeRj2/view?usp=sharing" className="text-saseGreen underline"></a>{" "}
              to learn how to get started on LinkedIn as well as some more helpful tips.
            </>
          ),
        },
        {
          question: "2.5 - How do I update my resume for college?",
          answer: (
            <>
              For your first year, it’s okay to keep stuff from high school. Focus on rewording your experiences in a way that quantifies them and is
              impact-driven. Also, you can start updating your resume with your new involvements in student organizations or design teams.
              <br /> <br />
              Check out our resume template{" "}
              <a href="https://docs.google.com/document/d/1aRuKSidAX1rXyCNmivHesHYHh0MbUcE2/edit" className="text-saseGreen underline">
                here
              </a>
              . Also, stay tuned for a resume + interview workshop in September!
            </>
          ),
        },
        {
          question: "2.6 - How can I get my resume reviewed?",
          answer: (
            <>
              Getting as many eyes as possible on your resume is ideal.
              <br /> <br />
              Early in the fall, board will host Resume Office Hours where you can drop by Nye and have a board member review your resume. You can
              also submit your resume on a Google form. Check out our Instagram (
              <a href="https://www.instagram.com/ufsase" className="text-saseGreen underline">
                @ufsase
              </a>
              ) to find out when these will be hosted. Also, you can post your resume in #resume-roasts to receive feedback from your fellow SASE
              members.
              <br /> <br />
              You can also get your resume reviewed at the{" "}
              <a href="https://career.ufl.edu/services-resources/express-drop-in/" className="text-saseGreen underline">
                Career Connections Center
              </a>{" "}
              in the Reitz.
              <br /> <br />
              UF provides the Quinnica tool for free.
              <br />
              Quinncia is a virtual tool that provides personalized feedback for resumes and mock interviews using artificial intelligence (AI)
              technology
              <ul className="list-disc pl-5">
                <li>
                  Go to{" "}
                  <a href="http://www.quinncia.io" className="text-saseGreen underline">
                    {" "}
                    http://www.quinncia.io
                  </a>
                </li>
                <li>Click the "Sign In/Up" button</li>
                <li>Sign in using your UFL Email and GatorLink login information</li>
              </ul>
            </>
          ),
        },
        {
          question: "2.7 - How do I prepare for interviews?",
          answer: (
            <>
              Positions may have different types of behavior and technical interviews. For behavioral interviews, frame your answers in the STAR
              format.
              <br />
              <ul className="list-disc pl-5">
                <li>Situation ( S ): Describe the event or situation that you were in.</li>
                <li>Task ( T ): Explain the task you had to complete.</li>
                <li>Actions ( A ): Describe the specific actions you took to complete the task.</li>
                <li>Results ( R ): Close with the result of your efforts.</li>
              </ul>
              <br />
              Also, stay tuned for a resume + interview workshop in September!
            </>
          ),
        },
        {
          question: "2.8 - What are coffee chats?",
          answer: (
            <>
              Coffee chats are short networking meetings generally from 15 to 30 minutes long. In these calls, you can receive advice, create new
              professional relationships, and potentially get referrals. People are generally excited to help those just starting their careers, so
              the hardest step is usually taking the initiative to set up the call. LinkedIn is a great place to get started!
            </>
          ),
        },
      ],
    },
    {
      category: "Extracurricular",
      heading:
        "Extracurriculars in college foster personal growth, develop leadership skills and build well-rounded individuals. They enhance social networks, provide practical experiences, and show commitment beyond academics. These activities cultivate character, time management, and diverse perspectives. ",
      questions: [
        {
          question: "3.1 - How can I get more involved in SASE?",
          answer: (
            <>
              SASE offers multiple opportunities to get more involved throughout the year.
              <br /> <br />
              Early in the fall, SASE intern applications will open. Through SASE interns you can gain a behind-the-scenes look into how an org like
              SASE operates by being on a committee to organize your own event. This is a great chance to work with others on a team, build leadership
              skills, and meet other SASE members. Contact our MICs on Discord, @justind1 and @bananna4756, to learn more!
              <br /> <br />
              Joining SASE intramurals is a great way to stay active and connect with new people as well. The sports offered include ultimate frisbee,
              indoor soccer, volleyball, rock league, flag football, and kickball. Contact our Sports Coordinators on Discord, @.brea.d and
              @thebluesummon, to learn more!
              <br /> <br />
              Also, at the start of the fall/spring semester, you can join the mentor-mentee program. Mentors can help guide you academically,
              professionally, and just be a friend. We encourage you to get to know your fellow mentees and mentor by participating in Mentorship Cup
              challenges.
              <br /> <br />
              Put your engineering skills to the test by joining SASE’s design team SET. Last spring, during SET's beta semester, our team created SET
              Bro, a fully functional robot with the ability to converse with SASE members. This year, we are looking to expand SET much more. Don't
              be afraid to apply if you think you lack experience. Contact our Technical Chairs on Discord, @kevintf2 and @mannvika, to learn more!
              <br /> <br />
              You can sign up to help out with the winter/spring banquet committee if you’re looking for a shorter-term commitment. The different
              committees you can apply for include programming, logistics, marketing, and decorations.
              <br /> <br />
              Also, being active in Discord, going to Nye in Marston, and attending SASE events (GBMS, workshops, socials, and service events) are
              always great ways to get involved.
            </>
          ),
        },
        {
          question: "3.2 - How can I get more involved on campus?",
          answer: (
            <>
              There are over 1000+ organizations on campus, so it definitely can be overwhelming. Here is a{" "}
              <a href="https://orgs.studentinvolvement.ufl.edu/Organizations" className="text-saseGreen underline">
                {" "}
                huge list
              </a>{" "}
              of some clubs (some listed may not be active). A couple of club categories include professional/design teams, social, dance,
              hobby-centered, religious, volunteering, and more.
              <br /> <br />
              In general, keep an open mind. Try to explore any clubs that possibly pique your interest! Professional clubs outside of your major are
              a great way to gain perspective too. There are also unique clubs you can join. Some examples include the Ukulele club, Gator salsa,
              Gator Humans vs. Zombies, and the Archery club.
              <br /> <br />
              Take advantage of organization fairs and tabling in Turlington to speak directly with club officers. You can also have a meeting with
              someone from the{" "}
              <a href="https://studentinvolvement.ufl.edu/join-us/iteam/" className="text-saseGreen underline">
                Involvement team
              </a>{" "}
              to talk about where you can find organizations that meet your interests.
              <br /> <br />
              Here is a{" "}
              <a href="https://discord.com/invite/9vGrg9ZvPT" className="text-saseGreen underline">
                discord link
              </a>{" "}
              with multiple student organizations.
            </>
          ),
        },
        {
          question: "3.3 - What design teams are at UF?",
          answer: (
            <>
              Design teams (like SASE’s SET) are a great way to practically apply your skills. Here is a list of some{" "}
              <a href="https://docs.google.com/document/d/1QMs7zF-ljbNrEw0aq8p3U26PrWxs_58jtVS-cOvT6N4/edit" className="text-saseGreen underline">
                design teams at UF
              </a>
              .
            </>
          ),
        },
        {
          question: "3.4 - Are there jobs available on campus?",
          answer: (
            <>
              Yes. However, some of them are popular making them somewhat difficult to get. The jobs listed below have openings at different times of
              the year, so keep checking to see when they open up.
              <ul className="list-disc pl-5">
                <li>
                  <a href="https://recsports.ufl.edu/about/student-employment/how-to-apply/" className="text-saseGreen underline">
                    UF Recreational Sports
                  </a>
                </li>
                <li>
                  <a href="https://labs.at.ufl.edu/learning-spaces/jobs/" className="text-saseGreen underline">
                    UF AT Lab
                  </a>{" "}
                  (Printing labs)
                </li>
                <li>
                  <a href="https://it.ufl.edu/internships/#opportunities" className="text-saseGreen underline">
                    UF IT Internships
                  </a>{" "}
                  (Shows you what’s currently open)
                </li>
                <li>Marston is also hiring (as of 8/22), you can get an application at the front desk</li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      category: "Miscellaneous",
      heading: "",
      questions: [
        {
          question: "4.1 - Rec Sports Live Feed",
          answer: (
            <>
              Check out this{" "}
              <a href="https://recsports.ufl.edu/cameras-counts-2/" className="text-saseGreen underline">
                link
              </a>{" "}
              to see live footage of different rooms at South West to see how crowded it is. If you scroll down you can find the stats for how crowded
              both SWRC and Student Rec are.
            </>
          ),
        },
        {
          question: "4.2 - Setting up doctor’s appointments on campus",
          answer: (
            <>
              Got the Gainesville plague? Call (352) 265-5555 to schedule an appointment at the infirmary (located near Student Rec). They’re open
              from 8 a.m. - 5 p.m., Monday - Friday. It’s recommended you call at 8 a.m. to get a same-day appointment.
            </>
          ),
        },
        {
          question: "4.3 - Where are the free things?",
          answer: (
            <>
              The different organization fairs are a great way to grab some freebies early on in the semester. Usually, at the Reitz you’ll find a
              bunch of events too. The events put on by Gatordays and Gatornights usually have fun activities and free food. The off-campus housing
              fair has some of the best freebies.
              <br /> <br />
              Check your student email and follow these accounts on Instagram to keep up with some events on campus:
              <ul className="list-disc pl-5">
                <li>
                  <a href="https://www.instagram.com/ufstudentgov/" className="text-saseGreen underline">
                    @ufstudentgov
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/ufgatornights/" className="text-saseGreen underline">
                    @ufgatornights
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          question: "4.4 - Getting around on campus/close to campus",
          answer: (
            <>
              Here are some ways to get around on campus.
              <br /> <br />
              The{" "}
              <a href="https://taps.ufl.edu/alternative-transportation/campus-connector/" className="text-saseGreen underline">
                Campus Connector
              </a>{" "}
              is a fixed-route walk-on shuttle service. The Connector operates Monday through Friday from 6:30 am - 5:30 pm with shuttles arriving at
              each stop at 15-20 minute intervals throughout the day. To get started download the Passio Go app.
              <br /> <br />
              <a href="https://taps.ufl.edu/alternative-transportation/snap/" className="text-saseGreen underline">
                SNAP
              </a>{" "}
              is a free, nightly, campus safety and transportation service. SNAP operates four to seven 15-passenger vans (depending on demand) seven
              nights a week from 6:30 PM – 3 AM during the Fall and Spring semesters. It basically works like Uber pool. Download the UF SNAP by Spare
              app to get started. Note that wait times and when you’ll actually get to your destination can vary depending on how many people need
              rides.
              <br /> <br />
              UF also has the{" "}
              <a href="https://taps.ufl.edu/alternative-transportation/uf-safe-rides/" className="text-saseGreen underline">
                Safe Rides program with Lyft
              </a>
              . It is available Wednesday through Sunday from 9 PM – 3 AM. A 50% discount is applied to qualifying Lyft Standard rides. Rides must
              begin and end within the service area to qualify.
              <br /> <br />
              UF uses the{" "}
              <a href="https://taps.ufl.edu/alternative-transportation/rts/" className="text-saseGreen underline">
                RTS bus service
              </a>{" "}
              around campus and Gainesville. To see bus routes you can download the GNVRideRTS app or use the website{" "}
              <a href="https://riderts.app/home" className="text-saseGreen underline">
                https://riderts.app/home
              </a>
              .
            </>
          ),
        },
        {
          question: "4.5 - Getting cheap stuff for your apartment/dorm",
          answer: (
            <>
              <a href="https://surplus.ufl.edu/" className="text-saseGreen underline">
                UF Surplus
              </a>{" "}
              sells surplus property to students and the public through Buy Now sales and auctions. UF Surplus sales to the public include desktop and
              laptop computers, iPads, tablets, monitors, projectors, printers, furniture, bikes, and a varied array of scientific and medical
              equipment.
            </>
          ),
        },
        {
          question: "4.6 - Restaurant Recommendations",
          answer: (
            <>
              <div className="grid grid-cols-2">
                <div>
                  On Campus/Close to Campus:
                  <ul className="list-disc pl-5">
                    <li>Chic-Fil-a (the Hub)</li>
                    <li>Rotating restaurants in the Reitz</li>
                    <li>
                      <a href="https://krishnalunch.com/krishna-lunch/" className="text-saseGreen underline">
                        Krishna Lunch
                      </a>{" "}
                      (Plaza)
                    </li>
                    <li>Cava (Mediterranean)</li>
                    <li>Chipotle (don’t go when busy)</li>
                    <li>Rotating restaurants in the Reitz</li>
                    <li>Paris Banh Mi</li>
                    <li>Pokebowl Station</li>
                    <li>Bolay</li>
                    <li>Just Salad</li>
                  </ul>
                </div>
                <div>
                  Other restaurants:
                  <ul className="list-disc pl-5">
                    <li>La Tienda (Mexican)</li>
                    <li>Indian Street Food</li>
                    <li>Momoyaki (Korean)</li>
                    <li>Satchel’s (pizza)</li>
                    <li>Chipotle (don’t go when busy)</li>
                    <li>Nine Spice Fondu (hot pot)</li>
                    <li>Seoul Pocha (Korean)</li>
                    <li>4th Ave Food Park</li>
                    <li>Piesanos</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },
        {
          question: "4.7 - Important Bike info",
          answer: (
            <>
              If you’re bringing a bike to campus, get it{" "}
              <a href="https://bikes.ufl.edu/bike-registration/" className="text-saseGreen underline">
                registered with UF PD
              </a>
              ! A registered bike is more likely to be recovered if stolen and is less likely to be targeted for theft. To register your bike, you can
              stop by the UF Public Safety Office at 1521 Museum Rd. on campus and simply ask to register your bike at the front desk. Also, don’t
              forget to use a D lock since they are more difficult to cut.
              <br /> <br />
              <a href="https://sg.ufl.edu/services/bike-repair/" className="text-saseGreen underline">
                SG Bike Repair
              </a>{" "}
              offers free service for UF students and sales of bike necessities like locks, tubes, and parts. They are located on the Ground level in
              the Reitz Union.
            </>
          ),
        },
        {
          question: "4.8 - Free Legal Services",
          answer: (
            <>
              A variety of legal services are free for students. Legal Services can help you out with any landlord disputes, traffic citations,
              property damage, and more. Check out their contact info and the other services they offer{" "}
              <a href="https://sg.ufl.edu/services/legal-services/" className="text-saseGreen underline">
                here
              </a>
              .
            </>
          ),
        },
        {
          question: "4.9 - UF Student Discounts and Other Perks",
          answer: (
            <>
              <ul className="list-disc pl-5">
                <li>Free tickets for every sport else than football (gymnastics, baseball, basketball, and volleyball)</li>
                <li>Free access to LinkedIn Learning</li>
                <li>At Lake Wauburg, UF students have free access to rock climbing and other activities</li>
                <li>
                  The Molm Family Career Closet (
                  <a href="https://career.ufl.edu/services-resources/molm-family-gator-career-closet/" className="text-saseGreen underline">
                    Borrow professional clothing
                  </a>
                  )
                </li>
                <li>
                  <a
                    href="https://ufl-flvc.primo.exlibrisgroup.com/discovery/collectionDiscovery?vid=01FALSC_UFL:UFL&collectionId=81747318570006597&lang=en"
                    className="text-saseGreen underline"
                  >
                    Marston Tools and Technology Lending
                  </a>
                </li>
                <li>The Marston Makerspace</li>
                <li>
                  Free admission to the Harn and FL Natural History Museum
                  <ul className="list-disc pl-5">
                    <li>
                      The Harn Muesuem membership also allows you to enter lots of North American museums for free (like the Dali in Tampa and Prez in
                      Miami)
                    </li>
                  </ul>
                </li>
                <li>
                  Free access to movies and documentaries through{" "}
                  <a href="https://www.kanopy.com/en/ufl" className="text-saseGreen underline">
                    Kanopy
                  </a>
                </li>
                <li>Kanapaha garden (Not free but at a reduced price)</li>
                <li>
                  The{" "}
                  <a
                    href="https://animal.ifas.ufl.edu/facilities/meat-processing-center/https://animal.ifas.ufl.edu/facilities/meat-processing-center/"
                    className="text-saseGreen underline"
                  >
                    Meat Processing Center
                  </a>{" "}
                  (Eat UF-grown proteins)
                </li>
                <li>GitHub Education</li>
                <li>Academic journals like NYT</li>
              </ul>
            </>
          ),
        },
        {
          question: "4.10 - Check how crowded the libraries are",
          answer: (
            <>
              See the capacity percentage at Marston, Libwest, and the other libraries here:{" "}
              <a href="https://www.uflib.ufl.edu/status/" className="text-saseGreen underline">
                https://www.uflib.ufl.edu/status/
              </a>
              .{" "}
            </>
          ),
        },
        {
          question: "4.11 - When should I start looking for apartments for next year?",
          answer: (
            <>
              In general, the sooner the better! It’s important to start doing research, touring apartments, and signing your lease ideally by
              November or December. You can also check reviews and talk to people who are currently living in that complex.
              <br /> <br />
              Keep in mind that the longer you wait (especially after the new year), rental rates will increase and spots become more limited.
            </>
          ),
        },
      ],
    },
  ];
