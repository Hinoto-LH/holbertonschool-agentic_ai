# Vue.js

## General

### What is Vue.js

Vue.js est un framework JavaScript progressif utilise pour construire des
interfaces utilisateur. Il repose sur des composants reutilisables et sur un
systeme de reactivite qui met a jour automatiquement le DOM quand les donnees
changent. On dit qu'il est progressif parce qu'on peut l'ajouter a une page
existante comme simple bibliotheque, ou l'utiliser comme socle d'une
application complete.

### What is a frontend framework

Un framework frontend est un ensemble d'outils et de conventions qui structure
le developpement d'une interface utilisateur. Il prend en charge les taches
repetitives : mise a jour du DOM, gestion de l'etat, decoupage en composants,
routage, cycle de vie. Sans framework, il faudrait ecrire manuellement chaque
manipulation du DOM et synchroniser soi-meme l'affichage avec les donnees.

### Why multiple frontend frameworks exist

Parce qu'il n'existe pas une seule bonne reponse aux memes problemes. Chaque
framework fait des compromis differents entre performance, taille du bundle,
courbe d'apprentissage, souplesse et rigueur. React privilegie l'expressivite
de JavaScript, Vue la lisibilite des templates, Svelte la compilation en amont
pour supprimer le runtime. S'y ajoutent des raisons historiques et
industrielles : React est ne chez Meta, Vue d'un projet independant, Angular
chez Google.

### Why frontend frameworks share similar concepts

Parce qu'ils resolvent tous le meme probleme de fond : garder l'interface
synchronisee avec des donnees qui changent. Cela conduit naturellement aux
memes idees, quel que soit le framework :

- des composants pour decouper l'interface
- un etat local propre a chaque composant
- des donnees descendantes (props) du parent vers l'enfant
- un re-rendu declenche par le changement d'etat
- un cycle de vie pour agir au montage et au demontage

Apprendre l'un rend donc le suivant beaucoup plus rapide a acquerir.

### Why frontend frameworks use different syntaxes

Parce que la syntaxe traduit une philosophie. React considere que le balisage
est du JavaScript, d'ou JSX : on utilise `map`, les ternaires et les fonctions
natives du langage. Vue considere que le balisage est du HTML enrichi, d'ou les
templates et les directives `v-for`, `v-if`, `v-model`. Les deux produisent le
meme resultat, mais l'un demande de connaitre JavaScript, l'autre offre un
vocabulaire dedie plus vite lisible.

## Vue.js

### What is a Vue component

Un composant Vue est un bloc autonome qui reunit sa structure, sa logique et
son style. Il expose des props pour recevoir des donnees, emet des evenements
pour communiquer vers son parent, et gere son propre etat interne. C'est
l'equivalent d'un composant React, avec une organisation de fichier
differente.

### What is a Single File Component (SFC)

Un SFC est un fichier `.vue` qui regroupe trois blocs pour un meme composant :

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
styles. L'attribut `scoped` limite ces styles au seul composant, ce qui evite
les collisions de noms de classes. C'est une difference notable avec React,
qui n'a pas de solution native equivalente.

### What is the Composition API

La Composition API est la maniere moderne d'ecrire la logique d'un composant
Vue 3. On declare l'etat et les fonctions directement dans `<script setup>`,
en important ce dont on a besoin (`ref`, `computed`, `onMounted`).

Elle remplace l'ancienne Options API, qui rangeait le code dans des objets
predefinis (`data`, `methods`, `computed`). L'avantage principal est de pouvoir
regrouper le code par fonctionnalite plutot que par type : toute la logique
d'un formulaire reste au meme endroit au lieu d'etre eclatee entre trois
sections.

### What is a ref

`ref` cree une reference reactive autour d'une valeur. Vue surveille cette
reference et met a jour l'interface des que la valeur change.

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

Le point d'attention est le `.value` : dans le script, on lit et on ecrit
toujours `count.value`. Dans le template, Vue le deballe automatiquement, donc
on ecrit simplement `count`. Cette asymetrie est la source d'erreur la plus
frequente chez les debutants.

### What is reactive data

Une donnee reactive est une donnee que le framework surveille : toute
modification declenche la mise a jour des parties de l'interface qui en
dependent. En Vue, on la cree avec `ref` pour une valeur simple, ou avec
`reactive` pour un objet.

```js
import { ref, reactive } from "vue";

const count = ref(0);
const form = reactive({ name: "", email: "" });

count.value = 1;
form.name = "Ada";
```

`reactive` evite le `.value`, mais il ne fonctionne que sur des objets et perd
sa reactivite si on le destructure. En pratique, `ref` est recommande par
defaut car son comportement est plus previsible.

### What is v-model

`v-model` cree une liaison bidirectionnelle entre un champ de formulaire et une
donnee reactive : quand l'utilisateur tape, la donnee se met a jour, et quand
la donnee change, le champ se met a jour.

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

C'est un raccourci : Vue applique en realite une liaison `:value` et un
ecouteur `@input`. C'est exactement le travail que React demande d'ecrire a la
main avec `value` et `onChange`.

### What is v-for

`v-for` est la directive qui repete un element pour chaque entree d'un tableau.

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.label }}</li>
  </ul>
</template>
```

L'attribut `:key` joue le meme role que la prop `key` en React : il donne une
identite stable a chaque element pour que Vue sache lequel reutiliser entre
deux rendus. Comme en React, il faut une valeur unique et stable, jamais
l'index si la liste peut changer d'ordre.

### What is v-if

`v-if` affiche un element seulement si une condition est vraie. Il s'accompagne
de `v-else-if` et `v-else`.

```vue
<template>
  <p v-if="error">{{ error }}</p>
  <p v-else-if="isLoading">Chargement...</p>
  <p v-else>Pret.</p>
</template>
```

A ne pas confondre avec `v-show`, qui garde l'element dans le DOM et se
contente de basculer `display: none`. On choisit `v-if` quand la condition
change rarement, `v-show` quand elle bascule souvent, pour eviter de
detruire et recreer l'element sans arret.

### What is onMounted

`onMounted` est un hook de cycle de vie : la fonction qu'on lui passe s'execute
une fois, juste apres que le composant a ete insere dans le DOM. C'est
l'endroit prevu pour les effets de bord : chargement de donnees, mise en place
d'un ecouteur, initialisation d'une bibliotheque tierce.

```vue
<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);

onMounted(async () => {
  items.value = await getItems();
});
</script>
```

Ses equivalents pour les autres moments du cycle de vie sont `onUpdated` et
`onUnmounted`.

### How Vue.js reactivity works

Vue 3 enveloppe les donnees reactives dans un `Proxy`, un objet JavaScript
capable d'intercepter chaque lecture et chaque ecriture.

Pendant le rendu, Vue enregistre quelles donnees ont ete lues par quel
composant : c'est le suivi des dependances. Quand une de ces donnees est
modifiee, Vue sait exactement quels composants en dependent et ne re-execute
que ceux-la.

C'est la difference fondamentale avec React. React ne surveille rien : quand on
appelle un setter, il re-execute la fonction du composant entiere et compare le
resultat avec le rendu precedent. Vue sait a l'avance quoi mettre a jour, React
le decouvre apres coup en comparant.

### How to create Vue components

On cree un fichier `.vue` par composant, avec une majuscule au debut du nom, et
on l'importe la ou on en a besoin.

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

`defineProps` est une macro du compilateur : elle n'a pas besoin d'etre
importee dans `<script setup>`.

### How to organize a Vue project

L'organisation est la meme que pour un projet React, seule l'extension des
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

On separe les composants selon leur role : `layout` pour l'ossature de la page,
`sections` pour les grands blocs, `cards` pour les elements repetes, `ui` pour
les petits composants reutilisables. Les donnees et les appels reseau restent
en dehors des composants, dans `data` et `services`.

### How to manage reactive state

Pour l'etat local d'un composant, on utilise `ref` ou `reactive` dans
`<script setup>`. Pour une valeur calculee a partir d'un autre etat, on utilise
`computed`, qui met en cache le resultat et ne le recalcule que si une de ses
dependances change.

```js
import { ref, computed } from "vue";

const items = ref([]);
const total = computed(() => items.value.length);
```

Pour un etat partage entre plusieurs composants eloignes, on utilise une
bibliotheque dediee comme Pinia, equivalent de Redux ou Zustand cote React.

### How to bind data to the UI

Trois formes de liaison couvrent la quasi-totalite des besoins :

```vue
<template>
  <p>{{ message }}</p>
  <img :src="imageUrl" :alt="imageAlt" />
  <input v-model="name" />
</template>
```

- les doubles accolades `{{ }}` pour interpoler du texte
- `:` (raccourci de `v-bind`) pour lier un attribut a une expression
- `v-model` pour une liaison bidirectionnelle sur un champ de formulaire

### How to handle user interactions

On ecoute un evenement avec `@` (raccourci de `v-on`).

```vue
<template>
  <button @click="increment">Incrementer</button>
  <form @submit.prevent="handleSubmit">...</form>
</template>
```

Les modificateurs sont une specificite de Vue : `.prevent` appelle
`preventDefault()` pour nous, `.stop` appelle `stopPropagation()`, `.once`
limite l'ecouteur a un seul declenchement. En React, il faut ecrire ces appels
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

Le principe est identique a React : on part d'un tableau de donnees et on
produit un element par entree, avec une cle unique.

## React vs Vue.js

### Similarities between React and Vue.js

Les deux frameworks partagent l'essentiel :

- une architecture a base de composants reutilisables
- des donnees descendantes du parent vers l'enfant via les props
- un etat local declenchant la mise a jour de l'interface
- un DOM virtuel pour limiter les manipulations reelles du DOM
- des hooks de cycle de vie
- le meme outillage : Vite, ESLint, Prettier, Tailwind CSS

Un composant React et un composant Vue expriment la meme idee avec une syntaxe
differente. C'est pourquoi une migration est surtout un travail de traduction.

### Differences between React and Vue.js

| Sujet | React | Vue |
|---|---|---|
| Balisage | JSX, dans du JavaScript | template HTML avec directives |
| Fichier | `.jsx` | `.vue` (SFC) |
| Etat local | `useState` | `ref` / `reactive` |
| Mise a jour | via un setter, immuable | mutation directe de la valeur |
| Reactivite | re-rendu complet puis comparaison | suivi des dependances |
| Liste | `.map()` | `v-for` |
| Condition | `&&` ou ternaire | `v-if` / `v-show` |
| Formulaire | `value` + `onChange` | `v-model` |
| Styles | pas de solution native | `<style scoped>` |
| Nature | bibliotheque | framework |

### JSX versus Vue templates

JSX est du JavaScript : tout ce que le langage permet est disponible, ce qui
donne une grande liberte mais demande de bien connaitre `map`, les ternaires et
les operateurs logiques. Les erreurs de syntaxe y sont souvent silencieuses,
comme une balise en minuscule interpretee comme du HTML.

Un template Vue est du HTML enrichi de directives. Il est plus contraint mais
plus lisible, et le compilateur peut y detecter des erreurs a l'avance. En
contrepartie, il faut apprendre un vocabulaire specifique.

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

Deux differences pratiques. Vue permet de declarer le type attendu et une
valeur par defaut directement dans `defineProps`, la ou React demande une
bibliotheque tierce ou TypeScript. Et pour passer autre chose qu'une chaine,
Vue exige le prefixe `:` (`:count="3"` passe le nombre 3, `count="3"` passe la
chaine "3"), la ou React utilise les accolades.

### useState versus ref

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

```js
const count = ref(0);

count.value++;
```

React renvoie une paire valeur / fonction de mise a jour, et interdit de
modifier la valeur directement. Vue renvoie un objet dont on modifie la
propriete `.value`.

Consequence importante : en React, la variable d'etat est figee pendant toute
la duree d'un rendu, donc lire la valeur juste apres avoir appele le setter
renvoie l'ancienne. En Vue, `count.value` est toujours a jour immediatement.

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

`useEffect` avec un tableau de dependances vide equivaut a `onMounted`. Mais
`useEffect` est plus general : il couvre aussi ce que Vue confie a `watch` et
`watchEffect` quand on lui donne des dependances.

Deux pieges de React disparaissent cote Vue : le callback de `onMounted` peut
etre `async` directement, et il n'y a pas de tableau de dependances a maintenir.

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

React utilise les operateurs JavaScript, ce qui expose a un piege connu : avec
un nombre, `0 && <p />` affiche `0` a l'ecran au lieu de ne rien afficher. Vue
utilise une directive dediee, plus lisible et sans effet de bord.

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

Le principe est identique. `v-bind="feature"` etale toutes les proprietes de
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

React utilise des props en camelCase auxquelles on passe une reference de
fonction, sans parenthese. Vue utilise des directives `@` et fournit des
modificateurs comme `.prevent`, qui evitent d'ecrire `preventDefault()` a la
main.

### Form management in React versus Vue

C'est la difference la plus visible au quotidien.

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

React demande d'ecrire explicitement le cycle complet : lire la valeur depuis
l'etat, ecouter la frappe, remettre a jour l'etat. Vue condense tout dans
`v-model`.

React est plus verbeux mais rend le flux visible, ce qui aide a comprendre ce
qui se passe. Vue est plus rapide a ecrire, au prix d'un mecanisme masque.

### Project organization in React versus Vue

L'organisation des dossiers est identique : separation par role
(`layout`, `sections`, `cards`, `ui`), donnees dans `data`, appels reseau dans
`services`.

Les differences sont mineures :

- extension `.vue` au lieu de `.jsx`
- point d'entree `App.vue` et `main.js` au lieu de `App.jsx` et `main.jsx`
- les styles peuvent vivre dans le composant grace a `<style scoped>`
- l'import d'un composant Vue exige l'extension : `import Button from "./Button.vue"`

## AI-assisted Development

### How AI can assist framework migration

Une migration React vers Vue est un travail de traduction repetitif : les memes
transformations reviennent des dizaines de fois (`useState` en `ref`, `.map()`
en `v-for`, `onClick` en `@click`). C'est exactement le genre de tache ou une
IA est efficace.

Elle aide utilement a :

- traduire un composant en conservant sa structure
- reperer les motifs dupliques a factoriser
- expliquer un mecanisme inconnu du framework cible
- proposer l'equivalent d'une API d'un framework a l'autre
- rediger la documentation et les commentaires

Elle reste en revanche mauvaise juge de ce qui est correct dans le contexte
precis d'un projet : conventions de l'equipe, contraintes de design,
compromis deja actes.

### How to review AI-generated code

Relire du code genere demande plus d'attention que relire le sien, parce qu'il
est toujours plausible en surface. Quelques points de controle :

- verifier chaque import et chaque chemin relatif
- verifier que les noms de props correspondent des deux cotes
- verifier que les classes CSS existent reellement, une classe inventee ne
  provoque aucune erreur et ne fait simplement rien
- se mefier du code qui fait plus que demande
- refuser tout bloc qu'on ne saurait pas reecrire soi-meme

Le signal d'alerte principal est le code qui marche sans qu'on sache pourquoi.
S'il casse plus tard, on sera incapable de le reparer.

### How to validate AI-generated code

La relecture ne suffit pas, il faut une verification mecanique :

```bash
npm run lint
npm run build
```

Un point important appris en pratique : ESLint ne verifie pas la resolution des
chemins d'import. Apres un deplacement de fichiers, un lint vert ne prouve rien,
seul le build le fait.

Ensuite viennent les verifications que l'outillage ne fait pas :

- comparer le rendu au maquettage, section par section
- tester les interactions a la main, y compris les cas d'erreur
- naviguer au clavier et verifier les etats de focus
- passer un audit Lighthouse

En l'absence de tests automatises, l'oeil humain reste le test.

### Why understanding generated code remains essential

Trois raisons concretes.

**Le debogage.** Une IA produit souvent du code qui fonctionne par accident, ou
qui echoue silencieusement. Une balise JSX en minuscule ne provoque aucune
erreur mais n'affiche rien. Une classe Tailwind mal orthographiee est ignoree
sans avertissement. Sans comprendre le mecanisme, ces bugs sont introuvables.

**La maintenance.** Un projet vit plus longtemps que le moment ou il a ete
ecrit. Il faudra le modifier, l'etendre, l'expliquer a quelqu'un d'autre. Du
code qu'on ne comprend pas est une dette immediate.

**La responsabilite.** L'IA n'est pas responsable de ce qu'elle produit, le
developpeur l'est. Elle peut affirmer avec assurance quelque chose de faux :
une valeur de contraste incorrecte, une regle d'accessibilite inventee, une
API qui n'existe pas dans la version utilisee. Seul quelqu'un qui comprend le
sujet peut reperer l'erreur.

La bonne posture est celle d'une revue de code : l'IA propose, le developpeur
decide. Faire ecrire pour aller plus vite est legitime ; accepter sans
comprendre ne l'est pas.
