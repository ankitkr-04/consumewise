import Image from "next/image";
type LogoProps = {
  textColor?: string;
};
const Logo = ({ textColor = "text-white" }: LogoProps) => {
  return (
    <div className="flex items-center">
      <Image
        src={"/assets/logo/education-logo.svg"}
        height={44}
        width={44}
        alt="Eduction Logo"
        className="mr-1"
      />
      <h2 className={`${textColor} logo-text text-4xl`}>intelliQ</h2>
    </div>
  );
};

export default Logo;
