// Types mirror the approved CityRide database schema / API specification.
// The frontend must not invent fields or entities beyond this contract.

export type Locale = "en" | "rw" | "fr";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type TripRequestStatus =
  | "requested"
  | "accepted"
  | "rejected"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ContactEventStatus = "initiated" | "connected" | "missed" | "failed";

export type NotificationStatus = "sent" | "delivered" | "failed" | "pending";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type TransactionStatus = "pending" | "success" | "failed";

export type PaymentMethod = "mobile_money" | "cash" | "card";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "client" | "rider";
  roleId?: string;
  active: boolean;
  lastSeenAt: string;
  createdAt: string;
}

export interface Client {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface Rider {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  vehicleType: "moto" | "car" | "tricycle";
  plateNumber: string;
  licenseDocumentUrl: string;
  idDocumentUrl: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  online: boolean;
  currentLocation?: { lat: number; lng: number };
  rating?: number;
  createdAt: string;
}

export interface ContactEvent {
  id: string;
  clientId: string;
  clientName: string;
  riderId: string;
  riderName: string;
  clientLocation: { lat: number; lng: number };
  riderLocation: { lat: number; lng: number };
  distanceKm: number;
  contactMethod: "call" | "in_app";
  status: ContactEventStatus;
  createdAt: string;
}

export interface TripRequest {
  id: string;
  contactEventId: string;
  clientId: string;
  clientName: string;
  riderId: string;
  riderName: string;
  status: TripRequestStatus;
  originLabel: string;
  destinationLabel: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationLog {
  id: string;
  contactEventId: string;
  riderId: string;
  riderName: string;
  messageId: string;
  status: NotificationStatus;
  errorInfo?: string;
  sentAt: string;
}

export interface Payment {
  id: string;
  tripRequestId: string;
  clientId: string;
  clientName: string;
  riderId: string;
  riderName: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  paymentId: string;
  provider: string;
  providerReference: string;
  status: TransactionStatus;
  amount: number;
  rawResponse?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  createdAt: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  roleId: string;
  roleName: string;
}

export interface AppConfig {
  launchAreaCenter: { lat: number; lng: number };
  launchAreaRadiusKm: number;
  defaultSearchRadiusKm: number;
  maxSearchRadiusKm: number;
  locationUpdateIntervalSec: number;
  minAppVersion: string;
  maintenanceMode: boolean;
}

export interface DashboardMetrics {
  totalUsers: number;
  totalClients: number;
  totalRiders: number;
  ridersPendingVerification: number;
  activeRidersOnline: number;
  contactEventsToday: number;
  tripRequestsToday: number;
  tripRequestsInProgress: number;
  completedTripsToday: number;
  paymentsTotalToday: number;
}
