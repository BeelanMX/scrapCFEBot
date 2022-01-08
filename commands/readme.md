# Commands

## How to use

Use the prefix ("!" in this case) before the command for the bot to read it

### CFE

This command is used to execute the web scrapping of the CFE's page. The user must write a searching parameter to obtain the results of it. The flags are optional.

```sh

!cfe [parameter] [flag]

```

**Flags**

- _Status (-s)_: To select the search's status. The posible status are "Vigente", "Adjudicado", "Suspendido", "Desierto", "Cancelado", "Concluido" e "Impugnado".

### Clean

This command delete all the .json files where the last searchings were saved.

```sh

!clean

```

### Help

With this command the user can ask the bot for information about other commands. The user can mention an specific command they want to know more about.

**To know the other commands**

```sh

!help

```

**To ask for an specific command**

```sh

!help [command name]

```
