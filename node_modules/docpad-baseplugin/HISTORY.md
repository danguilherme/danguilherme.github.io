# History

## v1.4.0 2020 August 5

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Minimum required node version changed from `node: >=0.10` to `node: >=10` to keep up with mandatory ecosystem changes

## v1.3.0 2020 August 5

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v1.2.0 2020 August 5

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v1.1.0 2020 August 5

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v1.0.3 2018 September 7

-   Remove `setInstanceConfig` and make use of DocPad 6.82.0's new `mergeConfigs` method

## v1.0.2 2018 September 3

-   Updated base files and [editions](https://github.com/bevry/editions) using [boundation](https://github.com/bevry/boundation)

## v1.0.1 2018 August 20

-   Add `isDocPadPlugin` static method, to make it easier for DocPad to detect plugins
-   Support getters for `name` and `priority`
-   Internal changes
    -   No need for dereferencing `config` when `initialConfig` already contains it `config`
    -   No need for dereferencing `instanceConfig` as it shouldn't be set yet

## v1.0.0 2018 August 20

-   Abstracted out from DocPad v6.80.9 and converted to esnext
