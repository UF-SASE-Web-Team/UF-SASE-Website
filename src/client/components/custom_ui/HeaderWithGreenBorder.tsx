export const HeaderWithGreenBorder = ({text, type} : {type: "Header" | "Subheader", text: string}) => {
  return (
  <div className="flex w-full max-w-7xl items-center px-4">
    <div className="mr-3 h-12 w-1.5 rounded-sm bg-saseGreen mb-10"></div>
    <p className={type == "Header" ? "header-text" : "subheader-text"}>{text}</p>
  </div>
  )
}