# Devoir-ci-cd

## Configuration

Le projet est composé d'une api en nodejs avec quelques endpoint qui sont testé avec le package jest

Chacune des étapes de la CI tourne sur une machine : ubuntu-22.04, elle s'éxécute à chaque pull request vers la main ou à chaque push vers la main avec un tag dans ce format là : - '[0-9]+.[0-9]+.[0-9]+'

## Les étapes de la CI

- Première étape c'est le linting, on récupere le code, ensuite on va Lint du dockerFile avec hadolint pour récupérer les bonnes pratiques, puis on build le docker file et enfin on Lint le code
- Seconde étape c'est le lancement des tests, là aussi on récupère le code, on reconstruit l'image docker puis on lance les tests (jest)
- Troisième étape c'est le dépoloiement, on récupère le code une nouvelle fois, on ce connecte au docker hub, on build et pousse seulement si on à un tag de détécté ou si on pousse sur la branche main

  A savoir pour lancer la deuxième étape on vérifie bien que la première à réussi et pareil pour la troisième on vérifie que la deuxième est passé, en se servant de need[''] à chaque fois


# Le livrable (projet)

- Retour Hello World


# Le cycle de vie déploiement/livraison

- A chaque commit le code poussé est testé

