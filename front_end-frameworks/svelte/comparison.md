# React, Vue.js et Svelte

Analyse comparative menée à partir de la migration réelle de la landing page
"Agentic AI" vers un troisième framework. Les trois implémentations se
trouvent dans `front_end-frameworks/react/`, `front_end-frameworks/vue/` et
`front_end-frameworks/svelte/`. Elles contiennent les mêmes sept sections, les
mêmes données et le même rendu visuel.

Ce document ne reprend pas l'analyse React contre Vue.js déjà produite dans
`vue/comparison.md`. Il se concentre sur ce que l'implémentation Svelte ajoute
à la compréhension des frameworks frontend, et sur ce que la troisième
migration a révélé que les deux premières n'avaient pas montré.

Tous les exemples sont extraits des trois bases de code.

## Mesures de référence

Les chiffres suivants proviennent des builds de production des trois projets,
exécutés le même jour avec Vite 8.

| | React | Vue | Svelte |
|---|---|---|---|
| Composants dans `src` | 17 | 17 | 17 |
| Lignes de composants | 878 | 970 | 877 |
| Bundle JavaScript | 219,04 kB | 94,06 kB | 79,30 kB |
| Bundle gzip | 69,43 kB | 35,83 kB | 29,01 kB |
| `Contact` (lignes) | 234 | 254 | 227 |
| `Insights` (lignes) | 57 | 65 | 55 |

Le nombre de composants est identique dans les trois versions, ce qui confirme
que le découpage de l'interface ne dépend pas du framework choisi. L'écart de
volume de code est faible entre React et Svelte, alors que le bundle produit
est presque trois fois plus petit en Svelte. Cette dissociation entre la
taille du code source et la taille du code livré est la première observation
importante de cette migration.

## Overall comparison

### What similarities did you notice between React, Vue.js and Svelte?

La migration vers Svelte a confirmé ce que la migration vers Vue avait déjà
laissé voir : le modèle mental est commun aux trois frameworks. Un composant
reste un bloc autonome nommé en PascalCase, qui reçoit des données par des
props, gère un état local, et se compose avec d'autres composants.

L'arborescence des fichiers a été transposée sans aucune modification. Les
dossiers `layout`, `sections`, `cards`, `ui`, `data` et `services` existent à
l'identique dans les trois versions, avec les mêmes fichiers aux mêmes
endroits. Aucun composant n'a été fusionné, divisé ou déplacé.

Les fichiers de `src/data` et `src/services` ont été copiés sans réécriture.
Sur 152 lignes de données et de service, un seul mot a changé : la source
d'importation des icônes dans `features.js`, qui passe de `lucide-react` à
`@lucide/svelte` en passant par `lucide-vue-next` côté Vue. Le reste, y
compris `insightsService.js`, est strictement identique dans les trois
projets.

### What differences did you notice between the three implementations?

La différence la plus profonde n'est pas syntaxique mais architecturale.
React et Vue embarquent un moteur qui s'exécute dans le navigateur. Svelte
est un compilateur : il analyse le code au moment du build et produit du
JavaScript qui manipule directement le DOM. Il n'y a pas de DOM virtuel, pas
de comparaison d'arbres à l'exécution, et pas de runtime de framework dans le
bundle final.

Cette différence explique les mesures ci-dessus, mais elle a surtout une
conséquence pratique inattendue sur la manière d'écrire le code. En React, le
corps de la fonction du composant est réexécuté à chaque rendu. En Svelte, le
bloc `<script>` ne s'exécute qu'une seule fois, à la création du composant.
Une ligne recopiée telle quelle de React vers Svelte peut donc rester
syntaxiquement valide tout en devenant fonctionnellement fausse.

Cette erreur s'est produite pendant la migration et fait l'objet d'une section
détaillée plus bas.

Les autres différences notables sont les suivantes.

| | React | Vue | Svelte |
|---|---|---|---|
| Nature | bibliothèque | framework | compilateur |
| Unité de composant | une fonction | un fichier | un fichier |
| Balise racine du balisage | `return (...)` | `<template>` | aucune |
| Styles locaux | aucune solution native | `<style scoped>` | scopés par défaut |
| Types de props | TypeScript requis | `defineProps` | TypeScript requis |
| Balise dynamique | variable en majuscule | `<component :is>` | `<svelte:element this>` |
| Contenu du parent | `{children}` | `<slot />` | `{@render children()}` |
| Fragment réutilisable local | fonction dans le fichier | impossible | `{#snippet}` |

### Which concepts appeared in all three frameworks?

Six concepts sont apparus dans les trois implémentations, sans exception.

Le composant comme unité de découpage. Le flux de données descendant, du
parent vers l'enfant, par des props en lecture seule. L'état local, déclaré
dans le composant qui l'utilise. La valeur dérivée, recalculée à partir de
l'état plutôt que stockée séparément. Le rendu conditionnel et le rendu de
liste à partir de données. Une fonction de cycle de vie exécutée après
l'insertion dans le DOM.

Ces six concepts ont suffi à couvrir l'intégralité de l'application dans les
trois frameworks. Aucun mécanisme spécifique à un framework n'a été nécessaire
pour reproduire une fonctionnalité existante.

## Svelte components

### How Svelte components are created

Un composant Svelte est un fichier `.svelte` nommé en PascalCase. Il n'y a ni
fonction à déclarer, ni `export default` à écrire, ni bloc `<template>` à
ouvrir : le fichier est le composant, et son balisage est écrit directement au
niveau du fichier.

Voici `StatCard` dans les trois versions du projet, à commencer par Svelte.

```svelte
<script>
  let { value, label } = $props();
</script>

<div class="rounded-xl border border-slate-800 p-6">
  <p class="text-3xl font-bold text-violet-300">{value}</p>
  <p class="text-sm text-slate-500">{label}</p>
</div>
```

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

La version Svelte est la plus courte des trois. Elle supprime à la fois le
`return` et l'`export default` de React, et le bloc `<template>` de Vue.

### How .svelte files are organized

Un fichier `.svelte` accepte trois blocs, tous optionnels : `<script>` pour la
logique, le balisage écrit sans conteneur, et `<style>` pour les styles.

Dans ce projet, aucun composant ne contient de bloc `<style>`, puisque
l'énoncé interdit les styles en dur et que toute la présentation passe par
Tailwind CSS. Les fichiers se réduisent donc à un `<script>` suivi du
balisage, et cinq des dix-sept composants ne contiennent qu'une seule ligne de
logique, la déclaration `$props()`.

L'ordre retenu dans tout le projet place le `<script>` en premier, puis le
balisage, ce qui reproduit la lecture d'un composant React : d'abord la
logique, ensuite ce qui est affiché.

Les imports de composants exigent l'extension complète, comme en Vue.

```js
import Brand from "../ui/Brand.svelte";
```

Les imports de fichiers JavaScript ordinaires, eux, restent tolérants. Le
fichier `services/insightsService.js` importe encore `"../data/insights"`
sans extension, exactement comme dans la version React, et Vite le résout
correctement.

### How this compares with React components and Vue Single File Components

Svelte se situe entre les deux modèles, mais penche nettement du côté de Vue.

Comme un SFC Vue, un fichier `.svelte` ne peut contenir qu'un seul composant.
Cette contrainte a eu la même conséquence concrète que lors de la migration
vers Vue : `LinkColumn`, qui était une simple fonction déclarée à l'intérieur
de `Footer.jsx`, a dû devenir un fichier à part entière, `ui/LinkColumn.svelte`.

Comme un composant React en revanche, Svelte ne propose aucune déclaration de
type pour les props. La version Vue pouvait écrire
`title: { type: String, required: true }` et obtenir un avertissement à
l'exécution. Les versions React et Svelte ne le peuvent pas sans TypeScript.

Une capacité propre à Svelte mérite d'être signalée, car elle nuance la
contrainte "un composant par fichier". Les snippets permettent de définir un
fragment de balisage réutilisable, avec paramètres et valeurs par défaut, à
l'intérieur du même fichier.

```svelte
{#snippet linkColumn(title, links, external = false)}
  <div>
    <h3>{title}</h3>
    <ul>
      {#each links as link (link.label)}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
    </ul>
  </div>
{/snippet}

{@render linkColumn("Navigation", navLinks)}
```

Svelte était donc le seul des trois frameworks capable de conserver
`LinkColumn` à l'intérieur de `Footer`, comme le faisait la version React
d'origine. Le fichier séparé a malgré tout été retenu, pour deux raisons : la
cohérence avec la version Vue, qui permet une comparaison dossier par dossier,
et l'exigence de l'énoncé de séparer les éléments d'interface réutilisables
des composants de layout.

### What felt simpler, clearer or more surprising

Trois choses ont paru plus simples. L'affectation directe de l'état, sans
setter ni `.value`. L'absence de conteneur de balisage, qui supprime à la fois
les fragments `<>...</>` de React et le `<template>` de Vue. Et le fait que
les styles soient scopés par défaut, sans mot-clé à ajouter.

Deux choses ont paru plus surprenantes.

La première est `{@render children?.()}`. En React, `{children}` se lit
immédiatement comme "affiche le contenu reçu". En Svelte, il faut comprendre
que le contenu est une fonction, que `{@render}` l'exécute, et que l'appel
échouerait si le composant était utilisé sans enfants, d'où l'opérateur `?.`.
C'est le mécanisme qui a demandé le plus d'explications avant d'être écrit
correctement.

La seconde est l'exécution unique du bloc `<script>`. C'est la différence la
plus lourde de conséquences de toute la migration, et c'est aussi celle qui ne
se voit pas à la lecture du code.

## Templates and syntax

### How Svelte templates work

Un template Svelte est du HTML enrichi de trois éléments : des accolades pour
insérer une valeur ou une expression, des blocs de contrôle ouverts et fermés
comme `{#if}` et `{#each}`, et des directives comme `bind:value` ou `class:`.

Les expressions écrites dans le balisage sont réactives d'office. Le
compilateur détecte les variables qu'elles lisent et régénère uniquement le
nœud concerné. C'est ce qui explique que `InsightCard` n'ait besoin d'aucune
rune malgré une classe conditionnelle.

```svelte
<article
  class={[
    "group",
    index === 0 && "sm:col-span-2",
    "relative min-h-80 overflow-hidden rounded-3xl border border-slate-800",
  ]}
>
```

La forme tableau de l'attribut `class` est propre à Svelte. Les valeurs
fausses sont ignorées, ce qui évite le ternaire à branche vide de la version
React et supprime les espaces parasites dans le HTML produit.

```jsx
className={`group ${index === 0 ? "sm:col-span-2" : ""} relative min-h-80`}
```

### How Svelte template syntax compares with JSX and Vue templates

Les trois syntaxes traduisent trois philosophies déjà décrites dans l'analyse
précédente. L'apport de Svelte est de proposer une troisième position, à
mi-chemin.

JSX considère que le balisage est du JavaScript. Vue considère que le balisage
est du HTML enrichi de directives posées sur les éléments. Svelte considère
également que le balisage est du HTML enrichi, mais utilise des blocs qui
entourent les éléments plutôt que des attributs qui les décorent.

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

La version Vue est la plus compacte. La version Svelte occupe trois lignes au
lieu d'une, mais rend visible où commence et où finit la répétition. Cette
différence devient un avantage net dans `About.svelte`, où le fragment répété
contient sept éléments imbriqués : la version Vue aurait exigé un
`<template v-for>` englobant, alors que le bloc Svelte se lit sans artifice.

Sur l'insertion d'une valeur, Svelte et JSX utilisent une seule paire
d'accolades, Vue en utilise deux. Après avoir écrit les trois versions, la
paire simple de Svelte est apparue plus lisible dans les attributs, où Vue
impose de passer aux deux-points.

### What advantages or limitations you noticed

Trois avantages ont été constatés à l'écriture.

Les blocs de contrôle suppriment les pièges des opérateurs JavaScript. La
version React de `About.jsx` écrivait
`{index < steps.length - 1 && <div />}`, forme correcte ici mais qui aurait
affiché la valeur à l'écran si la condition avait été un nombre valant zéro.
`{#if}` n'a pas ce défaut.

Les attributs valant `undefined` sont simplement omis du HTML. Cela a permis
de traduire directement `disabled={href ? undefined : disabled}` de la version
React, et de remplacer le motif `{...(external && { target, rel }))}` par deux
attributs lisibles.

Le compilateur signale des erreurs que ni JSX ni les templates Vue ne
détectent. Deux avertissements ont été rencontrés pendant cette migration, et
les deux étaient justifiés.

Deux limitations ont également été constatées.

Les balises HTML auto-fermantes sont refusées. La version React écrivait ses
quatre calques du Hero sous la forme `<div className="..." />`. Le
compilateur Svelte répond :

```
element_invalid_self_closing_tag :: Self-closing HTML tags for non-void
elements are ambiguous, use `<div ...></div>` rather than `<div ... />`
```

La règle ne concerne que les éléments HTML. Les composants comme `<Button />`
et les éléments void comme `<hr />` restent auto-fermants.

La seconde limitation concerne l'outillage. ESLint ne sait pas lire un fichier
`.svelte` sans `eslint-plugin-svelte`, qui fournit le parseur `svelte-eslint-parser`.
Sans lui, la configuration échoue dès la première balise du balisage. La même
contrainte existait en Vue avec `eslint-plugin-vue`, mais elle est plus
visible ici, car un fichier `.svelte` ne délimite pas son balisage par une
balise `<template>`.

## Props and data flow

### How props are handled in Svelte

Les props sont récupérées par `$props()`, dans une déstructuration JavaScript
ordinaire.

```svelte
<script>
  let { icon: Icon, title, description } = $props();
</script>
```

Cette forme donne gratuitement trois choses : les valeurs par défaut avec `=`,
le renommage avec `:`, et la récupération des attributs restants avec `...rest`.

`Button.svelte` utilise les trois simultanément.

```svelte
let {
  children,
  href,
  variant = "primary",
  external = false,
  disabled = false,
  class: className = "",
  ...rest
} = $props();
```

Le renommage `class: className` est obligatoire, car `class` est un mot
réservé en JavaScript. C'est la contrepartie exacte du choix de React, qui a
renommé l'attribut en `className` pour éviter le problème. Svelte conserve le
nom HTML côté balisage et laisse le renommage au développeur, du côté du
JavaScript.

### How this compares with React props and Vue props

Sur ce point, Svelte est presque identique à React et s'éloigne de Vue.

| | React | Vue | Svelte |
|---|---|---|---|
| Déclaration | déstructuration | `defineProps` | déstructuration |
| Valeur par défaut | `=` | champ `default` | `=` |
| Types | TypeScript | déclarés | TypeScript |
| Attributs restants | `...rest` explicite | automatique | `...rest` explicite |
| Passage d'un non-texte | accolades | préfixe `:` | accolades |
| Booléen raccourci | `external` | `external` | `external` |

La transmission des attributs non déclarés illustre bien le positionnement de
Svelte. En Vue, `Button.vue` n'avait rien à écrire : le framework transmet
automatiquement `type="submit"` et les écouteurs à l'élément racine. En React
comme en Svelte, il faut collecter `...rest` et l'étaler explicitement sur
l'élément.

```svelte
<svelte:element this={href ? "a" : "button"} class={...} {...rest}>
```

Cette obligation a paru préférable à l'automatisme de Vue, car elle rend
visible dans le code ce qui traverse le composant.

### What stayed conceptually similar across the three frameworks

Le sens des props n'a jamais changé. Dans les trois versions, elles descendent
du parent vers l'enfant, elles sont en lecture seule, et un composant enfant
qui a besoin de communiquer vers le haut reçoit une fonction.

La différence de syntaxe n'a jamais imposé de repenser quelles données
devaient être des props. La signature de `Button` est la même dans les trois
projets : `href`, `variant`, `external`, `disabled`, une classe additionnelle,
et un contenu. Seule la manière de l'écrire diffère.

## State and reactivity

### How reactive state is managed in Svelte

L'état local se déclare avec `$state()` et se modifie par affectation directe.

```svelte
let insights = $state([]);
let erreur = $state("");

insights = data;
```

Les valeurs calculées utilisent `$derived()`, qui détecte seul ses
dépendances.

```svelte
let isNameValid = $derived(formData.name.trim().length >= 2);
```

Les objets et les tableaux sont transformés en proxy, ce qui permet de
modifier une propriété sans remplacer l'objet entier. `formData.name = "Léa"`
déclenche le rendu.

### How this compares with React state and Vue reactive data

La section `Insights` fournit une comparaison directe, puisqu'elle contient
exactement le même état dans les trois versions.

```jsx
const [insights, setInsights] = useState([]);
setInsights(data);
```

```js
const insights = ref([]);
insights.value = data;
```

```js
let insights = $state([]);
insights = data;
```

React impose une paire valeur et fonction de mise à jour, et interdit la
modification directe. Vue impose le suffixe `.value` dans le script, mais pas
dans le template. Svelte n'impose rien de plus qu'une affectation JavaScript
ordinaire.

Le formulaire de contact met en évidence une différence plus fine. En Vue,
`formData` est créé avec `reactive`, et un objet `reactive` ne peut pas être
réaffecté sans perdre sa réactivité. Le vidage du formulaire passe donc par
`Object.assign`.

```js
Object.assign(formData, { name: "", email: "", message: "" });
```

En Svelte, la réaffectation est possible et fonctionne.

```js
formData = { ...EMPTY_FORM };
```

Une précaution est cependant nécessaire, et elle n'est pas évidente. La
constante `EMPTY_FORM` doit être copiée à l'initialisation.

```js
const EMPTY_FORM = { name: "", email: "", message: "" };
let formData = $state({ ...EMPTY_FORM });
```

Sans la copie, `$state` transformerait la constante partagée en proxy, et le
premier vidage du formulaire écraserait la référence servant à le vider.

### What differences you noticed in the amount of code required

L'écart le plus visible se trouve dans la gestion du formulaire, détaillée
plus bas : environ soixante lignes de moins que la version React pour un
comportement identique.

Sur l'ensemble du projet en revanche, l'écart est faible. Les trois versions
comptent 877 à 970 lignes de composants. Svelte fait gagner du code sur la
logique, mais ce gain est presque entièrement absorbé par le balisage, où
`{#if}` et `{#each}` occupent trois lignes là où Vue en occupe une.

La conclusion est que la concision de Svelte se manifeste sur la logique
d'état, pas sur le volume total.

### What this taught you about reactivity in frontend frameworks

L'enseignement principal de cette migration tient dans une erreur commise puis
corrigée.

La version React de `SectionTitle` calculait une classe à partir d'une prop.

```jsx
const sizeClasses =
  size === "lg" ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl";
```

Cette ligne a d'abord été recopiée telle quelle en Svelte, avec le
raisonnement suivant : `size` est fixé au point d'appel et ne change jamais
dans cette application, donc une constante suffit. Le compilateur a répondu :

```
state_referenced_locally :: This reference only captures the initial value
of `size`. Did you mean to reference it inside a closure instead?
```

Le raisonnement était juste sur l'usage, et faux sur le composant. Le
compilateur ne juge pas comment un composant est utilisé aujourd'hui, il juge
ce qu'il garantit. Un composant qui fige une prop est incorrect,
indépendamment du fait que la prop varie ou non dans le projet actuel.

Le point marquant est que `npm run lint` était vert dans les deux fichiers
concernés, `SectionTitle.svelte` et `Brand.svelte`. Ce n'est ni une erreur de
style ni une erreur de syntaxe, mais une erreur de réactivité, et seul le
compilateur Svelte sait la détecter.

Trois enseignements en découlent.

Chaque framework possède un moment où le code est "figé", et ce moment n'est
pas le même partout. En React, la fonction est réexécutée à chaque rendu, donc
rien n'est figé. En Vue et en Svelte, le script ne tourne qu'une fois, donc
tout ce qui n'est pas explicitement réactif est figé. Vue exprime cela avec
`computed`, Svelte avec `$derived`, et le commentaire écrit dans
`Contact.vue` pendant la migration précédente disait déjà exactement la même
chose.

La réactivité n'est pas une propriété des données mais une propriété de la
manière dont on les lit. Dans `InsightCard.svelte`, `index === 0` n'a pas
besoin de `$derived`, parce que l'expression vit dans le balisage, où tout est
réactif d'office. La même expression nommée dans le `<script>` aurait exigé
`$derived`.

Enfin, un outil de vérification ne remplace pas un autre. Le lint valide le
style, le build valide la résolution des imports, le compilateur valide la
réactivité, et seul un test dans le navigateur valide le comportement.

## Rendering logic

### How conditional rendering works in Svelte

Le rendu conditionnel utilise un bloc ouvert et fermé, avec des branches
optionnelles `{:else if}` et `{:else}`. L'élément est réellement absent du DOM
quand la condition est fausse.

Trois cas réels du projet, dans les trois frameworks.

```jsx
{erreur && <p className="text-slate-50 text-sm">{erreur}</p>}
```

```vue
<p v-if="erreur" class="text-slate-50 text-sm">{{ erreur }}</p>
```

```svelte
{#if erreur}
  <p class="text-sm text-slate-50">{erreur}</p>
{/if}
```

Le trait vertical entre les étapes de la section About suit la même logique.

```jsx
{index < steps.length - 1 && <div className="mt-2 w-px flex-1 bg-slate-800" />}
```

```svelte
{#if index < steps.length - 1}
  <div class="mt-2 w-px flex-1 bg-slate-800"></div>
{/if}
```

Enfin, le texte du bouton d'envoi conserve un ternaire dans les trois
versions, car il s'agit d'une valeur et non d'un fragment de balisage.

```svelte
{isSending ? "Sending..." : "Send message"}
```

### How dynamic list rendering works in Svelte

Le rendu de liste utilise `{#each}`, avec une clé facultative mais recommandée
entre parenthèses, un index disponible en deuxième position, et une branche
`{:else}` pour le cas de la liste vide.

Le cas le plus complet du projet se trouve dans `Insights.svelte`, qui utilise
la clé et l'index simultanément.

```svelte
{#each insights as insight, index (insight.category)}
  <InsightCard
    {index}
    image={insight.image}
    category={insight.category}
    title={insight.title}
    description={insight.description}
  />
{/each}
```

Les clés ont été vérifiées avant écriture : les cinq catégories du fichier
`data/insights.js` sont uniques, ce qui est nécessaire pour un bloc `{#each}`
clé.

### How {#if} and {#each} compare with React and Vue

| | React | Vue | Svelte |
|---|---|---|---|
| Condition | `&&` ou ternaire | `v-if` sur l'élément | `{#if}` autour |
| Sinon | ternaire | `v-else` | `{:else}` |
| Liste | `.map()` | `v-for` sur l'élément | `{#each}` autour |
| Clé | attribut `key` obligatoire | attribut `:key` | parenthèses, facultative |
| Index | second argument de `map` | second argument | après la virgule |
| Liste vide | à écrire soi-même | à écrire soi-même | `{:else}` intégré |
| Étalement en props | `{...item}` | `v-bind="item"` | `{...item}` |

Trois observations méritent d'être retenues.

La forme entourante de Svelte est plus verbeuse sur un élément unique et plus
lisible sur un fragment complexe. La comparaison est nette entre
`LinkColumn.svelte`, où le `{#each}` de trois lignes remplace un `v-for` d'une
ligne, et `About.svelte`, où le même bloc encadre lisiblement sept éléments.

Svelte est le seul des trois à intégrer le cas de la liste vide, avec
`{:else}` dans un bloc `{#each}`. Ce cas n'apparaît pas dans ce projet, car
toutes les listes proviennent de fichiers de données statiques, mais il aurait
été utile pour la section Insights si le service avait pu renvoyer une liste
vide.

La syntaxe d'étalement des props est identique entre React et Svelte, ce qui a
permis de transposer `<StatCard {...stat} />` sans aucune modification.

## Lifecycle and side effects

### How lifecycle logic is handled in Svelte

Svelte fournit `onMount`, importé depuis `svelte`, qui exécute une fonction
une seule fois après l'insertion du composant dans le DOM. Une fonction
retournée par ce callback est appelée au démontage. `onDestroy` et `$effect`
complètent le dispositif.

La section Insights est le seul composant du projet concerné.

### How onMount compares with React useEffect and Vue onMounted

```jsx
useEffect(() => {
  async function charger() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (error) {
      setErreur("Unable to load the insights.");
      console.error(error);
    }
  }
  charger();
}, []);
```

```js
onMounted(async () => {
  try {
    insights.value = await getInsights();
  } catch (error) {
    erreur.value = "Unable to load the insights.";
    console.error(error);
  }
});
```

```js
onMount(async () => {
  try {
    insights = await getInsights();
  } catch (error) {
    erreur = "Unable to load the insights.";
    console.error(error);
  }
});
```

Deux contraintes propres à React disparaissent dans les deux autres
frameworks. La fonction `charger()` imbriquée n'existait que parce que
`useEffect` refuse un callback `async`, alors que `onMounted` et `onMount`
l'acceptent directement. Et le tableau de dépendances vide, dont l'oubli
produit une boucle infinie, n'a pas d'équivalent.

Vue et Svelte sont ici presque interchangeables. La seule différence est le
suffixe `.value` imposé par `ref`.

### What remained similar despite the different syntax

La structure du chargement est identique dans les trois versions : un état
initialisé à vide, un appel au service dans le cycle de vie, un `try/catch`
qui remplit un état d'erreur, et un rendu conditionnel qui affiche le message.

Le fichier `services/insightsService.js` n'a jamais été modifié. Cela confirme
que le cycle de vie relève du composant, et non de la couche de données. Un
service correctement isolé survit à un changement de framework sans une seule
ligne réécrite.

## Forms and events

### How form inputs are handled in Svelte

Svelte utilise `bind:value`, une liaison à double sens entre une variable et
un champ.

```svelte
<input id="name" name="name" bind:value={formData.name} type="text" />
```

C'est le mécanisme qui a produit la plus forte réduction de code de toute la
migration. La version React de `Contact.jsx` devait écrire le cycle complet.

```jsx
const [formData, setFormData] = useState(EMPTY_FORM);

function handleChange(event) {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
}

<input name="name" value={formData.name} onChange={handleChange} />
```

La fonction `handleChange`, son commentaire explicatif de six lignes, et
l'attribut `onChange` répété sur les trois champs ont entièrement disparu de
la version Svelte, sans perte de fonctionnalité.

Sur ce point, Vue et Svelte sont équivalents. `v-model="formData.name"` et
`bind:value={formData.name}` font exactement la même chose.

### How events are handled in Svelte

Un gestionnaire est un attribut en minuscules qui reçoit une référence de
fonction, ce qui reproduit le nom HTML natif.

```svelte
<form onsubmit={handleSubmit}>
<button onclick={handleClick}>
```

Svelte 5 a supprimé les modificateurs de Svelte 4. `event.preventDefault()`
doit donc être appelé manuellement dans le gestionnaire, comme en React.

```js
async function handleSubmit(event) {
  event.preventDefault();
  ...
}
```

C'est le seul point où la version Vue reste plus concise que la version
Svelte, grâce à `@submit.prevent`, qui dispense d'écrire l'appel et de
recevoir l'événement en paramètre.

### How this compares with React and Vue.js

| | React | Vue | Svelte |
|---|---|---|---|
| Nom | `onClick` camelCase | `@click` | `onclick` minuscules |
| Valeur | référence de fonction | expression ou méthode | référence de fonction |
| `preventDefault` | manuel | modificateur `.prevent` | manuel |
| Vers le parent | fonction en prop | `defineEmits` | fonction en prop |
| Champ contrôlé | état plus gestionnaire | `v-model` | `bind:value` |

Le tableau montre que Svelte ne se range pas systématiquement du côté de Vue
ni du côté de React. Il emprunte à React la transmission de fonctions et
l'appel manuel de `preventDefault`, et à Vue la liaison à double sens des
champs de formulaire.

La validation, en revanche, a été traduite presque à l'identique dans les
trois versions, chacune avec son mécanisme de valeur dérivée.

```jsx
const isNameValid = formData.name.trim().length >= 2;
```

```js
const isNameValid = computed(() => formData.name.trim().length >= 2);
```

```js
let isNameValid = $derived(formData.name.trim().length >= 2);
```

React n'a besoin d'aucune enveloppe, puisque la fonction est réexécutée à
chaque rendu. Vue et Svelte en ont besoin, pour la même raison : leur script
ne tourne qu'une fois.

## Project organization

### How the Svelte project is organized

```
svelte/
  eslint.config.js
  vite.config.js
  svelte.config.js
  index.html
  comparison.md
  src/
    main.js
    App.svelte
    global.css
    components/
      layout/      Header.svelte, Footer.svelte
      sections/    Hero, About, Features, Insights, Contact
      cards/       FeatureCard, StatCard, InsightCard
      ui/          Button, Brand, SectionTitle, SectionBadge,
                   SocialLink, LinkColumn
    data/          features.js, insights.js, socials.js, stats.js, steps.js
    services/      insightsService.js
```

### What stayed similar to the React and Vue.js projects

L'arborescence est identique aux deux projets précédents. Même découpage par
rôle, mêmes noms de dossiers, mêmes noms de fichiers à l'extension près, et
même point d'entrée `main.js` qui importe la feuille de style globale avant de
monter l'application.

Les scripts npm sont également alignés : `dev`, `lint`, `fix`, `build`,
`preview` et `deploy`. La configuration ESLint reprend les mêmes règles que
celle du projet Vue, à savoir guillemets doubles, points-virgules obligatoires
et tolérance sur les variables en majuscules.

### What changed because of Svelte-specific conventions

Cinq points ont changé, tous mineurs.

Le point de montage de `index.html` est `<div id="app">` au lieu de
`<div id="root">`, convention Svelte reprise du template Vite.

`main.js` utilise la fonction `mount` de Svelte 5 au lieu de `createRoot` de
React. Il n'existe pas d'équivalent de `<StrictMode>`.

L'extension `.svelte` est obligatoire à l'import des composants.

Le dossier `src/lib`, reconnu par défaut et accessible par l'alias `$lib`, n'a
pas été utilisé. Les chemins relatifs ont été conservés, pour rester
comparables aux deux autres projets.

Enfin, la configuration ESLint doit charger `eslint-plugin-svelte` pour
disposer du parseur adapté, comme le projet Vue chargeait `eslint-plugin-vue`.
Une règle en moins toutefois : `vue/multi-word-component-names`, désactivée
dans le projet Vue pour conserver les noms `Brand` et `Button`, n'a pas
d'équivalent côté Svelte.

## AI-assisted migration

### What AI tools were used

L'assistant Claude, utilisé en ligne de commande via Claude Code, a servi tout
au long de la migration. Le travail s'est déroulé sous forme de dialogue :
explication d'un mécanisme Svelte, écriture du fichier, vérification
immédiate, puis passage au composant suivant.

La progression a suivi l'ordre des dépendances, du bas vers le haut :
configuration, puis `data` et `services`, puis les composants `ui`, puis les
`cards`, puis `layout`, puis les sections, et enfin `App.svelte`. Cet ordre
évite d'écrire des imports vers des fichiers inexistants.

### How the previous React and Vue.js versions helped the Svelte migration

Elles ont aidé de trois manières.

La version React a servi de source de vérité pour le contenu. Les classes
Tailwind, les textes, les identifiants de section et les commentaires
explicatifs en ont été repris sans réinterprétation.

La version Vue a servi de source de vérité pour la structure. Deux décisions
prises pendant la migration précédente ont été reconduites sans discussion :
l'extraction de `LinkColumn` dans un fichier séparé, et le passage des
constantes de classes en majuscules.

Le plus utile a été de disposer de deux points de comparaison plutôt qu'un.
Sur presque chaque mécanisme, Svelte s'est révélé proche de l'un ou de l'autre,
ce qui a permis de partir d'un modèle connu. Les props ressemblent à React,
`bind:value` ressemble à `v-model`, `onMount` ressemble à `onMounted`, et la
contrainte d'un composant par fichier vient de Vue. Une migration depuis
React seul aurait été plus difficile.

### What worked well during the migration

La traduction mécanique a été fiable. Les composants sans logique, c'est-à-dire
les trois cartes et les cinq composants d'interface, ont été produits
correctement du premier coup, en changeant `className` en `class` et en
convertissant la signature de fonction en `$props()`.

Les fichiers de `data` et de `services` ont été copiés sans erreur, ce qui
était prévisible puisqu'ils ne contiennent pas de code de framework.

L'explication des mécanismes nouveaux a été plus utile que la production de
code. `{@render children?.()}`, `<svelte:element>` et la différence entre
`const` et `$derived` ont demandé plusieurs échanges avant d'être compris, et
c'est cette compréhension qui a permis de relire les fichiers suivants avec un
regard critique.

### What required manual review or correction

Trois points ont demandé une correction, et méritent d'être documentés
précisément.

Le premier est l'erreur de réactivité déjà décrite. La proposition initiale
utilisait `const` dans `SectionTitle.svelte` et `Brand.svelte`, accompagnée
d'une justification plausible mais incorrecte. Le compilateur a tranché.
L'erreur n'aurait pas été détectée par une relecture visuelle, ni par ESLint,
ni par le build.

Le deuxième concerne les versions. Une grande partie du code Svelte disponible
en ligne relève encore de Svelte 4, avec `export let`, `$:` et `on:click`. Le
projet utilise Svelte 5.56 et les runes. Il a fallu préciser la version dans
les échanges pour éviter que la syntaxe ancienne ne se glisse dans les
fichiers, car elle reste valide et n'aurait produit aucune erreur.

Le troisième concerne l'écosystème. Le paquet d'icônes s'appelle
`@lucide/svelte`, et non `lucide-svelte` qui est l'ancien nom déprécié. Un
`package.json` créé par erreur à la racine du dossier `front_end-frameworks`
contenait justement le mauvais paquet, et a dû être supprimé.

Une vérification systématique a été appliquée après chaque fichier : `npm run
lint`, compilation avec relevé des avertissements, et rendu du composant hors
navigateur pour contrôler le HTML produit. C'est ainsi que le basculement de
balise de `Button` a été confirmé, en vérifiant que `href` produit bien un
`<a>` avec `target` et `rel`, sans attribut `disabled`.

### How project structure affected the quality of the migration

La structure du projet est ce qui a rendu la migration prévisible.

Les fichiers de `data` et de `services` ont été transposés avec un seul mot
changé, uniquement parce qu'ils ne contenaient aucune logique d'affichage. Si
les tableaux de données avaient été écrits directement dans les composants,
ils auraient dû être réécrits trois fois.

De même, `features.js` stocke le composant d'icône lui-même plutôt qu'une
icône déjà rendue. Cette décision, prise pendant le projet React pour laisser
`FeatureCard` décider de la taille, a eu un effet inattendu : elle a réduit la
migration de ce fichier à une seule ligne d'import.

Enfin, les composants découpés par responsabilité ont pu être migrés
indépendamment les uns des autres, vérifiés un par un, et validés avant de
passer au suivant. Un composant unique de plusieurs centaines de lignes
mélangeant affichage, état et appels réseau aurait obligé à tout comprendre
avant de pouvoir traduire quoi que ce soit.

## Professional perspective

### What this project taught you about adapting to a new framework

La troisième migration a été nettement plus rapide que la deuxième, elle-même
plus rapide que l'écriture initiale. La raison n'est pas que Svelte soit plus
simple, mais que le travail de conception avait déjà été fait.

Décider que le projet aurait un composant `Button` paramétré par `variant`,
que les données vivraient dans `src/data`, et que les sections seraient
autonomes : ces décisions ont été prises une fois, pendant le projet React, et
elles ont resservi deux fois sans être remises en question.

Ce qui reste à faire lors d'un changement de framework est un travail de
traduction, borné et vérifiable. Ce qui ne se refait pas est le travail
d'architecture.

### Why understanding component architecture matters more than memorizing syntax

La syntaxe de Svelte a été apprise en quelques heures. Les tableaux de ce
document en résument l'essentiel, et le reste s'obtient en consultant la
documentation au moment où l'on en a besoin.

En revanche, savoir qu'un badge de section doit accepter une classe
supplémentaire pour son placement mais pas pour son apparence, savoir que la
validation doit être dérivée de l'état du formulaire plutôt que stockée à
côté, savoir que la première carte d'insight occupe deux colonnes et que cette
information est une donnée de mise en page passée par une prop `index` : ces
décisions ne sont écrites dans aucune documentation et ne dépendent d'aucun
framework.

L'erreur commise sur `$derived` illustre bien la hiérarchie. Le problème
n'était pas de connaître le mot-clé, qui était déjà utilisé correctement dans
`Button.svelte`. Le problème était de comprendre à quel moment un composant
fige ses valeurs, ce qui relève du modèle d'exécution et non de la syntaxe.

### How AI can help reduce the barrier between frontend frameworks

L'assistance par IA agit sur la partie du travail qui varie d'un écosystème à
l'autre, c'est-à-dire la syntaxe et les noms d'API, et laisse intacte la
partie qui ne varie pas, c'est-à-dire la conception.

Elle réduit trois coûts. Le coût de traduction, en produisant immédiatement
l'équivalent d'un motif connu. Le coût de recherche, en répondant à des
questions mal formulées, ce qu'un moteur de recherche fait mal quand on ne
connaît pas encore le nom du concept. Et le coût d'entrée, en permettant
d'écrire du code utile dans un framework inconnu dès le premier jour, au lieu
de lire la documentation pendant une semaine.

La conséquence est un déplacement de la valeur. Connaître par cœur la syntaxe
d'un framework donné compte moins qu'avant. Comprendre les concepts communs et
savoir juger le code produit compte davantage.

### Why developers still need to read, test, debug and validate generated code

Parce que le code généré est toujours plausible en surface, y compris quand il
est faux.

Le cas rencontré dans ce projet est instructif précisément parce qu'il n'était
pas spectaculaire. La ligne `const sizeClasses = size === "lg" ? ... : ...`
est correcte en JavaScript, correcte en React, lisible, et accompagnée d'un
commentaire qui justifiait son emploi. Elle était pourtant fausse en Svelte,
et aucune relecture attentive du seul fichier concerné ne l'aurait révélé,
puisque l'erreur portait sur le modèle d'exécution du framework et non sur le
contenu du fichier.

Ce qui l'a révélée est un outil, et un seul : le compilateur. Ni le lint, ni
le build, ni l'inspection visuelle du rendu ne l'auraient signalée, car le
composant s'affiche correctement au premier rendu.

Trois conséquences pratiques en découlent.

Il faut savoir quel outil vérifie quoi. Dans ce projet, le lint vérifie le
style, le build vérifie la résolution des imports, le compilateur vérifie la
réactivité et l'accessibilité, et le navigateur vérifie le comportement. Aucun
ne remplace les autres.

Il faut lire les avertissements plutôt que les faire taire. Les deux
avertissements rencontrés étaient justifiés, et le second, sur les balises
auto-fermantes, aurait pu être considéré comme cosmétique alors qu'il signale
une ambiguïté réelle.

Il faut refuser le code que l'on ne saurait pas réécrire. La responsabilité de
ce qui est livré appartient au développeur, pas à l'outil qui l'a aidé à
l'écrire. Une IA peut affirmer une chose fausse avec assurance, comme elle
l'a fait ici en justifiant l'usage d'une constante par un raisonnement
correct mais hors sujet. Seul quelqu'un qui comprend le mécanisme peut
identifier ce type d'erreur.
