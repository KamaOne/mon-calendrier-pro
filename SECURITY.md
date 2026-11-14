# Politique de sécurité — Mon Calendrier Pro

**Dépôt :** https://github.com/KamaOne/mon-calendrier-pro
**Version concernée :** la dernière version publiée sur la branche `main` (fichier `index.html`).
**Application :** calendrier personnel 100 % local (HTML + JavaScript, aucun serveur, aucune donnée envoyée sur Internet).

## Signaler une vulnérabilité

- **En privé (recommandé)** : utilisez le signalement privé de GitHub → onglet *Security* du dépôt → *Signaler en privé une vulnérabilité* / *Report a vulnerability*. Vous êtes averti de la correction et crédité si vous le souhaitez.
- **Par une issue** : uniquement si la faille ne peut pas être exploitée (faute, documentation, amélioration générale). **Ne publiez jamais en issue publique un mot de passe, un code PIN, une sauvegarde chiffrée ou une étape d'exploitation.**
- Réponse visée : sous 7 jours. Chaque signalement sérieux reçoit une réponse écrite.

## Mesures intégrées à l'application

- **Données 100 % locales** : tout est stocké dans le navigateur (`localStorage`) ou dans vos propres fichiers de sauvegarde. Aucune connexion à un service externe, aucun traqueur, aucun compte.
- **Code PIN protégé** : jamais stocké en clair, hachage salé étiré sur 15 000 tours (SHA-256 itéré).
- **Blocage progressif** : après des erreurs répétées de code PIN ou de code de récupération, attente croissante imposée (30 s, 2 min, 5 min, 15 min).
- **Verrouillage automatique** : fermeture automatique de l'application après inactivité (par défaut 1 minute) si un code PIN est actif.
- **Sauvegardes chiffrées optionnelles** : export JSON protégé par mot de passe (AES-GCM 256, dérivation PBKDF2-SHA256, 150 000 itérations). Sans le mot de passe, le fichier est illisible.
- **Serveur de synchronisation optionnel** (`server.py`) : écoute uniquement sur `127.0.0.1` (la machine elle-même), jamais sur le réseau ni sur Internet.

## Périmètre et limites assumées

- L'application est conçue pour un usage personnel sur votre propre appareil. Elle ne prétend pas protéger contre quelqu'un qui possède le code PIN ou un accès complet à l'appareil.
- Une sauvegarde exportée **sans** mot de passe est un fichier JSON lisible par quiconque y accède : utilisez le chiffrement par mot de passe pour une clé USB, une carte micro SD ou un partage.
- Mot de passe de sauvegarde oublié = sauvegarde définitivement illisible (aucune récupération possible, par conception).

## Bonnes pratiques pour les contributeurs

- Toute modification doit rester sans dépendance externe (pas de CDN, pas d'appel réseau).
- Ne jamais introduire de stockage distant, de télémétrie ou de dépendance tierce.
- Toute amélioration de sécurité est bienvenue via les *Issues* puis les *Pull requests* : elle sera créditée à son auteur (avec son accord écrit).

---

Créé par KamaOne — Signature SG. Application libre et gratuite, à améliorer et sécuriser ensemble.
