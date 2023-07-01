const mapping: Record<string, string> = {
  businesses: 'business',
  purchases: 'purchase',
  tokens: 'token',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
