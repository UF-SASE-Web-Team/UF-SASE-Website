import * as Schema from "@db/tables";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const envOr = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : fallback;
};

const DATABASE_URL = envOr("DATABASE_URL", "file:local.db");
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN || undefined;
const DEFAULT_USER_PASSWORD = envOr("SEED_USER_PASSWORD", "DevPassword123!");

const EXTRA_USER_COUNT = 80;
const EVENTS_COUNT = 36;
const SASE_EVENTS_COUNT = 28;
const BLOG_COUNT = 45;
const MEETING_SLIDES_COUNT = 40;
const BOARD_HISTORY_COUNT = 24;
const SUBSCRIBER_COUNT = 140;
const PENDING_VERIFICATIONS_COUNT = 30;
const BLOG_TAG_COUNT = 12;
const INSERT_CHUNK_SIZE = 40;

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

const firstNames = ["Avery", "Jordan", "Taylor", "Casey", "Riley", "Morgan", "Jamie", "Alex", "Drew", "Emerson", "Quinn", "Skyler"];

const lastNames = ["Nguyen", "Patel", "Kim", "Tran", "Choi", "Liu", "Shah", "Wong", "Reddy", "Chen", "Kaur", "Singh"];

const majors = [
  "Computer Science",
  "Computer Engineering",
  "Electrical Engineering",
  "Industrial Engineering",
  "Mechanical Engineering",
  "Data Science",
];

const minors = ["Mathematics", "Business Administration", "Statistics", "Economics", "Digital Arts", "None"];
const graduationMonths = ["January", "May", "August", "December"];

const graduationTerms = ["Spring 2026", "Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028"];
const groups = ["Web Dev", "Mentorship", "Events", "Outreach", "Marketing", "Projects"];
const eventFormats = ["Workshop", "GBM", "Professional", "Tech", "Service", "Social"];
const locations = ["Marston 201", "CSE E301", "MAE A101", "Reitz Union 2340", "Little Hall 125", "Zoom"];
const roleTitles = ["Software Engineer Intern", "Data Analyst Intern", "Product Manager Intern", "Research Assistant", "Systems Engineer"];
const companyNames = ["Google", "Microsoft", "Amazon", "Meta", "NVIDIA", "Apple", "Blue Origin", "Sandia", "Citi", "P&G"];
const blogTagNames = [
  "Announcements",
  "Career",
  "Academics",
  "Projects",
  "Workshops",
  "Events",
  "Mentorship",
  "Leadership",
  "Community",
  "Alumni",
  "Internships",
  "Resources",
];

interface SeedUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  timeAdded: number;
  timeUpdated: number;
  points: number;
}

const linkedInByUserId = new Map<
  string,
  {
    url: string;
    graduationYear: number;
    graduationMonth?: string;
  }
>([
  ["stephanie-fong-id", { url: "https://www.linkedin.com/in/stephanietfong/", graduationYear: 2024 }],
  ["nivedhaa-sankaran-id", { url: "https://www.linkedin.com/in/nivedhaa-sankaran/", graduationYear: 2027 }],
  ["lynette-hemingway-id", { url: "https://www.linkedin.com/in/lynette-hemingway/", graduationYear: 2027 }],
  ["tai-tran-id", { url: "https://www.linkedin.com/in/ti-tai-tran/", graduationYear: 2025, graduationMonth: "May" }],
]);

const pick = <T>(values: Array<T>, index: number): T => {
  if (values.length === 0) {
    throw new Error("Cannot pick from an empty array");
  }
  const value = values[index % values.length];
  if (value === undefined) {
    throw new Error(`Failed to pick value at index ${index}`);
  }
  return value;
};

const insertInChunks = async <T>(table: Parameters<typeof db.insert>[0], rows: Array<T>) => {
  for (let index = 0; index < rows.length; index += INSERT_CHUNK_SIZE) {
    const chunk = rows.slice(index, index + INSERT_CHUNK_SIZE);
    if (chunk.length > 0) {
      await db.insert(table).values(chunk as Array<Record<string, unknown>>);
    }
  }
};

const buildMentorPairs = (users: Array<SeedUser>, count: number, mentorOffset: number, menteeOffset: number) => {
  const pairs: Array<{ mentorId: string; menteeId: string }> = [];
  const seen = new Set<string>();
  let cursor = 0;

  while (pairs.length < count && cursor < users.length * 8) {
    const mentor = users[(cursor + mentorOffset) % users.length];
    const mentee = users[(cursor + menteeOffset) % users.length];

    if (!mentor || !mentee || mentor.id === mentee.id) {
      cursor += 1;
      continue;
    }

    const key = `${mentor.id}|${mentee.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      pairs.push({ mentorId: mentor.id, menteeId: mentee.id });
    }
    cursor += 1;
  }

  return pairs;
};

const main = async () => {
  const now = Date.now();

  const defaultHash = await bcrypt.hash(DEFAULT_USER_PASSWORD, 10);

  const generatedUsers: Array<SeedUser> = Array.from({ length: EXTRA_USER_COUNT }, (_, idx) => {
    const num = idx + 1;
    const timestamp = now - num * 86_400_000;
    return {
      id: `seed-user-${num.toString().padStart(3, "0")}`,
      username: `devuser${num.toString().padStart(3, "0")}`,
      password: defaultHash,
      email: `devuser${num.toString().padStart(3, "0")}@ufsase.dev`,
      firstName: pick(firstNames, idx),
      lastName: pick(lastNames, idx + 3),
      timeAdded: timestamp,
      timeUpdated: timestamp,
      points: (num * 17) % 500,
    };
  });

  const coreUsers: Array<SeedUser> = [
    {
      id: "rj-admin-id",
      username: "RJ_ADMIN",
      password: defaultHash,
      email: "rj.admin@ufsase.dev",
      firstName: "RJ",
      lastName: "Admin",
      timeAdded: now,
      timeUpdated: now,
      points: 1_000,
    },
    {
      id: "rj-user-id",
      username: "RJ_USER",
      password: defaultHash,
      email: "rj.user@ufsase.dev",
      firstName: "RJ",
      lastName: "User",
      timeAdded: now - 43_200_000,
      timeUpdated: now - 43_200_000,
      points: 120,
    },
    {
      id: "stephanie-fong-id",
      username: "stephaniefong",
      password: defaultHash,
      email: "stephanie.fong@ufsase.dev",
      firstName: "Stephanie",
      lastName: "Fong",
      timeAdded: now - 30_000_000,
      timeUpdated: now - 30_000_000,
      points: 240,
    },
    {
      id: "nivedhaa-sankaran-id",
      username: "nivedhaasankaran",
      password: defaultHash,
      email: "nivedhaa.sankaran@ufsase.dev",
      firstName: "Nivedhaa",
      lastName: "Sankaran",
      timeAdded: now - 20_000_000,
      timeUpdated: now - 20_000_000,
      points: 180,
    },
    {
      id: "lynette-hemingway-id",
      username: "lynettehemingway",
      password: defaultHash,
      email: "lynette.hemingway@ufsase.dev",
      firstName: "Lynette",
      lastName: "Hemingway",
      timeAdded: now - 10_000_000,
      timeUpdated: now - 10_000_000,
      points: 210,
    },
    {
      id: "tai-tran-id",
      username: "taitran",
      password: defaultHash,
      email: "tai.tran@ufsase.dev",
      firstName: "Tai",
      lastName: "Tran",
      timeAdded: now - 8_000_000,
      timeUpdated: now - 8_000_000,
      points: 200,
    },
  ];

  const allUsers = [...coreUsers, ...generatedUsers];

  const rolesRows = [
    { id: "role-admin", name: "admin" },
    { id: "role-board", name: "board" },
    { id: "role-user", name: "user" },
    { id: "role-alumni", name: "alumni" },
  ];

  const userRoleRows: Array<Record<string, unknown>> = allUsers
    .filter((user) => user.id !== "rj-admin-id")
    .map((user, idx) => ({
      id: `user-role-${idx + 1}`,
      userId: user.id,
      role: "user",
    }));

  userRoleRows.push({ id: "rj-role-admin", userId: "rj-admin-id", role: "admin" });

  for (let idx = 0; idx < 12; idx += 1) {
    const user = generatedUsers[idx];
    if (!user) continue;
    userRoleRows.push({ id: `user-role-board-${idx + 1}`, userId: user.id, role: "board" });
  }

  for (let idx = 20; idx < 32; idx += 1) {
    const user = generatedUsers[idx];
    if (!user) continue;
    userRoleRows.push({ id: `user-role-alumni-${idx + 1}`, userId: user.id, role: "alumni" });
  }

  const professionalInfoRows: Array<Record<string, unknown>> = allUsers.map((user, idx) => {
    const linkedIn = linkedInByUserId.get(user.id);
    return {
      userId: user.id,
      bio: `${user.firstName} ${user.lastName} is active in UF SASE projects and events.`,
      phone: `352-555-${(1000 + idx).toString().padStart(4, "0")}`,
      discord: `${user.username}#${(1000 + idx) % 9999}`,
      resumePath: `/resumes/${user.username}.pdf`,
      linkedin: linkedIn?.url ?? "",
      portfolio: `https://${user.username}.dev`,
      majors: pick(majors, idx),
      minors: pick(minors, idx + 2),
      graduationSemester: linkedIn ? `Spring ${linkedIn.graduationYear}` : pick(graduationTerms, idx),
    };
  });

  const saseInfoRows: Array<Record<string, unknown>> = allUsers.map((user, idx) => ({
    userId: user.id,
    eventsAttended: `Event ${1 + (idx % 6)}, Event ${2 + (idx % 8)}, Event ${3 + (idx % 10)}`,
    groups: `${pick(groups, idx)}, ${pick(groups, idx + 2)}`,
  }));

  const oauthRows: Array<Record<string, unknown>> = allUsers.slice(0, 55).map((user, idx) => ({
    id: `oauth-${idx + 1}`,
    userId: user.id,
    provider: pick(["google", "github", "linkedin"], idx),
    providerUserId: `provider-user-${idx + 1}`,
    email: user.email,
    timeAdded: now - idx * 10_000,
  }));

  const sessionRows: Array<Record<string, unknown>> = allUsers.map((user, idx) => ({
    id: `session-${idx + 1}`,
    userId: user.id,
    expiresAt: now + (idx + 1) * 86_400_000,
  }));

  const eventsRows: Array<Record<string, unknown>> = Array.from({ length: EVENTS_COUNT }, (_, idx) => {
    const start = new Date(now + (idx - 6) * 3 * 86_400_000);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return {
      id: `event-${idx + 1}`,
      name: `${pick(eventFormats, idx)} ${idx + 1}: UF SASE Development Series`,
      description: `Hands-on ${pick(eventFormats, idx).toLowerCase()} focused on technical growth and community building.`,
      timeAdded: now - idx * 86_400_000,
      timeUpdated: now - idx * 43_200_000,
      location: pick(locations, idx),
      startTime: start,
      endTime: end,
      involvedGroups: `${pick(groups, idx)}, ${pick(groups, idx + 1)}`,
      slidesUrl: `https://docs.google.com/presentation/d/seed-event-slide-${idx + 1}/preview`,
    };
  });

  const saseEventRows: Array<Record<string, unknown>> = Array.from({ length: SASE_EVENTS_COUNT }, (_, idx) => {
    const start = new Date(now + idx * 5 * 86_400_000);
    const end = new Date(start.getTime() + 90 * 60 * 1000);
    return {
      id: `sase-event-${idx + 1}`,
      name: `SASE RSVP Event ${idx + 1}`,
      description: `RSVP-enabled SASE event #${idx + 1} for local testing.`,
      location: pick(locations, idx + 2),
      code: `SE${(1000 + idx).toString()}`,
      startDatetime: start,
      endDatetime: end,
      timeAdded: now - idx * 12_345,
    };
  });

  const blogRows: Array<Record<string, unknown>> = Array.from({ length: BLOG_COUNT }, (_, idx) => ({
    id: `blog-${idx + 1}`,
    title: `Engineering Spotlight ${idx + 1}`,
    content: [
      `# Engineering Spotlight ${idx + 1}`,
      "",
      "This is seeded markdown content for local development.",
      "",
      "- Club updates",
      "- Career tips",
      "- Upcoming opportunities",
    ].join("\n"),
    authorId: allUsers[idx % allUsers.length]?.id,
    images: [`https://picsum.photos/seed/blog-${idx + 1}/1200/630`, `https://picsum.photos/seed/blog-alt-${idx + 1}/1200/630`],
    publishedDate: new Date(now - idx * 7 * 86_400_000),
    timeUpdated: new Date(now - idx * 2 * 86_400_000),
  }));

  const blogTagRows: Array<Record<string, unknown>> = Array.from({ length: BLOG_TAG_COUNT }, (_, idx) => ({
    id: `tag-${idx + 1}`,
    name: pick(blogTagNames, idx),
  }));

  const blogTagRelationshipRows: Array<Record<string, unknown>> = blogRows.flatMap((blog, idx) => {
    const firstTag = `tag-${(idx % BLOG_TAG_COUNT) + 1}`;
    const secondTag = `tag-${((idx + 3) % BLOG_TAG_COUNT) + 1}`;
    const thirdTag = `tag-${((idx + 7) % BLOG_TAG_COUNT) + 1}`;
    return [
      { id: `blog-tag-rel-${idx + 1}-1`, blogId: blog.id, tagId: firstTag },
      { id: `blog-tag-rel-${idx + 1}-2`, blogId: blog.id, tagId: secondTag },
      { id: `blog-tag-rel-${idx + 1}-3`, blogId: blog.id, tagId: thirdTag },
    ];
  });

  const mentorPairs = buildMentorPairs(generatedUsers, 35, 0, 17);
  const invitePairs = buildMentorPairs(generatedUsers, 30, 7, 29);

  const mentorMenteeRows: Array<Record<string, unknown>> = mentorPairs.map((pair, idx) => ({
    id: `mentor-mentee-${idx + 1}`,
    mentorId: pair.mentorId,
    menteeId: pair.menteeId,
  }));

  const mentorInviteRows: Array<Record<string, unknown>> = invitePairs.map((pair, idx) => ({
    id: `mentor-invite-${idx + 1}`,
    mentorId: pair.mentorId,
    menteeId: pair.menteeId,
  }));

  const subscriberRows: Array<Record<string, unknown>> = Array.from({ length: SUBSCRIBER_COUNT }, (_, idx) => ({
    id: `subscriber-${idx + 1}`,
    email: `subscriber${(idx + 1).toString().padStart(3, "0")}@ufsase.dev`,
    name: `${pick(firstNames, idx)} ${pick(lastNames, idx + 1)}`,
    subscribedAt: new Date(now - idx * 86_400_000),
  }));

  const meetingSlidesRows: Array<Record<string, unknown>> = Array.from({ length: MEETING_SLIDES_COUNT }, (_, idx) => ({
    id: `slide-${idx + 1}`,
    category: pick(["GBM", "Workshop", "Professional", "Service", "Tech"], idx),
    name: `Seed Slide Deck ${idx + 1}`,
    date: new Date(now - idx * 14 * 86_400_000),
    semester: idx % 2 === 0 ? "Fall 2025" : "Spring 2026",
    thumbnailUrl: `https://picsum.photos/seed/slide-thumb-${idx + 1}/640/360`,
    embedUrl: `https://docs.google.com/presentation/d/seed-slide-${idx + 1}/preview`,
  }));

  const boardHistoryRows: Array<Record<string, unknown>> = Array.from({ length: BOARD_HISTORY_COUNT }, (_, idx) => ({
    name: `${pick(firstNames, idx)} ${pick(lastNames, idx)}`,
    description: `Board member profile for seeded entry ${idx + 1}.`,
    fileName: `board-member-${idx + 1}.jpg`,
    role: pick(["President", "Vice President", "Treasurer", "Secretary", "Webmaster", "Outreach"], idx),
    email: `board${idx + 1}@ufsase.dev`,
    bio: `Seeded board bio for member ${idx + 1}, focused on chapter growth and mentorship.`,
    key: `board-history-${idx + 1}`,
    url: `https://picsum.photos/seed/board-${idx + 1}/300/300`,
    size: 256_000 + idx * 1_000,
    uploadedAt: new Date(now - idx * 10 * 86_400_000).toISOString(),
  }));

  const pendingVerificationRows: Array<Record<string, unknown>> = Array.from({ length: PENDING_VERIFICATIONS_COUNT }, (_, idx) => ({
    email: `pending${idx + 1}@ufsase.dev`,
    code: (100_000 + idx).toString(),
    userData: JSON.stringify({
      username: `pendinguser${idx + 1}`,
      email: `pending${idx + 1}@ufsase.dev`,
      firstName: pick(firstNames, idx),
      lastName: pick(lastNames, idx),
    }),
    expiresAt: now + (idx + 1) * 30 * 60 * 1000,
    attempts: idx % 3,
  }));

  const linkedinRows: Array<Record<string, unknown>> = allUsers.slice(0, 50).map((user, idx) => {
    const linkedIn = linkedInByUserId.get(user.id);
    return {
      user: user.id,
      name: `${user.firstName} ${user.lastName}`,
      major: pick(majors, idx),
      graduationYear: linkedIn?.graduationYear ?? 2026 + (idx % 4),
      email: user.email,
      linkedin: linkedIn?.url ?? "",
    };
  });

  const companyRows: Array<Record<string, unknown>> = allUsers.slice(0, 50).flatMap((user, idx) => [
    {
      id: `company-${idx + 1}-current`,
      userId: user.id,
      name: pick(companyNames, idx),
      startDate: `202${idx % 4}-0${(idx % 9) + 1}`,
      endDate: null,
      role: pick(roleTitles, idx),
      isCurrent: 1,
    },
    {
      id: `company-${idx + 1}-past-1`,
      userId: user.id,
      name: pick(companyNames, idx + 3),
      startDate: `201${idx % 5}-0${(idx % 9) + 1}`,
      endDate: `202${idx % 4}-0${((idx + 2) % 9) + 1}`,
      role: pick(roleTitles, idx + 1),
      isCurrent: 0,
    },
    {
      id: `company-${idx + 1}-past-2`,
      userId: user.id,
      name: pick(companyNames, idx + 6),
      startDate: `201${(idx + 1) % 5}-0${((idx + 3) % 9) + 1}`,
      endDate: `201${(idx + 3) % 7}-0${((idx + 4) % 9) + 1}`,
      role: pick(roleTitles, idx + 2),
      isCurrent: 0,
    },
  ]);

  const alumniSeedUsers = [
    allUsers.find((user) => user.id === "stephanie-fong-id"),
    allUsers.find((user) => user.id === "nivedhaa-sankaran-id"),
    allUsers.find((user) => user.id === "lynette-hemingway-id"),
    allUsers.find((user) => user.id === "tai-tran-id"),
    ...allUsers.slice(15, 52),
  ].filter((user): user is SeedUser => Boolean(user));

  const alumniBankRows: Array<Record<string, unknown>> = alumniSeedUsers.map((user, idx) => {
    const linkedIn = linkedInByUserId.get(user.id);
    const graduationYear = linkedIn?.graduationYear ?? 2022 + (idx % 4);
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      major: pick(majors, idx),
      minor: pick(minors, idx + 1),
      graduationMonth: linkedIn?.graduationMonth ?? pick(graduationMonths, idx),
      graduationYear,
      currentRole: pick(roleTitles, idx),
      currentCompany: pick(companyNames, idx),
      pastCompanies: [pick(companyNames, idx + 2), pick(companyNames, idx + 5), pick(companyNames, idx + 8)],
      email: user.email,
      linkedin: linkedIn?.url ?? "",
    };
  });

  const semesterRows: Array<Record<string, unknown>> = [
    { id: "semester-fall-2022", semester: "Fall", year: 2022 },
    { id: "semester-spring-2023", semester: "Spring", year: 2023 },
    { id: "semester-fall-2023", semester: "Fall", year: 2023 },
    { id: "semester-spring-2024", semester: "Spring", year: 2024 },
    { id: "semester-fall-2024", semester: "Fall", year: 2024 },
    { id: "semester-spring-2025", semester: "Spring", year: 2025 },
    { id: "semester-fall-2025", semester: "Fall", year: 2025 },
    { id: "semester-spring-2026", semester: "Spring", year: 2026 },
    { id: "semester-fall-2026", semester: "Fall", year: 2026 },
    { id: "semester-spring-2027", semester: "Spring", year: 2027 },
  ];

  const userSemesterPointsRows: Array<Record<string, unknown>> = allUsers.flatMap((user, userIndex) =>
    semesterRows.map((semester, semesterIndex) => ({
      id: `usp-${userIndex + 1}-${semesterIndex + 1}`,
      userId: user.id,
      semesterYearId: semester.id,
      points: ((userIndex + 3) * (semesterIndex + 5)) % 200,
    })),
  );

  await client.batch([
    "PRAGMA foreign_keys = OFF;",
    "DELETE FROM user_semester_points;",
    "DELETE FROM semester_year;",
    "DELETE FROM alumni_bank;",
    "DELETE FROM company;",
    "DELETE FROM linkedin_profile;",
    "DELETE FROM pending_verifications;",
    "DELETE FROM board_member_history;",
    "DELETE FROM meeting_slides;",
    "DELETE FROM email_subscriber;",
    "DELETE FROM mentor_mentee_invites;",
    "DELETE FROM mentor_mentee_relationship;",
    "DELETE FROM blog_tag_relationship;",
    "DELETE FROM blog_tag;",
    "DELETE FROM blog;",
    "DELETE FROM sase_event;",
    "DELETE FROM event;",
    "DELETE FROM session;",
    "DELETE FROM oauth_account;",
    "DELETE FROM sase_info;",
    "DELETE FROM professional_info;",
    "DELETE FROM user_roles_relationship;",
    "DELETE FROM roles;",
    "DELETE FROM user;",
    "PRAGMA foreign_keys = ON;",
  ]);

  await insertInChunks(Schema.roles, rolesRows);
  await insertInChunks(Schema.users, allUsers);
  await insertInChunks(Schema.userRoleRelationship, userRoleRows);
  await insertInChunks(Schema.professionalInfo, professionalInfoRows);
  await insertInChunks(Schema.saseInfo, saseInfoRows);
  await insertInChunks(Schema.oauthAccounts, oauthRows);
  await insertInChunks(Schema.sessions, sessionRows);
  await insertInChunks(Schema.events, eventsRows);
  await insertInChunks(Schema.saseEvents, saseEventRows);
  await insertInChunks(Schema.blogs, blogRows);
  await insertInChunks(Schema.blogTags, blogTagRows);
  await insertInChunks(Schema.blogTagRelationship, blogTagRelationshipRows);
  await insertInChunks(Schema.mentorMenteeRelationship, mentorMenteeRows);
  await insertInChunks(Schema.mentorMenteeInvites, mentorInviteRows);
  await insertInChunks(Schema.emailSubscribers, subscriberRows);
  await insertInChunks(Schema.meetingSlides, meetingSlidesRows);
  await insertInChunks(Schema.boardMemberHistory, boardHistoryRows);
  await insertInChunks(Schema.pendingVerifications, pendingVerificationRows);
  await insertInChunks(Schema.linkedinProfile, linkedinRows);
  await insertInChunks(Schema.company, companyRows);
  await insertInChunks(Schema.alumniBank, alumniBankRows);
  await insertInChunks(Schema.semesterYears, semesterRows);
  await insertInChunks(Schema.userSemesterPoints, userSemesterPointsRows);

  console.log("Local database seeded successfully with high-volume sample data.");
  console.log(
    JSON.stringify(
      {
        users: allUsers.length,
        roles: rolesRows.length,
        userRoles: userRoleRows.length,
        professionalInfo: professionalInfoRows.length,
        saseInfo: saseInfoRows.length,
        oauthAccounts: oauthRows.length,
        sessions: sessionRows.length,
        events: eventsRows.length,
        saseEvents: saseEventRows.length,
        blogs: blogRows.length,
        blogTags: blogTagRows.length,
        blogTagRelations: blogTagRelationshipRows.length,
        mentorMenteeRelations: mentorMenteeRows.length,
        mentorMenteeInvites: mentorInviteRows.length,
        emailSubscribers: subscriberRows.length,
        meetingSlides: meetingSlidesRows.length,
        boardMemberHistory: boardHistoryRows.length,
        pendingVerifications: pendingVerificationRows.length,
        linkedinProfiles: linkedinRows.length,
        companies: companyRows.length,
        alumniBank: alumniBankRows.length,
        semesterYears: semesterRows.length,
        userSemesterPoints: userSemesterPointsRows.length,
      },
      null,
      2,
    ),
  );
};

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (typeof client.close === "function") {
      client.close();
    }
  });
