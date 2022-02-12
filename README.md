# MY_EXCEL
A MS-Excel clone with some new features.

Just like MS-Excel you can write or delete in a sheet and can create more numbers of sheets.
also can create formula for any cell using dependencies and values of other cell.

Now What is new features??
-> sometimes generating formulas of different cell can cause dependency in cyclic manner i.e A is depended on B and B again on A.
Then this will increase A and B value till infinte time.
And to overcome this problem we have used a cycle detection algo on directed graph.
And to easily detect that cycle we have implement our new feature which will help detect to detect the cycle by showing whole cycle with colorful background .
