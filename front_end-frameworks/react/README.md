# React + Vite + Tailwind CSS

## General

### What is Vite

Vite est un outil de build frontend qui sert le code source pendant le
developpement via des modules ES natifs, ce qui rend le rechargement quasi
instantane (Hot Module Replacement). Pour la production, il utilise Rollup
pour generer un bundle optimise.

### What is React

React est une bibliotheque JavaScript maintenue par Meta qui permet de
construire des interfaces utilisateur en decoupant l'application en
composants reutilisables. React gere le rendu de l'interface en fonction de
l'etat (state) et des donnees (props) de chaque composant.

### What is a frontend build tool

Un build tool frontend est un programme qui transforme le code source
(JSX, CSS moderne, modules ES, etc.) en fichiers optimises et compatibles
avec les navigateurs (HTML, CSS, JS minifies). Il gere aussi le serveur de
developpement, le bundling et l'optimisation des assets.

### What is a frontend component

Un composant frontend est un bloc autonome de l'interface (par exemple un
bouton, un header, une carte) qui regroupe sa structure, son style et son
comportement. Il peut etre reutilise a plusieurs endroits de l'application.

### What is component-based architecture

C'est une maniere d'organiser une application en petits composants
independants et reutilisables, assembles ensuite pour former des pages
completes. Chaque composant a une responsabilite unique et communique avec
les autres via des props ou un state partage.

### Why reusable components matter

Les composants reutilisables permettent d'eviter la duplication de code, de
faciliter la maintenance et de garder une interface coherente. Un changement
sur un composant se repercute automatiquement partout ou il est utilise.

### Why frontend architecture matters

Une bonne architecture frontend rend le projet plus facile a comprendre, a
faire evoluer et a debugger. Elle permet a plusieurs personnes de travailler
sur le meme projet sans se marcher dessus, et limite les regressions.

### What is a production build

Une production build est la version finale et optimisee de l'application,
generee a partir du code source (minification, suppression du code mort,
optimisation des assets). C'est cette version qui est deployee et servie
aux utilisateurs finaux.

### What is GitHub Pages

GitHub Pages est un service d'hebergement statique gratuit fourni par
GitHub. Il permet de publier directement le contenu d'un depot (ou d'une
branche specifique) sous forme de site web accessible via une URL.

## React

### What is JSX

JSX (JavaScript XML) est une extension de syntaxe qui permet d'ecrire du
code ressemblant a du HTML directement dans du JavaScript. Il est ensuite
transforme en appels de fonctions React (React.createElement) lors du
build.

### What is a prop in React

Une prop (property) est une donnee transmise d'un composant parent vers un
composant enfant. Les props sont en lecture seule : le composant enfant ne
peut pas les modifier directement.

### What is state in React

Le state est une donnee interne a un composant qui peut changer au cours du
temps (par exemple suite a une action utilisateur). Quand le state change,
React redessine automatiquement le composant concerne.

### What is reactive rendering

Le rendu reactif signifie que l'interface se met a jour automatiquement
des que les donnees dont elle depend (state ou props) changent, sans avoir
a manipuler le DOM manuellement.

### What is conditional rendering

Le rendu conditionnel consiste a afficher ou non un element de l'interface
en fonction d'une condition (par exemple avec un operateur ternaire ou un
if), comme afficher un message d'erreur seulement si une erreur existe.

### What is dynamic rendering

Le rendu dynamique consiste a generer une partie de l'interface a partir de
donnees variables, par exemple en bouclant sur un tableau avec `map` pour
afficher une liste d'elements.

### How to organize a React project

En general, on separe le code en dossiers clairs : `components` pour les
elements reutilisables, `sections` ou `pages` pour les blocs de page,
`assets` pour les images, et un point d'entree `App.jsx` qui assemble le
tout.

### How to create React components

Un composant React est simplement une fonction JavaScript qui retourne du
JSX. On la declare avec une majuscule au debut du nom et on l'exporte pour
pouvoir l'utiliser dans d'autres fichiers.

```jsx
function Header() {
  return <h1>Mon titre</h1>;
}

export default Header;
```

### How to structure reusable UI elements

On isole chaque element visuel dans son propre composant, avec des props
pour personnaliser son contenu ou son comportement, afin de pouvoir le
reutiliser dans differents contextes sans dupliquer de code.

### How to pass data with props

On passe une prop comme un attribut HTML lors de l'utilisation du
composant, puis on la recupere en parametre de la fonction du composant.

```jsx
<Button label="Envoyer" />;

function Button({ label }) {
  return <button>{label}</button>;
}
```

### How to manage state

On utilise le hook `useState` pour declarer une variable d'etat et une
fonction pour la mettre a jour. Chaque appel a cette fonction declenche un
nouveau rendu du composant.

```jsx
const [count, setCount] = useState(0);
```

### How to render dynamic content

On utilise des expressions JavaScript entre accolades `{}` dans le JSX,
combinees a des methodes comme `map` pour transformer des donnees en
elements affiches.

### How to handle user interactions

On attache des gestionnaires d'evenements directement dans le JSX, par
exemple `onClick`, `onChange` ou `onSubmit`, qui declenchent des fonctions
JavaScript en reponse a l'action de l'utilisateur.

## UI and Accessibility

### What is semantic HTML

Le HTML semantique consiste a utiliser des balises qui decrivent le sens du
contenu plutot que sa seule apparence (`header`, `nav`, `main`, `footer`,
`article`), ce qui ameliore la lisibilite du code et l'accessibilite.

### What is responsive design

Le design responsive consiste a construire une interface qui s'adapte
automatiquement a la taille de l'ecran (mobile, tablette, ordinateur), en
general grace a des unites flexibles et des media queries.

### What is accessibility

L'accessibilite (a11y) consiste a concevoir une interface utilisable par
le plus grand nombre de personnes possible, y compris celles qui utilisent
un lecteur d'ecran, un clavier seul, ou qui ont des difficultes visuelles.

## Tailwind CSS

### How utility-first CSS works

Tailwind CSS fournit de petites classes utilitaires (comme `flex`,
`text-center`, `p-4`) qu'on combine directement dans le HTML pour styliser
un element, au lieu d'ecrire des feuilles de style CSS separees.

### How to style components with Tailwind CSS

On applique des classes utilitaires directement sur l'attribut `className`
des elements JSX pour definir leurs couleurs, espacements, tailles de
police, etc.

```jsx
<h1 className="text-4xl font-bold text-red-500">Titre</h1>
```

### How to structure layouts with Flexbox and Grid

Tailwind propose des classes dediees comme `flex`, `justify-center`,
`items-center` pour Flexbox, et `grid`, `grid-cols-3`, `gap-4` pour Grid,
permettant de construire des mises en page complexes sans CSS custom.

### How responsive utility classes work

Tailwind utilise des prefixes comme `sm:`, `md:`, `lg:` pour appliquer une
classe uniquement a partir d'une certaine largeur d'ecran, par exemple
`md:flex-row` pour passer en ligne a partir de la taille tablette.

## API Consumption

### How asynchronous requests work

Une requete asynchrone permet d'envoyer une demande (par exemple a un
serveur) sans bloquer l'execution du reste du programme. En JavaScript, on
utilise generalement `async/await` ou des promesses pour gerer le resultat
une fois qu'il est disponible.

### How to fetch external data

On utilise l'API `fetch` (ou une librairie comme axios) pour recuperer des
donnees depuis une URL, puis on convertit la reponse en JSON avant de
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
simuler une API, on le recupere avec `fetch`, puis on affiche son contenu
dans le composant en utilisant `map` pour parcourir les donnees.

### How to manage loading states

On declare un state booleen (par exemple `isLoading`) initialise a `true`,
qu'on passe a `false` une fois la reponse recue. On affiche un indicateur
de chargement tant que ce state est actif, puis le contenu une fois les
donnees disponibles.
