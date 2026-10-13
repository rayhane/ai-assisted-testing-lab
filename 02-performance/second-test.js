// =====================================================================
// second-test.js : version commentée et enrichie du premier test k6
// Objectif : comprendre options, stages, checks, thresholds, group,
//            métrique personnalisée et variables d'environnement.
//
// Lancer (depuis le dossier du fichier) :
//   k6 run second-test.js
// Changer l'adresse sans modifier le code :
//   k6 run -e BASE_URL=https://test.k6.io second-test.js
//
// RAPPEL : ne testez en charge que vos propres sites ou les sites de
// démonstration prévus pour cela (vérifiez l'URL dans la doc k6).
// =====================================================================
 
// ---------- 1. IMPORTS ----------
// http   : pour envoyer des requêtes HTTP
// check  : pour vérifier une réponse (sans arrêter le test)
// group  : pour regrouper des requêtes par étape métier dans le rapport
// sleep  : pour simuler le temps de réflexion d'un utilisateur
import http from 'k6/http';
import { check, group, sleep } from 'k6';
// Trend : un type de métrique personnalisée (stocke min, max, avg, percentiles)
import { Trend } from 'k6/metrics';
 
// ---------- 2. VARIABLE D'ENVIRONNEMENT ----------
// __ENV.BASE_URL lit la valeur passée avec -e BASE_URL=...
// Si elle n'existe pas, on utilise l'adresse par défaut après "||".
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';
 
// ---------- 3. MÉTRIQUE PERSONNALISÉE ----------
// Mesure à part le temps de réponse de la page d'accueil.
const homePageDuration = new Trend('home_page_duration');
 
// ---------- 4. OPTIONS DU TEST ----------
export const options = {
  // "stages" décrit le profil de charge dans le temps :
  stages: [
    { duration: '20s', target: 5 },  // montée : de 0 à 5 utilisateurs en 20 s
    { duration: '40s', target: 5 },  // palier : 5 utilisateurs pendant 40 s
    { duration: '10s', target: 0 },  // descente : retour à 0 en 10 s
  ],
 
  // "thresholds" = critères de réussite du test ENTIER.
  // Si un seuil est dépassé, k6 affiche ✗ et se termine en erreur
  // (très utile pour faire échouer une pipeline CI).
  thresholds: {
    http_req_failed: ['rate<0.01'],          // moins de 1 % de requêtes en échec
    http_req_duration: ['p(95)<1000'],       // 95 % des requêtes sous 1000 ms
    home_page_duration: ['p(95)<800'],       // seuil sur notre métrique perso
    checks: ['rate>0.99'],                   // plus de 99 % des checks réussis
  },
};
 
// ---------- 5. FONCTION PRINCIPALE ----------
// Exécutée en boucle par chaque utilisateur virtuel (VU).
// Un tour complet = une itération.
export default function () {
 
  // Étape 1 : la page d'accueil
  group('01 - Page d\'accueil', () => {
    const res = http.get(`${BASE_URL}/`);
 
    // On enregistre le temps de réponse dans notre métrique perso
    homePageDuration.add(res.timings.duration);
 
    // "check" vérifie la réponse. Un check qui échoue N'ARRÊTE PAS le test :
    // il est simplement compté dans la métrique "checks".
    check(res, {
      'accueil : statut 200': (r) => r.status === 200,
      'accueil : contenu non vide': (r) => r.body && r.body.length > 0,
      'accueil : réponse sous 1 s': (r) => r.timings.duration < 1000,
    });
  });
 
  sleep(1); // pause d'1 seconde : temps de réflexion de l'utilisateur
 
  // Étape 2 : une deuxième page (parcours utilisateur simple)
  group('02 - Page contacts', () => {
    const res = http.get(`${BASE_URL}/contacts.php`);
 
    check(res, {
      'contacts : statut 200': (r) => r.status === 200,
    });
  });
 
  // Pause aléatoire entre 1 et 3 secondes : plus réaliste qu'une pause fixe
  sleep(Math.random() * 2 + 1);
}
 