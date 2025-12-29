import { imageUrls } from "@/client/assets/imageUrls";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import SocialIcons from "../ui/socialIcons";

const footerNavItems = [
  { key: "about", label: "About", href: "/about" },
  { key: "board", label: "Board", href: "/board" },
  { key: "gallery", label: "Gallery", href: "/gallery" },
  { key: "events", label: "Events & Slides", href: "/events" },
  { key: "sports", label: "Sports", href: "/sports" },
  { key: "blogs", label: "Blogs", href: "/blogs" },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-saseBlue py-7 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Left Section - Logo and Social Icons */}
        <div className="mb-6 flex flex-col items-center md:mb-0">
          <div className="mb-6">
            <img src={imageUrls["WhiteSASELogo.png"]} alt="Logo" style={{ width: "235px", height: "75px" }} className="ml-2 h-auto" />
          </div>
          <SocialIcons />
        </div>

        {/* Right Section - Navigation */}
        <div className="flex flex-col items-center md:items-end">
          <div className="mb-4 flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            {footerNavItems.map((item) => (
              <Link key={item.key} to={item.href} className="font-redhat text-lg text-white transition-all hover:text-saseGreen hover:underline">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Us Button */}
          <div className="flex flex-col items-center md:flex-row md:items-center">
            <div className="-top-3 h-0.5 w-[350px] bg-saseGreen"></div>
            <div className="relative mt-2 md:ml-4 md:mt-0">
              <Button asChild variant="link" size="default">
                <Link
                  to="/about"
                  hash="#contact"
                  className="relative flex h-9 items-center rounded-[55px] border-2 border-black bg-saseGreen px-6 text-sm italic text-black transition-all hover:-translate-y-0.5"
                >
                  Contact Us!
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
