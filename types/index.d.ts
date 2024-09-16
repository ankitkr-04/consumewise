declare interface userInfoProps {
  userId: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface signUpProps {
  email: string;
  password: string;
  name: string;
  age: number;
  allergies?: string[];
  medications?: string[];
  avatar?: string;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
}
