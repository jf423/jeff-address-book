# Jeff Address Book

## Libraries
- yarn v1.6.0
- node v14.15.4
- next v10.0.8
- react v17.0.1
- redux v4.0.5
- react-window v1.8.6
- react-window-infinite-loader v1.0.7
- react-virtualized-auto-sizer v1.0.5
- next v10.0.8
- styled-components v5.2.1
- @material-ui v4.11.3
- normalize.css v8.0.1

## Install Dependencies
```
yarn install
```
## Get Started
Development
```
yarn dev
```
Start
```
yarn build
yarn start
```
Test
```
yarn test
```
Linter
```
yarn lint
```
## Components

### Components Tree
- Index Page
    - Users
        - Search
        - UserCell
        - UserModal
- Setting Page
    - Nationalities

### Users
|  State Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| selectedIndex  | integer | null |
| isScrollToEnd  | boolean | false |
| isDisableSnackbar  | boolean | false |

### Search
|  Props Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| className  | string | '' |

|  State Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| text  | string | '' |

### UserCell
|  Props Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| data  | object | {} |
| data(items)  | array | [] |
| data(setSelectedIndex)  | function |  |
| columnIndex  | integer | null |
| rowIndex  | integer | null |
| style  | object | {} |

### UserModal
|  Props Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| open  | boolean | false |
| selectedUser  | object | {} |
| setSelectedIndex  | function |  |

### Nationalities
|  State Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| nat  | array | ['ch', 'es', 'fr', 'gb'] |

## Store
|  State Name   | Type  | Default Value |
|  ----  | ----  | ----  |
| userData  | array | [] |
| nationalities  | array | ['ch', 'es', 'fr', 'gb'] |
| searchText  | string | '' |

## Folder Structure
 - `__tests__ (Unit test)`
 - `pages (Page level components)`
 - `src`
     - `components (Container/Component)`
     - `config (Static config)`
     - `ducks (Redux store, action, reducer)`
     - `style (Common style)`
     - `utils (Common util logic)`

## User API
`https://randomuser.me/api/?results={num}&nat={nat}`
- API Document: https://randomuser.me/documentation#results

## Requirement
- [x] Home Page
- [x] Settings Page
- [x] Search
- [x] Extra:Detail Modal
- [x] Unit test
