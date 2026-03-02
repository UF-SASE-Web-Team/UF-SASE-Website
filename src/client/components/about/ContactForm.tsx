import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const emails: Record<string, string> = {
  president: "ufsase.president@gmail.com",
  externalvp: "ufsase.evp@gmail.com",
  internalvp: "ufsase.vp@gmail.com",
  secretary: "ufsase.secretary@gmail.com",
  treasurer: "ufsase.treasurer@gmail.com",
  profficer: "ufsase.pr@gmail.com",
  advancement: "ufsase.advancement@gmail.com",
  fundraising: "ufsase.fundraising@gmail.com",
  historian: "ufsase.historian@gmail.com",
  meminvolvment: "ufsase.moc@gmail.com",
  multimedia: "ufsase.multimedia@gmail.com",
  networking: "ufsase.alumni@gmail.com",
  precollegiate: "ufsase.precollegiate@gmail.com",
  science: "ufsase.science@gmail.com",
  service: "ufsase.service@gmail.com",
  social: "ufsase.social@gmail.com",
  sportcord: "ufsase.sports@gmail.com",
  tech: "ufsase.tech@gmail.com",
  web: "ufsase.web@gmail.com",
};

const notify = () =>
  toast.success("Thanks for your feedback!", {
    position: "bottom-center",
  });

export const ContactForm = () => {
  const { handleSubmit, register, reset } = useForm<FormData>();
  const [contact, setContact] = useState("none");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (contact === "none") {
      toast.error("Please select a contact.");
      return;
    }

    const email = emails[contact];
    console.log(email);
    const url = "/api/contact/submit";

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}"`);
      }
      notify();
      reset();
      setContact("none");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h2 className="mb-4 text-lg font-medium text-foreground">
        Have any questions or comments? Submit the form below and we will get in contact with you shortly!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="dropdown-menu" className="block text-sm font-semibold text-muted-foreground">
            Who would you like to contact? <span className="text-red-600">*</span>
          </label>
          <select
            name="contact-target"
            id="contact-target"
            value={contact}
            size={1}
            onFocus={(e) => (e.target.size = 5)}
            onBlur={(e) => (e.target.size = 1)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          >
            // executive board options
            <option value="none">Select Contact</option>
            <option value="president">President</option>
            <option value="externalvp">External Vice President</option>
            <option value="internalvp">Internal Vice President</option>
            <option value="secretary">Secretary</option>
            <option value="treasurer">Treasurer</option>
            <option value="profficer">Public Relations Officer</option>
            // chair board options
            <option value="advancement">Advancement</option>
            <option value="fundraising">Fundraising</option>
            <option value="historian">Historian</option>
            <option value="meminvolvment">Member Involvement</option>
            <option value="multimedia">Multimedia</option>
            <option value="networking">Networking</option>
            <option value="precollegiate">Pre-Collegiate</option>
            <option value="science">Science</option>
            <option value="service">Service</option>
            <option value="social">Social</option>
            <option value="sportcord">Sports Coordinator</option>
            <option value="tech">Technical</option>
            <option value="web">Webmaster</option>
          </select>
        </div>

        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-muted-foreground">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              {...register("firstName", { required: "This is required.", maxLength: 256 })}
            />
          </div>
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
              &nbsp;
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              {...register("lastName", { required: "This is required.", maxLength: 256 })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            {...register("email", { required: "Email is required.", minLength: 4, maxLength: 256 })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold text-muted-foreground">
            Comment or Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Your message"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            {...register("message", { required: "Message cannot be empty", maxLength: { value: 3000, message: "Message is too long." } })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-saseBlue p-2 font-medium text-white transition duration-300 hover:bg-saseGreen hover:text-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
