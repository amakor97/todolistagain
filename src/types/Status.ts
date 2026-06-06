const validStatuses = ["none", "awaiting", "inProgress", "completed"] as const;

export type Status = (typeof validStatuses)[number];

export function isValidStatus(status: string): status is Status {
  return validStatuses.includes(status as Status);
}