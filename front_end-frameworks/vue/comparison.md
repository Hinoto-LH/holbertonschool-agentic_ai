# React vs Vue.js

Analyse comparative menée à partir de la migration réelle de la landing page
"Agentic AI" : `front_end-frameworks/react/` et `front_end-frameworks/vue/`.
Les deux projets contiennent les mêmes 7 sections, les mêmes données et le
même rendu visuel. Tous les exemples de ce document sont extraits de ces deux
bases de code.

## Components

### How React components are created

Un composant React est une fonction JavaScript qui retourne du JSX. Le nom
commence par une majuscule et le composant est exporté pour être importé
ailleurs.

```jsx
function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 p-6">
      <p className="text-3xl font-bold text-violet-300">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default StatCard;
```

Un fichier `.jsx` peut contenir plusieurs composants. Dans le projet React,
`Footer.jsx` déclarait ainsi deux composants : `LinkColumn` et `Footer`.

### How Vue components are created

Un composant Vue est un fichier `.vue` appelé Single File Component (SFC). Il
regroupe jusqu'à trois blocs : `<script setup>` pour la logique, `<template>`
pour le balisage, `<style>` pour les styles.

```vue
<script setup>
defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
});
</script>

<template>
  <div class="rounded-xl border border-slate-800 p-6">
    <p class="text-3xl font-bold text-violet-300">{{ value }}</p>
    <p class="text-sm text-slate-500">{{ label }}</p>
  </div>
</template>
```

Il n'y a ni `return`, ni `export default` : le fichier est le composant. Et un
fichier ne peut contenir qu'un seul composant.

### Similarities between both approaches

- même unité de découpage : un bloc autonome, réutilisable, nommé en PascalCase
- même flux de données : les props descendent du parent vers l'enfant
- même composition : un composant en assemble d'autres
- même séparation entre données et présentation

Sur les 22 fichiers migrés, la structure logique n'a jamais changé. Seule la
syntaxe a été traduite.

### Differences between both approaches

| | React | Vue |
|---|---|---|
| Unité | une fonction | un fichier |
| Composants par fichier | plusieurs possibles | un seul |
| Export | `export default` obligatoire | implicite |
| Retour | `return (...)` | bloc `<template>` |
| Styles locaux | aucune solution native | `<style scoped>` |

La contrainte "un composant par fichier" a eu un effet concret : `LinkColumn`,
qui vivait dans `Footer.jsx`, a dû devenir `ui/LinkColumn.vue`. C'est la seule
différence structurelle de toute la migration, et elle a rendu ce composant
réutilisable ailleurs, ce qu'il n'était pas auparavant.

## Templates

### JSX

JSX est une extension de syntaxe qui permet d'écrire du balisage dans du
JavaScript. Il est compilé en appels de fonction (`_jsx()` depuis React 17).

C'est du JavaScript : toutes les constructions du langage y sont disponibles.

```jsx
{features.map((feature) => (
  <FeatureCard key={feature.title} {...feature} />
))}

{erreur && <p className="text-sm">{erreur}</p>}
```

Une règle structure tout le reste : **la casse du nom de balise décide de ce
qui est rendu**. Minuscule, le compilateur écrit une chaîne et produit une
balise HTML. Majuscule, il écrit la variable et produit ce qu'elle contient.

### Vue templates

Un template Vue est du HTML valide, enrichi de directives préfixées `v-`.

```vue
<FeatureCard
  v-for="feature in features"
  :key="feature.title"
  v-bind="feature"
/>

<p v-if="erreur" class="text-sm">{{ erreur }}</p>
```

Le template est compilé en fonction de rendu. Comme c'est du HTML, les
attributs gardent leur nom d'origine : `class`, `for`, `autocomplete`.

Deux syntaxes de liaison :

- `{{ }}` pour interpoler du texte dans le contenu
- `:` (raccourci de `v-bind`) pour lier un attribut à une expression

### Advantages and disadvantages of each approach

**JSX - avantages**

- une seule syntaxe à connaître : JavaScript
- expressivité maximale, aucune limite de langage
- les outils JavaScript standard fonctionnent tels quels

**JSX - inconvénients**

- les erreurs sont souvent silencieuses. Écrire `<icon />` au lieu de
  `<Icon />` ne produit aucune erreur : le navigateur crée une balise
  `<icon>` vide et invisible. Ce bug précis a coûté plusieurs heures pendant
  la tâche 4 du projet React.
- le balisage est noyé dans la logique
- les mots réservés de JavaScript imposent des renommages : `className`,
  `htmlFor`

**Templates Vue - avantages**

- lisibles par quelqu'un qui ne connaît que le HTML
- le compilateur détecte des erreurs à l'avance
- pas de renommage d'attributs
- les directives portent leur intention : `v-if` dit "condition", là où `&&`
  demande de deviner

**Templates Vue - inconvénients**

- un vocabulaire spécifique à apprendre
- moins souple pour une logique de rendu complexe
- l'extension `.vue` est obligatoire dans les imports, contrairement à `.jsx`

## Props

### React props

Les props arrivent dans un **objet unique**, premier et seul argument de la
fonction. On le destructure dans la signature.

```jsx
function InsightCard({ image, title, description, category, index }) { ... }
```

Aucune vérification de type sans TypeScript. Une prop manquante vaut
`undefined` sans avertissement.

Pour transmettre les props non déclarées, il faut les collecter et les
réétaler manuellement :

```jsx
function Button({ children, href, ...rest }) {
  return <Tag {...rest}>{children}</Tag>;
}
```

### Vue props

Les props sont **déclarées** avec la macro `defineProps`, qui permet de
préciser le type, le caractère obligatoire et la valeur par défaut.

```js
const props = defineProps({
  href: { type: String, default: undefined },
  variant: { type: String, default: "primary" },
  external: { type: Boolean, default: false },
  index: { type: Number, required: true },
});
```

Vue avertit en console si le type ne correspond pas ou si une prop `required`
manque.

Dans le script, il faut écrire `props.variant`. Dans le template, `variant`
suffit : Vue déballe automatiquement.

### Similarities and differences

**Similitudes**

- descendantes : du parent vers l'enfant, jamais l'inverse
- en lecture seule dans l'enfant
- acceptent n'importe quelle valeur, y compris un composant
- une syntaxe d'étalement : `{...obj}` en JSX, `v-bind="obj"` en Vue

**Différences**

| | React | Vue |
|---|---|---|
| Déclaration | destructuration | `defineProps` |
| Types | aucun contrôle natif | `type:` vérifié à l'exécution |
| Obligatoire | non exprimable | `required: true` |
| Valeur non-chaîne | `count={3}` | `:count="3"` |
| Contenu | prop `children` | élément `<slot />` |
| Attributs non déclarés | `...rest` manuel | transmission automatique |

Deux conséquences pratiques observées pendant la migration.

**La prop `className` a disparu de tous les composants.** En React, il fallait
la déclarer et la concaténer soi-même pour laisser l'appelant ajouter des
marges. En Vue, un `class` posé sur un composant est automatiquement fusionné
avec celui de l'élément racine.

**Le renommage `icon: Icon` a disparu.** En React, ce renommage n'était pas un
choix de style : il était imposé par la règle de casse de JSX. En Vue,
`<component :is="icon" />` est explicite, la casse n'entre pas en jeu.

## State management

### React state management

`useState` renvoie une paire : la valeur et une fonction de mise à jour. La
valeur ne peut jamais être modifiée directement.

```jsx
const [formData, setFormData] = useState({ name: "", email: "", message: "" });

setFormData((prev) => ({ ...prev, [name]: value }));
```

Point essentiel : **la valeur d'état est un instantané figé pendant toute la
durée d'un rendu**. Lire la variable juste après avoir appelé le setter
renvoie l'ancienne valeur.

```jsx
setErreur("Impossible de charger.");
console.log(erreur); // affiche "" - l'ancienne valeur
```

En contrepartie, tout le corps du composant est réexécuté à chaque rendu, donc
les valeurs dérivées sont de simples constantes :

```jsx
const isNameValid = formData.name.trim().length >= 2;
```

### Vue reactive state

Vue propose deux outils.

`ref` enveloppe n'importe quelle valeur. On y accède par `.value` dans le
script, directement dans le template.

```js
const isSending = ref(false);

isSending.value = true;
```

`reactive` ne fonctionne que sur des objets, mais rend chaque propriété
réactive sans `.value`.

```js
const formData = reactive({ name: "", email: "", message: "" });

formData.name = "Ada";
```

La valeur est **à jour immédiatement** : le piège du `console.log` de React
n'existe pas.

En revanche, `<script setup>` ne s'exécute qu'**une seule fois**, au montage.
Une valeur dérivée doit donc être déclarée `computed` pour rester vivante :

```js
const isNameValid = computed(() => formData.name.trim().length >= 2);
```

Une simple `const` resterait figée sur sa valeur initiale, et le bouton du
formulaire ne s'activerait jamais.

### Similarities and differences

**Similitudes**

- l'état est local au composant, isolé entre instances
- le modifier déclenche la mise à jour de l'interface
- même règle : ne pas stocker ce qui peut être calculé

**Différences**

| | React | Vue |
|---|---|---|
| Déclaration | `useState` | `ref` / `reactive` |
| Écriture | via un setter | affectation directe |
| Lecture après écriture | ancienne valeur | nouvelle valeur |
| Valeur dérivée | une `const` suffit | `computed` obligatoire |
| Modèle mental | tout est recalculé | dépendances suivies |

C'est la différence la plus profonde entre les deux frameworks. React ne
surveille rien : quand un état change, il réexécute la fonction du composant
entière et compare le résultat avec le rendu précédent. Vue enveloppe les
données dans un `Proxy`, enregistre qui lit quoi pendant le rendu, et ne
réexécute que ce qui dépend de la donnée modifiée.

En pratique : React demande de ne jamais penser à la réactivité, Vue demande
de la déclarer explicitement.

## Lifecycle

### React lifecycle logic

React n'a pas de hook de cycle de vie dédié dans les composants fonctionnels.
`useEffect` couvre tous les cas, et son second argument détermine quand
l'effet se rejoue.

```jsx
useEffect(() => {
  async function charger() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (error) {
      setErreur("Unable to load the insights.");
    }
  }
  charger();
}, []);
```

| Tableau | Comportement |
|---|---|
| absent | après chaque rendu |
| `[]` | une seule fois, au montage |
| `[a, b]` | au montage, puis quand `a` ou `b` change |

Deux contraintes notables. Le callback ne peut pas être `async` : React attend
soit rien, soit une fonction de nettoyage, or une fonction `async` renvoie une
Promise. Il faut donc déclarer une fonction interne puis l'appeler.

Et un effet en `[]` ne se rejoue jamais tant que le composant n'est pas
démonté. Pendant la tâche 5, modifier le service ne changeait rien à l'écran :
le rechargement à chaud de Vite ne démonte pas le composant, il fallait
recharger la page entière.

### Vue lifecycle logic

Vue expose des hooks distincts pour chaque moment : `onMounted`, `onUpdated`,
`onUnmounted`.

```js
onMounted(async () => {
  try {
    insights.value = await getInsights();
  } catch (error) {
    erreur.value = "Unable to load the insights.";
  }
});
```

Pas de tableau de dépendances : `onMounted` s'exécute au montage, par
définition. Et il accepte directement une fonction `async`.

Pour réagir à un changement, Vue a un outil séparé : `watch`.

### Similarities and differences

**Similitudes**

- même moment d'exécution : après l'insertion dans le DOM
- même usage : appels réseau, minuteurs, écouteurs
- même principe de nettoyage au démontage

**Différences**

| | React | Vue |
|---|---|---|
| API | `useEffect` pour tout | un hook par moment |
| Montage | `useEffect(fn, [])` | `onMounted(fn)` |
| Réaction à un changement | même `useEffect` | `watch` / `watchEffect` |
| Fonction async | interdite, fonction interne requise | acceptée directement |
| Dépendances | à maintenir à la main | aucune |

Le code de la section Insights est passé de 12 à 8 lignes, et deux sources
d'erreur ont disparu : le tableau de dépendances et la fonction interne.

En contrepartie, `useEffect` est plus général : un seul mécanisme couvre ce
que Vue répartit entre `onMounted`, `onUpdated`, `onUnmounted` et `watch`.

## Conditional rendering

### React conditional rendering

React utilise les opérateurs de JavaScript.

```jsx
{erreur && <p className="text-sm">{erreur}</p>}

{isSending ? "Sending..." : "Send message"}
```

Un piège connu : avec un nombre, `0 && <p />` affiche `0` à l'écran, parce que
`&&` renvoie l'opérande de gauche quand elle est fausse, et que React affiche
`0` comme du contenu valide.

### Vue conditional rendering

Vue utilise des directives dédiées.

```vue
<p v-if="erreur" class="text-sm">{{ erreur }}</p>

<p v-if="error">{{ error }}</p>
<p v-else-if="isLoading">Chargement...</p>
<p v-else>Prêt.</p>
```

Vue distingue deux comportements :

- `v-if` retire l'élément du DOM
- `v-show` le garde et bascule `display: none`

On choisit `v-if` quand la condition change rarement, `v-show` quand elle
bascule souvent.

### Similarities and differences

**Similitudes**

- même résultat visuel
- même coût : un élément non affiché n'est pas rendu (avec `v-if`)

**Différences**

| | React | Vue |
|---|---|---|
| Mécanisme | opérateurs JavaScript | directives |
| Chaîne de conditions | ternaires imbriqués | `v-else-if` / `v-else` |
| Masquer sans retirer | style manuel | `v-show` |
| Piège du zéro | présent | absent |

Vue est plus lisible sur les chaînes de conditions. React est plus souple dès
que la logique sort du simple booléen.

## Dynamic rendering

### React dynamic rendering

React transforme un tableau en éléments avec `.map()`.

```jsx
{insights.map((insight, index) => (
  <InsightCard
    key={insight.category}
    index={index}
    image={insight.image}
    title={insight.title}
  />
))}
```

La prop `key` donne une identité stable à chaque élément pour que React sache
lequel réutiliser entre deux rendus.

Une erreur commise pendant la tâche 5 : utiliser `key={feature.icon}`. Les
icônes lucide sont créées par `forwardRef`, donc des objets. Converties en
chaîne, elles donnent toutes `"[object Object]"` - les six cartes auraient eu
la même clé.

### Vue dynamic rendering

Vue utilise la directive `v-for`, posée **sur l'élément à répéter**.

```vue
<InsightCard
  v-for="(insight, index) in insights"
  :key="insight.category"
  :index="index"
  :image="insight.image"
  :title="insight.title"
/>
```

Les parenthèses autour des paramètres ne sont nécessaires que si l'on veut
l'index.

Pour rendre un composant dont on ne connaît pas le type à l'avance, Vue a
`<component :is>` :

```vue
<component :is="icon" :size="20" />
```

`:is` accepte une chaîne (`"a"`, `"div"`) comme un composant.

### Similarities and differences

**Similitudes**

- même principe : un tableau de données produit un élément par entrée
- même exigence de clé unique et stable
- même conseil : ne pas utiliser l'index si la liste peut changer d'ordre

**Différences**

| | React | Vue |
|---|---|---|
| Syntaxe | `.map()` avec fonction fléchée | attribut `v-for` |
| Position | la boucle entoure l'élément | la boucle est sur l'élément |
| Étalement | `{...item}` | `v-bind="item"` |
| Composant dynamique | variable en majuscule | `<component :is>` |

La forme Vue supprime la fonction fléchée, les parenthèses et le `))}` à
refermer - une source fréquente d'erreurs de parsing pendant la tâche 5.

## Forms

C'est le domaine où l'écart est le plus grand.

### React form management

React impose les **inputs contrôlés** : l'état détient la valeur, le champ ne
fait que l'afficher.

```jsx
const [formData, setFormData] = useState({ name: "", email: "", message: "" });

function handleChange(event) {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
}

<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>
```

Le cycle est explicite : `value` lit l'état, `onChange` écoute la frappe, le
setter réécrit l'état. `value` sans `onChange` produit un champ figé.

L'attribut `name` sert à distinguer les champs dans un gestionnaire unique,
via la clé calculée `[name]`.

### Vue form management

Vue fournit `v-model`, qui fait les trois choses d'un coup.

```vue
<script setup>
const formData = reactive({ name: "", email: "", message: "" });
</script>

<template>
  <input v-model="formData.name" >
</template>
```

`v-model` est compilé en `:value` + `@input`. La fonction `handleChange`
disparaît entièrement, ainsi que la clé calculée et le spread.

Pour la soumission, le modificateur `.prevent` remplace l'appel manuel :

```vue
<form @submit.prevent="handleSubmit">
```

### Similarities and differences

**Similitudes**

- même principe de fond : le framework détient la valeur
- même validation : des valeurs dérivées calculées depuis l'état
- même gestion du bouton désactivé et du message de retour

**Différences**

| | React | Vue |
|---|---|---|
| Liaison | `value` + `onChange` | `v-model` |
| Gestionnaire | une fonction à écrire | aucune |
| `preventDefault()` | première ligne du handler | modificateur `.prevent` |
| Réinitialisation | `setFormData(EMPTY)` | `Object.assign(formData, ...)` |

Le composant Contact a perdu 13 lignes : la fonction `handleChange` et son
commentaire. En contrepartie, React rend le flux visible - on voit où la
valeur est lue et où elle est écrite - alors que `v-model` masque le
mécanisme.

Un détail contre-intuitif : en Vue, on ne peut pas remplacer un objet
`reactive` par un nouveau. Il faut écrire **dans** l'objet existant avec
`Object.assign`, sinon on perd le Proxy qui le rend réactif.

## Events

### React event handling

React utilise des props en camelCase auxquelles on passe une **référence** de
fonction, sans parenthèses.

```jsx
<button onClick={handleClick}>Envoyer</button>
<form onSubmit={handleSubmit}>
<input onChange={handleChange} />
```

Écrire `onClick={handleClick()}` appelle la fonction pendant le rendu et passe
son résultat (`undefined`) à React.

Tous les appels natifs (`preventDefault`, `stopPropagation`) sont à écrire
dans le gestionnaire.

### Vue event handling

Vue utilise la directive `v-on`, raccourcie en `@`.

```vue
<button @click="handleClick">Envoyer</button>
<form @submit.prevent="handleSubmit">
```

Vue ajoute des **modificateurs** :

| Modificateur | Effet |
|---|---|
| `.prevent` | appelle `preventDefault()` |
| `.stop` | appelle `stopPropagation()` |
| `.once` | l'écouteur ne se déclenche qu'une fois |
| `.self` | uniquement si la cible est l'élément lui-même |

Un template Vue accepte aussi une expression inline : `@click="count++"`.

### Similarities and differences

**Similitudes**

- même modèle : un écouteur déclaré dans le balisage
- même délégation par le framework, pas d'écouteur DOM direct
- même objet événement disponible

**Différences**

| | React | Vue |
|---|---|---|
| Syntaxe | `onClick={fn}` | `@click="fn"` |
| Nommage | camelCase | kebab-case natif |
| `preventDefault` | manuel | `.prevent` |
| Expression inline | possible mais déconseillé | idiomatique |

Le modificateur `.prevent` rend impossible l'oubli du `preventDefault()`, qui
provoque un rechargement de page difficile à diagnostiquer.

## Project organization

### React project structure

```
src/
  components/
    cards/     FeatureCard, InsightCard, StatCard
    layout/    Header, Footer
    sections/  About, Contact, Features, Hero, Insights
    ui/        Brand, Button, SectionBadge, SectionTitle, SocialLink
  data/        features, insights, socials, stats, steps
  services/    insightsService
  App.jsx
  main.jsx
  global.css
```

### Vue project structure

```
src/
  components/
    cards/     FeatureCard, InsightCard, StatCard
    layout/    Header, Footer
    sections/  About, Contact, Features, Hero, Insights
    ui/        Brand, Button, LinkColumn, SectionBadge, SectionTitle, SocialLink
  data/        features, insights, socials, stats, steps
  services/    insightsService
  App.vue
  main.js
  global.css
```

### Similarities and differences

La structure est **identique**, à trois détails près.

**Un fichier supplémentaire.** `LinkColumn` était déclaré dans `Footer.jsx`.
Un SFC ne contenant qu'un composant, il est devenu `ui/LinkColumn.vue`.

**L'extension dans les imports.**

```js
import InsightCard from "../cards/InsightCard";      // React
import InsightCard from "../cards/InsightCard.vue";  // Vue
```

Le résolveur teste automatiquement `.js` et `.jsx`, mais pas `.vue`. Les
fichiers de données et de service, en `.js`, gardent l'import sans extension.

**Le point de montage.** `#root` en React, `#app` en Vue.

Les fichiers `data/` et `services/` ont été copiés **sans aucune
modification**, à l'exception d'une ligne dans `features.js` :
`lucide-react` devient `lucide-vue-next`. Du JavaScript pur reste du
JavaScript pur.

Une mesure comparative des deux builds de production :

| | JS (gzip) | CSS (gzip) |
|---|---|---|
| React | 69,4 Ko | 4,84 Ko |
| Vue | 35,8 Ko | 4,83 Ko |

Le CSS est identique, ce sont les mêmes classes Tailwind. Le JavaScript est
presque deux fois plus léger : React embarque son moteur de réconciliation
complet, Vue compile ses templates en fonctions de rendu et n'embarque que le
runtime nécessaire.

## AI-assisted migration

### What AI tools were used

**Claude** (Anthropic), via Claude Code dans le terminal, avec accès en
lecture et écriture au dépôt. L'assistant pouvait donc lire les fichiers
React, écrire les fichiers Vue, et surtout exécuter `npm run lint` et
`npm run build` pour vérifier son propre travail.

Cet accès à l'exécution change la nature de l'aide : l'assistant ne propose
pas du code plausible, il vérifie qu'il compile avant de le présenter.

La méthode retenue a été de comparer les fichiers **un par un**, React contre
Vue, plutôt que de générer les 22 fichiers d'un bloc. Ce choix a été imposé en
cours de tâche, après avoir constaté qu'une génération massive ne laissait
rien apprendre.

### What worked well

**Les traductions mécaniques.** `className` en `class`, `.map()` en `v-for`,
`onClick` en `@click`. Ces transformations reviennent des dizaines de fois et
ne comportent aucune ambiguïté.

**La reconnaissance des motifs.** L'assistant a identifié que les 22 fichiers
ne contenaient que 8 motifs distincts, ce qui a permis de concentrer
l'apprentissage sur ces 8 cas plutôt que sur chaque fichier.

**L'explication comparative.** Mettre les deux versions côte à côte et
expliquer chaque ligne a été plus formateur que de lire la documentation Vue :
le point de départ était un code déjà compris.

**La vérification systématique.** `lint` et `build` après chaque lot ont
attrapé immédiatement les erreurs de nom de fichier et d'import.

**La détection de dette.** Pendant la migration, l'assistant a signalé qu'un
dégradé CSS était incomplet dans `InsightCard` côté React (`from-black` sans
`via-` ni `to-`), bug présent depuis la tâche 5 et jamais corrigé.

### What required manual corrections

Cette section est la plus importante du document. L'assistant s'est trompé
plusieurs fois, avec assurance.

**Des affirmations fausses, corrigées après vérification.**

- "lucide-vue-next ne fournit pas ces icônes" - conclusion tirée d'une
  vérification par chemin de fichier, alors que la structure interne du paquet
  diffère. Un test d'import réel a montré que les 14 icônes étaient bien
  exportées.
- "`aria-hidden` est indispensable sur les icônes lucide" - faux, la
  bibliothèque l'ajoute automatiquement quand l'icône n'a ni enfant ni prop
  d'accessibilité. Vérifié en lisant le code source de `lucide-react`.
- "ESLint ne reformate pas les templates Vue" - faux, `eslint-plugin-vue`
  fournit `vue/html-indent`, qui est auto-corrigeable.
- Le README React affirmait que Vite utilise Rollup. Vite 8 utilise
  **Rolldown**, vérifiable dans `node_modules/vite/package.json`.

**Des erreurs de code.**

- Un import de `Brand` ajouté dans `Hero.vue` alors que le composant n'y est
  pas utilisé, puis une tentative de contournement par `void Brand` au lieu de
  simplement supprimer la ligne.
- L'usage d'entités HTML (`&#10022;`, `&copy;`) là où le caractère littéral
  était attendu - un réflexe hérité d'une consigne mal interprétée.
- Une proposition de `base` absolu dans `vite.config.js`, corrigée en `./`,
  plus robuste et déjà éprouvé sur le projet React.
- Une tentative d'accentuer automatiquement ce document par table de
  correspondance. Le remplacement par sous-chaîne a produit "il fallait **là**
  déclarer" au lieu de "la déclarer", et a accentué un titre anglais. Restauré
  et réécrit à la main.

**Des choix à arbitrer, pas des erreurs.**

- La désactivation de `vue/multi-word-component-names`. La règle rejetait
  `Brand.vue` et `Button.vue`. La désactiver conserve les noms du projet
  React ; l'alternative était de renommer en `BrandLogo` et `UiButton`, en
  s'éloignant de la structure d'origine.
- Le choix de `reactive` plutôt que `ref` pour `formData`, pour éviter
  d'écrire `formData.value.name` partout.

### Lessons learned during the migration process

**Un lint vert ne prouve rien sur les imports.** ESLint analyse la syntaxe et
les variables, pas la résolution des chemins. Après le déplacement de fichiers
de la tâche 8, le lint était vert alors que cinq imports étaient cassés. Seul
`npm run build` les a détectés.

**Les erreurs silencieuses sont les plus coûteuses.** Aucun outil ne signale
`<icon />` en minuscule, `t-1`, `gap2` ou `justify-content`. Ces erreurs ne
produisent ni exception ni avertissement : simplement rien. La parade n'est
pas la détection mais la prévention - l'extension Tailwind CSS IntelliSense
empêche de taper un nom de classe inexistant.

**Le rechargement à chaud ment.** Un effet en `[]` ne se rejoue pas quand Vite
recharge un module. Pour tester du code qui ne s'exécute qu'au montage, il
faut recharger la page entière.

**L'œil humain reste le seul test.** Le projet n'a pas de tests automatisés.
`lint` et `build` prouvent que le code compile, jamais que le rendu est
correct. La vérification visuelle section par section est irremplaçable.

**Faire écrire n'est pas comprendre.** Le moment le plus formateur de la
semaine a été de bloquer plusieurs heures sur `<icon />` avant de comprendre
la règle de casse de JSX. La migration Vue a ensuite pris quelques heures,
parce que chaque mécanisme Vue s'expliquait par référence à un mécanisme React
déjà compris.

**Une IA affirme avec la même assurance ce qu'elle sait et ce qu'elle
suppose.** Les quatre affirmations fausses listées plus haut étaient
formulées exactement comme les affirmations exactes. La seule parade est la
vérification : lire le code source du paquet, lancer un test d'import,
inspecter le DOM. Une IA capable d'exécuter des commandes peut faire cette
vérification elle-même - encore faut-il le lui demander, ou le faire soi-même.

**La bonne posture est celle d'une revue de code.** L'IA propose, le
développeur décide. Utiliser l'IA pour aller plus vite est légitime ;
accepter du code sans le comprendre crée une dette qu'on paiera au premier
bug.
