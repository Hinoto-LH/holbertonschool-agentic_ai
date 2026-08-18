# Svelte

## General

### What is Svelte

Svelte est un framework JavaScript pour construire des interfaces
utilisateur. Sa particularité est d'être un **compilateur** : le code qu'on
écrit est transformé, au moment du build, en JavaScript qui manipule
directement le DOM. Le framework n'est donc pas embarqué dans le navigateur,
contrairement à React ou Vue qui envoient leur moteur avec l'application.

Concrètement, cela donne des fichiers plus petits, une exécution rapide, et
une syntaxe très proche du HTML, du CSS et du JavaScript ordinaires.

### What is a frontend framework

Un framework frontend est un ensemble d'outils et de conventions qui structure
le développement d'une interface. Il prend en charge les tâches répétitives :
mise à jour du DOM, gestion de l'état, découpage en composants, cycle de vie.

Sans framework, il faudrait écrire à la main chaque `document.querySelector`,
chaque `textContent = ...`, et garder soi-même l'affichage synchronisé avec
les données. C'est faisable sur une page simple, ingérable sur une
application.

### Why multiple frontend frameworks exist

Parce qu'il n'existe pas une seule bonne réponse aux mêmes problèmes. Chaque
framework fait des compromis différents entre performance, taille du bundle,
courbe d'apprentissage, souplesse et rigueur. React privilégie l'expressivité
de JavaScript, Vue la lisibilité des templates, Svelte la compilation en amont
pour supprimer le runtime.

S'y ajoutent des raisons historiques : React est né chez Meta, Vue d'un projet
indépendant, Svelte du travail d'un développeur du New York Times.

### Why frontend frameworks share similar concepts

Parce qu'ils résolvent tous le même problème de fond : garder l'interface
synchronisée avec des données qui changent. Cela conduit naturellement aux
mêmes idées :

- des composants pour découper l'interface
- un état local propre à chaque composant
- des données descendantes (props) du parent vers l'enfant
- une mise à jour de l'affichage déclenchée par le changement d'état
- un cycle de vie pour agir au montage et au démontage

Apprendre l'un rend donc le suivant beaucoup plus rapide à acquérir. C'est
exactement ce qu'on observe en passant de React à Vue, puis de Vue à Svelte.

### Why frontend frameworks use different syntaxes

Parce que la syntaxe traduit une philosophie.

React considère que le balisage est du JavaScript, d'où JSX : on utilise
`map`, les ternaires, les fonctions natives du langage. Vue considère que le
balisage est du HTML enrichi, d'où les directives `v-for` et `v-if`. Svelte
considère que le balisage est du HTML enrichi lui aussi, mais avec des blocs
de contrôle explicites `{#each}` et `{#if}`, et une réactivité obtenue par
compilation plutôt que par des objets spéciaux.

Les trois produisent le même résultat. Ce qui change, c'est ce qu'il faut
connaître pour le lire.

### How framework migration can be assisted by AI

Migrer un projet d'un framework à un autre, c'est surtout de la traduction
répétitive. Les mêmes transformations reviennent des dizaines de fois :
`useState` devient `$state`, `.map()` devient `{#each}`, `onClick` devient
`onclick`, `useEffect(..., [])` devient `onMount`.

Une IA est efficace sur ce type de tâche parce que les règles sont régulières
et que le contexte tient dans un fichier. Elle traduit un composant, conserve
sa structure, explique une API inconnue du framework cible.

Elle reste en revanche mauvaise juge de ce qui est correct dans le contexte
précis du projet : conventions de l'équipe, contraintes de design, compromis
déjà actés. La section « AI-assisted Development » revient en détail sur la
méthode de travail.

### Why code structure matters when migrating a project

Parce qu'une migration est facile quand elle se fait fichier par fichier, et
pénible quand il faut d'abord démêler le code existant.

Un projet bien structuré rend la migration presque mécanique :

- un composant par fichier, avec une responsabilité claire
- les données statiques isolées dans `src/data`, donc réutilisables telles
  quelles sans aucune modification
- les appels réseau isolés dans `src/services`, indépendants du framework
- pas de logique métier mélangée au balisage

À l'inverse, un composant de 400 lignes qui gère à la fois l'affichage, les
données et les appels réseau doit être compris entièrement avant d'être
traduit. C'est là que les bugs apparaissent.

L'observation pratique de ce projet : les fichiers de `data` et de `services`
ont été repris à l'identique de React vers Vue puis vers Svelte. Seuls les
composants ont demandé une réécriture.

## Svelte

### What is a Svelte component

Un composant Svelte est un bloc autonome qui réunit sa structure, sa logique
et son style. Il reçoit des données par des props, gère son propre état, et
peut être réutilisé partout dans l'application.

C'est l'équivalent exact d'un composant React ou Vue. La différence est dans
la manière de l'écrire, pas dans le rôle.

### What is a .svelte file

Un fichier `.svelte` regroupe trois parties pour un même composant :

```svelte
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clics : {count}
</button>

<style>
  button {
    font-weight: bold;
  }
</style>
```

Trois points à retenir :

- le balisage n'est pas enfermé dans une balise `<template>`, il est écrit
  directement au niveau du fichier
- les styles sont **scopés par défaut**, sans mot-clé à ajouter : la règle
  `button` ci-dessus ne s'applique qu'aux boutons de ce composant
- les trois blocs sont optionnels, un fichier peut ne contenir que du balisage

Le nom du fichier commence par une majuscule (`Button.svelte`) et sert de nom
de composant à l'import.

### What is reactive rendering in Svelte

Le rendu réactif signifie que l'interface se met à jour toute seule quand les
données changent. On ne touche jamais au DOM à la main.

Là où Svelte se distingue : React re-exécute la fonction du composant entière
puis compare deux arbres virtuels pour savoir quoi changer. Svelte sait déjà,
à la compilation, quelle ligne du DOM dépend de quelle variable. Il génère
donc du code qui met à jour uniquement le nœud concerné.

Pas de DOM virtuel, pas de comparaison à l'exécution.

### What is a reactive variable

Une variable réactive est une variable surveillée par le framework : toute
modification déclenche la mise à jour des parties de l'interface qui en
dépendent.

En Svelte 5, on la crée avec `$state()` :

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<p>{count} / {doubled}</p>
```

`$state` crée la valeur réactive, `$derived` crée une valeur **calculée** à
partir d'elle, recalculée automatiquement (l'équivalent de `computed` en Vue
ou d'un `useMemo` en React).

Une variable déclarée sans `$state` reste une variable JavaScript normale :
on peut la modifier, mais l'affichage ne bougera pas.

### What is a prop in Svelte

Une prop est une donnée passée d'un composant parent vers un composant enfant.
Elle circule dans un seul sens, du haut vers le bas, et l'enfant ne doit pas
la modifier.

```svelte
<FeatureCard title="Automatisation" icon={Bot} />
```

Le parent passe les valeurs comme des attributs HTML. Les accolades servent à
passer autre chose qu'une chaîne : un nombre, un booléen, un objet, une
fonction, un composant.

### What is $props()

`$props()` est la fonction qui récupère, côté enfant, les props envoyées par
le parent.

```svelte
<script>
  let { title, description, level = 1 } = $props();
</script>

<h2>{title}</h2>
<p>{description}</p>
```

C'est une déstructuration JavaScript ordinaire, ce qui permet gratuitement :

- une valeur par défaut avec `=` (`level = 1`)
- un renommage avec `:` (`class: className`)
- la récupération du reste avec `...rest`, utile pour transmettre des
  attributs HTML à l'élément racine

```svelte
<script>
  let { class: className = "", ...rest } = $props();
</script>

<button class={className} {...rest}>Envoyer</button>
```

### What is $state()

`$state()` déclare une donnée réactive locale au composant.

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: "", email: "" });

  function increment() {
    count += 1;
  }
</script>
```

Le point important pour un débutant : on modifie la variable **directement**,
avec `=`, `+=` ou `++`. Pas de fonction `setCount` comme en React, pas de
`.value` comme en Vue. Le compilateur se charge d'insérer les mises à jour.

Cela vaut aussi pour les objets et les tableaux : `user.name = "Léa"` ou
`items.push(item)` déclenchent bien le rendu, parce que `$state` remplace
l'objet par un proxy qui observe ses propriétés.

Attention toutefois : `$state` ne fonctionne que sur une déclaration `let` au
niveau du composant (ou dans un fichier `.svelte.js`), pas dans une fonction
quelconque.

### What is bind:value

`bind:value` crée une liaison **à double sens** entre une variable et un champ
de formulaire. Quand l'utilisateur tape, la variable change ; quand la variable
change, le champ change.

```svelte
<script>
  let name = $state("");
</script>

<input bind:value={name} />
<p>Bonjour {name}</p>
```

Sans cette directive, il faudrait écrire les deux sens à la main :

```svelte
<input value={name} oninput={(e) => (name = e.target.value)} />
```

`bind:` s'applique aussi à d'autres attributs : `bind:checked` pour une case à
cocher, `bind:group` pour un groupe de boutons radio, `bind:this` pour obtenir
une référence à l'élément DOM.

### What is {#each}

`{#each}` répète un fragment de balisage pour chaque élément d'un tableau.

```svelte
{#each features as feature (feature.title)}
  <FeatureCard title={feature.title} description={feature.description} />
{/each}
```

La partie entre parenthèses, `(feature.title)`, est la **clé** : une valeur
unique et stable qui permet à Svelte de suivre chaque élément lorsqu'on
réordonne ou supprime dans la liste. Elle est facultative, mais recommandée dès
que la liste peut changer.

L'index est disponible en deuxième position, et un bloc `{:else}` couvre le cas
d'une liste vide :

```svelte
{#each items as item, index}
  <li>{index + 1}. {item.label}</li>
{:else}
  <li>Aucun résultat</li>
{/each}
```

### What is {#if}

`{#if}` affiche un fragment seulement quand une condition est vraie.

```svelte
{#if error}
  <p class="text-red-600">{error}</p>
{:else if isLoading}
  <Spinner />
{:else}
  <List items={items} />
{/if}
```

L'élément n'est pas caché en CSS, il est réellement absent du DOM tant que la
condition est fausse.

Contrairement à React, il n'y a pas de piège avec les valeurs falsy : écrire
`{#if count}` avec `count` à `0` n'affiche rien, alors que `{count && <p/>}` en
JSX afficherait le `0` à l'écran.

### What is onMount

`onMount` exécute une fonction une seule fois, juste après l'insertion du
composant dans le DOM.

```svelte
<script>
  import { onMount } from "svelte";

  let data = $state(null);

  onMount(async () => {
    const response = await fetch("/api/insights");
    data = await response.json();
  });
</script>
```

C'est l'endroit pour tout ce qui a besoin du DOM ou du navigateur : charger des
données, mesurer un élément, initialiser une bibliothèque tierce, brancher un
écouteur sur `window`.

Une fonction retournée par `onMount` est appelée au démontage, ce qui sert au
nettoyage :

```svelte
onMount(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
});
```

Deux autres fonctions existent : `onDestroy`, appelée au démontage, et
`$effect`, qui rejoue du code à chaque fois qu'une donnée réactive lue à
l'intérieur change.

### How Svelte reactivity works

Le fonctionnement tient en trois idées.

**La compilation.** Le fichier `.svelte` n'est pas exécuté tel quel par le
navigateur. Le compilateur le transforme en JavaScript et repère, ligne par
ligne, quelles expressions du balisage dépendent de quelles variables.

**Les signaux.** Une variable `$state` est un signal : une valeur qui garde la
liste de ce qui la lit. Quand elle change, seuls ces lecteurs sont notifiés.

**La mise à jour ciblée.** Comme la dépendance est connue, le code généré
modifie directement le nœud concerné, du type `text.nodeValue = count`.

Conséquence pratique : il n'y a pas de re-rendu du composant entier. Une
fonction déclarée dans `<script>` n'est exécutée qu'une fois, contrairement à
React où le corps du composant est réexécuté à chaque rendu. C'est la source de
confusion la plus fréquente quand on arrive de React.

### How to create Svelte components

Un composant se crée en trois temps.

**1. Créer le fichier**, nommé en PascalCase dans le dossier correspondant à son
rôle :

```
src/components/cards/FeatureCard.svelte
```

**2. Déclarer les props et écrire le balisage :**

```svelte
<script>
  let { icon: Icon, title, description } = $props();
</script>

<article class="rounded-2xl border border-slate-200 p-6">
  <Icon class="h-6 w-6 text-indigo-600" />
  <h3 class="mt-4 text-lg font-semibold">{title}</h3>
  <p class="mt-2 text-slate-600">{description}</p>
</article>
```

**3. L'importer et l'utiliser** dans le parent, en précisant l'extension :

```svelte
<script>
  import FeatureCard from "../cards/FeatureCard.svelte";
</script>

<FeatureCard icon={Bot} title="Automatisation" description="..." />
```

L'extension `.svelte` est obligatoire à l'import, comme `.vue` en Vue et
contrairement à React.

### How to organize a Svelte project

L'organisation retenue pour ce projet reprend celle des versions React et Vue,
ce qui rend la comparaison directe :

```
src/
  components/
    layout/      Header.svelte, Footer.svelte
    sections/    Hero.svelte, Features.svelte, About.svelte, Contact.svelte
    cards/       FeatureCard.svelte, StatCard.svelte, InsightCard.svelte
    ui/          Button.svelte, SectionTitle.svelte, SocialLink.svelte
  data/          features.js, insights.js
  services/      appels réseau
  app.css        styles globaux (variables de couleur, import Tailwind)
  App.svelte     assemblage des sections
  main.js        point d'entrée, montage dans le DOM
```

Trois règles simples :

- un composant par fichier, nommé comme le fichier
- séparation par rôle : `layout` pour ce qui entoure la page, `sections` pour
  les blocs de la page, `cards` et `ui` pour les briques réutilisables
- aucune donnée en dur dans un composant, tout dans `src/data`

Une convention propre à Svelte : le dossier `src/lib` est reconnu par défaut et
accessible via l'alias `$lib`, ce qui évite les chemins relatifs à rallonge du
type `../../components/ui/Button.svelte`.

### How to manage reactive state

Trois niveaux, du plus simple au plus large.

**L'état local**, dans le composant qui l'utilise :

```svelte
<script>
  let isOpen = $state(false);
</script>
```

**L'état dérivé**, calculé à partir d'un autre état :

```svelte
<script>
  let items = $state([]);
  let total = $derived(items.length);
</script>
```

**L'état partagé** entre plusieurs composants, placé dans un fichier
`.svelte.js` (l'extension est nécessaire pour que les runes y soient
compilées) :

```js
// src/lib/theme.svelte.js
export const theme = $state({ dark: false });
```

```svelte
<script>
  import { theme } from "$lib/theme.svelte.js";
</script>

<button onclick={() => (theme.dark = !theme.dark)}>Basculer</button>
```

La règle de placement est la même dans les trois frameworks : garder l'état au
plus près de son utilisation, et ne le remonter que lorsque plusieurs
composants en ont besoin.

### How to bind data to the UI

Trois mécanismes selon le besoin.

**Afficher une valeur**, avec des accolades simples :

```svelte
<p>{user.name}</p>
```

**Lier un attribut**, avec la même syntaxe. Le raccourci `{title}` remplace
`title={title}` quand la prop et la variable portent le même nom :

```svelte
<img src={imageUrl} alt={imageAlt} />
<img {src} {alt} />
```

**Lier un champ de formulaire dans les deux sens**, avec `bind:` :

```svelte
<input bind:value={email} />
```

Les classes conditionnelles s'écrivent avec une expression, ou avec la
directive `class:` :

```svelte
<div class={isActive ? "bg-indigo-600" : "bg-slate-200"}></div>
<div class:active={isActive}></div>
```

### How to handle user interactions

Un gestionnaire d'événement est un attribut en minuscules auquel on passe une
fonction :

```svelte
<script>
  let count = $state(0);

  function handleClick() {
    count += 1;
  }
</script>

<button onclick={handleClick}>Incrémenter</button>
<button onclick={() => count++}>Version courte</button>
```

Deux points de vigilance :

- on passe la fonction, pas son résultat : `onclick={handleClick}` et non
  `onclick={handleClick()}`, qui l'exécuterait immédiatement
- en Svelte 5, les modificateurs de Svelte 4 (`on:click|preventDefault`)
  n'existent plus, il faut appeler `event.preventDefault()` soi-même

```svelte
<script>
  function handleSubmit(event) {
    event.preventDefault();
    // envoi du formulaire
  }
</script>

<form onsubmit={handleSubmit}>
  <button type="submit">Envoyer</button>
</form>
```

Pour remonter une information vers le parent, on lui passe une fonction en prop
plutôt qu'un événement personnalisé :

```svelte
<Modal onclose={() => (isOpen = false)} />
```

### How to render dynamic content

Le contenu dynamique repose sur la combinaison de `{#each}` et `{#if}`,
alimentés par les fichiers de `src/data`.

```svelte
<script>
  import { features } from "../../data/features.js";
  import FeatureCard from "../cards/FeatureCard.svelte";

  let query = $state("");
  let results = $derived(
    features.filter((feature) =>
      feature.title.toLowerCase().includes(query.toLowerCase())
    )
  );
</script>

<input bind:value={query} placeholder="Rechercher" />

{#if results.length > 0}
  <div class="grid gap-6 md:grid-cols-3">
    {#each results as feature (feature.title)}
      <FeatureCard
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    {/each}
  </div>
{:else}
  <p>Aucun résultat pour « {query} ».</p>
{/if}
```

Deux autres blocs existent, plus rarement utilisés au début : `{#await}` pour
afficher les états d'une promesse (en attente, résolue, rejetée), et `{#key}`
pour forcer la recréation d'un fragment quand une valeur change.

## React vs Vue.js vs Svelte

### Similarities between React, Vue.js and Svelte

Les trois partagent le même modèle mental :

- une interface découpée en composants réutilisables
- un état local qui déclenche la mise à jour de l'affichage
- des props descendantes, en lecture seule
- un rendu conditionnel et un rendu de liste à partir de données
- des fonctions de cycle de vie pour agir au montage
- le même outillage autour : Vite, npm, ESLint, Tailwind

C'est pourquoi la troisième migration est nettement plus rapide que la
première : la structure du projet et le découpage des composants sont
transposés à l'identique, seule la syntaxe change.

### Differences between React, Vue.js and Svelte

| | React | Vue | Svelte |
| --- | --- | --- | --- |
| Nature | bibliothèque | framework | compilateur |
| Fichier | `.jsx` | `.vue` | `.svelte` |
| Balisage | JSX | template + directives | balisage + blocs |
| État | `useState` | `ref` / `reactive` | `$state` |
| Modification | `setCount(n)` | `count.value = n` | `count = n` |
| Dérivé | `useMemo` | `computed` | `$derived` |
| Montage | `useEffect(fn, [])` | `onMounted` | `onMount` |
| Liste | `.map()` | `v-for` | `{#each}` |
| Condition | `&&` / ternaire | `v-if` | `{#if}` |
| Événement | `onClick` | `@click` | `onclick` |
| Formulaire | contrôlé à la main | `v-model` | `bind:value` |
| Styles | pas de solution native | `<style scoped>` | scopés par défaut |
| DOM virtuel | oui | oui | non |
| Re-rendu | composant entier | dépendances suivies | nœud concerné |

Le tableau se lit de gauche à droite comme un axe : de plus de JavaScript
explicite (React) vers plus de syntaxe dédiée et de travail fait par le
compilateur (Svelte).

### JSX versus Vue templates versus Svelte templates

JSX est du JavaScript : tout ce que le langage permet est disponible, ce qui
donne une grande liberté mais demande de bien connaître `map`, les ternaires et
les opérateurs logiques.

Un template Vue est du HTML enrichi de directives, plus contraint mais plus
lisible, avec un vocabulaire spécifique à apprendre.

Un template Svelte est également du HTML enrichi, mais avec des blocs ouverts
et fermés qui rendent la structure visible à l'œil.

```jsx
{items.map((item) => (
  <li key={item.id}>{item.label}</li>
))}
```

```vue
<li v-for="item in items" :key="item.id">{{ item.label }}</li>
```

```svelte
{#each items as item (item.id)}
  <li>{item.label}</li>
{/each}
```

Différence de forme notable : Vue place la directive **sur** l'élément à
répéter, Svelte **entoure** l'élément. La version Svelte est plus verticale
mais montre clairement où commence et où finit la répétition, surtout quand le
fragment répété contient plusieurs éléments.

### Props in React versus props in Vue.js versus props in Svelte

Dans les trois cas, les props sont descendantes et en lecture seule.

```jsx
function Card({ title, level = 1 }) {
  return <h3>{title}</h3>;
}
```

```vue
<script setup>
defineProps({ title: String, level: { type: Number, default: 1 } });
</script>

<template>
  <h3>{{ title }}</h3>
</template>
```

```svelte
<script>
  let { title, level = 1 } = $props();
</script>

<h3>{title}</h3>
```

React et Svelte utilisent une déstructuration JavaScript ordinaire, ce qui rend
les valeurs par défaut naturelles. Vue passe par une déclaration dédiée, plus
verbeuse, mais qui permet de déclarer les types attendus sans TypeScript.

Côté parent, la syntaxe d'appel est presque identique. Vue exige le préfixe `:`
pour passer autre chose qu'une chaîne, React et Svelte utilisent les accolades.

```jsx
<Card title="Bonjour" level={2} />
```

```vue
<Card title="Bonjour" :level="2" />
```

```svelte
<Card title="Bonjour" level={2} />
```

### useState versus ref versus $state()

```jsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

```js
const count = ref(0);
count.value++;
```

```js
let count = $state(0);
count++;
```

Trois manières de dire la même chose, avec des contraintes décroissantes.

React renvoie une paire valeur / fonction de mise à jour et interdit la
modification directe. Conséquence : la variable est figée pendant tout un
rendu, donc lire `count` juste après `setCount` renvoie l'ancienne valeur.

Vue renvoie un objet dont on modifie `.value`. La valeur est à jour
immédiatement, mais l'asymétrie entre le script (`count.value`) et le template
(`count`) est la source d'erreur la plus fréquente.

Svelte modifie la variable directement. C'est la syntaxe la plus proche du
JavaScript ordinaire, au prix d'une magie invisible : rien dans le code ne
montre que l'affectation déclenche un rendu.

### useEffect versus onMounted versus onMount

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

```js
onMount(() => {
  charger();
});
```

`useEffect` avec un tableau de dépendances vide équivaut à `onMounted` et à
`onMount`. Les trois s'exécutent une fois, après l'insertion dans le DOM.

`useEffect` est cependant plus général : il couvre aussi ce que Vue confie à
`watch` et Svelte à `$effect` quand on lui donne des dépendances.

Deux pièges de React disparaissent des deux autres côtés : le callback peut
être `async` directement, et il n'y a pas de tableau de dépendances à maintenir
— une dépendance oubliée en React donne une valeur périmée, silencieusement.

### Conditional rendering in React versus Vue.js versus Svelte

```jsx
{error && <p>{error}</p>}
{isLoading ? <Spinner /> : <List />}
```

```vue
<p v-if="error">{{ error }}</p>

<Spinner v-if="isLoading" />
<List v-else />
```

```svelte
{#if error}
  <p>{error}</p>
{/if}

{#if isLoading}
  <Spinner />
{:else}
  <List />
{/if}
```

React utilise les opérateurs JavaScript, ce qui expose au piège du `0` affiché
à l'écran. Vue et Svelte utilisent une construction dédiée, sans effet de bord.

La différence entre Vue et Svelte est de lisibilité : `v-if` / `v-else` est
plus compact, `{#if}` / `{:else}` / `{/if}` est plus explicite quand plusieurs
éléments sont concernés, car Vue impose alors un `<template v-if>` englobant.

### Dynamic rendering in React versus Vue.js versus Svelte

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

```svelte
{#each features as feature (feature.title)}
  <FeatureCard {...feature} />
{/each}
```

Le principe est identique dans les trois cas : parcourir un tableau, produire
un composant par élément, identifier chaque élément par une clé stable.

Deux détails à connaître. La clé est obligatoire en React, recommandée en Vue
et en Svelte. Et l'étalement d'un objet en props s'écrit `{...feature}` en
React et en Svelte, `v-bind="feature"` en Vue.

### Event handling in React versus Vue.js versus Svelte

```jsx
<button onClick={handleClick}>Envoyer</button>
<form onSubmit={handleSubmit}>
```

```vue
<button @click="handleClick">Envoyer</button>
<form @submit.prevent="handleSubmit">
```

```svelte
<button onclick={handleClick}>Envoyer</button>
<form onsubmit={handleSubmit}>
```

React utilise des props en camelCase, Vue une directive `@`, Svelte 5 un
attribut en minuscules identique au HTML natif.

Sur `preventDefault`, Vue est le seul à offrir un raccourci avec le
modificateur `.prevent`. React et Svelte demandent d'appeler
`event.preventDefault()` dans le gestionnaire.

Pour la communication vers le parent, React et Svelte 5 passent une fonction en
prop (`onClose`, `onclose`), tandis que Vue émet un événement déclaré avec
`defineEmits`.

### Form management in React versus Vue.js versus Svelte

C'est la différence la plus visible au quotidien.

```jsx
const [form, setForm] = useState({ name: "" });

function handleChange(event) {
  const { name, value } = event.target;
  setForm((prev) => ({ ...prev, [name]: value }));
}

<input name="name" value={form.name} onChange={handleChange} />;
```

```vue
<script setup>
const form = reactive({ name: "" });
</script>

<template>
  <input v-model="form.name" />
</template>
```

```svelte
<script>
  let form = $state({ name: "" });
</script>

<input bind:value={form.name} />
```

React demande d'écrire explicitement le cycle complet : lire la valeur depuis
l'état, écouter la frappe, remettre à jour l'état. Vue et Svelte condensent
tout en une directive.

Le compromis est le même dans les deux sens : React est plus verbeux mais rend
le flux visible, ce qui aide à comprendre ce qui se passe ; Vue et Svelte sont
plus rapides à écrire, au prix d'un mécanisme masqué.

### Project organization in React versus Vue.js versus Svelte

L'organisation des dossiers est identique dans les trois versions de ce projet :
séparation par rôle (`layout`, `sections`, `cards`, `ui`), données dans `data`,
appels réseau dans `services`.

Les différences sont mineures :

| | React | Vue | Svelte |
| --- | --- | --- | --- |
| Extension | `.jsx` | `.vue` | `.svelte` |
| Racine | `App.jsx` | `App.vue` | `App.svelte` |
| Entrée | `main.jsx` | `main.js` | `main.js` |
| Extension à l'import | facultative | obligatoire | obligatoire |
| Alias intégré | non | non | `$lib` |
| Styles du composant | pas de solution native | `<style scoped>` | scopés par défaut |

Le point à retenir : ce qui se transpose sans effort d'un framework à l'autre,
c'est la structure des dossiers et le découpage des composants. Ce qui doit
être réécrit, c'est uniquement le contenu des fichiers de composants.

## AI-assisted Development

### How AI can assist framework migration

Une migration est un travail de traduction répétitif : les mêmes
transformations reviennent des dizaines de fois. C'est exactement le type de
tâche où une IA est efficace.

Elle aide utilement à :

- traduire un composant en conservant sa structure et ses classes CSS
- repérer les motifs dupliqués à factoriser au passage
- expliquer un mécanisme inconnu du framework cible
- proposer l'équivalent d'une API d'un framework à l'autre
- rédiger la documentation et les commentaires

Elle reste en revanche mauvaise juge de ce qui est correct dans le contexte
précis d'un projet : conventions de l'équipe, contraintes de design, compromis
déjà actés. Et elle se trompe régulièrement sur les versions récentes : sur
Svelte en particulier, beaucoup de code circulant en ligne relève encore de
Svelte 4 (`export let`, `$:`, `on:click`), qui n'est plus la syntaxe
recommandée en Svelte 5.

### How to write useful prompts for code migration

Un bon prompt de migration contient cinq choses.

**Le contexte technique**, versions comprises : « projet Svelte 5 avec runes,
Vite, Tailwind CSS v4 ». Sans la version, l'IA répondra avec la syntaxe la plus
répandue dans ses données, pas la plus récente.

**Le code source complet** du composant à traduire, pas un extrait. Un extrait
force l'IA à deviner ce qui l'entoure.

**Une consigne précise et bornée** : « traduis ce composant React en Svelte 5,
conserve les classes Tailwind à l'identique, ne change pas la structure HTML ».

**Les contraintes à ne pas violer** : conventions de nommage, dossiers,
interdiction d'ajouter des dépendances.

**Le format de sortie attendu** : un seul fichier, sans commentaire superflu,
sans explication autour.

Deux règles pratiques : un composant par échange, plutôt qu'un dossier entier ;
et demander une explication du résultat quand un mécanisme est nouveau, ce qui
transforme la migration en apprentissage plutôt qu'en copier-coller.

### How to review AI-generated code

Relire du code généré demande plus d'attention que relire le sien, parce qu'il
est toujours plausible en surface. Quelques points de contrôle :

- vérifier chaque import et chaque chemin relatif, extension `.svelte` comprise
- vérifier que les noms de props correspondent des deux côtés
- vérifier qu'aucune syntaxe Svelte 4 ne s'est glissée dans le fichier
  (`export let`, `$:`, `on:click`) : elle fonctionne encore, mais mélange deux
  modèles dans le même projet
- vérifier que les classes CSS existent réellement, une classe inventée ne
  provoque aucune erreur et ne fait simplement rien
- se méfier du code qui fait plus que demandé
- refuser tout bloc qu'on ne saurait pas réécrire soi-même

Le signal d'alerte principal est le code qui marche sans qu'on sache pourquoi.
S'il casse plus tard, on sera incapable de le réparer.

### How to validate AI-generated code

La relecture ne suffit pas, il faut une vérification mécanique :

```bash
npm run dev
npm run build
```

Un point important appris en pratique : le linter ne vérifie pas la résolution
des chemins d'import. Après un déplacement de fichiers, un lint vert ne prouve
rien, seul le build le fait.

Ensuite viennent les vérifications que l'outillage ne fait pas :

- comparer le rendu à la maquette, section par section
- tester les interactions à la main, y compris les cas d'erreur
- naviguer au clavier et vérifier les états de focus
- passer un audit Lighthouse

En l'absence de tests automatisés, l'œil humain reste le test.

### How to compare generated code with the original implementation

La comparaison se fait sur quatre plans, dans cet ordre.

**Le rendu visuel.** Ouvrir les deux versions côte à côte, à la même largeur de
fenêtre, et parcourir la page section par section. Les écarts d'espacement et
de couleur se voient immédiatement.

**Le HTML produit.** Inspecter l'élément dans le navigateur et comparer la
structure des balises et les classes appliquées. Une `<div>` ajoutée ou un
niveau de titre changé passe inaperçu à l'œil mais casse l'accessibilité et le
style.

**Le comportement.** Rejouer chaque interaction : ouverture du menu, envoi du
formulaire, état d'erreur, état de chargement. Un bouton qui ne réagit plus est
souvent le signe d'une fonction passée avec des parenthèses.

**Le code lui-même.** Vérifier que le nombre de composants, les noms de props
et les données consommées correspondent. Si le nouveau fichier est
significativement plus court, quelque chose a probablement été perdu.

### How to debug AI-generated code

Une méthode en quatre temps.

**Lire le message d'erreur en entier**, jusqu'au nom de fichier et au numéro de
ligne. Le compilateur Svelte est précis et signale à la compilation beaucoup
d'erreurs que React ne révèle qu'à l'exécution.

**Isoler.** Commenter des parties du balisage jusqu'à ce que l'erreur
disparaisse. Le dernier bloc décommenté est le coupable.

**Observer l'état.** Afficher directement la valeur dans le balisage plutôt que
d'ajouter un `console.log` :

```svelte
<pre>{JSON.stringify(form, null, 2)}</pre>
```

**Vérifier la réactivité.** Si l'affichage ne bouge pas alors que la donnée
change, la cause est presque toujours l'une de ces trois :

- la variable a été déclarée sans `$state`
- la variable a été déstructurée hors du balisage, ce qui casse le lien réactif
- une valeur calculée a été écrite comme une constante au lieu d'un `$derived`

Et quand un bug résiste : revenir à la version qui fonctionnait, puis
réappliquer les changements un par un.

### Why understanding generated code remains essential

Trois raisons concrètes.

**Le débogage.** Une IA produit souvent du code qui fonctionne par accident, ou
qui échoue silencieusement. Une balise JSX en minuscule ne provoque aucune
erreur mais n'affiche rien. Une classe Tailwind mal orthographiée est ignorée
sans avertissement. Une variable oubliée sans `$state` fige l'affichage sans le
moindre message. Sans comprendre le mécanisme, ces bugs sont introuvables.

**La maintenance.** Un projet vit plus longtemps que le moment où il a été
écrit. Il faudra le modifier, l'étendre, l'expliquer à quelqu'un d'autre. Du
code qu'on ne comprend pas est une dette immédiate.

**La responsabilité.** L'IA n'est pas responsable de ce qu'elle produit, le
développeur l'est. Elle peut affirmer avec assurance quelque chose de faux :
une valeur de contraste incorrecte, une règle d'accessibilité inventée, une API
qui n'existe pas dans la version utilisée. Seul quelqu'un qui comprend le sujet
peut repérer l'erreur.

### Why AI-assisted development can reduce the barrier between different frontend ecosystems

Historiquement, changer de framework coûtait cher : il fallait réapprendre une
syntaxe, un outillage, un vocabulaire, avant même de pouvoir écrire la première
ligne utile. Ce coût enfermait les équipes dans leur écosystème.

L'assistance par IA réduit ce coût de trois manières.

**La traduction immédiate.** On peut demander l'équivalent exact d'un motif
connu dans un framework inconnu, et obtenir une réponse en quelques secondes
plutôt qu'après une heure de documentation.

**L'explication à la demande.** L'IA répond à des questions mal formulées, ce
qu'un moteur de recherche fait mal. On peut décrire un symptôme sans connaître
le nom du concept.

**Le transfert de structure.** Les décisions d'architecture — découpage en
composants, organisation des dossiers, séparation des données — se transposent
d'un écosystème à l'autre. L'IA prend en charge la partie syntaxique, qui est
justement celle qui varie.

Le résultat est un déplacement de la valeur : ce qui compte n'est plus de
connaître par cœur la syntaxe d'un framework, mais de comprendre les concepts
communs et de savoir juger le code produit. La barrière baisse, elle ne
disparaît pas — car sans les concepts, on ne peut ni écrire le bon prompt, ni
évaluer la réponse.
