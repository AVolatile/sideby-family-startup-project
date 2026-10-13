export type Role = "parent" | "teen";
export type MemberId = "mara" | "dan" | "ellie" | "leo";
export interface Member {
  id: MemberId;
  name: string;
  fullName: string;
  role: Role;
  age: number;
  initials: string;
  color: string;
  detail: string;
}
export type Category = "school" | "work" | "sports" | "appointment" | "family";
export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  end: string;
  member: MemberId;
  category: Category;
  location: string;
  repeat: string;
  note: string;
}
export interface Responsibility {
  id: string;
  title: string;
  member: MemberId;
  due: string;
  category: string;
  repeat: string;
  done: boolean;
  acknowledged: boolean;
  note: string;
  streak: number;
}
export interface Ride {
  id: string;
  member: MemberId;
  title: string;
  date: string;
  from: string;
  to: string;
  time: string;
  driver: MemberId | null;
  status: "requested" | "confirmed" | "complete";
  note: string;
}
export type PermissionStatus =
  "pending" | "approved" | "discussion" | "declined";
export interface Permission {
  id: string;
  member: MemberId;
  title: string;
  date: string;
  detail: string;
  condition: string;
  status: PermissionStatus;
}
export interface CheckIn {
  id: string;
  member: MemberId;
  message: string;
  time: string;
  note: string;
}
export interface Goal {
  id: string;
  member: MemberId;
  title: string;
  target: string;
  supporter: MemberId;
  steps: { title: string; done: boolean }[];
}
export interface FamilyUpdate {
  id: string;
  member: MemberId;
  title: string;
  message: string;
  time: string;
  acknowledgedBy: MemberId[];
}
export interface Milestone {
  id: string;
  member: MemberId;
  title: string;
  description: string;
  status: "established" | "in-progress" | "next";
  agreement: string;
}
export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  href: string;
}
export interface DemoState {
  members: Member[];
  events: FamilyEvent[];
  responsibilities: Responsibility[];
  rides: Ride[];
  permissions: Permission[];
  checkIns: CheckIn[];
  goals: Goal[];
  updates: FamilyUpdate[];
  milestones: Milestone[];
  notifications: Notification[];
}
