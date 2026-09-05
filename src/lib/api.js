/**
 * Adresse de l'API.
 *
 * La même règle qu'utilisaient déjà les trois formulaires, sortie ici pour ne
 * plus être recopiée dans chaque fichier : Django local en développement,
 * même origine en production, sauf si VITE_API_URL désigne un hôte séparé.
 */
export const apiBase =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");
