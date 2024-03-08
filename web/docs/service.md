- [VUE.JS service standardization](#vuejs-service-standardization)
  - [Hierarchy](#hierarchy)
    - [modules](#modules)
    - [views](#views)
      - [Folder structure](#folder-structure)
        - [shared/components](#sharedcomponents-Vue-2-only)
        - [shared/constants](#sharedconstants-Vue-2-only)
        - [composables](#composables-Vue-3-only)
      - [Folder naming](#folder-naming)
        - [Folder name casing](#folder-name-casing)
        - [Allowed leaf folders](#allowed-leaf-folders)
        - [Repeating nouns in folder segments](#repeating-nouns-in-folder-segments)
        - [Singular nouns in folder names](#singular-nouns-in-folder-names)
        - [Verbs in folder names](#verbs-in-folder-names)
      - [Component naming](#component-naming)
        - [Component semantics](#component-semantics)
        - [Simple yet searchable](#simple-yet-searchable)
        - [Component name casing](#component-name-casing)

# VUE.JS service standardization

## Hierarchy

VUE.JS service project hierarchy should be clearly denoted, to allow for code readability, maintenance, and service lifecycle upgrades/updates.

**Project structure**

```
│
└─── docs
│
└─── env
│
└─── public
│
└─── src
│   
    └─── __tests__
    │   
    └─── assets
    │
    └─── components
    │
    └─── composables
    │
    └─── features
    │
    └─── layouts
    │
    └─── modules
    │
    └─── plugins
    │
    └─── router
    │
    └─── services
    │
    └─── store
    │
    └─── types
    │
    └─── utils
    │
    └─── views
    │
    │ App.vue
    │ main.ts

```
### __tests__

`__tests__` subfolder contains unit tests

#### composables

In `Vue 3` all reusable stateful logic should be put into [composables](https://vuejs.org/guide/reusability/composables.html).  
For naming and best practices please follow the official [guidelines](https://vuejs.org/guide/reusability/composables.html#conventions-and-best-practices).


### features

Contains UI features that require more logic than a simple component, for example, when a component is a sole consumer of a store


### modules

Contains business logic of the app, separated into modules.  
Example: `security` module with `users` submodule

```
│
└─── src
    │
    └─── modules
          │
          | index.ts
          |
          └─── security
                    |
                    └─── users
                    |     |
                    │     └─── components
                    |     |
                    │     └─── i18n
                    |     |
                    │     └─── views
                    |     |     |
                    │     |     └─── list
                    │     │     |     │ UsersList.vue
                    |     │     │
                    |     │     └─── item
                    |     │     │     │ UsersItem.vue
                    |     |
                    |     | api.ts
                    │     │ index.ts                         
                    │     │ routes.ts     
                    │     │ types.d.ts
                    │          
                    | index.ts
                    | routes.ts

```

Exposing parts of module/submodule is done via `index.ts`

Example: 

- {-Incorrect-} - `import TheUser from '@/modules/security/users/components/TheUser.vue'` - import not from `index.ts`
- {+Correct+} - `import { TheUser } from '@/modules/security/users'`

### plugins

Contains various `Vue` plugins


### services

Contains frontend services, such as `api`


### views

Contains `Vue` components that represent single endpoint destination routes, that are outside of modules. Every `views` extension should follow a strict set of rules to ensure development speed and project scalability. Same applies to `module` views


#### Folder structure

Entire `views` folder contents should be arranged in a hierarchy that replicates endpoint URL branching (eg. URL `foo.bar.baz/administration/user`, translates to folder structure `administration\user`). It should also contain non-routed components shared by routed leaf components.

Example:

```
│
└─── src
    │
    └─── views
          │
          └─── administration
                    │
                    └─── user
                    |     |
                    │     └─── list
                    │     │     │ UserList.vue
                    │     │
                    │     └─── item
                    │     │     │ UserItem.vue  
                    │          
                    │ Administration.vue

```

#### Folder naming

To maintain a large-scale `Vue` project a **strongly typed folder hierarchy** is required instead of a flat folder structure. Therefore, proper folder naming is crucial for structure readability, and will offset the need for complicated component names.

##### Folder name casing

Always use `kebab-case` when naming folders. Make sure to avoid verbosity when naming folders, but making sure that name unambiguously denotes folder contents.

Example: 

- {-Incorrect-} - `administration\UserProfile\item\UserProfileItem.vue` - `UserProfile` is not in kebab-case
- {+Correct+} - `administration\user-profile\item\UserProfileItem.vue`

##### Allowed leaf folders

Leaf folder names represent standardized UI actions/view types, and therefore must be contained in the preselected list of allowed keywords.

Allowed leaf keywords:

* `item` - Resource details view,
* `list` - Resource tabular/list view,
* `create` - Resource create view,
* `edit` - Resource edit view,
* `delete` - Resource delete view

##### Repeating nouns in folder segments

Make sure **not to repeat nouns in different folder segments of the same folder path**. 

Example: 

- {-Incorrect-} - `administration\user\user-profile\item\UserItem.vue` - `user` noun in `user-profile` segment is obsolete, consider refactoring
- {+Correct+} - `administration\user\profile\item\UserItem.vue`
  
##### Singular nouns in folder names

Always name folders in **singular form**.

Example: 

- {-Incorrect-} - `administration\users\item\UserItem.vue` - `users` folder is in plural form,
- {+Correct+} - `administration\user\item\UserItem.vue`

##### Verbs in folder names

Actions/verbs should be avoided in folder path segments. Think of segments as destination folders holding specific types of resources. Using verbs to denote resource types creates a non-intuitive concept. Actions/verbs are only allowed in [folder path leaves](#allowed-leaf-folders).

Example: 

- {-Incorrect-} - `administration\user-creation\User.vue` - `user-creation` contains a verb/action and can be omitted
- {+Correct+} - `administration\user\create\UserCreate.vue` - verbs should be used only as leaf folders

#### Component naming

The brunt of naming effort should be focused on naming folder structures. Component naming must be kept simple, denoting only **parent resource** and **view type** (eg. `item`, `list` etc.). Both `vue` and `js` must follow identical semantics with different naming casing.

##### Component semantics

Standardizing folder structure to denote component business logic creates a possibility for component names to remain simple without the need to bloat their names with verbose descriptive logic.

Use simple pattern when naming `views` components: `Parent resource` + `View type`, where `Parent resource` represents root folder resource, and `View type` denotes basic component logic represented by folder structure [leaf folder](#allowed-leaf-folders):

- {-Incorrect-} - `administration\user\UserProfileItem.vue` - folder structure already denotes component logic, `UserProfileItem.vue` contains unnecessary verbosity,
- {+Correct+} - `administration\user\item\UserItem.vue` - correct user details component,
- {+Correct+} - `administration\user\list\UserList.vue` - correct user list component,
- {+Correct+} - `administration\user\create\UserCreate.vue` - correct user create component

##### Simple yet searchable

When naming components using `Parent resource` + `View type` pattern, make sure to keep `Parent resource` as simple as possible, yet distinguished enough to keep the component searchable. If parent resource is too generic (eg, **request**), append a grand-parent resource to make it more unique.

- {-Incorrect-} - `administration\user\request\item\RequestItem.vue` - `RequestItem` is much too generic to make component searchable,
- {+Correct+} - `administration\user\request\item\UserRequestItem.vue` - `UserRequestItem` search will yield better results

##### Component name casing

Always use `PascalCase` when naming **vue** files, and `kebab-case` when naming **js** and **html** files. Make sure to keep component names as simple as possible.

Example: 

- {-Incorrect-} - `administration\user\item\user-item.vue` - `user-item.vue` **vue** file is not in pascal-case,
- {-Incorrect-} - `administration\user\item\UserItem.js` - `UserItem.js` **js** file is not in kebab-case,
- {+Correct+} - `administration\user\item\UserItem.vue`,
- {+Correct+} - `administration\user\item\user-item.js`,
- {+Correct+} - `administration\user\item\user-item.html`
