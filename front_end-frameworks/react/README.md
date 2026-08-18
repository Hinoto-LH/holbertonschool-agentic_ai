# React + Vite + Tailwind CSS

## General

### What is Vite

Vite est un outil de build frontend qui sert le code source pendant le
développement via des modules ES natifs, ce qui rend le rechargement quasi
instantané (Hot Module Replacement). Pour la production, il utilise Rolldown,
un bundler écrit en Rust, pour générer un bundle optimisé.

Depuis la version 8, Vite a remplacé ses deux briques historiques : Rollup par
Rolldown pour le bundling, et esbuild par Oxc pour les transformations. C'est
pour cette raison que les erreurs de compilation du projet sont signalées par
`[plugin:vite:oxc]`.

### What is React

React est une bibliothèque JavaScript maintenue par Meta qui permet de
construire des interfaces utilisateur en découpant l'application en
composants réutilisables. React gère le rendu de l'interface en fonction de
l'état (state) et des données (props) de chaque composant.

### What is a frontend build tool

Un build tool frontend est un programme qui transforme le code source
(JSX, CSS moderne, modules ES, etc.) en fichiers optimisés et compatibles
avec les navigateurs (HTML, CSS, JS minifiés). Il gère aussi le serveur de
développement, le bundling et l'optimisation des assets.

### What is a frontend component

Un composant frontend est un bloc autonome de l'interface (par exemple un
bouton, un header, une carte) qui regroupe sa structure, son style et son
comportement. Il peut être réutilisé à plusieurs endroits de l'application.

### What is component-based architecture

C'est une manière d'organiser une application en petits composants
indépendants et réutilisables, assemblés ensuite pour former des pages
complètes. Chaque composant a une responsabilité unique et communique avec
les autres via des props ou un state partagé.

### Why reusable components matter

Les composants réutilisables permettent d'éviter la duplication de code, de
faciliter la maintenance et de garder une interface cohérente. Un changement
sur un composant se répercute automatiquement partout où il est utilisé.

### Why frontend architecture matters

Une bonne architecture frontend rend le projet plus facile à comprendre, à
faire évoluer et à debugger. Elle permet à plusieurs personnes de travailler
sur le même projet sans se marcher dessus, et limite les régressions.

### What is a production build

Une production build est la version finale et optimisée de l'application,
générée à partir du code source (minification, suppression du code mort,
optimisation des assets). C'est cette version qui est déployée et servie
aux utilisateurs finaux.

### What is GitHub Pages

GitHub Pages est un service d'hébergement statique gratuit fourni par
GitHub. Il permet de publier directement le contenu d'un dépôt (ou d'une
branche spécifique) sous forme de site web accessible via une URL.

## React

### What is JSX

JSX (JavaScript XML) est une extension de syntaxe qui permet d'écrire du
code ressemblant à du HTML directement dans du JavaScript. Il est ensuite
transformé en appels de fonctions React (React.createElement) lors du
build.

### What is a prop in React

Une prop (property) est une donnée transmise d'un composant parent vers un
composant enfant. Les props sont en lecture seule : le composant enfant ne
peut pas les modifier directement.

### What is state in React

Le state est une donnée interne à un composant qui peut changer au cours du
temps (par exemple suite à une action utilisateur). Quand le state change,
React redessine automatiquement le composant concerné.

### What is reactive rendering

Le rendu réactif signifie que l'interface se met à jour automatiquement
dès que les données dont elle dépend (state ou props) changent, sans avoir
à manipuler le DOM manuellement.

### What is conditional rendering

Le rendu conditionnel consiste à afficher ou non un élément de l'interface
en fonction d'une condition (par exemple avec un opérateur ternaire ou un
if), comme afficher un message d'erreur seulement si une erreur existe.

### What is dynamic rendering

Le rendu dynamique consiste à générer une partie de l'interface à partir de
données variables, par exemple en bouclant sur un tableau avec `map` pour
afficher une liste d'éléments.

### How to organize a React project

En général, on sépare le code en dossiers clairs : `components` pour les
éléments réutilisables, `sections` ou `pages` pour les blocs de page,
`assets` pour les images, et un point d'entrée `App.jsx` qui assemble le
tout.

### How to create React components

Un composant React est simplement une fonction JavaScript qui retourne du
JSX. On la déclare avec une majuscule au début du nom et on l'exporte pour
pouvoir l'utiliser dans d'autres fichiers.

```jsx
function Header() {
  return <h1>Mon titre</h1>;
}

export default Header;
```

### How to structure reusable UI elements

On isole chaque élément visuel dans son propre composant, avec des props
pour personnaliser son contenu ou son comportement, afin de pouvoir le
réutiliser dans différents contextes sans dupliquer de code.

### How to pass data with props

On passe une prop comme un attribut HTML lors de l'utilisation du
composant, puis on la récupère en paramètre de la fonction du composant.

```jsx
<Button label="Envoyer" />;

function Button({ label }) {
  return <button>{label}</button>;
}
```

### How to manage state

On utilise le hook `useState` pour déclarer une variable d'état et une
fonction pour la mettre à jour. Chaque appel à cette fonction déclenche un
nouveau rendu du composant.

```jsx
const [count, setCount] = useState(0);
```

### How to render dynamic content

On utilise des expressions JavaScript entre accolades `{}` dans le JSX,
combinées à des méthodes comme `map` pour transformer des données en
éléments affichés.

### How to handle user interactions

On attache des gestionnaires d'événements directement dans le JSX, par
exemple `onClick`, `onChange` ou `onSubmit`, qui déclenchent des fonctions
JavaScript en réponse à l'action de l'utilisateur.

## UI and Accessibility

### What is semantic HTML

Le HTML sémantique consiste à utiliser des balises qui décrivent le sens du
contenu plutôt que sa seule apparence (`header`, `nav`, `main`, `footer`,
`article`), ce qui améliore la lisibilité du code et l'accessibilité.

### What is responsive design

Le design responsive consiste à construire une interface qui s'adapte
automatiquement à la taille de l'écran (mobile, tablette, ordinateur), en
général grâce à des unités flexibles et des media queries.

### What is accessibility

L'accessibilité (a11y) consiste à concevoir une interface utilisable par
le plus grand nombre de personnes possible, y compris celles qui utilisent
un lecteur d'écran, un clavier seul, ou qui ont des difficultés visuelles.

## Tailwind CSS

### How utility-first CSS works

Tailwind CSS fournit de petites classes utilitaires (comme `flex`,
`text-center`, `p-4`) qu'on combine directement dans le HTML pour styliser
un élément, au lieu d'écrire des feuilles de style CSS séparées.

### How to style components with Tailwind CSS

On applique des classes utilitaires directement sur l'attribut `className`
des éléments JSX pour définir leurs couleurs, espacements, tailles de
police, etc.

```jsx
<h1 className="text-4xl font-bold text-red-500">Titre</h1>
```

### How to structure layouts with Flexbox and Grid

Tailwind propose des classes dédiées comme `flex`, `justify-center`,
`items-center` pour Flexbox, et `grid`, `grid-cols-3`, `gap-4` pour Grid,
permettant de construire des mises en page complexes sans CSS custom.

### How responsive utility classes work

Tailwind utilise des préfixes comme `sm:`, `md:`, `lg:` pour appliquer une
classe uniquement à partir d'une certaine largeur d'écran, par exemple
`md:flex-row` pour passer en ligne à partir de la taille tablette.

## API Consumption

### How asynchronous requests work

Une requête asynchrone permet d'envoyer une demande (par exemple à un
serveur) sans bloquer l'exécution du reste du programme. En JavaScript, on
utilise généralement `async/await` ou des promesses pour gérer le résultat
une fois qu'il est disponible.

### How to fetch external data

On utilise l'API `fetch` (ou une librairie comme axios) pour récupérer des
données depuis une URL, puis on convertit la réponse en JSON avant de
l'utiliser dans le composant.

```jsx
useEffect(() => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => setData(data));
}, []);
```

### How to display dynamic content from an external file simulating an API

On place un fichier JSON dans le projet (par exemple dans `public/`) pour
simuler une API, on le récupère avec `fetch`, puis on affiche son contenu
dans le composant en utilisant `map` pour parcourir les données.

### How to manage loading states

On déclare un state booléen (par exemple `isLoading`) initialisé à `true`,
qu'on passe à `false` une fois la réponse reçue. On affiche un indicateur
de chargement tant que ce state est actif, puis le contenu une fois les
données disponibles.
