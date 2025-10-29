import imageData from "@/client/assets/image_data.json" with { type: "json" };
import { db } from "@/server/db/db";
import { boardMemberHistory } from "@db/tables";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config();

type ImageData = {
  name: string;
  key: string;
  url: string;
  size: number;
  customId: unknown;
  uploadedAt: string;
};

type tableImage = {
  name: string;
  description: string;
  fileName: string;
  url: string;
  role: string;
  email: string;
  bio: string;
};

type uploadImage = {
  name: string;
  description: string;
  fileName: string;
  url: string;
  role: string;
  email: string;
  bio: string;

  key: string;
  size: number;
  uploadedAt: string;
};

const requiredImages: Array<tableImage> = [
  {
    name: "Vincent Lin",
    description: "3rd Year Computer Science",
    fileName: "President.png",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKrVxaEURbEs4TRcWoUF2IXm7SkVeh1jfDOCKL",
    role: "President",
    email: "ufsase.president@gmail.com",
    bio: "I lead a team of 21 officers to plan and execute 70+ annual events for 600+ members. To ensure quality events, I help oversee an annual budget of $20,000+ to fund resources that foster leadership and growth. I coordinated a trip of 80+ members to SASE National Convention and managed $30,000 to provide students with valuable professional networking opportunities.",
  },
  {
    name: "Bryan Park",
    description: "3rd Year Mechanical Engineering",
    fileName: "InternalVicePresident.png",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKuoyshP1qQZ4jYNG9Died5b2HW7PTrE6ofnMy",
    role: "Internal Vice President",
    email: "ufsase.vp@gmail.com",
    bio: "I've really enjoyed my time in SASE and I wanted to continue giving back to our amazing SASE community. I love my mentor-mentee group (shoutout to the Park-Rangers) and I wanted to help others make meaningful connections through SASE.",
  },
  {
    name: "Kayleen Diaz",
    description: "3rd Year Mechanical Engineering",
    fileName: "ExternalVicePresident.png",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTK8B5e2p72mngvWkRb9GKClx07EaLjcMz43UNV",
    role: "External Vice President",
    email: "ufsase.evp@gmail.com",
    bio: "I have the wonderful role of leading SASE's professional development! Whether it be partnering with companies for workshops or creating meaningful external relationships, I hope to provide SASE members with opportunities to further their careers. As EVP, I hope to give back to the SASE community that has helped me grow so much! ",
  },
  {
    name: "Gayatri Baskaran",
    description: "3rd Year Computer Engineering",
    fileName: "Treasurer.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKNXqN1w6liO0PyMnrk6QLBEUfbdSJt1ZweYGC",
    role: "Treasurer",
    email: "ufsase.treasurer@gmail.com",
    bio: "By taking care of SASE's finances, I want to make sure our board members and committees can focus on making our events the best that they can be. SASE is special to me because the positivity and inclusivity of our community is unmatched. There's always someone to yap with!",
  },
  {
    name: "Rachel Young",
    description: "3nd Year Computer Science",
    fileName: "Secretary.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKnu1gWggk1mtwbg4xWloVfSsIBDdqaGNCejMH",
    role: "Secretary",
    email: "ufsase.secretary@gmail.com",
    bio: "I handle space reservations for all SASE events, communicating with UF’s registrar to secure suitable rooms. I also moderate the UF SASE Discord server, including roles, channels, and resources. I update our Google Calendar and Discord Events tab with upcoming events and deadlines, and I oversee our weekly board meetings.",
  },
  {
    name: "Kimmy Chiu",
    description: "2nd Year Environmental Engineering",
    fileName: "PublicRelations.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKBsdItF3ULJG6YbFtkQIHNdvnrupfCaVTR0mi",
    role: "Public Relations",
    email: "ufsase.pr@gmail.com",
    bio: "SASE has been a welcoming community that supported my professional development, so I chose to give back by becoming a PR Officer. In this role, I manage the official UF SASE Instagram, Facebook, and Linktree accounts, serve as the main contact for external marketing, and oversee all marketing logistics.",
  },
  {
    name: "Amanda Jiang",
    description: "2nd Year Computer Science",
    fileName: "AdvancementChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKBzimqP13ULJG6YbFtkQIHNdvnrupfCaVTR0m",
    role: "Advancement",
    email: "ufsase.academic@gmail.com",
    bio: "Hi! My name is Yangying (Amanda), and I'm SASE's Advancement Chair for the 2024-2025 school year. I’m in charge of the organization’s academic and professional development, so I help host events like resume workshops, resume hours, and board office hours. Want to learn more? Come to one of our GBMs!",
  },
  {
    name: "Chloe Bai",
    description: "2nd Year Computer Science",
    fileName: "FundraisingChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTK0OwNRgvfmUDLvlEFI6HpA2aq5tQX7dbR8hWr",
    role: "Fundraising",
    email: "ufsase.fundraising@gmail.com",
    bio: "I joined SASE because of the amazing friends and community I found here. I wanted to give back to SASE and help make it the same kind of place for others. As Fundraising Chair, I organize a variety of fundraisers from food to headshots. I am also responsible for coordinating concessions in collaboration with HEAL.",
  },
  {
    name: "Anna Lim",
    description: "2nd Year Biochemistry & Music Performance",
    fileName: "MemberInvolvementChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKa621FynXYPwCL3hnGoHcRr14xNQzV28Tf9AJ",
    role: "Member Involvement",
    email: "ufsase.moc@gmail.com",
    bio: "In my role as Co-Member Involvement Chair, I work with my co-chair, Justin, to organize SASE’s leadership and professional development program, SASE Interns. It’s incredibly rewarding to support our 90+ Interns as they gain opportunities to plan their own events, shadow board members to learn about positional responsibilities, engage with peers, and grow as professionals and leaders.",
  },
  {
    name: "Justin Doan",
    description: "2nd Year Environmental Engineering",
    fileName: "CoMemberInvolvementChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKd9rg5TsDSqyBaK2UuGLsiH3O8M6bme7QcfvE",
    role: "Member Involvement",
    email: "ufsase.moc@gmail.com",
    bio: "As Co-Member-Involvement Chair, I work with my co-chair, Anna, to lead and direct SASE's leadership and professional development program, SASE Interns. With 90+ interns, we are in charge of creating the programs structure and events, including weekly meetings, board presentations/shadowing, Board x Interns event, interns-only socials, and ensuring overall success of the program.",
  },
  {
    name: "Helen Zou",
    description: "2nd Year Computer Engineering",
    fileName: "HistorianChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKLwUB2A9MrDVyAlf08kn7JZT9PI5tC2cYxsUS",
    role: "Historian",
    email: "ufsase.historian@gmail.com",
    bio: "As historian, my goal is to capture all the fun times of SASE so that members can look back on their experiences fondly and share them. My responsibilities include documenting all SASE events through photos/videos and editing videos such as recaps.",
  },
  {
    name: "Adriel Poon",
    description: "2nd Year Computer Engineering",
    fileName: "MultimediaChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKmBN1dHCUFt7WHBzodX0e53R9rvPmhyAOQC8M",
    role: "Multimedia",
    email: "ufsase.multimedia@gmail.com",
    bio: "I wanted to be a part of SASE because of its welcoming community. I applied for Multimedia chair because I enjoyed creating merch. I’m mainly inspired by streamers who occasionally have merch drops of their brand and hoped to implement a smaller scale version into each semester! I also love making graphics and scrolling through Pinterest and Instagram for references!",
  },
  {
    name: "Reyna Simpson",
    description: "2nd Year Material Science Engineering",
    fileName: "CoMultimediaChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKR8kr0JYhYGDO1uAdSyaxqzpKXj8FtecmfE4V",
    role: "Multimedia",
    email: "ufsase.multimedia@gmail.com",
    bio: "SASE has such a warm and welcoming community that I wanted to be a part of it. Therefore, I wanted to be multimedia chair because I wanted to be more involved while doing something I enjoy. Through this position, I have fun creating graphics and merchandise for my SASE chapter.",
  },
  {
    name: "Tabitha Gottipati",
    description: "2nd Year Mechanical Engineering",
    fileName: "NetworkChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKaHQzcVnXYPwCL3hnGoHcRr14xNQzV28Tf9AJ",
    role: "Network",
    email: "ufsase.alumni@gmail.com",
    bio: "I joined SASE because of how easy it was to make friends! In addition, the quality of SASE events and the effort of the officers to be inclusive stuck out to me. As networking chair my main responsibility is getting an alumni spotlight for each GBM so our wonderful members can learn from their experiences at UF.",
  },
  {
    name: "Aahan Dwivedi",
    description: "3rd Year Physics & Math",
    fileName: "ScienceChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTK1CCfHyr5SC0E6Wbrwzu71JZsf4yQnHeAI9Lq",
    role: "Science",
    email: "ufsase.service@gmail.com",
    bio: "I create resources, opportunities, and workshops focused on research, graduate school and outreach to ensure that SASE is better meeting science members' needs. I joined SASE because of its community and hope that it has the tools to enable members to succeed in all career paths.",
  },
  {
    name: "Leann Tang",
    description: "2nd Year Mechanical Engineering",
    fileName: "ServiceChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKcqEYUxPpMwbOnfqEJ7TVa05IgRhUszKWGF28",
    role: "Service",
    email: "ufsase.service@gmail.com",
    bio: "As Service Chair, I am responsible for planning service events and initiatives that benefit the local Gainesville community. This means reaching out to local volunteer organizations to plan fun and engaging service events for SASE members. In addition, I collaborate with HEAL for our semesterly Adopt-a-Street clean ups.",
  },
  {
    name: "Sophia Dong",
    description: "3rd Year Industrial and Systems Engineering",
    fileName: "SocialChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKgaKPoiyXIQqdZjMrRAYFC9vhf6kpPOuLl8an",
    role: "Social",
    email: "ufsase.social@gmail.com",
    bio: "As the Social Chair for SASE, I’ve been drawn to the strong sense of community it fosters through sports, socials, and informational events. My role allows me to create engaging events for our general body, honing skills in event programming and building connections. I’m grateful for the mentorship and resources along the way!",
  },
  {
    name: "Jessica Lu",
    description: "2nd Year Chemical Engineering",
    fileName: "CoSportsCoordinatorChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKZPwuvYTUK37NizSDsHEkotUuxbQI90TjAnm5",
    role: "Sports Coordinator",
    email: "ufsase.sports@gmail.com",
    bio: "Managing the SASE Sports Program, which includes overseeing intramurals, casual sports, and other sports events.",
  },
  {
    name: "Alexander Lou",
    description: "2nd Year Computer Science",
    fileName: "SportsCoordinatorChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTK3lM42vjaKwIicDGl8vTn5hBtmV0PXJLsH4eF",
    role: "Sports Coordinator",
    email: "ufsase.sports@gmail.com",
    bio: "Managing the SASE Sports Program, which includes overseeing intramurals, casual sports, and other sports events.",
  },
  {
    name: "Manav Sanghvi",
    description: "2nd Year Computer Science",
    fileName: "CoTechnicalChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKnNSalgk1mtwbg4xWloVfSsIBDdqaGNCejMH6",
    role: "Technical",
    email: "ufsase.tech@gmail.com",
    bio: "I'm involved in SASE because of the incredible community and professional development it's given me. As Technical Chair, I contribute directly to the technical and professional development of 30+ members in the SASE Engineering Team (SET). This year, we are designing and developing a search-and-rescue robotic dog!",
  },
  {
    name: "Kevin Tang",
    description: "2nd Year Mechanical Engineering",
    fileName: "TechnicalChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKIGYUtTz2IJDaG589To0SN4hLYtuCq1Env6XK",
    role: "Technical",
    email: "ufsase.tech@gmail.com",
    bio: "As one of the technical chairs, I am leading the SASE Engineering Team (SET), a group of 33 talented members, in the development of a custom built robotic dog. I also hosted the Fall 2024 Technical Workshop, where SASE members learned how to use SolidWorks and 3D printing.",
  },
  {
    name: "Ricky Zhang",
    description: "2nd Year Computer Science",
    fileName: "WebmasterChair.jpeg",
    url: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKrffZsdBRbEs4TRcWoUF2IXm7SkVeh1jfDOCK",
    role: "Webmaster",
    email: "ufsase.webmaster@gmail.com",
    bio: "As webmaster, my primary responsibilities are leading the Web Development Team and hosting computer-science related workshops such as practical programming. I really wanted to improve our slow, outdated website to reflect all the amazing things SASE has to offer!",
  },
];

const images: Array<ImageData> = imageData;

for (const image of requiredImages) {
  const match: ImageData | undefined = images.find((f) => f.name === image.fileName);

  if (match) {
    const existing = await db.select().from(boardMemberHistory).where(eq(boardMemberHistory.fileName, match.name));

    if (existing.length > 0) {
      console.log(`Skipping ${match.name} — already exists`);
      continue;
    }

    console.log("match found");
    const newImage: uploadImage = {
      name: image.name,
      description: image.description,
      fileName: image.fileName,
      url: image.url,
      role: image.role,
      email: image.email,
      bio: image.bio,

      key: match.key,
      size: match.size,
      uploadedAt: match.uploadedAt,
    };

    console.log(newImage);

    await db.insert(boardMemberHistory).values(newImage);
  }
}
