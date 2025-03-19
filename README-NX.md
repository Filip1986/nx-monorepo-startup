Check for outdated packages and update NX itself:
```
npx nx report
```
```
npm outdated
```
```
npx nx migrate latest
```
After running npx nx migrate latest, you'll need to follow through with:
```
npm install
```
```
npx nx migrate --run-migrations
```
NX provides tools to help maintain consistent dependencies:
```
npx nx dep-graph
```
For peer dependency warnings, you can check with:
```
npm ls
```
And then install missing peer dependencies:
```
npm install --legacy-peer-deps
```
