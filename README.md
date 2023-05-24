You can run the development server on port 8080 by running:
 `yarn`
 `yarn serve`

## Deployment


```sh
yarn build

# changes might take several minutes to propagate
aws s3 cp -r dist/ s3://app.cardiophi.com/

# alternatively, upload the dist folder to the bucket via the web UI
# at https://s3.console.aws.amazon.com/s3/buckets/app.cardiophi.com
```
