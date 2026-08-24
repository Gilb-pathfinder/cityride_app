import type {
  AdminUser,
  AppConfig,
  ContactEvent,
  DashboardMetrics,
  NotificationLog,
  Payment,
  Rider,
  Role,
  Transaction,
  TripRequest,
  User,
} from "@/lib/types";

const KIGALI = { lat: -1.9441, lng: 30.0619 };

export const mockAdminUsers: AdminUser[] = [
  { id: "adm-1", fullName: "Aline Uwase", email: "admin@cityride.rw", roleId: "role-1", roleName: "Super Admin" },
  { id: "adm-2", fullName: "Eric Habimana", email: "eric.habimana@cityride.rw", roleId: "role-2", roleName: "Operations" },
];

export const mockRoles: Role[] = [
  { id: "role-1", name: "Super Admin", permissions: ["users.manage", "riders.verify", "config.manage", "roles.manage"], createdAt: "2025-01-10T09:00:00Z" },
  { id: "role-2", name: "Operations", permissions: ["riders.verify", "trip_requests.view", "contact_events.view"], createdAt: "2025-01-12T09:00:00Z" },
  { id: "role-3", name: "Support", permissions: ["users.view", "notification_logs.view"], createdAt: "2025-02-02T09:00:00Z" },
  { id: "role-4", name: "Finance", permissions: ["payments.view", "transactions.view"], createdAt: "2025-02-15T09:00:00Z" },
];

const riderNames = [
  "Jean Bosco Nkurunziza",
  "Claudine Mukamana",
  "Emmanuel Ntwari",
  "Solange Ingabire",
  "Patrick Rugamba",
  "Diane Umutoni",
  "Vincent Nshimiyimana",
  "Josiane Uwimana",
];

export const mockRiders: Rider[] = riderNames.map((fullName, i) => ({
  id: `rider-${i + 1}`,
  userId: `user-rider-${i + 1}`,
  fullName,
  phone: `+250 78${i} 12${i} 45${i}`,
  email: `${fullName.toLowerCase().split(" ")[0]}.${fullName.toLowerCase().split(" ")[1]}@mail.com`,
  vehicleType: i % 3 === 0 ? "car" : "moto",
  plateNumber: `RA${(D2(i))} ${789 + i}B`,
  licenseDocumentUrl: `/mock-docs/license-${i + 1}.pdf`,
  idDocumentUrl: `/mock-docs/id-${i + 1}.pdf`,
  verificationStatus: i < 3 ? "pending" : i < 6 ? "verified" : "rejected",
  verificationNotes: i >= 6 ? "Document image unreadable, requested resubmission." : undefined,
  online: i % 2 === 0,
  currentLocation: { lat: KIGALI.lat + i * 0.004, lng: KIGALI.lng + i * 0.003 },
  rating: i < 6 ? Number((4 + (i % 5) * 0.15).toFixed(1)) : undefined,
  createdAt: isoDaysAgo(30 - i * 2),
}));

function D2(n: number) {
  return String(10 + n);
}

const clientNames = [
  "Grace Mutesi",
  "Alex Byiringiro",
  "Divine Keza",
  "Olivier Habyarimana",
  "Sandrine Umulisa",
  "Fabrice Iradukunda",
  "Christine Umuhoza",
  "Yves Bizimana",
];

export const mockClients = clientNames.map((fullName, i) => ({
  id: `client-${i + 1}`,
  userId: `user-client-${i + 1}`,
  fullName,
  phone: `+250 73${i} 45${i} 67${i}`,
  email: `${fullName.toLowerCase().split(" ")[0]}@mail.com`,
  createdAt: isoDaysAgo(60 - i * 3),
}));

export const mockUsers: User[] = [
  ...mockRiders.map((r) => ({
    id: r.userId,
    fullName: r.fullName,
    email: r.email,
    phone: r.phone,
    role: "rider" as const,
    active: r.verificationStatus !== "rejected",
    lastSeenAt: isoHoursAgo(1 + Number(r.id.split("-")[1])),
    createdAt: r.createdAt,
  })),
  ...mockClients.map((c) => ({
    id: c.userId,
    fullName: c.fullName,
    email: c.email,
    phone: c.phone,
    role: "client" as const,
    active: true,
    lastSeenAt: isoHoursAgo(2 + Number(c.id.split("-")[1])),
    createdAt: c.createdAt,
  })),
];

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function isoHoursAgo(hours: number) {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

export const mockContactEvents: ContactEvent[] = Array.from({ length: 10 }).map((_, i) => {
  const client = mockClients[i % mockClients.length];
  const rider = mockRiders[(i + 2) % mockRiders.length];
  const statuses: ContactEvent["status"][] = ["connected", "connected", "initiated", "missed", "failed"];
  return {
    id: `ce-${i + 1}`,
    clientId: client.id,
    clientName: client.fullName,
    riderId: rider.id,
    riderName: rider.fullName,
    clientLocation: { lat: KIGALI.lat + i * 0.002, lng: KIGALI.lng - i * 0.002 },
    riderLocation: { lat: KIGALI.lat + i * 0.003, lng: KIGALI.lng - i * 0.001 },
    distanceKm: Number((0.4 + i * 0.35).toFixed(1)),
    contactMethod: i % 4 === 0 ? "in_app" : "call",
    status: statuses[i % statuses.length],
    createdAt: isoHoursAgo(2 + i * 3),
  };
});

const tripStatuses: TripRequest["status"][] = [
  "requested",
  "accepted",
  "in_progress",
  "completed",
  "completed",
  "cancelled",
  "rejected",
];

export const mockTripRequests: TripRequest[] = mockContactEvents
  .slice(0, 7)
  .map((ce, i) => ({
    id: `tr-${i + 1}`,
    contactEventId: ce.id,
    clientId: ce.clientId,
    clientName: ce.clientName,
    riderId: ce.riderId,
    riderName: ce.riderName,
    status: tripStatuses[i],
    originLabel: ["Kimironko", "Nyamirambo", "Remera", "Kacyiru", "Kicukiro", "Gikondo", "Nyarutarama"][i],
    destinationLabel: ["Downtown Kigali", "Kigali Heights", "Kacyiru", "Airport", "Sonatube", "Kigali Convention Centre", "Remera"][i],
    createdAt: ce.createdAt,
    updatedAt: isoHoursAgo(1 + i),
  }));

export const mockNotificationLogs: NotificationLog[] = mockContactEvents.map((ce, i) => ({
  id: `nl-${i + 1}`,
  contactEventId: ce.id,
  riderId: ce.riderId,
  riderName: ce.riderName,
  messageId: `msg-${1000 + i}`,
  status: ce.status === "failed" ? "failed" : i % 5 === 0 ? "pending" : "delivered",
  errorInfo: ce.status === "failed" ? "Push notification token expired." : undefined,
  sentAt: ce.createdAt,
}));

const paymentMethods: Payment["paymentMethod"][] = ["mobile_money", "mobile_money", "cash", "card"];
const paymentStatuses: Payment["status"][] = ["completed", "completed", "pending", "failed", "refunded"];

export const mockPayments: Payment[] = mockTripRequests
  .filter((t) => t.status === "completed" || t.status === "in_progress")
  .map((t, i) => ({
    id: `pay-${i + 1}`,
    tripRequestId: t.id,
    clientId: t.clientId,
    clientName: t.clientName,
    riderId: t.riderId,
    riderName: t.riderName,
    amount: 1200 + i * 450,
    currency: "RWF",
    paymentMethod: paymentMethods[i % paymentMethods.length],
    status: paymentStatuses[i % paymentStatuses.length],
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }));

export const mockTransactions: Transaction[] = mockPayments.map((p, i) => ({
  id: `txn-${i + 1}`,
  paymentId: p.id,
  provider: p.paymentMethod === "mobile_money" ? "MTN MoMo" : p.paymentMethod === "card" ? "Flutterwave" : "Cash Desk",
  providerReference: `REF-${9000 + i}`,
  status: p.status === "completed" ? "success" : p.status === "failed" ? "failed" : "pending",
  amount: p.amount,
  rawResponse: `{"reference":"REF-${9000 + i}","status":"${p.status}"}`,
  createdAt: p.createdAt,
}));

export const mockAppConfig: AppConfig = {
  launchAreaCenter: KIGALI,
  launchAreaRadiusKm: 25,
  defaultSearchRadiusKm: 5,
  maxSearchRadiusKm: 15,
  locationUpdateIntervalSec: 20,
  minAppVersion: "1.4.0",
  maintenanceMode: false,
};

export const mockDashboardMetrics: DashboardMetrics = {
  totalUsers: mockUsers.length,
  totalClients: mockClients.length,
  totalRiders: mockRiders.length,
  ridersPendingVerification: mockRiders.filter((r) => r.verificationStatus === "pending").length,
  activeRidersOnline: mockRiders.filter((r) => r.online).length,
  contactEventsToday: mockContactEvents.length,
  tripRequestsToday: mockTripRequests.length,
  tripRequestsInProgress: mockTripRequests.filter((t) => t.status === "in_progress").length,
  completedTripsToday: mockTripRequests.filter((t) => t.status === "completed").length,
  paymentsTotalToday: mockPayments.reduce((sum, p) => sum + p.amount, 0),
};
