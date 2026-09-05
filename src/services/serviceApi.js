import services from '../data/services';

export function getServices() {
  return services;
}

export function getServiceById(id) {
  return services.find((s) => s.id === id) || null;
}

export function searchServices(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return services.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
  );
}
