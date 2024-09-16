import Image from "next/image";
type LogoProps = {
  textColor?: string;
  otherStyles? : string;
};
const Logo = ({ textColor = "text-white", otherStyles }: LogoProps) => {
  return (
    <div className={`${otherStyles} flex items-center`}>
      <Image
        src={"/assets/logo/care-logo.svg"}
        height={44}
        width={44}
        alt="Eduction Logo"
        className="mr-1"
      />
      <h2 className={`${textColor} logo-text text-4xl`}>ConsumeWise</h2>
    </div>
  );
};

export default Logo;
