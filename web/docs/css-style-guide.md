- [CSS Style guide](#css-style-guide)
  - [Structure](#structure)
    - [Abstracts directory](#abstracts-directory)
    - [Global directory](#global-directory)
    - [Layout directory](#layout-directory)
    - [Components directory](#components-directory)
    - [Vendors directory](#vendors-directory)
  - [Files](#files)
    - [General rules](#general-rules)
    - [Naming](#naming)
    - [Formatting](#formatting)


# CSS Style guide

## Structure

Styles are organized by directories which contain SCSS files. There’s a single file that imports all files from directories by certain priorities.

We have different types of files (based on content) that are kept in specific directories. This is the list of directories:

```
│
└─── style
    │
    └─── abstracts
    │
    └─── mixins
    │
    └─── layout
    │
    └─── vendor
    │
    │ style.scss
```

### Abstracts directory

This directory is unique because it contains the code that won’t be actually displayed nor seen. In this directory we have `Mixins` and `Variables` files.

`Mixins.scss` is meant to keep all `mixins` that will be used in an application. You should create a `mixin` for any piece of code that is repeating.

`Variables.scss` is a place to keep all variables that will be used in an application. By having this at one place it is rather simple to keep control over style and easy to make global changes from one place.

Usually, these files are imported on to level so every component and part of the application should have access to these files (and inside `Vue` components, too).


### Global directory

This directory is meant to keep files that are used to style global things (excluding layout itself) and  provide global imports, like fonts, for example.

`Base.scss` is a top level set of style for global elements, like body, html, basic typography, links, etc.

`Helpers.scss` is a file that contains misc. helpers (classes) that can be used widely across the  application. The main principle with these classes is that they have to address a single issue so they don’t interfere too much.

`Fonts.scss` is a file to include custom font faces to application.


### Layout directory

This directory should contain files that styles the main structure of the website/application, such as header, navigation, footer, etc.


### Vendors directory

This directory should contain styles for third-parties code (plugins, libraries, etc.) or override styles for them.



## Files

### General rules

CSS code base must not contain ID’s - it is not allowed to style anything by ID.

Files are named with underscore (`_`) prefix (ex. `_header.scss`).

File names are in kebab case (ex. `_submit-button.scss`).

When you write nested class names, you use `-` (kebab case) and this is the format to use:

```
.submit {
    &-button {}
}
```

All CSS properties for a class are sorted alphabetically. For example:

```
.header {
    background-color: #fff;
    font-size: 16px;
    height: 50px;
    margin-bottom: 20px;
    padding: 10px 20px;
    width: 100%;
}
```

Use shorthand's as much as possible.

Use `!important` only as your last resort.

For `z-index` properties, choose lower values and avoid random high values as 10000. Try to keep up to 10 (where 10 is usually for header, for example).

Use `mixins` as much as possible, as well as variables. You should always use `mixins` for repetitive pieces of code (ex. positioning, flex, background image, etc). Also you should always use variables for colors and font styling.


### Naming

First and most important rule is that every file (excluding abstracts, global files - base, fonts, helpers, etc.) should have ONLY one “root” that has the same name as the file. For example, if we have `header.scss` all of the code that can be found inside this file has to be placed like this:

```
.header {
    &-logo {}
    &-navigation {}
    &-hamburger {}
}
```

Generally, nesting in naming should reflect HTML structure up to some reasonable level.

Classes for alternating style should not be used for anything else in the code base. You should be aware and use this “alternator class names” only in conjunction with main class names. For example: `header-logo alt` or `header-logo white`, and write them in SASS as:

```
.header {

    &-logo {

      &.alt {}
      &.white {}

    }

}
```
