export const dashboardMetrics = [
  { label: "Users", value: "12.4k", hint: "Active accounts" },
  { label: "Riders", value: "842", hint: "Online now" },
  { label: "Pending verification", value: "31", hint: "Needs review" },
  { label: "Trip requests", value: "186", hint: "This month" },
  { label: "Contact events", value: "509", hint: "Recorded today" },
  { label: "Payments", value: "$48.2k", hint: "Settled" },
];

export const users = [
  { id: 1, fullName: "Aline Uwase", email: "aline@example.com", role: "Client", status: "Active", lastSeen: "2m ago" },
  { id: 2, fullName: "Eric Ndayisenga", email: "eric@example.com", role: "Rider", status: "Pending", lastSeen: "11m ago" },
  { id: 3, fullName: "Mina Mukamana", email: "mina@example.com", role: "Admin", status: "Active", lastSeen: "1h ago" },
];

export const riders = [
  { id: 1, fullName: "Jean Mugisha", vehicleType: "Motorcycle", plateNumber: "RAA 123 A", verificationStatus: "Verified", online: true, rating: 4.8 },
  { id: 2, fullName: "Grace Umutoni", vehicleType: "Motorcycle", plateNumber: "RAA 456 B", verificationStatus: "Pending", online: false, rating: 4.6 },
  { id: 3, fullName: "Olivier Habimana", vehicleType: "Scooter", plateNumber: "RAA 789 C", verificationStatus: "Rejected", online: false, rating: 4.2 },
];

export const contactEvents = [
  { id: 1, client: "Aline Uwase", rider: "Jean Mugisha", status: "Recorded", createdAt: "2026-07-26 09:15" },
  { id: 2, client: "Mina Mukamana", rider: "Grace Umutoni", status: "Follow-up", createdAt: "2026-07-26 10:02" },
];

export const tripRequests = [
  { id: 1, client: "Aline Uwase", rider: "Jean Mugisha", status: "requested", createdAt: "2026-07-26 09:20" },
  { id: 2, client: "Mina Mukamana", rider: "Grace Umutoni", status: "accepted", createdAt: "2026-07-26 10:05" },
  { id: 3, client: "Olivier Habimana", rider: "Jean Mugisha", status: "completed", createdAt: "2026-07-26 11:30" },
];

export const notificationLogs = [
  { id: 1, contactEventId: 1, rider: "Jean Mugisha", status: "Sent", sentAt: "2026-07-26 09:16" },
  { id: 2, contactEventId: 2, rider: "Grace Umutoni", status: "Failed", sentAt: "2026-07-26 10:03" },
];

export const payments = [
  { id: 1, tripId: 1, client: "Aline Uwase", rider: "Jean Mugisha", amount: 2500, currency: "RWF", status: "Completed" },
  { id: 2, tripId: 2, client: "Mina Mukamana", rider: "Grace Umutoni", amount: 1800, currency: "RWF", status: "Pending" },
];

export const transactions = [
  { id: 1, paymentId: 1, provider: "Mobile Money", status: "Success", amount: 2500 },
  { id: 2, paymentId: 2, provider: "Card", status: "Pending", amount: 1800 },
];

export const roles = [
  { id: 1, name: "Super Admin", permissions: ["users", "riders", "config"], createdAt: "2026-06-01" },
  { id: 2, name: "Support", permissions: ["contact-events", "trip-requests"], createdAt: "2026-06-15" },
];

export const appConfig = {
  launchAreaCenter: "Kigali",
  launchAreaRadius: "5 km",
  defaultSearchRadius: "3 km",
  maximumSearchRadius: "10 km",
  locationUpdateInterval: "30s",
  minimumAppVersion: "2.1.0",
  maintenanceMode: false,
};
