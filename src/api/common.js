// src/api/common.js
import api from "./api";

/**
 * Build a URL for the given resource and optional id.
 */
const buildUrl = (resource, id) => {
  const base = resource.startsWith("/") ? resource : `/${resource}`;
  return id === undefined || id === null ? base : `${base}/${encodeURIComponent(String(id))}`;
};

/**
 * Normalize Axios errors to a consistent shape.
 */
const normalizeError = (error) => {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const message = data?.message || data?.error || error?.message || "Something went wrong. Please try again.";

  const e = new Error(message);
  e.status = status;
  e.data = data;
  return e;
};

/**
 * Helper to unwrap { data } and normalize errors in one place.
 */
const handle = async (promise) => {
  try {
    const { data } = await promise;
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/** --------------------------
 *  Generic CRUD (unscoped)
 *  -------------------------- */
export const list = (resource, params = {}, config = {}) =>
  handle(api.get(buildUrl(resource), { params, ...config }));

export const get = (resource, id, params = {}, config = {}) =>
  handle(api.get(buildUrl(resource, id), { params, ...config }));

export const create = (resource, payload, config = {}) =>
  handle(api.post(buildUrl(resource), payload, { ...config }));

export const update = (resource, id, payload, config = {}) =>
  handle(api.put(buildUrl(resource, id), payload, { ...config }));

export const patch = (resource, id, payload, config = {}) =>
  handle(api.patch(buildUrl(resource, id), payload, { ...config }));

export const remove = (resource, id, config = {}) =>
  handle(api.delete(buildUrl(resource, id), { ...config }));

/**
 * Factory that returns a resource-scoped CRUD client.
 * Usage: const usersApi = crud('/users');
 */
export const crud = (resource) => ({
  list  : (params, config) => list(resource, params, config),
  get   : (id, params, config) => get(resource, id, params, config),
  create: (payload, config) => create(resource, payload, config),
  update: (id, payload, config) => update(resource, id, payload, config),
  patch : (id, payload, config) => patch(resource, id, payload, config),
  remove: (id, config) => remove(resource, id, config),
});

export default { list, get, create, update, patch, remove, crud };
