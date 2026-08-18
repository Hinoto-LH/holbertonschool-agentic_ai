# Vue.js

## General

### What is Vue.js

Vue.js est un framework JavaScript progressif utilisé pour construire des
interfaces utilisateur. Il repose sur des composants réutilisables et sur un
système de réactivité qui met à jour automatiquement le DOM quand les données
changent. On dit qu'il est progressif parce qu'on peut l'ajouter à une page
existante comme simple bibliothèque, ou l'utiliser comme socle d'une
application complète.

### What is a frontend framework

Un framework frontend est un ensemble d'outils et de conventions qui structure
le développement d'une interface utilisateur. Il prend en charge les tâches
répétitives : mise à jour du DOM, gestion de l'état, découpage en composants,
routage, cycle de vie. Sans framework, il faudrait écrire manuellement chaque
manipulation du DOM et synchroniser soi-même l'affichage avec les données.

### Why multiple frontend frameworks exist

Parce qu'il n'existe pas une seule bonne réponse aux mêmes problèmes. Chaque
framework fait des compromis différents entre performance, taille du bundle,
courbe d'apprentissage, souplesse et rigueur. React privilégie l'expressivité
de JavaScript, Vue la lisibilité des templates, Svelte la compilation en amont
pour supprimer le runtime. S'y ajoutent des raisons historiques et
industrielles : React est né chez Meta, Vue d'un projet indépendant, Angular
chez Google.

### Why frontend frameworks share similar concepts

Parce qu'ils résolvent tous le même problème de fond : garder l'interface
synchronisée avec des données qui changent. Cela conduit naturellement aux
mêmes idées, quel que soit le framework :

- des composants pour découper l'interface
- un état local propre à chaque composant
- des données descendantes (props) du parent vers l'enfant
- un re-rendu déclenché par le changement d'état
- un cycle de vie pour agir au montage et au démontage

Apprendre l'un rend donc le suivant beaucoup plus rapide à acquérir.

### Why frontend frameworks use different syntaxes

Parce que la syntaxe traduit une philosophie. React considère que le balisage
est du JavaScript, d'où JSX : on utilise `map`, les ternaires et les fonctions
natives du langage. Vue considère que le balisage est du HTML enrichi, d'où les
templates et les directives `v-for`, `v-if`, `v-model`. Les deux produisent le
même résultat, mais l'un demande de connaître JavaScript, l'autre offre un
vocabulaire dédié plus vite lisible.

## Vue.js

### What is a Vue component

Un composant Vue est un bloc autonome qui réunit sa structure, sa logique et
son style. Il expose des props pour recevoir des données, émet des événements
pour communiquer vers son parent, et gère son propre état interne. C'est
l'équivalent d'un composant React, avec une organisation de fichier
différente.

### What is a Single File Component (SFC)

Un SFC est un fichier `.vue` qui regroupe trois blocs pour un même composant :

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">Clics : {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

`<template>` contient le balisage, `<script setup>` la logique, `<style>` les
styles. L'attribut `scoped` limite ces styles au seul composant, ce qui évite
les collisions de noms de classes. C'est une différence notable avec React,
qui n'a pas de solution native équivalente.

### What is the Composition API

La Composition API est la manière moderne d'écrire la logique d'un composant
Vue 3. On déclare l'état et les fonctions directement dans `<script setup>`,
en important ce dont on a besoin (`ref`, `computed`, `onMounted`).

Elle remplace l'ancienne Options API, qui rangeait le code dans des objets
prédéfinis (`data`, `methods`, `computed`). L'avantage principal est de pouvoir
regrouper le code par fonctionnalité plutôt que par type : toute la logique
d'un formulaire reste au même endroit au lieu d'être éclatée entre trois
sections.

### What is a ref

`ref` crée une référence réactive autour d'une valeur. Vue surveille cette
référence et met à jour l'interface dès que la valeur change.

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <p>{{ count }}</p>
</template>
```

Le point d'attention est le `.value` : dans le script, on lit et on écrit
toujours `count.value`. Dans le template, Vue le déballe automatiquement, donc
on écrit simplement `count`. Cette asymétrie est la source d'erreur la plus
fréquente chez les débutants.

### What is reactive data

Une donnée réactive est une donnée que le framework surveille : toute
modification déclenche la mise à jour des parties de l'interface qui en
dépendent. En Vue, on la crée avec `ref` pour une valeur simple, ou avec
`reactive` pour un objet.

```js
import { ref, reactive } from "vue";

const count = ref(0);
const form = reactive({ name: "", email: "" });

count.value = 1;
form.name = "Ada";
```

`reactive` évite le `.value`, mais il ne fonctionne que sur des objets et perd
sa réactivité si on le destructure. En pratique, `ref` est recommandé par
défaut car son comportement est plus prévisible.

### What is v-model

`v-model` crée une liaison bidirectionnelle entre un champ de formulaire et une
donnée réactive : quand l'utilisateur tape, la donnée se met à jour, et quand
la donnée change, le champ se met à jour.

```vue
<script setup>
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <input v-model="name" type="text" />
  <p>Bonjour {{ name }}</p>
</template>
```

C'est un raccourci : Vue applique en réalité une liaison `:value` et un
écouteur `@input`. C'est exactement le travail que React demande d'écrire à la
main avec `value` et `onChange`.

### What is v-for

`v-for` est la directive qui répète un élément pour chaque entrée d'un tableau.

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.label }}</li>
  </ul>
</template>
```

L'attribut `:key` joue le même rôle que la prop `key` en React : il donne une
identité stable à chaque élément pour que Vue sache lequel réutiliser entre
deux rendus. Comme en React, il faut une valeur unique et stable, jamais
l'index si la liste peut changer d'ordre.

### What is v-if

`v-if` affiche un élément seulement si une condition est vraie. Il s'accompagne
de `v-else-if` et `v-else`.

```vue
<template>
  <p v-if="error">{{ error }}</p>
  <p v-else-if="isLoading">Chargement...</p>
  <p v-else>Prêt.</p>
</template>
```

À ne pas confondre avec `v-show`, qui garde l'élément dans le DOM et se
contente de basculer `display: none`. On choisit `v-if` quand la condition
change rarement, `v-show` quand elle bascule souvent, pour éviter de
détruire et recréer l'élément sans arrêt.

### What is onMounted

`onMounted` est un hook de cycle de vie : la fonction qu'on lui passe s'exécute
une fois, juste après que le composant a été inséré dans le DOM. C'est
l'endroit prévu pour les effets de bord : chargement de données, mise en place
d'un écouteur, initialisation d'une bibliothèque tierce.

```vue
<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);

onMounted(async () => {
  items.value = await getItems();
});
</script>
```

Ses équivalents pour les autres moments du cycle de vie sont `onUpdated` et
`onUnmounted`.

### How Vue.js reactivity works

Vue 3 enveloppe les données réactives dans un `Proxy`, un objet JavaScript
capable d'intercepter chaque lecture et chaque écriture.

Pendant le rendu, Vue enregistre quelles données ont été lues par quel
composant : c'est le suivi des dépendances. Quand une de ces données est
modifiée, Vue sait exactement quels composants en dépendent et ne réexécute
que ceux-là.

C'est la différence fondamentale avec React. React ne surveille rien : quand on
appelle un setter, il réexécute la fonction du composant entière et compare le
résultat avec le rendu précédent. Vue sait à l'avance quoi mettre à jour, React
le découvre après coup en comparant.

### How to create Vue components

On crée un fichier `.vue` par composant, avec une majuscule au début du nom, et
on l'importe là où on en a besoin.

```vue
<!-- src/components/ui/Button.vue -->
<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <button class="rounded-md bg-violet-500 px-4 py-2">{{ label }}</button>
</template>
```

```vue
<!-- utilisation -->
<script setup>
import Button from "./components/ui/Button.vue";
</script>

<template>
  <Button label="Envoyer" />
</template>
```

`defineProps` est une macro du compilateur : elle n'a pas besoin d'être
importée dans `<script setup>`.

### How to organize a Vue project

L'organisation est la même que pour un projet React, seule l'extension des
fichiers change :

```
src/
  components/
    cards/
    layout/
    sections/
    ui/
  data/
  services/
  App.vue
  main.js
```

On sépare les composants selon leur rôle : `layout` pour l'ossature de la page,
`sections` pour les grands blocs, `cards` pour les éléments répétés, `ui` pour
les petits composants réutilisables. Les données et les appels réseau restent
en dehors des composants, dans `data` et `services`.

### How to manage reactive state

Pour l'état local d'un composant, on utilise `ref` ou `reactive` dans
`<script setup>`. Pour une valeur calculée à partir d'un autre état, on utilise
`computed`, qui met en cache le résultat et ne le recalcule que si une de ses
dépendances change.

```js
import { ref, computed } from "vue";

const items = ref([]);
const total = computed(() => items.value.length);
```

Pour un état partagé entre plusieurs composants éloignés, on utilise une
bibliothèque dédiée comme Pinia, équivalent de Redux ou Zustand côté React.

### How to bind data to the UI

Trois formes de liaison couvrent la quasi-totalité des besoins :

```vue
<template>
  <p>{{ message }}</p>
  <img :src="imageUrl" :alt="imageAlt" />
  <input v-model="name" />
</template>
```

- les doubles accolades `{{ }}` pour interpoler du texte
- `:` (raccourci de `v-bind`) pour lier un attribut à une expression
- `v-model` pour une liaison bidirectionnelle sur un champ de formulaire

### How to handle user interactions

On écoute un événement avec `@` (raccourci de `v-on`).

```vue
<template>
  <button @click="increment">Incrémenter</button>
  <form @submit.prevent="handleSubmit">...</form>
</template>
```

Les modificateurs sont une spécificité de Vue : `.prevent` appelle
`preventDefault()` pour nous, `.stop` appelle `stopPropagation()`, `.once`
limite l'écouteur à un seul déclenchement. En React, il faut écrire ces appels
explicitement dans le gestionnaire.

### How to render dynamic content

On combine `v-for` pour les listes et `v-if` pour les conditions.

```vue
<template>
  <p v-if="error" class="text-sm text-slate-500">{{ error }}</p>

  <div v-else class="grid gap-8 md:grid-cols-3">
    <FeatureCard
      v-for="feature in features"
      :key="feature.title"
      :title="feature.title"
      :description="feature.description"
    />
  </div>
</template>
```

Le principe est identique à React : on part d'un tableau de données et on
produit un élément par entrée, avec une clé unique.

## React vs Vue.js

### Similarities between React and Vue.js

Les deux frameworks partagent l'essentiel :

- une architecture à base de composants réutilisables
- des données descendantes du parent vers l'enfant via les props
- un état local déclenchant la mise à jour de l'interface
- un DOM virtuel pour limiter les manipulations réelles du DOM
- des hooks de cycle de vie
- le même outillage : Vite, ESLint, Prettier, Tailwind CSS

Un composant React et un composant Vue expriment la même idée avec une syntaxe
différente. C'est pourquoi une migration est surtout un travail de traduction.

### Differences between React and Vue.js

| Sujet | React | Vue |
|---|---|---|
| Balisage | JSX, dans du JavaScript | template HTML avec directives |
| Fichier | `.jsx` | `.vue` (SFC) |
| État local | `useState` | `ref` / `reactive` |
| Mise à jour | via un setter, immuable | mutation directe de la valeur |
| Réactivité | re-rendu complet puis comparaison | suivi des dépendances |
| Liste | `.map()` | `v-for` |
| Condition | `&&` ou ternaire | `v-if` / `v-show` |
| Formulaire | `value` + `onChange` | `v-model` |
| Styles | pas de solution native | `<style scoped>` |
| Nature | bibliothèque | framework |

### JSX versus Vue templates

JSX est du JavaScript : tout ce que le langage permet est disponible, ce qui
donne une grande liberté mais demande de bien connaître `map`, les ternaires et
les opérateurs logiques. Les erreurs de syntaxe y sont souvent silencieuses,
comme une balise en minuscule interprétée comme du HTML.

Un template Vue est du HTML enrichi de directives. Il est plus contraint mais
plus lisible, et le compilateur peut y détecter des erreurs à l'avance. En
contrepartie, il faut apprendre un vocabulaire spécifique.

```jsx
{items.map((item) => (
  <li key={item.id}>{item.label}</li>
))}
```

```vue
<li v-for="item in items" :key="item.id">{{ item.label }}</li>
```

### Props in React versus props in Vue

Dans les deux cas, les props sont descendantes et en lecture seule.

```jsx
function Card({ title }) {
  return <h3>{title}</h3>;
}

<Card title="Bonjour" />;
```

```vue
<script setup>
defineProps({ title: String });
</script>

<template>
  <h3>{{ title }}</h3>
</template>
```

```vue
<Card title="Bonjour" />
```

Deux différences pratiques. Vue permet de déclarer le type attendu et une
valeur par défaut directement dans `defineProps`, là où React demande une
bibliothèque tierce ou TypeScript. Et pour passer autre chose qu'une chaîne,
Vue exige le préfixe `:` (`:count="3"` passe le nombre 3, `count="3"` passe la
chaîne "3"), là où React utilise les accolades.

### useState versus ref

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

```js
const count = ref(0);

count.value++;
```

React renvoie une paire valeur / fonction de mise à jour, et interdit de
modifier la valeur directement. Vue renvoie un objet dont on modifie la
propriété `.value`.

Conséquence importante : en React, la variable d'état est figée pendant toute
la durée d'un rendu, donc lire la valeur juste après avoir appelé le setter
renvoie l'ancienne. En Vue, `count.value` est toujours à jour immédiatement.

### useEffect versus onMounted

```jsx
useEffect(() => {
  charger();
}, []);
```

```js
onMounted(() => {
  charger();
});
```

`useEffect` avec un tableau de dépendances vide équivaut à `onMounted`. Mais
`useEffect` est plus général : il couvre aussi ce que Vue confie à `watch` et
`watchEffect` quand on lui donne des dépendances.

Deux pièges de React disparaissent côté Vue : le callback de `onMounted` peut
être `async` directement, et il n'y a pas de tableau de dépendances à maintenir.

### Conditional rendering in React versus Vue

```jsx
{error && <p>{error}</p>}
{isLoading ? <Spinner /> : <List />}
```

```vue
<p v-if="error">{{ error }}</p>

<Spinner v-if="isLoading" />
<List v-else />
```

React utilise les opérateurs JavaScript, ce qui expose à un piège connu : avec
un nombre, `0 && <p />` affiche `0` à l'écran au lieu de ne rien afficher. Vue
utilise une directive dédiée, plus lisible et sans effet de bord.

### Dynamic rendering in React versus Vue

```jsx
{features.map((feature) => (
  <FeatureCard key={feature.title} {...feature} />
))}
```

```vue
<FeatureCard
  v-for="feature in features"
  :key="feature.title"
  v-bind="feature"
/>
```

Le principe est identique. `v-bind="feature"` étale toutes les propriétés de
l'objet en props, comme le spread `{...feature}` en JSX.

### Event handling in React versus Vue

```jsx
<button onClick={handleClick}>Envoyer</button>

<form onSubmit={handleSubmit}>
// avec event.preventDefault() dans le gestionnaire
```

```vue
<button @click="handleClick">Envoyer</button>

<form @submit.prevent="handleSubmit">
```

React utilise des props en camelCase auxquelles on passe une référence de
fonction, sans parenthèse. Vue utilise des directives `@` et fournit des
modificateurs comme `.prevent`, qui évitent d'écrire `preventDefault()` à la
main.

### Form management in React versus Vue

C'est la différence la plus visible au quotidien.

```jsx
const [formData, setFormData] = useState({ name: "" });

function handleChange(event) {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
}

<input name="name" value={formData.name} onChange={handleChange} />;
```

```vue
<script setup>
const form = reactive({ name: "" });
</script>

<template>
  <input v-model="form.name" />
</template>
```

React demande d'écrire explicitement le cycle complet : lire la valeur depuis
l'état, écouter la frappe, remettre à jour l'état. Vue condense tout dans
`v-model`.

React est plus verbeux mais rend le flux visible, ce qui aide à comprendre ce
qui se passe. Vue est plus rapide à écrire, au prix d'un mécanisme masqué.

### Project organization in React versus Vue

L'organisation des dossiers est identique : séparation par rôle
(`layout`, `sections`, `cards`, `ui`), données dans `data`, appels réseau dans
`services`.

Les différences sont mineures :

- extension `.vue` au lieu de `.jsx`
- point d'entrée `App.vue` et `main.js` au lieu de `App.jsx` et `main.jsx`
- les styles peuvent vivre dans le composant grâce à `<style scoped>`
- l'import d'un composant Vue exige l'extension : `import Button from "./Button.vue"`

## AI-assisted Development

### How AI can assist framework migration

Une migration React vers Vue est un travail de traduction répétitif : les mêmes
transformations reviennent des dizaines de fois (`useState` en `ref`, `.map()`
en `v-for`, `onClick` en `@click`). C'est exactement le genre de tâche où une
IA est efficace.

Elle aide utilement à :

- traduire un composant en conservant sa structure
- repérer les motifs dupliqués à factoriser
- expliquer un mécanisme inconnu du framework cible
- proposer l'équivalent d'une API d'un framework à l'autre
- rédiger la documentation et les commentaires

Elle reste en revanche mauvaise juge de ce qui est correct dans le contexte
précis d'un projet : conventions de l'équipe, contraintes de design,
compromis déjà actés.

### How to review AI-generated code

Relire du code généré demande plus d'attention que relire le sien, parce qu'il
est toujours plausible en surface. Quelques points de contrôle :

- vérifier chaque import et chaque chemin relatif
- vérifier que les noms de props correspondent des deux côtés
- vérifier que les classes CSS existent réellement, une classe inventée ne
  provoque aucune erreur et ne fait simplement rien
- se méfier du code qui fait plus que demandé
- refuser tout bloc qu'on ne saurait pas réécrire soi-même

Le signal d'alerte principal est le code qui marche sans qu'on sache pourquoi.
S'il casse plus tard, on sera incapable de le réparer.

### How to validate AI-generated code

La relecture ne suffit pas, il faut une vérification mécanique :

```bash
npm run lint
npm run build
```

Un point important appris en pratique : ESLint ne vérifie pas la résolution des
chemins d'import. Après un déplacement de fichiers, un lint vert ne prouve rien,
seul le build le fait.

Ensuite viennent les vérifications que l'outillage ne fait pas :

- comparer le rendu au maquettage, section par section
- tester les interactions à la main, y compris les cas d'erreur
- naviguer au clavier et vérifier les états de focus
- passer un audit Lighthouse

En l'absence de tests automatisés, l'œil humain reste le test.

### Why understanding generated code remains essential

Trois raisons concrètes.

**Le débogage.** Une IA produit souvent du code qui fonctionne par accident, ou
qui échoue silencieusement. Une balise JSX en minuscule ne provoque aucune
erreur mais n'affiche rien. Une classe Tailwind mal orthographiée est ignorée
sans avertissement. Sans comprendre le mécanisme, ces bugs sont introuvables.

**La maintenance.** Un projet vit plus longtemps que le moment où il a été
écrit. Il faudra le modifier, l'étendre, l'expliquer à quelqu'un d'autre. Du
code qu'on ne comprend pas est une dette immédiate.

**La responsabilité.** L'IA n'est pas responsable de ce qu'elle produit, le
développeur l'est. Elle peut affirmer avec assurance quelque chose de faux :
une valeur de contraste incorrecte, une règle d'accessibilité inventée, une
API qui n'existe pas dans la version utilisée. Seul quelqu'un qui comprend le
sujet peut repérer l'erreur.

La bonne posture est celle d'une revue de code : l'IA propose, le développeur
décide. Faire écrire pour aller plus vite est légitime ; accepter sans
comprendre ne l'est pas.
