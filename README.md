# flux_node-oracledb.webservice

This is the webservice entpoint for the flux_nodeoracledb demo.
For more information about this project, please visit the main projects [repository](https://github.com/enpit/flux_node-oracledb).

## Database Hints

You probably want to create a dedicated user for the todo application. This user needs certain rights, so you should grant them using the following script (assuming your user is named *todo*):

```
create user todo identified by todo;
grant create session to todo;
grant create table to todo;
alter user todo quota 50m on system;
```
