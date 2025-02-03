# Devoir-ci-cd

## Configuration

Ce projet contient une **API Node.js** avec plusieurs endpoints, testés à l'aide du package **Jest**.

L'intégration continue (CI) tourne sur une machine **Ubuntu 22.04** et s'exécute dans les cas suivants :
- À **chaque pull request** vers la branche `main`.
- À **chaque push** vers `main` avec un **tag** au format : `[0-9]+.[0-9]+.[0-9]+` (ex: `1.0.0`).


## Les étapes de la CI
### 1️⃣ **Linting**
- Récupération du code source.
- Analyse du **Dockerfile** avec `hadolint` pour respecter les bonnes pratiques.
- Construction de l'image Docker.
- Lancement du lint du code avec `npm run lint`.

### 2️⃣ **Tests**
- Récupération du code source.
- Reconstruction de l'image Docker.
- Exécution des tests avec `npm test` (Jest).

**Cette étape ne démarre que si le linting a réussi.** 

### 3️⃣ **Déploiement**
- Récupération du code source.
- Connexion à **Docker Hub**.
- Construction et push de l’image Docker :
  - **Si un tag est détecté**, l'image est poussée avec le tag correspondant (`x.y.z`).
  - **Si le commit est sur `main`**, l'image est poussée avec le tag `unstable`.

**Cette étape ne démarre que si les tests ont réussi.**

---

## Le livrable

- **Une API Node.js**
- **Un pipeline de déploiement continu** (CI/CD)

---

## Cycle de vie du déploiement/livraison

- **À chaque commit sur `main` ou lorsqu'un tag est détecté :**
  1. Le code est **linté**.
  2. Les tests sont **exécutés**.
  3. L'image Docker est **déployée** vers **Docker Hub** et **GitHub**.

---

### ** Remarque**
Chaque étape dépend de la précédente grâce au paramètre **`needs: []`**, garantissant qu'un échec bloque la suite du pipeline.
