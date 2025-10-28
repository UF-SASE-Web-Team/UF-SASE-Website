import { DefaultCatchBoundary } from "@/client/components/DefaultCatchBoundary";
import { NotFound } from "@/client/components/NotFound";
import { imageUrls } from "@assets/imageUrls";
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { seo } from "src/client/utils/seo";
import { DarkModeProvider } from "../components/custom_ui/DarkModeProvider";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/Header";
import { AuthProvider } from "../hooks/AuthContext";
import css from "../index.css?url";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    ...seo({
      title: "UF SASE Homepage",
      description:
        "UF Society of Asian Scientists & Engineers, committed to fostering meaningful connections across cultures and empowering Asian Pacific Islander Desi American (APIDA) professionals in science and engineering.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  links: () => [
    { rel: "stylesheet", href: css },
    { rel: "icon", href: "/favicon.ico" },
  ],
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </DarkModeProvider>
    </AuthProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet" />
      </Head>
      <Body>
        <Toaster />
        <div className="flex min-h-screen flex-col">
          <Header />
          {/* Main Content Area */}
          <main className="flex-grow bg-white dark:bg-black">{children}</main>
          <Footer />
        </div>
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  );
}
